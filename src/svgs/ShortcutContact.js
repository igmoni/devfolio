"use client";

export default function ShortcutContact(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      {...props}
    >
      <rect
        x="3.75"
        y="5"
        width="16.5"
        height="14"
        rx="2"
        className="fill-none stroke-current"
        strokeWidth="1.6"
      />
      <path
        d="M5.5 7.75 12 12.25l6.5-4.5"
        className="fill-none stroke-current"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}


