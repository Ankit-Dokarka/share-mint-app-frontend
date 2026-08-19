import { memo } from "react";

export type Message = {
  id: string;
  text: string;
  time: string;
  sender: "me" | "them";
  seenBy?: { userId: string; fullName: string; seenAt: string }[];
};

const MessageBubble = memo(({ msg }: { msg: Message }) => (
  <div
    className={`flex w-full flex-col ${msg.sender === "me" ? "items-end" : "items-start"}`}
  >
    <div
      className={`max-w-[75%] md:max-w-[60%] w-fit px-4 py-2.5 text-sm shadow-sm rounded-2xl break-words transition-all ${
        msg.sender === "me"
          ? "bg-(--color-primary) text-white rounded-br-md"
          : "bg-(--color-surface) border border-(--color-border) text-(--color-text) rounded-bl-md"
      }`}
    >
      <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
      <p
        className={`mt-1 text-[10px] text-right ${
          msg.sender === "me" ? "text-white/70" : "text-(--color-text-soft)"
        }`}
      >
        {msg.time}
      </p>
    </div>
    {msg.sender === "me" && msg.seenBy && msg.seenBy.length > 0 && (
      <p className="text-[10px] text-(--color-text-soft) mt-1 mr-1">
        Seen by {msg.seenBy.map((s) => s.fullName).join(", ")}
      </p>
    )}
  </div>
));

export default MessageBubble;
