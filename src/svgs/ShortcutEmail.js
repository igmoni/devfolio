"use client";

export default function ShortcutEmail(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      {...props}
    >
      <rect
        x="3.5"
        y="6"
        width="17"
        height="12"
        rx="2"
        className="fill-none stroke-current"
        strokeWidth="1.6"
      />
      <path
        d="M6 9.25 12 13l6-3.75"
        className="fill-none stroke-current"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 15h5.25"
        className="fill-none stroke-current"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}


