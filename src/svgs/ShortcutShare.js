"use client";

export default function ShortcutShare(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <circle
        cx="7"
        cy="12.5"
        r="2"
        className="fill-none stroke-current"
        strokeWidth="1.6"
      />
      <circle
        cx="17"
        cy="7"
        r="2"
        className="fill-none stroke-current"
        strokeWidth="1.6"
      />
      <circle
        cx="17"
        cy="17.5"
        r="2"
        className="fill-none stroke-current"
        strokeWidth="1.6"
      />
      <path
        d="M8.8 11.6 15.2 8.1M8.8 13.4l6.4 3.5"
        className="fill-none stroke-current"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}



