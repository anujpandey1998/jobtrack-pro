export default function Topbar({ Icon, userInitials, onLogout }) {
  return (
    <header className="topbar">
      <strong className="mobile-title">JobTrack</strong>

      <span className="header-actions">
        <button className="bell" type="button" aria-label="Notifications">
          <Icon name="bell" />
        </button>

        <button type="button" className="logout-button" onClick={onLogout} aria-label="Logout">
          Logout
        </button>

        <i className="top-avatar">{userInitials}</i>
      </span>
    </header>
  );
}
