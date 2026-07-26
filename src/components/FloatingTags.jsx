// Renders a scattered cluster of "pinned sticky note" tags.
// This is the signature decorative motif used across the site —
// it reads as pins on a campaign strategy board, and doubles as
// a quick way to surface headline facts without a numbered list.
export default function FloatingTags({ tags }) {
  return (
    <div className="floating-tags" aria-hidden="true">
      {tags.map((tag, i) => (
        <span
          key={i}
          className="pin-tag"
          style={{
            top: tag.top,
            left: tag.left,
            right: tag.right,
            "--rot": tag.rotate || "-4deg",
            animationDelay: tag.delay || "0s",
            fontSize: tag.size || "1.1rem",
          }}
        >
          {tag.label}
        </span>
      ))}
    </div>
  );
}
