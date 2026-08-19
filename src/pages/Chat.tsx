import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { useGroup } from "../context/groups/GroupsContext";
import useAuth from "../context/auth/AuthContext";
import { getSocket } from "../socket/socket";
import ChatList, { type Chat } from "../components/chats/ChatList";
import ChatWindow from "../components/chats/ChatWindow";
import { type Message } from "../components/chats/MessageBubble";

const Chat = () => {
  const { groups } = useGroup();
  const { user } = useAuth();

  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [isSomeoneTyping, setIsSomeoneTyping] = useState(false);

  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const mappedChats: Chat[] = useMemo(() => {
    return groups.map((group) => ({
      id: group._id,
      name: group.name,
      avatar: group.name.charAt(0).toUpperCase(),
      avatarBg: "bg-(--color-primary-soft) text-(--color-primary)",
      lastMessage: group.description || "No messages yet",
      time: group.createdAt
        ? new Date(group.createdAt).toLocaleDateString()
        : "",
      unread: 0,
      online: false,
      isGroup: true,
      members: group.members,
    }));
  }, [groups]);

  const activeChat = useMemo(
    () => mappedChats.find((c) => c.id === activeChatId) || null,
    [activeChatId, mappedChats],
  );

  useEffect(() => {
    const fetchMessages = async () => {
      if (!activeChatId) return;
      setIsLoadingMessages(true);
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/messages/${activeChatId}`,
          { credentials: "include" },
        );
        if (!res.ok) throw new Error("Failed to fetch messages");
        const data = await res.json();
        const formattedMessages: Message[] = data.messages.map((msg: any) => ({
          id: msg._id,
          text: msg.message,
          time: new Date(msg.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          sender: String(msg.sender?._id) === String(user?._id) ? "me" : "them",
        }));
        setMessages(formattedMessages);
      } catch (error) {
        console.error("Error fetching messages:", error);
        setMessages([]);
      } finally {
        setIsLoadingMessages(false);
      }
    };

    fetchMessages();
    setIsSomeoneTyping(false);

    const socket = getSocket();
    if (socket && activeChatId) {
      socket.emit("join-group", activeChatId);
    }

    return () => {
      if (socket && activeChatId) {
        socket.emit("leave-group", activeChatId);
      }
    };
  }, [activeChatId, user?._id]);

  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    const handleReceiveMessage = (data: any) => {
      if (data.message.group === activeChatId) {
        setMessages((prev) => {
          if (prev.some((m) => m.id === data.message._id)) return prev;
          const senderId = data.message.sender?._id || data.message.sender;
          const newMsg: Message = {
            id: data.message._id,
            text: data.message.message,
            time: new Date(data.message.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            sender: String(senderId) === String(user?._id) ? "me" : "them",
          };
          return [...prev, newMsg];
        });
        setIsSomeoneTyping(false);
      }
    };

    const handleChatError = (data: any) =>
      console.error("❌ SOCKET ERROR:", data.message);

    const handleUserTyping = (data: any) => {
      if (String(data.userId) !== String(user?._id)) {
        setIsSomeoneTyping(true);
      }
    };

    const handleUserStoppedTyping = (data: any) => {
      if (String(data.userId) !== String(user?._id)) {
        setIsSomeoneTyping(false);
      }
    };

    socket.on("receive-message", handleReceiveMessage);
    socket.on("chat-error", handleChatError);
    socket.on("user-typing", handleUserTyping);
    socket.on("user-stopped-typing", handleUserStoppedTyping);

    return () => {
      socket.off("receive-message", handleReceiveMessage);
      socket.off("chat-error", handleChatError);
      socket.off("user-typing", handleUserTyping);
      socket.off("user-stopped-typing", handleUserStoppedTyping);
    };
  }, [activeChatId, user?._id]);

  const handleInputChange = useCallback(
    (val: string) => {
      setInput(val);
      const socket = getSocket();

      if (socket && activeChatId) {
        socket.emit("typing", { groupId: activeChatId });

        if (typingTimeoutRef.current) {
          clearTimeout(typingTimeoutRef.current);
        }

        typingTimeoutRef.current = setTimeout(() => {
          socket.emit("stop-typing", { groupId: activeChatId });
        }, 1500);
      }
    },
    [activeChatId],
  );

  const handleSend = useCallback(() => {
    if (!input.trim() || !activeChatId) return;
    const socket = getSocket();
    if (socket) {
      socket.emit("send-message", { groupId: activeChatId, message: input });
      setInput("");

      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

      socket.emit("stop-typing", { groupId: activeChatId });
    }
  }, [input, activeChatId]);

  return (
    <main className="h-full w-full overflow-hidden bg-(--color-bg) p-0 sm:p-4">
      <div className="grid h-full w-full grid-cols-1 overflow-hidden border border-(--color-border) bg-(--color-surface) shadow-sm sm:grid-cols-[340px_1fr] sm:rounded-2xl md:grid-cols-[360px_1fr]">
        <ChatList
          chats={mappedChats}
          activeChatId={activeChatId}
          onSelect={setActiveChatId}
        />
        <ChatWindow
          activeChat={activeChat}
          messages={messages}
          isLoadingMessages={isLoadingMessages}
          input={input}
          onInputChange={handleInputChange}
          onSend={handleSend}
          onBack={() => setActiveChatId(null)}
          isSomeoneTyping={isSomeoneTyping}
        />
      </div>
    </main>
  );
};

export default Chat;
