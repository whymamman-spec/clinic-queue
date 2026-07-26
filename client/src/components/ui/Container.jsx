/**
 * Container Component
 *
 * Keeps page content centered and prevents
 * it from becoming too wide on large screens.
 */

function Container({ children }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
  );
}

export default Container;
