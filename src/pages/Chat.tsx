import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { useGroup } from "../context/groups/GroupsContext";
import useAuth from "../context/auth/AuthContext";
import { getSocket } from "../socket/socket";
import ChatList, { type Chat } from "../components/chats/ChatList";
import ChatWindow from "../components/chats/ChatWindow";
import { type Message } from "../components/chats/MessageBubble";

interface ApiUser {
  _id: string;
  fullName: string;
  email: string;
}

interface DbSeenByEntry {
  user: string;
  seenAt: string;
  _id: string;
}

interface ApiMessage {
  _id: string;
  message: string;
  createdAt: string;
  group: string;
  sender: ApiUser;
  seenBy?: DbSeenByEntry[];
}

interface SocketReceiveMessagePayload {
  message: ApiMessage;
}

interface SocketErrorPayload {
  message: string;
}

interface SocketTypingPayload {
  userId: string;
  fullName: string;
}

interface SocketSeenPayload {
  messageId: string;
  userId: string;
  fullName: string;
  seenAt: string;
}

interface SocketUnreadCountPayload {
  groupId: string;
  count: number;
}

interface SocketGroupMessagesSeenPayload {
  groupId: string;
  userId: string;
  fullName: string;
}

const Chat = () => {
  const { groups } = useGroup();
  const { user } = useAuth();

  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [typingUser, setTypingUser] = useState<string | null>(null);
  const [unreadCounts, setUnreadCounts] = useState<Record<string, number>>({});

  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const mappedChats: Chat[] = useMemo(() => {
    return groups.map((group) => ({
      id: group._id,
      name: group.name,
      avatar: group.name.charAt(0).toUpperCase(),
      avatarBg: "bg-(--color-primary-soft) text-(--color-primary)",
      lastMessage: group.description || "",
      time: group.createdAt
        ? new Date(group.createdAt).toLocaleDateString()
        : "",
      unread: unreadCounts[group._id] || 0,
      online: false,
      isGroup: true,
      members: group.members,
    }));
  }, [groups, unreadCounts]);

  const activeChat = useMemo(
    () => mappedChats.find((c) => c.id === activeChatId) || null,
    [activeChatId, mappedChats],
  );

  useEffect(() => {
    const socket = getSocket();
    if (!socket || groups.length === 0) return;

    groups.forEach((group) => {
      socket.emit("get-initial-unread-count", { groupId: group._id });
    });
  }, [groups]);

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

        const currentGroup = groups.find((g) => g._id === activeChatId);
        const groupMembers = currentGroup?.members || [];

        const formattedMessages: Message[] = data.messages.map(
          (msg: ApiMessage) => {
            const seenBy = (msg.seenBy || [])
              .map((s: DbSeenByEntry) => {
                const member = groupMembers.find((m) => m._id === s.user);
                return {
                  userId: String(s.user),
                  fullName: member?.fullName || "Unknown User",
                  seenAt: s.seenAt,
                };
              })
              .filter((s) => s.userId !== String(user?._id));

            return {
              id: msg._id,
              text: msg.message,
              time: new Date(msg.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
              sender:
                String(msg.sender?._id) === String(user?._id) ? "me" : "them",
              senderName:
                String(msg.sender?._id) === String(user?._id)
                  ? "You"
                  : msg.sender?.fullName || "Unknown User",
              seenBy,
            };
          },
        );

        setMessages(formattedMessages);
      } catch (error) {
        console.error("Error fetching messages:", error);
        setMessages([]);
      } finally {
        setIsLoadingMessages(false);
      }
    };

    fetchMessages();
    setTypingUser(null);

    const socket = getSocket();
    if (socket && activeChatId) {
      socket.emit("join-group", activeChatId);
      socket.emit("mark-group-seen", { groupId: activeChatId });
    }

    return () => {
      if (socket && activeChatId) {
        socket.emit("leave-group", activeChatId);
      }
    };
  }, [activeChatId, user?._id, groups]);

  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    const handleReceiveMessage = (data: SocketReceiveMessagePayload) => {
      if (data.message.group === activeChatId) {
        setMessages((prev) => {
          if (prev.some((m) => m.id === data.message._id)) return prev;

          const senderId = data.message.sender?._id || "";
          const currentGroup = groups.find((g) => g._id === activeChatId);
          const groupMembers = currentGroup?.members || [];

          const formattedSeenBy = (data.message.seenBy || [])
            .map((s: DbSeenByEntry) => {
              const member = groupMembers.find((m) => m._id === s.user);
              return {
                userId: String(s.user),
                fullName: member?.fullName || "Unknown User",
                seenAt: s.seenAt,
              };
            })
            .filter((s) => s.userId !== String(user?._id));

          const newMsg: Message = {
            id: data.message._id,
            text: data.message.message,
            time: new Date(data.message.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            sender: String(senderId) === String(user?._id) ? "me" : "them",
            senderName:
              String(senderId) === String(user?._id)
                ? "You"
                : data.message.sender?.fullName || "Unknown User",
            seenBy: formattedSeenBy,
          };

          if (String(senderId) !== String(user?._id)) {
            socket.emit("message-seen", {
              messageId: data.message._id,
              groupId: activeChatId,
            });
          }

          return [...prev, newMsg];
        });
        setTypingUser(null);
      }
    };

    const handleChatError = (data: SocketErrorPayload) =>
      console.error("❌ SOCKET ERROR:", data.message);

    const handleUserTyping = (data: SocketTypingPayload) => {
      if (String(data.userId) !== String(user?._id)) {
        setTypingUser(data.fullName);
      }
    };

    const handleUserStoppedTyping = (data: SocketTypingPayload) => {
      if (String(data.userId) !== String(user?._id)) {
        setTypingUser(null);
      }
    };

    const handleMessageSeen = (data: SocketSeenPayload) => {
      if (String(data.userId) === String(user?._id)) return;

      setMessages((prev) =>
        prev.map((m) => {
          if (m.id === data.messageId) {
            const existingSeen = m.seenBy || [];
            if (existingSeen.some((s) => s.userId === data.userId)) return m;
            return {
              ...m,
              seenBy: [
                ...existingSeen,
                {
                  userId: data.userId,
                  fullName: data.fullName,
                  seenAt: data.seenAt,
                },
              ],
            };
          }
          return m;
        }),
      );
    };

    const handleUnreadCount = (data: SocketUnreadCountPayload) => {
      setUnreadCounts((prev) => ({
        ...prev,
        [data.groupId]: data.count,
      }));
    };

    const handleGroupMessagesSeen = (data: SocketGroupMessagesSeenPayload) => {
      setUnreadCounts((prev) => ({
        ...prev,
        [data.groupId]: 0,
      }));

      if (data.userId === String(user?._id)) return;

      setMessages((prev) => {
        if (activeChatId !== data.groupId) return prev;
        return prev.map((m) => {
          if (m.sender === "me") {
            const existingSeen = m.seenBy || [];
            if (!existingSeen.some((s) => s.userId === data.userId)) {
              return {
                ...m,
                seenBy: [
                  ...existingSeen,
                  {
                    userId: data.userId,
                    fullName: data.fullName,
                    seenAt: new Date().toISOString(),
                  },
                ],
              };
            }
          }
          return m;
        });
      });
    };

    socket.on("receive-message", handleReceiveMessage);
    socket.on("chat-error", handleChatError);
    socket.on("user-typing", handleUserTyping);
    socket.on("user-stopped-typing", handleUserStoppedTyping);
    socket.on("message-seen", handleMessageSeen);
    socket.on("unread-count", handleUnreadCount);
    socket.on("group-messages-seen", handleGroupMessagesSeen);

    return () => {
      socket.off("receive-message", handleReceiveMessage);
      socket.off("chat-error", handleChatError);
      socket.off("user-typing", handleUserTyping);
      socket.off("user-stopped-typing", handleUserStoppedTyping);
      socket.off("message-seen", handleMessageSeen);
      socket.off("unread-count", handleUnreadCount);
      socket.off("group-messages-seen", handleGroupMessagesSeen);
    };
  }, [activeChatId, user?._id, groups]);

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
          typingUser={typingUser}
        />
      </div>
    </main>
  );
};

export default Chat;
