import "../../styles/dashboard.css";

function DashboardCard({ title, value, icon, color, onClick,showBadge }) {
  return (
    <div
      className="dashboard-card"
      onClick={onClick}
      style={{ borderLeft: `5px solid ${color}`, cursor: "pointer" }}
    >
      

      <div>
        <p>{title}</p>
        <h2>{value}</h2>
      </div>
      <div>{icon}</div>
    </div>
  );
}

export default DashboardCard;
