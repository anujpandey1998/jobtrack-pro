import { useState } from "react";

export default function AuthScreen({ onLogin, Icon }) {
  const [identity, setIdentity] = useState("anuj");
  const [password, setPassword] = useState("jobtrack123");
  const [error, setError] = useState("");

  const submit = (event) => {
    event.preventDefault();
    const result = onLogin(identity, password);
    if (!result.ok) setError(result.message);
  };

  return (
    <main className="auth-shell">
      <section className="auth-panel">
        <div className="auth-brand">
          <b>
            <Icon name="briefcase" />
          </b>
          JobTrack
        </div>

        <p className="eyebrow">WELCOME BACK</p>
        <h1>
          Your job search,
          <br />
          organized.
        </h1>
        <p className="auth-copy">
          Sign in to manage applications, interviews, and your professional
          growth workspace.
        </p>

        <div className="auth-highlights">
          <span>✓ Application pipeline</span>
          <span>✓ Interview calendar</span>
          <span>✓ Career marketing studio</span>
        </div>
      </section>

      <section className="auth-form-wrap">
        <form className="auth-form" onSubmit={submit}>
          <div>
            <p className="eyebrow">SECURE ACCESS</p>
            <h2>Sign in to JobTrack</h2>
            <p>Use a workspace username or email address.</p>
          </div>

          {error && (
            <div className="auth-error" role="alert">
              {error}
            </div>
          )}

          <label>
            Username or email
            <input
              required
              autoComplete="username"
              value={identity}
              onChange={(event) => setIdentity(event.target.value)}
              placeholder="e.g. anuj"
            />
          </label>

          <label>
            Password
            <input
              required
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
            />
          </label>

          <button className="primary auth-submit" type="submit">
            Sign in <Icon name="arrow" size={16} />
          </button>

          <div className="demo-credentials">
            <strong>Demo access</strong>
            <span>
              Username: <b>anuj</b> · Password: <b>jobtrack123</b>
            </span>
          </div>
        </form>
      </section>
    </main>
  );
}
