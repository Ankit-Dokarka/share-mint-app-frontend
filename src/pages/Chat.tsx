import { useState, useRef, useEffect } from "react";
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

type Message = {
  id: number;
  text: string;
  time: string;
  sender: "me" | "them";
};

type Chat = {
  id: number;
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

const DUMMY_CHATS: Chat[] = [
  {
    id: 1,
    name: "Alex Sharma",
    avatar: "AS",
    avatarBg: "bg-(--color-primary-soft) text-(--color-primary)",
    lastMessage: "Hey, are we still on for dinner tonight?",
    time: "2m",
    unread: 2,
    online: true,
    messages: [
      { id: 1, text: "Hey! How's it going?", time: "10:24 AM", sender: "them" },
      {
        id: 2,
        text: "All good! Just checking the trip expenses",
        time: "10:25 AM",
        sender: "me",
      },
      {
        id: 3,
        text: "Cool. Did you see the dinner bill I added?",
        time: "10:26 AM",
        sender: "them",
      },
      {
        id: 4,
        text: "Yes, I'm paying it now actually",
        time: "10:27 AM",
        sender: "me",
      },
      { id: 5, text: "Awesome, thanks!", time: "10:27 AM", sender: "them" },
      {
        id: 6,
        text: "Hey, are we still on for dinner tonight?",
        time: "10:30 AM",
        sender: "them",
      },
    ],
  },
  {
    id: 2,
    name: "Priya Patel",
    avatar: "PP",
    avatarBg: "bg-(--color-danger-soft) text-(--color-danger)",
    lastMessage: "I sent you the receipts 🧾",
    time: "1h",
    unread: 0,
    online: false,
    messages: [
      {
        id: 1,
        text: "Hey Priya, do you have the cab receipts?",
        time: "9:10 AM",
        sender: "me",
      },
      {
        id: 2,
        text: "Yes! Uploading them now",
        time: "9:12 AM",
        sender: "them",
      },
      {
        id: 3,
        text: "I sent you the receipts 🧾",
        time: "9:15 AM",
        sender: "them",
      },
    ],
  },
  {
    id: 3,
    name: "Trip 2024",
    avatar: "T2",
    avatarBg: "bg-(--color-success-soft) text-(--color-success)",
    lastMessage: "Maya: Let's settle up tomorrow",
    time: "Yd",
    unread: 5,
    online: true,
    isGroup: true,
    messages: [
      {
        id: 1,
        text: "Guys, the trip was amazing!",
        time: "Yesterday",
        sender: "them",
      },
      { id: 2, text: "Best one yet 🎉", time: "Yesterday", sender: "me" },
      {
        id: 3,
        text: "Let's settle up tomorrow",
        time: "Yesterday",
        sender: "them",
      },
    ],
  },
  {
    id: 4,
    name: "Raj Kumar",
    avatar: "RK",
    avatarBg: "bg-(--color-primary-soft) text-(--color-primary)",
    lastMessage: "Sounds good 👍",
    time: "Yd",
    unread: 0,
    online: false,
    messages: [
      {
        id: 1,
        text: "Can you cover me for drinks?",
        time: "Yesterday",
        sender: "me",
      },
      { id: 2, text: "Sounds good 👍", time: "Yesterday", sender: "them" },
    ],
  },
  {
    id: 5,
    name: "Maya Singh",
    avatar: "MS",
    avatarBg: "bg-(--color-danger-soft) text-(--color-danger)",
    lastMessage: "Thanks for covering!",
    time: "Mon",
    unread: 0,
    online: true,
    messages: [
      { id: 1, text: "Thanks for covering!", time: "Monday", sender: "them" },
    ],
  },
];

export default function Chat() {
  const [chats] = useState<Chat[]>(DUMMY_CHATS);
  const [activeChatId, setActiveChatId] = useState<number | null>(null);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeChat = chats.find((c) => c.id === activeChatId) || null;

  // Scroll to bottom when chat changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeChatId]);

  const handleSend = () => {
    if (!input.trim()) return;
    // Dummy: just clear input (no state update for messages since it's static UI)
    setInput("");
  };

  return (
    <main className="h-[calc(100vh-0px)] md:h-[calc(100vh-0px)] w-full bg-(--color-bg)">
      <div className="mx-auto w-full max-w-10xl h-full md:p-4 md:pt-6">
        <div className="grid grid-cols-1 md:grid-cols-[340px_1fr] h-full md:h-[calc(100vh-2rem)] rounded-(--btn-radius) overflow-hidden border border-(--color-border) bg-(--color-surface) shadow-lg">
          {/* ===== Chat List Panel ===== */}
          <aside
            className={`${
              activeChat ? "hidden md:flex" : "flex"
            } flex-col w-full h-full border-r border-(--color-border) bg-(--color-surface)`}
          >
            {/* List Header */}
            <div className="px-5 py-4 border-b border-(--color-border)">
              <h1
                className="text-xl font-bold text-(--color-text)"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Chats
              </h1>
              {/* Search */}
              <div className="mt-3 relative">
                <FiSearch
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-(--color-text-soft)"
                />
                <input
                  type="text"
                  placeholder="Search messages..."
                  className="w-full pl-9 pr-3 py-2.5 text-sm bg-(--color-surface-strong) border border-transparent rounded-(--btn-radius) text-(--color-text) placeholder:text-(--color-text-soft) focus:outline-none focus:ring-2 focus:ring-(--color-primary)/25 focus:border-(--color-primary) transition-all"
                />
              </div>
            </div>

            {/* Chat List */}
            <div className="flex-1 overflow-y-auto">
              {chats.map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => setActiveChatId(chat.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 text-left border-b border-(--color-border)/60 transition-colors ${
                    activeChatId === chat.id
                      ? "bg-(--color-primary-soft)/30"
                      : "hover:bg-(--color-surface-strong)/60"
                  }`}
                >
                  {/* Avatar */}
                  <div className="relative shrink-0">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold ${chat.avatarBg}`}
                    >
                      {chat.isGroup ? <FiUsers size={18} /> : chat.avatar}
                    </div>
                    {chat.online && (
                      <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-(--color-success) border-2 border-(--color-surface)" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-sm font-semibold text-(--color-text) truncate">
                        {chat.name}
                      </h3>
                      <span className="text-xs text-(--color-text-soft) shrink-0">
                        {chat.time}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-2 mt-0.5">
                      <p className="text-xs text-(--color-text-muted) truncate">
                        {chat.lastMessage}
                      </p>
                      {chat.unread > 0 && (
                        <span className="shrink-0 flex h-5 min-w-5 px-1 items-center justify-center rounded-full bg-(--color-primary) text-[10px] font-bold text-white">
                          {chat.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              ))}
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
                {/* Conversation Header */}
                <header className="flex items-center gap-3 px-4 py-3 border-b border-(--color-border) bg-(--color-surface)">
                  <button
                    onClick={() => setActiveChatId(null)}
                    className="md:hidden flex h-9 w-9 items-center justify-center rounded-full hover:bg-(--color-surface-strong) text-(--color-text) transition-colors"
                  >
                    <FiArrowLeft size={20} />
                  </button>

                  <div className="relative shrink-0">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold ${activeChat.avatarBg}`}
                    >
                      {activeChat.isGroup ? (
                        <FiUsers size={16} />
                      ) : (
                        activeChat.avatar
                      )}
                    </div>
                    {activeChat.online && (
                      <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-(--color-success) border-2 border-(--color-surface)" />
                    )}
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

                {/* Messages */}
                <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
                  {activeChat.messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[78%] sm:max-w-[65%] px-3.5 py-2 rounded-(--btn-radius) text-sm ${
                          msg.sender === "me"
                            ? "bg-(--color-primary) text-white rounded-br-sm"
                            : "bg-(--color-surface) border border-(--color-border) text-(--color-text) rounded-bl-sm"
                        }`}
                      >
                        <p className="leading-relaxed">{msg.text}</p>
                        <p
                          className={`mt-1 text-[10px] ${
                            msg.sender === "me"
                              ? "text-white/70"
                              : "text-(--color-text-soft)"
                          }`}
                        >
                          {msg.time}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="px-3 py-3 border-t border-(--color-border) bg-(--color-surface)">
                  <div className="flex items-center gap-2">
                    <button className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full hover:bg-(--color-surface-strong) text-(--color-text-muted) transition-colors">
                      <FiPaperclip size={18} />
                    </button>
                    <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-(--color-surface-strong) rounded-(--btn-radius) border border-transparent focus-within:border-(--color-primary) focus-within:ring-2 focus-within:ring-(--color-primary)/20 transition-all">
                      <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                        placeholder="Type a message..."
                        className="flex-1 bg-transparent text-sm text-(--color-text) placeholder:text-(--color-text-soft) focus:outline-none"
                      />
                      <button className="text-(--color-text-muted) hover:text-(--color-text) transition-colors">
                        <FiSmile size={20} />
                      </button>
                    </div>
                    <button
                      onClick={handleSend}
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-(--color-primary) text-white hover:bg-(--color-primary-hover) transition-colors shadow-sm"
                    >
                      <FiSend size={16} />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              // Empty state on desktop
              <div className="hidden md:flex flex-col items-center justify-center h-full text-center px-6">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-(--color-surface-strong) text-(--color-text-soft) mb-4">
                  <FiSend size={32} />
                </div>
                <h3
                  className="text-lg font-bold text-(--color-text)"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Your Messages
                </h3>
                <p className="mt-1 text-sm text-(--color-text-muted) max-w-xs">
                  Select a conversation from the list to start chatting with
                  your friends and groups.
                </p>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
