"use client";

export default function ShortcutCode(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M9.25 7.25 5 12l4.25 4.75M14.75 7.25 19 12l-4.25 4.75"
        className="fill-none stroke-current"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}


