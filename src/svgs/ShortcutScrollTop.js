"use client";

export default function ShortcutScrollTop(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M12 5.25v10.5M8.25 9.25 12 5.25l3.75 4"
        className="fill-none stroke-current"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="5"
        y="17.5"
        width="14"
        height="1.5"
        rx="0.75"
        className="fill-current"
      />
    </svg>
  );
}


