"use client";

export default function ShortcutBlog(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <rect
        x="4"
        y="4.75"
        width="16"
        height="14.5"
        rx="1.5"
        className="fill-none stroke-current"
        strokeWidth="1.6"
      />
      <path
        d="M7.25 9.5h9.5M7.25 12.5h6.5M7.25 15.5h3.5"
        className="fill-none stroke-current"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
