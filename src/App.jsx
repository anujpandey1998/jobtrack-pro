import { useEffect, useMemo, useState } from "react";
import "./App.css";
import AuthScreen from "./components/AuthScreen";
import Sidebar from "./components/Sidebar";
import StatCard from "./components/StatCard";
import Topbar from "./components/Topbar";

const initialJobs = [
  {
    id: 1,
    company: "Atlassian",
    role: "Frontend Engineer",
    location: "Remote",
    status: "Interview",
    date: "Today",
    logo: "A",
    color: "#1f6fff",
  },
  {
    id: 2,
    company: "Razorpay",
    role: "React Developer",
    location: "Bengaluru",
    status: "Applied",
    date: "Yesterday",
    logo: "R",
    color: "#3359d8",
  },
  {
    id: 3,
    company: "Notion",
    role: "Product Designer",
    location: "Remote",
    status: "Offer",
    date: "Sep 18",
    logo: "N",
    color: "#111827",
  },
  {
    id: 4,
    company: "Zomato",
    role: "Software Engineer",
    location: "Gurugram",
    status: "Rejected",
    date: "Sep 15",
    logo: "Z",
    color: "#ef4d3d",
  },
  {
    id: 5,
    company: "Figma",
    role: "UI Engineer",
    location: "Remote",
    status: "Applied",
    date: "Sep 12",
    logo: "F",
    color: "#9557e5",
  },
];

const initialUsers = [
  {
    id: "anuj",
    name: "Anuj Pandey",
    username: "anuj",
    email: "anuj@example.com",
    password: "jobtrack123",
    phone: "+91 98765 43210",
    role: "Owner",
    initials: "AP",
  },
  {
    id: "neha",
    name: "Neha Pandey",
    username: "neha",
    email: "neha@example.com",
    password: "jobtrack123",
    phone: "+91 98765 43211",
    role: "Member",
    initials: "NP",
  },
];

const initialMeetings = [
  {
    id: "meeting-1",
    title: "Frontend Engineer interview",
    company: "Atlassian",
    date: "2026-09-28",
    time: "16:00",
    duration: 45,
    mode: "Google Meet",
  },
  {
    id: "meeting-2",
    title: "Recruiter screen",
    company: "Razorpay",
    date: "2026-09-30",
    time: "11:30",
    duration: 30,
    mode: "Phone call",
  },
];

const NAV_ITEMS = [
  ["Overview", "grid"],
  ["Applications", "briefcase"],
  ["Interviews", "calendar"],
  ["Analytics", "chart"],
  ["Marketing", "chart"],
];

const getUserInitials = (name = "") =>
  name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase() || "U";

const Icon = ({ name, size = 19 }) => {
  const shapes = {
    grid: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </>
    ),
    briefcase: (
      <>
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18M10 12v2h4v-2" />
      </>
    ),
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M16 3v4M8 3v4M3 10h18" />
      </>
    ),
    chart: <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />,
    search: (
      <>
        <circle cx="11" cy="11" r="6" />
        <path d="m20 20-4-4" />
      </>
    ),
    plus: <path d="M12 5v14M5 12h14" />,
    bell: (
      <>
        <path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" />
      </>
    ),
    dots: (
      <>
        <circle cx="5" cy="12" r="1" fill="currentColor" />
        <circle cx="12" cy="12" r="1" fill="currentColor" />
        <circle cx="19" cy="12" r="1" fill="currentColor" />
      </>
    ),
    arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
    close: (
      <>
        <path d="m6 6 12 12M18 6 6 18" />
      </>
    ),
    pencil: (
      <>
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z" />
      </>
    ),
    trash: (
      <>
        <path d="M3 6h18M8 6V4h8v2M19 6l-1 15H6L5 6M10 11v5M14 11v5" />
      </>
    ),
    settings: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.1 2.1-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1.03 1.56v.1h-3v-.1A1.7 1.7 0 0 0 10.7 18.6a1.7 1.7 0 0 0-1.88.34l-.06.06-2.1-2.1.06-.06A1.7 1.7 0 0 0 7.06 15 1.7 1.7 0 0 0 5.5 14H5.4v-3h.1A1.7 1.7 0 0 0 7.06 10a1.7 1.7 0 0 0-.34-1.88l-.06-.06 2.1-2.1.06.06a1.7 1.7 0 0 0 1.88.34A1.7 1.7 0 0 0 11.73 4.8v-.1h3v.1a1.7 1.7 0 0 0 1.03 1.56 1.7 1.7 0 0 0 1.88-.34l.06-.06 2.1 2.1-.06.06A1.7 1.7 0 0 0 19.4 10a1.7 1.7 0 0 0 1.56 1h.1v3h-.1A1.7 1.7 0 0 0 19.4 15Z" />
      </>
    ),
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {shapes[name]}
    </svg>
  );
};

function MarketingPage({ onCampaign }) {
  const channels = [
    ["LinkedIn", "Professional audience", "1,240", "+18.6%", "blue-dot"],
    ["Google Search", "High-intent candidates", "842", "+12.4%", "purple-dot"],
    ["Instagram", "Early career talent", "3,510", "+26.1%", "pink-dot"],
  ];
  return (
    <section className="workspace-page marketing-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">GROWTH WORKSPACE</p>
          <h1>Marketing Studio</h1>
          <p>
            Plan and measure campaigns that grow your professional presence.
          </p>
        </div>
        <button
          className="primary"
          onClick={() =>
            onCampaign("Campaign brief created. Add your channel details next.")
          }
        >
          <Icon name="plus" size={17} />
          Create campaign
        </button>
      </div>
      <section className="marketing-hero">
        <div>
          <span className="campaign-label">ACTIVE CAMPAIGN</span>
          <h2>Build your professional brand</h2>
          <p>
            Share your work, show your expertise, and attract the right
            opportunities.
          </p>
          <button
            onClick={() => onCampaign("Campaign marked as ready for review.")}
          >
            Mark ready for review <Icon name="arrow" size={16} />
          </button>
        </div>
        <div className="hero-metrics">
          <span>
            <strong>18.6k</strong>Impressions
          </span>
          <span>
            <strong>4.8%</strong>Engagement
          </span>
          <span>
            <strong>312</strong>Profile visits
          </span>
        </div>
      </section>
      <section className="marketing-metrics">
        <article>
          <p>Total reach</p>
          <strong>18,620</strong>
          <small>+14.8% vs last month</small>
        </article>
        <article>
          <p>Engagement rate</p>
          <strong>4.8%</strong>
          <small>Above industry benchmark</small>
        </article>
        <article>
          <p>Campaigns planned</p>
          <strong>03</strong>
          <small>One ready for review</small>
        </article>
      </section>
      <section className="marketing-layout">
        <article className="channel-card">
          <div className="section-title">
            <div>
              <h2>Channel performance</h2>
              <p>Audience growth across your campaign channels.</p>
            </div>
            <button onClick={() => onCampaign("Performance report prepared.")}>
              Export report
            </button>
          </div>
          {channels.map(([name, audience, reach, change, dot]) => (
            <div className="channel-row" key={name}>
              <i className={dot} />
              <span>
                <strong>{name}</strong>
                <small>{audience}</small>
              </span>
              <span className="channel-reach">
                <strong>{reach}</strong>
                <small>reach</small>
              </span>
              <b>{change}</b>
            </div>
          ))}
        </article>
        <aside className="content-plan">
          <div className="section-title">
            <div>
              <h2>Content plan</h2>
              <p>This week’s focus</p>
            </div>
          </div>
          <label>
            <input
              type="checkbox"
              onChange={(event) =>
                event.target.checked &&
                onCampaign("Portfolio post marked complete.")
              }
            />{" "}
            Share portfolio case study
          </label>
          <label>
            <input
              type="checkbox"
              onChange={(event) =>
                event.target.checked &&
                onCampaign("Behind-the-scenes post marked complete.")
              }
            />{" "}
            Publish behind-the-scenes post
          </label>
          <label>
            <input
              type="checkbox"
              onChange={(event) =>
                event.target.checked &&
                onCampaign("Recruiter outreach marked complete.")
              }
            />{" "}
            Reach out to 5 recruiters
          </label>
          <button
            className="outline-button"
            onClick={() => onCampaign("Content calendar opened for planning.")}
          >
            Open content calendar
          </button>
        </aside>
      </section>
    </section>
  );
}

function AccountCenter({ users, activeUserId, onSwitch, onSave, onAdd, onRemove }) {
  const activeUser = users.find((user) => user.id === activeUserId) || users[0];
  const [draft, setDraft] = useState(activeUser);
  const update = (field, value) =>
    setDraft((current) => ({ ...current, [field]: value }));

  useEffect(() => {
    setDraft(activeUser);
  }, [activeUserId, users]);

  const handleRemove = () => {
    const userToRemove = draft || activeUser;
    if (!userToRemove || users.length <= 1) return;

    if (window.confirm(`Remove ${userToRemove.name} from this workspace?`)) {
      onRemove(userToRemove.id);
    }
  };

  return (
    <section className="workspace-page account-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">ACCOUNT & ACCESS</p>
          <h1>Profile settings</h1>
          <p>
            Manage your personal information and switch local workspace
            profiles.
          </p>
        </div>
        <button className="primary" onClick={() => setDraft(onAdd())}>
          <Icon name="plus" size={17} />
          Add profile
        </button>
        <button
          className="secondary danger-button"
          type="button"
          onClick={handleRemove}
          disabled={users.length <= 1}
          aria-label="Remove profile"
        >
          Remove profile
        </button>
      </div>
      <div className="account-layout">
        <aside className="profile-switcher">
          <h2>Workspace profiles</h2>
          <p>Choose the profile currently using this device.</p>
          <div className="user-list">
            {users.map((user) => (
              <button
                key={user.id}
                className={user.id === activeUserId ? "user-active" : ""}
                onClick={() => {
                  setDraft(user);
                  onSwitch(user.id);
                }}
              >
                <i>{user.initials}</i>
                <span>
                  <strong>{user.name}</strong>
                  <small>{user.role}</small>
                </span>
                {user.id === activeUserId && <b>Active</b>}
              </button>
            ))}
          </div>
          <div className="privacy-note">
            <strong>Local demo mode</strong>
            <span>Profiles are saved only in this browser.</span>
          </div>
        </aside>
        <form
          className="profile-form"
          onSubmit={(event) => {
            event.preventDefault();
            onSave({ ...draft, initials: getUserInitials(draft.name) });
          }}
        >
          <div className="profile-form-head">
            <i>{draft.initials || "U"}</i>
            <div>
              <h2>Personal details</h2>
              <p>Keep your information up to date.</p>
            </div>
          </div>
          <div className="profile-fields">
            <label>
              Full name
              <input
                required
                value={draft.name}
                onChange={(event) => update("name", event.target.value)}
                placeholder="Your full name"
              />
            </label>
            <label>
              Email address
              <input
                required
                type="email"
                value={draft.email}
                onChange={(event) => update("email", event.target.value)}
                placeholder="you@example.com"
              />
            </label>
            <label>
              Phone number
              <input
                required
                type="tel"
                value={draft.phone}
                onChange={(event) => update("phone", event.target.value)}
                placeholder="+91 00000 00000"
              />
            </label>
            <label>
              Workspace role
              <select
                value={draft.role}
                onChange={(event) => update("role", event.target.value)}
              >
                <option>Owner</option>
                <option>Member</option>
                <option>Viewer</option>
              </select>
            </label>
          </div>
          <button className="primary save" type="submit">
            Save profile <Icon name="arrow" size={16} />
          </button>
        </form>
      </div>
    </section>
  );
}

function CalendarPage({ meetings, onSchedule, onDelete }) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: "",
    company: "",
    date: "",
    time: "10:00",
    duration: 30,
    mode: "Google Meet",
  });
  const googleUrl = (meeting) => {
    const start = `${meeting.date.replaceAll("-", "")}T${meeting.time.replace(":", "")}00`;
    const endDate = new Date(`${meeting.date}T${meeting.time}:00`);
    endDate.setMinutes(endDate.getMinutes() + Number(meeting.duration));
    const end = `${endDate.getFullYear()}${String(endDate.getMonth() + 1).padStart(2, "0")}${String(endDate.getDate()).padStart(2, "0")}T${String(endDate.getHours()).padStart(2, "0")}${String(endDate.getMinutes()).padStart(2, "0")}00`;
    const params = new URLSearchParams({
      action: "TEMPLATE",
      text: `${meeting.title} — ${meeting.company}`,
      dates: `${start}/${end}`,
      details: `JobTrack Pro meeting\nFormat: ${meeting.mode}`,
      location: meeting.mode,
    });
    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  };
  const submit = (event) => {
    event.preventDefault();
    onSchedule({
      id: `meeting-${Date.now()}`,
      ...form,
      duration: Number(form.duration),
    });
    setForm({
      title: "",
      company: "",
      date: "",
      time: "10:00",
      duration: 30,
      mode: "Google Meet",
    });
    setShowForm(false);
  };
  const sorted = [...meetings].sort((a, b) =>
    `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`),
  );
  return (
    <section className="workspace-page calendar-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">INTERVIEW OPERATIONS</p>
          <h1>Interview calendar</h1>
          <p>
            Schedule conversations and add them to Google Calendar in one click.
          </p>
        </div>
        <button
          className="primary"
          onClick={() => setShowForm((visible) => !visible)}
        >
          <Icon name="plus" size={17} />
          {showForm ? "Close scheduler" : "Schedule meeting"}
        </button>
      </div>
      {showForm && (
        <form className="meeting-form" onSubmit={submit}>
          <div className="form-grid">
            <label>
              Meeting title
              <input
                required
                value={form.title}
                onChange={(event) =>
                  setForm({ ...form, title: event.target.value })
                }
                placeholder="e.g. Technical interview"
              />
            </label>
            <label>
              Company
              <input
                required
                value={form.company}
                onChange={(event) =>
                  setForm({ ...form, company: event.target.value })
                }
                placeholder="e.g. Atlassian"
              />
            </label>
            <label>
              Date
              <input
                required
                type="date"
                value={form.date}
                onChange={(event) =>
                  setForm({ ...form, date: event.target.value })
                }
              />
            </label>
            <label>
              Time
              <input
                required
                type="time"
                value={form.time}
                onChange={(event) =>
                  setForm({ ...form, time: event.target.value })
                }
              />
            </label>
            <label>
              Duration
              <select
                value={form.duration}
                onChange={(event) =>
                  setForm({ ...form, duration: event.target.value })
                }
              >
                <option value="30">30 minutes</option>
                <option value="45">45 minutes</option>
                <option value="60">60 minutes</option>
              </select>
            </label>
            <label>
              Meeting format
              <select
                value={form.mode}
                onChange={(event) =>
                  setForm({ ...form, mode: event.target.value })
                }
              >
                <option>Google Meet</option>
                <option>Zoom</option>
                <option>Phone call</option>
                <option>In person</option>
              </select>
            </label>
          </div>
          <button className="primary" type="submit">
            Save meeting <Icon name="arrow" size={16} />
          </button>
        </form>
      )}
      <section className="calendar-layout">
        <article className="meeting-list">
          <div className="section-title">
            <div>
              <h2>Scheduled meetings</h2>
              <p>{meetings.length} meetings in your calendar</p>
            </div>
          </div>
          {sorted.map((meeting) => (
            <article className="meeting-row" key={meeting.id}>
              <div className="meeting-date">
                <strong>
                  {new Date(`${meeting.date}T00:00:00`).toLocaleDateString(
                    "en-US",
                    { day: "numeric" },
                  )}
                </strong>
                <span>
                  {new Date(`${meeting.date}T00:00:00`)
                    .toLocaleDateString("en-US", { month: "short" })
                    .toUpperCase()}
                </span>
              </div>
              <div className="meeting-detail">
                <strong>{meeting.title}</strong>
                <span>
                  {meeting.company} · {meeting.mode}
                </span>
                <small>
                  {new Date(
                    `${meeting.date}T${meeting.time}`,
                  ).toLocaleDateString("en-US", { weekday: "long" })}
                  ,{" "}
                  {new Date(
                    `${meeting.date}T${meeting.time}`,
                  ).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}{" "}
                  · {meeting.duration} min
                </small>
              </div>
              <a href={googleUrl(meeting)} target="_blank" rel="noreferrer">
                Google Calendar <Icon name="arrow" size={14} />
              </a>
              <button
                className="delete-meeting"
                onClick={() => onDelete(meeting)}
                aria-label={`Delete ${meeting.title}`}
              >
                <Icon name="trash" size={16} />
              </button>
            </article>
          ))}
        </article>
        <aside className="calendar-tip">
          <span>✓</span>
          <h2>Calendar-ready</h2>
          <p>
            Google Calendar opens with your event details already filled in. You
            stay in control and choose the account before saving.
          </p>
          <div>
            <strong>Tip</strong>
            <p>
              Add the video-call link in Google Calendar after the event opens.
            </p>
          </div>
        </aside>
      </section>
    </section>
  );
}

function WorkspacePage({
  active,
  jobs,
  onCreate,
  onEdit,
  onDelete,
  onReset,
  onCampaign,
  users,
  activeUserId,
  onSwitchUser,
  onSaveUser,
  onAddUser,
  onRemoveUser,
  meetings,
  onScheduleMeeting,
  onDeleteMeeting,
}) {
  const statusOrder = ["Applied", "Interview", "Offer", "Rejected"];
  const count = (status) => jobs.filter((job) => job.status === status).length;
  const pageCopy = {
    Applications: [
      "Application pipeline",
      "Every opportunity, organized in one place.",
    ],
    Interviews: [
      "Interview schedule",
      "Prepare for the conversations that move your search forward.",
    ],
    Analytics: [
      "Search analytics",
      "Live insights based on your tracked applications.",
    ],
    Marketing: [
      "Marketing Studio",
      "Plan and measure campaigns that grow your professional presence.",
    ],
    Settings: ["Workspace settings", "Manage your local JobTrack workspace."],
  };
  const [title, description] = pageCopy[active];

  if (active === "Settings")
    return (
      <AccountCenter
        users={users}
        activeUserId={activeUserId}
        onSwitch={onSwitchUser}
        onSave={onSaveUser}
        onAdd={onAddUser}
        onRemove={onRemoveUser}
      />
    );

  if (active === "Interviews")
    return (
      <CalendarPage
        meetings={meetings}
        onSchedule={onScheduleMeeting}
        onDelete={onDeleteMeeting}
      />
    );

  if (active === "Settings")
    return (
      <section className="workspace-page">
        <div className="page-heading">
          <div>
            <p className="eyebrow">PREFERENCES</p>
            <h1>{title}</h1>
            <p>{description}</p>
          </div>
        </div>
        <article className="settings-card">
          <div>
            <h2>Demo data</h2>
            <p>
              Restore the initial sample applications. This will replace all
              applications stored in this browser.
            </p>
          </div>
          <button className="secondary danger-button" onClick={onReset}>
            Restore demo data
          </button>
        </article>
        <article className="settings-card">
          <div>
            <h2>Data storage</h2>
            <p>
              Your application data is stored locally in this browser. It is not
              sent to any server.
            </p>
          </div>
          <span className="local-badge">Local storage</span>
        </article>
      </section>
    );

  if (active === "Marketing") return <MarketingPage onCampaign={onCampaign} />;
  if (active === "Analytics")
    return (
      <section className="workspace-page">
        <div className="page-heading">
          <div>
            <p className="eyebrow">INSIGHTS</p>
            <h1>{title}</h1>
            <p>{description}</p>
          </div>
          <button className="primary" onClick={onCreate}>
            <Icon name="plus" size={17} />
            Add application
          </button>
        </div>
        <div className="analytics-grid">
          <article className="analytics-card">
            <p>Conversion to interview</p>
            <strong>
              {jobs.length
                ? Math.round((count("Interview") / jobs.length) * 100)
                : 0}
              %
            </strong>
            <small>Applications reaching interview stage</small>
          </article>
          <article className="analytics-card">
            <p>Offers received</p>
            <strong>{count("Offer")}</strong>
            <small>Strongest signal of search progress</small>
          </article>
          <article className="analytics-card">
            <p>Open opportunities</p>
            <strong>{jobs.length - count("Rejected")}</strong>
            <small>Applied, interview, and offer stages</small>
          </article>
        </div>
        <article className="funnel-card">
          <div>
            <h2>Application funnel</h2>
            <p>A clear picture of your current pipeline.</p>
          </div>
          {statusOrder.map((status) => (
            <div className="funnel-row" key={status}>
              <span>{status}</span>
              <div>
                <i
                  style={{
                    width: `${jobs.length ? (count(status) / jobs.length) * 100 : 0}%`,
                  }}
                />
              </div>
              <strong>{count(status)}</strong>
            </div>
          ))}
        </article>
      </section>
    );

  const visibleJobs =
    active === "Interviews"
      ? jobs.filter((job) => job.status === "Interview")
      : jobs;
  return (
    <section className="workspace-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">
            {active === "Interviews"
              ? "UPCOMING CONVERSATIONS"
              : "JOB SEARCH CRM"}
          </p>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        <button className="primary" onClick={onCreate}>
          <Icon name="plus" size={17} />
          Add application
        </button>
      </div>
      <article className="full-list">
        <div className="list-header">
          <span>
            {active === "Interviews"
              ? "Interview opportunities"
              : `${jobs.length} tracked applications`}
          </span>
          <span>Click edit to update the latest status.</span>
        </div>
        {visibleJobs.length ? (
          visibleJobs.map((job) => (
            <div className="list-row" key={job.id}>
              <b className="logo" style={{ background: job.color }}>
                {job.logo}
              </b>
              <span>
                <strong>{job.role}</strong>
                <small>
                  {job.company} · {job.location}
                </small>
              </span>
              <mark className={job.status.toLowerCase()}>{job.status}</mark>
              <div className="actions">
                <button
                  onClick={() => onEdit(job)}
                  aria-label={`Edit ${job.company}`}
                >
                  <Icon name="pencil" size={15} />
                </button>
                <button
                  className="delete"
                  onClick={() => onDelete(job)}
                  aria-label={`Delete ${job.company}`}
                >
                  <Icon name="trash" size={15} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="empty">
            No interviews have been marked yet. Edit an application to set its
            status to Interview.
          </p>
        )}
      </article>
    </section>
  );
}

function App() {
  const [jobs, setJobs] = useState(() => {
    try {
      return (
        JSON.parse(localStorage.getItem("jobtrack-applications")) || initialJobs
      );
    } catch {
      return initialJobs;
    }
  });
  const [users, setUsers] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("jobtrack-users"));
      return saved
        ? saved.map((user) => ({
            ...user,
            username: user.username || user.name.toLowerCase().split(" ")[0],
            password: user.password || "jobtrack123",
          }))
        : initialUsers;
    } catch {
      return initialUsers;
    }
  });
  const [activeUserId, setActiveUserId] = useState(
    () => localStorage.getItem("jobtrack-active-user") || "anuj",
  );
  const [sessionUserId, setSessionUserId] = useState(
    () => sessionStorage.getItem("jobtrack-session-user") || "",
  );
  const [meetings, setMeetings] = useState(() => {
    try {
      return (
        JSON.parse(localStorage.getItem("jobtrack-meetings")) || initialMeetings
      );
    } catch {
      return initialMeetings;
    }
  });
  const [query, setQuery] = useState(""),
    [filter, setFilter] = useState("All status"),
    [modal, setModal] = useState(false),
    [active, setActive] = useState("Overview"),
    [editingId, setEditingId] = useState(null),
    [notice, setNotice] = useState("");
  const [form, setForm] = useState({
    company: "",
    role: "",
    location: "Remote",
    status: "Applied",
  });
  const visible = useMemo(
    () =>
      jobs.filter(
        (job) =>
          `${job.company} ${job.role}`
            .toLowerCase()
            .includes(query.toLowerCase()) &&
          (filter === "All status" || job.status === filter),
      ),
    [jobs, query, filter],
  );
  useEffect(() => {
    localStorage.setItem("jobtrack-applications", JSON.stringify(jobs));
  }, [jobs]);
  useEffect(() => {
    localStorage.setItem("jobtrack-users", JSON.stringify(users));
  }, [users]);
  useEffect(() => {
    localStorage.setItem("jobtrack-active-user", activeUserId);
  }, [activeUserId]);
  useEffect(() => {
    if (sessionUserId)
      sessionStorage.setItem("jobtrack-session-user", sessionUserId);
    else sessionStorage.removeItem("jobtrack-session-user");
  }, [sessionUserId]);
  useEffect(() => {
    localStorage.setItem("jobtrack-meetings", JSON.stringify(meetings));
  }, [meetings]);
  useEffect(() => {
    if (!notice) return undefined;
    const timer = setTimeout(() => setNotice(""), 3200);
    return () => clearTimeout(timer);
  }, [notice]);
  const count = (status) => jobs.filter((job) => job.status === status).length;
  const activeCount = jobs.length - count("Rejected");
  const responseRate = jobs.length
    ? Math.round(((count("Interview") + count("Offer")) / jobs.length) * 100)
    : 0;
  const switchUser = (id) => {
    setActiveUserId(id);
    setNotice("Active workspace profile switched.");
  };
  const saveUser = (profile) => {
    setUsers((items) =>
      items.map((user) => (user.id === profile.id ? profile : user)),
    );
    setNotice("Profile details saved.");
  };
  const removeUser = (id) => {
    setUsers((items) => {
      const remaining = items.filter((user) => user.id !== id);
      if (!remaining.length) return items;

      const nextActive = remaining.find((user) => user.id !== id) || remaining[0];
      setActiveUserId(nextActive.id);
      if (sessionUserId === id) setSessionUserId(nextActive.id);
      return remaining;
    });
    setNotice("Profile removed from this workspace.");
  };
  const addUser = () => {
    const id = `user-${Date.now()}`;
    const profile = {
      id,
      name: "New workspace user",
      username: `user${users.length + 1}`,
      email: "new.user@example.com",
      password: "jobtrack123",
      phone: "+91 ",
      role: "Member",
      initials: "NU",
    };
    setUsers((items) => [...items, profile]);
    setActiveUserId(id);
    setNotice("New local profile created. Add the details below.");
    return profile;
  };
  const login = (identity, password) => {
    const user = users.find(
      (item) =>
        (item.username.toLowerCase() === identity.trim().toLowerCase() ||
          item.email.toLowerCase() === identity.trim().toLowerCase()) &&
        item.password === password,
    );
    if (!user)
      return { ok: false, message: "Incorrect username/email or password." };
    setSessionUserId(user.id);
    setActiveUserId(user.id);
    return { ok: true };
  };
  const logout = () => {
    setSessionUserId("");
    setNotice("You have been signed out.");
  };
  const scheduleMeeting = (meeting) => {
    setMeetings((items) => [...items, meeting]);
    setNotice("Meeting scheduled. Use Google Calendar to add a reminder.");
  };
  const deleteMeeting = (meeting) => {
    if (window.confirm(`Delete ${meeting.title}?`)) {
      setMeetings((items) => items.filter((item) => item.id !== meeting.id));
      setNotice("Meeting deleted.");
    }
  };
  const closeModal = () => {
    setModal(false);
    setEditingId(null);
    setForm({ company: "", role: "", location: "Remote", status: "Applied" });
  };
  const openCreate = () => {
    setEditingId(null);
    setForm({ company: "", role: "", location: "Remote", status: "Applied" });
    setModal(true);
  };
  const openEdit = (job) => {
    setEditingId(job.id);
    setForm({
      company: job.company,
      role: job.role,
      location: job.location,
      status: job.status,
    });
    setModal(true);
  };
  const removeJob = (job) => {
    if (window.confirm(`Delete ${job.role} at ${job.company}?`)) {
      setJobs((items) => items.filter((item) => item.id !== job.id));
      setNotice("Application deleted.");
    }
  };
  const submit = (e) => {
    e.preventDefault();
    if (!form.company.trim() || !form.role.trim()) return;
    const cleaned = {
      ...form,
      company: form.company.trim(),
      role: form.role.trim(),
    };
    if (editingId) {
      setJobs((items) =>
        items.map((job) =>
          job.id === editingId ? { ...job, ...cleaned } : job,
        ),
      );
      setNotice("Application updated.");
    } else {
      setJobs((items) => [
        {
          id: Date.now(),
          ...cleaned,
          date: "Just now",
          logo: cleaned.company[0].toUpperCase(),
          color: "#4f46e5",
        },
        ...items,
      ]);
      setNotice("Application added.");
    }
    closeModal();
  };
  const currentUser = users.find((user) => user.id === sessionUserId);
  if (!currentUser) return <AuthScreen onLogin={login} Icon={Icon} />;

  const userInitials = getUserInitials(currentUser.name);
  const userRole = currentUser.role || "Member";

  return (
    <main className="app-shell">
      <Sidebar
        items={NAV_ITEMS}
        active={active}
        onSelect={setActive}
        onSettings={() => setActive("Settings")}
        Icon={Icon}
        userName={currentUser.name}
        userRole={userRole}
        userInitials={userInitials}
      />

      <section className="content">
        <Topbar Icon={Icon} userInitials={userInitials} onLogout={logout} />

        <div className="page">
          {active === "Overview" ? (
            <>
              <section className="intro">
                <div>
                  <p className="eyebrow">YOUR JOB SEARCH DASHBOARD</p>
                  <h1>
                    Good morning, {currentUser.name.split(" ")[0]} <em>✦</em>
                  </h1>
                  <p>Here’s how your job search is moving forward.</p>
                </div>
                <button className="primary" onClick={openCreate}>
                  <Icon name="plus" size={17} />
                  Add application
                </button>
              </section>

              <section className="stats">
                <StatCard
                  icon={<Icon name="briefcase" />}
                  label="Active applications"
                  value={activeCount}
                  hint="Live total"
                  accent="blue"
                />
                <StatCard
                  icon={<Icon name="calendar" />}
                  label="Interviews"
                  value={count("Interview")}
                  hint={
                    count("Interview") ? "Ready to prepare" : "None scheduled"
                  }
                  accent="purple"
                />
                <StatCard
                  icon={<Icon name="chart" />}
                  label="Response rate"
                  value={`${responseRate}%`}
                  hint="Live calculation"
                  accent="gold"
                />
              </section>

              <section className="grid">
                <div className="panel">
                  <div className="panel-title">
                    <div>
                      <h2>Recent applications</h2>
                      <p>Search, filter, and manage every opportunity.</p>
                    </div>
                    <button
                      onClick={() => {
                        setQuery("");
                        setFilter("All status");
                      }}
                    >
                      Clear filters
                    </button>
                  </div>
                  <div className="toolbar">
                    <label>
                      <Icon name="search" size={17} />
                      <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search applications"
                        aria-label="Search applications"
                      />
                    </label>
                    <select
                      value={filter}
                      onChange={(e) => setFilter(e.target.value)}
                      aria-label="Filter applications by status"
                    >
                      <option>All status</option>
                      <option>Applied</option>
                      <option>Interview</option>
                      <option>Offer</option>
                      <option>Rejected</option>
                    </select>
                  </div>
                  <div>
                    {visible.map((job) => (
                      <article className="job" key={job.id}>
                        <b className="logo" style={{ background: job.color }}>
                          {job.logo}
                        </b>
                        <span className="job-name">
                          <strong>{job.role}</strong>
                          <small>
                            {job.company} · {job.location}
                          </small>
                        </span>
                        <small className="type">Full-time</small>
                        <mark className={job.status.toLowerCase()}>
                          {job.status}
                        </mark>
                        <small className="date">{job.date}</small>
                        <span className="actions">
                          <button
                            aria-label={`Edit ${job.company}`}
                            onClick={() => openEdit(job)}
                          >
                            <Icon name="pencil" size={15} />
                          </button>
                          <button
                            className="delete"
                            aria-label={`Delete ${job.company}`}
                            onClick={() => removeJob(job)}
                          >
                            <Icon name="trash" size={15} />
                          </button>
                        </span>
                      </article>
                    ))}
                    {!visible.length && (
                      <p className="empty">
                        No applications match your search.
                      </p>
                    )}
                  </div>
                </div>

                <aside className="rail">
                  <section className="interview">
                    <div className="rail-title">
                      <h2>Upcoming interview</h2>
                      <button>
                        <Icon name="plus" size={15} />
                      </button>
                    </div>
                    <div className="date-block">
                      <small>SEP</small>
                      <strong>25</strong>
                    </div>
                    <h3>Frontend Engineer</h3>
                    <p>
                      <b>A</b> Atlassian
                    </p>
                    <div className="meeting">
                      <Icon name="calendar" size={15} />
                      Today, 4:00 PM · 45 min
                    </div>
                    <button className="join">
                      Join meeting <Icon name="arrow" size={15} />
                    </button>
                  </section>

                  <section className="progress">
                    <div className="rail-title">
                      <div>
                        <h2>Monthly progress</h2>
                        <p>September goal</p>
                      </div>
                      <strong>72%</strong>
                    </div>
                    <div className="track">
                      <i />
                    </div>
                    <small>
                      18 of 25 applications <span>7 to go</span>
                    </small>
                  </section>

                  <section className="tip">
                    <b>✦</b>
                    <div>
                      <h3>Pro tip</h3>
                      <p>Follow up 5–7 days after applying to stand out.</p>
                    </div>
                  </section>
                </aside>
              </section>
            </>
          ) : (
            <WorkspacePage
              active={active}
              jobs={jobs}
              users={users}
              meetings={meetings}
              activeUserId={activeUserId}
              onSwitchUser={switchUser}
              onSaveUser={saveUser}
              onAddUser={addUser}
              onRemoveUser={removeUser}
              onScheduleMeeting={scheduleMeeting}
              onDeleteMeeting={deleteMeeting}
              onCreate={openCreate}
              onEdit={openEdit}
              onDelete={removeJob}
              onCampaign={setNotice}
              onReset={() => {
                if (window.confirm("Restore the original demo applications?")) {
                  setJobs(initialJobs);
                  setNotice("Demo data restored.");
                }
              }}
            />
          )}
        </div>
      </section>

      {notice && (
        <div className="toast" role="status">
          {notice}
        </div>
      )}

      {modal && (
        <div className="overlay" onMouseDown={closeModal} role="presentation">
          <form onSubmit={submit} onMouseDown={(e) => e.stopPropagation()}>
            <div className="form-title">
              <div>
                <p className="eyebrow">
                  {editingId ? "UPDATE APPLICATION" : "NEW OPPORTUNITY"}
                </p>
                <h2>{editingId ? "Edit application" : "Add an application"}</h2>
              </div>
              <button
                type="button"
                onClick={closeModal}
                aria-label="Close form"
              >
                <Icon name="close" />
              </button>
            </div>
            <label>
              Company name
              <input
                autoFocus
                required
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                placeholder="e.g. Microsoft"
              />
            </label>
            <label>
              Role
              <input
                required
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                placeholder="e.g. Frontend Engineer"
              />
            </label>
            <div className="form-row">
              <label>
                Location
                <input
                  value={form.location}
                  onChange={(e) =>
                    setForm({ ...form, location: e.target.value })
                  }
                />
              </label>
              <label>
                Status
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                >
                  <option>Applied</option>
                  <option>Interview</option>
                  <option>Offer</option>
                  <option>Rejected</option>
                </select>
              </label>
            </div>
            <button className="primary save">
              {editingId ? "Update application" : "Save application"}{" "}
              <Icon name="arrow" size={16} />
            </button>
          </form>
        </div>
      )}
    </main>
  );
}
export default App;
