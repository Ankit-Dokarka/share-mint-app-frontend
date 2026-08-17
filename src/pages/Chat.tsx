import { useState, useRef, useEffect, memo, useCallback, useMemo } from "react";
import {
  FiArrowLeft,
  FiSend,
  FiSearch,
  FiMoreVertical,
  FiPaperclip,
  FiSmile,
  FiPhone,
  FiVideo,
  FiUsers,
} from "react-icons/fi";
import { useGroup } from "../context/groups/GroupsContext";

type Message = {
  id: string;
  text: string;
  time: string;
  sender: "me" | "them";
};

type Chat = {
  id: string;
  name: string;
  avatar: string;
  avatarBg: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  isGroup?: boolean;
  messages: Message[];
};

const MessageBubble = memo(({ msg }: { msg: Message }) => (
  <div
    className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
  >
    <div
      className={`max-w-[75%] md:max-w-[60%] px-4 py-2.5 text-sm shadow-sm rounded-2xl transition-all ${
        msg.sender === "me"
          ? "bg-(--color-primary) text-white rounded-br-md"
          : "bg-white border border-(--color-border) text-(--color-text) rounded-bl-md"
      }`}
    >
      <p className="leading-relaxed">{msg.text}</p>
      <p
        className={`mt-1 text-[10px] text-right ${
          msg.sender === "me" ? "text-white/70" : "text-(--color-text-soft)"
        }`}
      >
        {msg.time}
      </p>
    </div>
  </div>
));
MessageBubble.displayName = "MessageBubble";

const ChatListItem = memo(
  ({
    chat,
    isActive,
    onSelect,
  }: {
    chat: Chat;
    isActive: boolean;
    onSelect: (id: string) => void; // Changed to string
  }) => (
    <button
      onClick={() => onSelect(chat.id)}
      className={`w-full flex items-center gap-3 px-4 py-3.5 text-left border-b border-(--color-border)/50 transition-colors relative ${
        isActive
          ? "bg-(--color-primary-soft)/40"
          : "hover:bg-(--color-surface-strong)/50"
      }`}
    >
      {isActive && (
        <span className="absolute left-0 top-0 h-full w-1 bg-(--color-primary)" />
      )}

      <div className="relative shrink-0">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold ${chat.avatarBg}`}
        >
          {chat.isGroup ? <FiUsers size={18} /> : chat.avatar}
        </div>
        {chat.online && (
          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-(--color-surface)" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-sm font-semibold text-(--color-text) truncate">
            {chat.name}
          </h3>
          <span className="text-[11px] text-(--color-text-soft) shrink-0">
            {chat.time}
          </span>
        </div>
        <div className="flex items-center justify-between gap-2 mt-0.5">
          <p className="text-xs text-(--color-text-muted) truncate">
            {chat.lastMessage}
          </p>
          {chat.unread > 0 && (
            <span className="shrink-0 flex h-5 min-w-5 px-1.5 items-center justify-center rounded-full bg-(--color-primary) text-[10px] font-bold text-white">
              {chat.unread}
            </span>
          )}
        </div>
      </div>
    </button>
  ),
);
ChatListItem.displayName = "ChatListItem";

const Chat = () => {
  const { groups } = useGroup(); // Fetching groups from context

  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Map API groups to UI Chat format
  const mappedChats: Chat[] = useMemo(() => {
    return groups.map((group) => ({
      id: group._id,
      name: group.name,
      avatar: group.name.charAt(0).toUpperCase(),
      avatarBg: "bg-(--color-primary-soft) text-(--color-primary)", // Default color
      lastMessage: group.description || "No messages yet", // Placeholder
      time: group.createdAt
        ? new Date(group.createdAt).toLocaleDateString()
        : "",
      unread: 0, // Placeholder
      online: false, // Placeholder
      isGroup: true,
      messages: [], // Empty for now until socket is connected
    }));
  }, [groups]);

  const activeChat = useMemo(
    () => mappedChats.find((c) => c.id === activeChatId) || null,
    [activeChatId, mappedChats],
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeChatId]);

  const handleSend = useCallback(() => {
    if (!input.trim()) return;
    setInput("");
  }, [input]);

  const handleSelectChat = useCallback((id: string) => setActiveChatId(id), []);
  const handleBack = useCallback(() => setActiveChatId(null), []);

  return (
    <main className="h-full w-full overflow-hidden bg-(--color-bg) p-0 sm:p-4">
      <div className="grid h-full w-full grid-cols-1 overflow-hidden border border-(--color-border) bg-(--color-surface) shadow-sm sm:grid-cols-[340px_1fr] sm:rounded-2xl md:grid-cols-[360px_1fr]">
        {/* ===== Chat List Panel ===== */}
        <aside
          className={`${
            activeChat ? "hidden md:flex" : "flex"
          } flex-col w-full h-full border-r border-(--color-border) bg-(--color-surface)`}
        >
          <div className="px-5 py-4 border-b border-(--color-border) bg-(--color-surface)">
            <h1 className="text-xl font-bold text-(--color-text) mb-3">
              Chats
            </h1>
            <div className="relative">
              <FiSearch
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-(--color-text-soft)"
              />
              <input
                type="text"
                placeholder="Search messages..."
                className="w-full pl-9 pr-3 py-2.5 text-sm bg-(--color-surface-strong) border border-transparent rounded-xl text-(--color-text) placeholder:text-(--color-text-soft) focus:outline-none focus:ring-2 focus:ring-(--color-primary)/20 focus:bg-white transition-all"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {mappedChats.length > 0 ? (
              mappedChats.map((chat) => (
                <ChatListItem
                  key={chat.id}
                  chat={chat}
                  isActive={activeChatId === chat.id}
                  onSelect={handleSelectChat}
                />
              ))
            ) : (
              <div className="p-4 text-center text-sm text-(--color-text-muted)">
                No groups available.
              </div>
            )}
          </div>
        </aside>

        {/* ===== Conversation Panel ===== */}
        <section
          className={`${
            activeChat ? "flex" : "hidden md:flex"
          } flex-col w-full h-full bg-(--color-bg)`}
        >
          {activeChat ? (
            <>
              {/* Chat Header */}
              <header className="flex items-center gap-3 px-4 py-3 border-b border-(--color-border) bg-(--color-surface) z-10">
                <button
                  onClick={handleBack}
                  className="md:hidden flex h-9 w-9 items-center justify-center rounded-full hover:bg-(--color-surface-strong) text-(--color-text) transition-colors"
                >
                  <FiArrowLeft size={20} />
                </button>

                <div className="relative shrink-0">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold ${activeChat.avatarBg}`}
                  >
                    <FiUsers size={16} />
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <h2 className="text-sm font-semibold text-(--color-text) truncate">
                    {activeChat.name}
                  </h2>
                  <p className="text-xs text-(--color-text-muted)">
                    {activeChat.online ? "Online" : "Last seen recently"}
                  </p>
                </div>

                <div className="flex items-center gap-1">
                  <button className="hidden sm:flex h-9 w-9 items-center justify-center rounded-full hover:bg-(--color-surface-strong) text-(--color-text-muted) transition-colors">
                    <FiPhone size={18} />
                  </button>
                  <button className="hidden sm:flex h-9 w-9 items-center justify-center rounded-full hover:bg-(--color-surface-strong) text-(--color-text-muted) transition-colors">
                    <FiVideo size={18} />
                  </button>
                  <button className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-(--color-surface-strong) text-(--color-text-muted) transition-colors">
                    <FiMoreVertical size={18} />
                  </button>
                </div>
              </header>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 bg-(--color-bg)">
                {activeChat.messages.length > 0 ? (
                  activeChat.messages.map((msg) => (
                    <MessageBubble key={msg.id} msg={msg} />
                  ))
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-(--color-text-muted)">
                    No messages yet. Start the conversation!
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="px-4 py-3 border-t border-(--color-border) bg-(--color-surface)">
                <div className="flex items-center gap-3">
                  <button className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full hover:bg-(--color-surface-strong) text-(--color-text-muted) transition-colors">
                    <FiPaperclip size={20} />
                  </button>
                  <div className="flex-1 flex items-center gap-2 px-4 py-2 bg-(--color-surface-strong) rounded-2xl border border-transparent focus-within:border-(--color-primary) focus-within:ring-2 focus-within:ring-(--color-primary)/20 focus-within:bg-white transition-all">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSend()}
                      placeholder="Type a message..."
                      className="flex-1 bg-transparent text-sm text-(--color-text) placeholder:text-(--color-text-soft) focus:outline-none"
                    />
                    <button className="text-(--color-text-muted) hover:text-(--color-primary) transition-colors">
                      <FiSmile size={22} />
                    </button>
                  </div>
                  <button
                    onClick={handleSend}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-(--color-primary) text-white hover:bg-(--color-primary-hover) transition-all shadow-sm hover:shadow-md hover:scale-105"
                  >
                    <FiSend size={16} />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="hidden md:flex flex-col items-center justify-center h-full text-center px-6">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-(--color-surface-strong) text-(--color-text-soft) mb-6">
                <FiSend size={40} />
              </div>
              <h3 className="text-xl font-bold text-(--color-text)">
                Your Messages
              </h3>
              <p className="mt-2 text-sm text-(--color-text-muted) max-w-xs">
                Select a conversation from the list to start chatting with your
                friends and groups.
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default memo(Chat);
