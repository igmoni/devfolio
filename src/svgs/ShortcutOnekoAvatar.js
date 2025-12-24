"use client";

export default function ShortcutOnekoAvatar(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <circle
        cx="12"
        cy="9.25"
        r="3"
        className="fill-none stroke-current"
        strokeWidth="1.6"
      />
      <path
        d="M7.25 17.75a5.25 5.25 0 0 1 9.5 0"
        className="fill-none stroke-current"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M8 5 10 6.5M16 5 14 6.5"
        className="fill-none stroke-current"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M9 9h.1M15 9h-.1"
        className="fill-none stroke-current"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M10.5 10.75c.4.35.85.5 1.5.5s1.1-.15 1.5-.5"
        className="fill-none stroke-current"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}




