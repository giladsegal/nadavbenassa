import { BedStatus } from "../types";

export type EmojiProps = {
  status: BedStatus;
  className?: string;
};

const statusToEmoji: Record<
  BedStatus,
  { image: string; description: string }
> = {
  none: { image: "", description: "none" },
  food: { image: "🍴", description: "food" },
  shower: { image: "🚽", description: "shower" },
  pain: { image: "💊", description: "pain" },
  general: { image: "❓", description: "medical assistance" },
};

export function Emoji({ status, className }: EmojiProps) {
  const { description, image } = statusToEmoji[status];

  return (
    <span role="img" aria-label={description} className={className}>
      {image}
    </span>
  );
}
