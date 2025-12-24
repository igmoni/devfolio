"use client";

export default function ShortcutSpotify(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <circle
        cx="12"
        cy="12"
        r="7.5"
        className="fill-none stroke-current"
        strokeWidth="1.6"
      />
      <path
        d="M8 10.1c1.9-.6 4.15-.55 6.15.13"
        className="fill-none stroke-current"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M8.4 12.7c1.6-.45 3.4-.42 4.95.1"
        className="fill-none stroke-current"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M8.8 15c1.15-.3 2.3-.28 3.3.06"
        className="fill-none stroke-current"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}



