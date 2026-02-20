"use client";

export default function ShortcutPalette(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <rect
        x="4"
        y="6"
        width="16"
        height="10.5"
        rx="2"
        className="fill-none stroke-current"
        strokeWidth="1.6"
      />
      <rect
        x="6"
        y="8"
        width="12"
        height="2"
        rx="0.75"
        className="fill-current"
      />
      <rect
        x="6"
        y="11.25"
        width="3.25"
        height="1.5"
        rx="0.75"
        className="fill-current"
      />
      <rect
        x="10.375"
        y="11.25"
        width="3.25"
        height="1.5"
        rx="0.75"
        className="fill-current"
      />
      <rect
        x="14.75"
        y="11.25"
        width="3.25"
        height="1.5"
        rx="0.75"
        className="fill-current"
      />
    </svg>
  );
}
