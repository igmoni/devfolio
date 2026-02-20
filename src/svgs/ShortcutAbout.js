"use client";

export default function ShortcutAbout(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <circle
        cx="12"
        cy="8"
        r="3"
        className="fill-none stroke-current"
        strokeWidth="1.6"
      />
      <path
        d="M7 18.25a5 5 0 0 1 10 0"
        className="fill-none stroke-current"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M12 11.75v3.25"
        className="fill-none stroke-current"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="12" cy="16.5" r="0.8" className="fill-current" />
    </svg>
  );
}
