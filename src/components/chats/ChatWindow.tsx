import { memo, useRef, useEffect, useState } from "react";
import { FiArrowLeft, FiInfo, FiSend, FiUsers } from "react-icons/fi";
import MessageBubble, { type Message } from "./MessageBubble";
import { type Chat } from "./ChatList";

const ChatWindow = memo(
  ({
    activeChat,
    messages,
    isLoadingMessages,
    input,
    onInputChange,
    onSend,
    onBack,
    isSomeoneTyping,
  }: {
    activeChat: Chat | null;
    messages: Message[];
    isLoadingMessages: boolean;
    input: string;
    onInputChange: (val: string) => void;
    onSend: () => void;
    onBack: () => void;
    isSomeoneTyping: boolean;
  }) => {
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [showDetails, setShowDetails] = useState(false);

    useEffect(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isSomeoneTyping]);

    if (!activeChat) {
      return (
        <section className="hidden md:flex flex-col items-center justify-center h-full text-center px-6 bg-(--color-bg)">
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
        </section>
      );
    }

    return (
      <section
        className={`${activeChat ? "flex" : "hidden md:flex"} flex-col w-full h-full min-h-0 overflow-hidden bg-(--color-bg)`}
      >
        {showDetails ? (
          <>
            <header className="flex items-center gap-3 px-4 py-3 border-b border-(--color-border) bg-(--color-surface) z-10 shrink-0">
              <button
                onClick={() => setShowDetails(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-(--color-surface-strong) text-(--color-text) transition-colors"
              >
                <FiArrowLeft size={20} />
              </button>
              <h2 className="text-sm font-semibold text-(--color-text) truncate">
                Group Info
              </h2>
            </header>

            <div className="flex-1 overflow-y-auto min-h-0 p-4">
              <div className="flex flex-col items-center mb-6">
                <div
                  className={`flex h-20 w-20 items-center justify-center rounded-full ${activeChat.avatarBg}`}
                >
                  <FiUsers size={32} />
                </div>
                <h3 className="text-lg font-bold text-(--color-text) mt-3">
                  {activeChat.name}
                </h3>
              </div>
              <h4 className="text-sm font-semibold text-(--color-text-muted) mb-2">
                Members ({activeChat.members?.length || 0})
              </h4>
              <div className="space-y-2">
                {activeChat.members?.map((member) => (
                  <div
                    key={member._id}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-(--color-surface-strong) transition-colors"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-(--color-surface-strong) text-(--color-text) text-sm font-bold">
                      {member.fullName.charAt(0).toUpperCase()}
                    </div>
                    <p className="text-sm text-(--color-text)">
                      {member.fullName}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            <header className="flex items-center gap-3 px-4 py-3 border-b border-(--color-border) bg-(--color-surface) z-10 shrink-0">
              <button
                onClick={onBack}
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
                <p className="text-xs text-(--color-text-muted) h-4">
                  {" "}
                  {isSomeoneTyping ? (
                    <span className="text-(--color-primary)">typing...</span>
                  ) : (
                    ""
                  )}
                </p>
              </div>
              <button
                onClick={() => setShowDetails(true)}
                className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-(--color-surface-strong) text-(--color-text) transition-colors"
              >
                <FiInfo size={20} />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto min-h-0 bg-(--color-bg)">
              <div className="flex flex-col justify-end min-h-full gap-4 px-4 py-6">
                {isLoadingMessages ? (
                  <>
                    <div className="flex justify-start">
                      <div className="h-10 w-40 rounded-2xl rounded-bl-md bg-(--color-surface-strong) animate-pulse"></div>
                    </div>
                    <div className="flex justify-end">
                      <div className="h-10 w-28 rounded-2xl rounded-br-md bg-(--color-surface-strong) animate-pulse"></div>
                    </div>
                    <div className="flex justify-start">
                      <div className="h-10 w-52 rounded-2xl rounded-bl-md bg-(--color-surface-strong) animate-pulse"></div>
                    </div>
                    <div className="flex justify-end">
                      <div className="h-10 w-24 rounded-2xl rounded-br-md bg-(--color-surface-strong) animate-pulse"></div>
                    </div>
                    <div className="flex justify-start">
                      <div className="h-10 w-36 rounded-2xl rounded-bl-md bg-(--color-surface-strong) animate-pulse"></div>
                    </div>
                  </>
                ) : messages.length > 0 ? (
                  messages.map((msg) => (
                    <MessageBubble key={msg.id} msg={msg} />
                  ))
                ) : (
                  <div className="flex-1 flex items-center justify-center text-sm text-(--color-text-muted)">
                    No messages yet. Start the conversation!
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            <div className="px-4 py-3 border-t border-(--color-border) bg-(--color-surface) shrink-0">
              <div className="flex items-center gap-3">
                <div className="flex-1 flex items-center gap-2 px-4 py-2 bg-(--color-surface-strong) rounded-2xl border border-transparent focus-within:border-(--color-primary) focus-within:ring-2 focus-within:ring-(--color-primary)/20 focus-within:bg-(--color-surface) transition-all">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => onInputChange(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && onSend()}
                    placeholder="Type a message..."
                    className="flex-1 bg-transparent text-sm text-(--color-text) placeholder:text-(--color-text-soft) focus:outline-none"
                  />
                </div>
                <button
                  onClick={onSend}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-(--color-primary) text-white hover:bg-(--color-primary-hover) transition-all shadow-sm hover:shadow-md hover:scale-105"
                >
                  <FiSend size={16} />
                </button>
              </div>
            </div>
          </>
        )}
      </section>
    );
  },
);

export default ChatWindow;
