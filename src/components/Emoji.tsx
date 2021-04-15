import { BedStatus } from "../types";

export type EmojiProps = {
  status: BedStatus;
  className?: string;
};

const statusToEmoji: Record<
  BedStatus,
  { image: string; description: string }
> = {
  food: { image: "🍟", description: "food" },
  none: { image: "", description: "none" },
  shower: { image: "🚿", description: "shower" },
};

export function Emoji({ status }: EmojiProps) {
  const { description, image } = statusToEmoji[status];

  return (
    <span role="img" aria-label={description}>
      {image}
    </span>
  );
}
