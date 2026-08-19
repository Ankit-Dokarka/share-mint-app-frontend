import { memo, useState } from "react";
import { FiSearch, FiUsers } from "react-icons/fi";
import type { User } from "../../types/user";

export type Chat = {
  id: string;
  name: string;
  avatar: string;
  avatarBg: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  isGroup?: boolean;
  members?: User[];
};

const ChatList = memo(
  ({
    chats,
    activeChatId,
    onSelect,
  }: {
    chats: Chat[];
    activeChatId: string | null;
    onSelect: (id: string) => void;
  }) => {
    const [search, setSearch] = useState("");

    const filteredChats = chats.filter((chat) =>
      chat.name.toLowerCase().includes(search.toLowerCase()),
    );

    return (
      <aside
        className={`${
          activeChatId ? "hidden md:flex" : "flex"
        } flex-col w-full h-full min-h-0 border-r border-(--color-border) bg-(--color-surface)`}
      >
        <div className="px-5 py-4 border-b border-(--color-border) bg-(--color-surface) shrink-0">
          <h1 className="text-xl font-bold text-(--color-text) mb-3">Chats</h1>
          <div className="relative">
            <FiSearch
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-(--color-text-soft)"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search groups"
              className="w-full pl-9 pr-3 py-2.5 text-sm bg-(--color-surface-strong) border border-transparent rounded-xl text-(--color-text) placeholder:text-(--color-text-soft) focus:outline-none focus:ring-2 focus:ring-(--color-primary)/20 focus:bg-(--color-surface) transition-all"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto min-h-0">
          {filteredChats.length > 0 ? (
            filteredChats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => onSelect(chat.id)}
                className={`w-full flex items-center gap-3 px-4 py-3.5 text-left border-b border-(--color-border)/50 transition-colors relative ${
                  activeChatId === chat.id
                    ? "bg-(--color-primary-soft)/40"
                    : "hover:bg-(--color-surface-strong)/50"
                }`}
              >
                {activeChatId === chat.id && (
                  <span className="absolute left-0 top-0 h-full w-1 bg-(--color-primary)" />
                )}
                <div className="relative shrink-0">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold ${chat.avatarBg}`}
                  >
                    {chat.isGroup ? <FiUsers size={18} /> : chat.avatar}
                  </div>
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
            ))
          ) : (
            <div className="p-4 text-center text-sm text-(--color-text-muted)">
              No groups available.
            </div>
          )}
        </div>
      </aside>
    );
  },
);

export default ChatList;
