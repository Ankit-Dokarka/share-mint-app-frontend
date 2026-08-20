import { memo } from "react";

export type Message = {
  id: string;
  text: string;
  time: string;
  sender: "me" | "them";
  senderName: string;
  seenBy?: {
    userId: string;
    fullName: string;
    seenAt: string;
  }[];
};

const MessageBubble = memo(({ msg }: { msg: Message }) => (
  <div
    className={`flex w-full flex-col ${
      msg.sender === "me" ? "items-end" : "items-start"
    }`}
  >
    <p
      className={`mb-1 text-[10px] font-medium ${
        msg.sender === "me"
          ? "mr-1 text-(--color-text-soft)"
          : "ml-1 text-(--color-text-soft)"
      }`}
    >
      {msg.sender === "me" ? "You" : `Sent by ${msg.senderName}`}
    </p>

    <div
      className={`w-fit max-w-[75%] break-words rounded-2xl px-4 py-2.5 text-sm shadow-sm transition-all md:max-w-[60%] ${
        msg.sender === "me"
          ? "rounded-br-md bg-(--color-primary) text-white"
          : "rounded-bl-md border border-(--color-border) bg-(--color-surface) text-(--color-text)"
      }`}
    >
      <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>

      <p
        className={`mt-1 text-right text-[10px] ${
          msg.sender === "me" ? "text-white/70" : "text-(--color-text-soft)"
        }`}
      >
        {msg.time}
      </p>
    </div>

    {msg.sender === "me" && msg.seenBy && msg.seenBy.length > 0 && (
      <p className="mr-1 mt-1 text-[10px] text-(--color-text-soft)">
        Seen by {msg.seenBy.map((s) => s.fullName).join(", ")}
      </p>
    )}
  </div>
));

export default MessageBubble;
