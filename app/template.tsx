// Re-mounted on every navigation, so the CSS animation replays per page.
// Pure CSS — no JS animation runtime on the critical path.
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
