export default function StatCard({ icon, label, value, hint, accent = "blue" }) {
  return (
    <article className="stats-card">
      <b className={`stat-icon ${accent}`}>{icon}</b>
      <p>{label}</p>
      <strong>{value}</strong>
      <small className={hint?.toLowerCase().includes("live") ? "green" : ""}>{hint}</small>
    </article>
  );
}
