"use client";

export default function ShortcutChat(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M5 6.75A2.75 2.75 0 0 1 7.75 4h8.5A2.75 2.75 0 0 1 19 6.75v4.5A2.75 2.75 0 0 1 16.25 14H11l-3.25 2.75V14H7.75A2.75 2.75 0 0 1 5 11.25Z"
        className="fill-none stroke-current"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 9.5h2.5M13 9.5h2"
        className="fill-none stroke-current"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}


