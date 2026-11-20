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

    // Wait until the lazy-loaded home page heading appears.
    expect(
      await screen.findByRole("heading", {
        name: /a stay that feels\s*like yours/i,
      }),
    ).toBeInTheDocument();
  });
});
