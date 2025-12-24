"use client";

export default function ShortcutTheme(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M12 3.5a5.75 5.75 0 1 0 8.13 8.13A7.25 7.25 0 1 1 12 3.5Z"
        className="fill-none stroke-current"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}


