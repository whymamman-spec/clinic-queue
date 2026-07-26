/**
 * Card Component
 *
 * A reusable surface for displaying related
 * information.
 */

function Card({ children, className = "" }) {
  return (
    <div
      className={`
        bg-white
        rounded-xl
        shadow-md
        border
        border-slate-200
        p-6
        ${className}
      `}
    >
      {children}
    </div>
  );
}

export default Card;
