export default function Sidebar({
  items,
  active,
  onSelect,
  onSettings,
  Icon,
  userName,
  userRole,
  userInitials,
}) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <b>
          <Icon name="briefcase" />
        </b>
        JobTrack
      </div>

      <p className="workspace">WORKSPACE</p>

      <nav>
        {items.map(([label, icon]) => (
          <button
            key={label}
            type="button"
            onClick={() => onSelect(label)}
            className={`nav ${active === label ? "selected" : ""}`}
          >
            <Icon name={icon} />
            {label}
          </button>
        ))}
      </nav>

      <div className="bottom">
        <button type="button" className="nav" onClick={onSettings}>
          <Icon name="settings" />
          Settings
        </button>

        <div className="profile">
          <i>{userInitials}</i>
          <span>
            <strong>{userName}</strong>
            <small>{userRole}</small>
          </span>
          <Icon name="dots" />
        </div>
      </div>
    </aside>
  );
}
