type Props = {
  size?: number;
  className?: string;
};

// Simple WhatsApp-like icon: circular outline with a handset glyph inside
export default function Whatsapp({ size = 24, className = "" }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2" />
      <path
        d="M15.8 14.6c-.9.7-1.1.7-2 .3-.9-.4-2.2-1.4-3-2.4-.8-1-.9-1.7-.6-2.6.3-.9.8-.9 1-.9l.3-.2c.2-.1.4 0 .5.2l.9 1.5c.1.2.1.4 0 .5l-.3.5c-.1.2 0 .4.1.6.3.5.9 1.1 1.4 1.4.2.1.4.2.5.1l.5-.3c.2-.1.4-.1.5 0l1.5.9c.2.1.3.3.2.5l-.2.3c-.1.2-.3.4-1 .9Z"
        fill="currentColor"
      />
    </svg>
  );
}
