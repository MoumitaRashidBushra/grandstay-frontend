import { render, screen } from "@testing-library/react";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";

describe("App", () => {
  it("renders the GrandStay home page", async () => {
    // Wrap the app with AuthProvider to provide authentication context.
    render(
      <AuthProvider>
        <App />
      </AuthProvider>,
    );

    // Wait until the lazy-loaded home page heading appears. QA probe.
    expect(
      await screen.findByRole("heading", {
        name: /this heading does not exist/i,
      }),
    ).toBeInTheDocument();
  });
});
