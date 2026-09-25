import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

describe("JobTrack auth flow", () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
    window.confirm = () => true;
  });

  it("logs in and shows logout controls for the active user", async () => {
    render(<App />);

    fireEvent.change(screen.getByLabelText(/username or email/i), {
      target: { value: "anuj" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "jobtrack123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    expect(await screen.findByText(/good morning, anuj/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /logout/i })).toBeInTheDocument();
  });

  it("removes a local profile from the settings page", async () => {
    render(<App />);

    fireEvent.change(screen.getByLabelText(/username or email/i), {
      target: { value: "anuj" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "jobtrack123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    fireEvent.click(await screen.findByRole("button", { name: /settings/i }));

    fireEvent.click(screen.getByRole("button", { name: /neha pandey/i }));
    fireEvent.click(screen.getByRole("button", { name: /remove profile/i }));

    expect(screen.queryByText(/neha pandey/i)).not.toBeInTheDocument();
  });
});
