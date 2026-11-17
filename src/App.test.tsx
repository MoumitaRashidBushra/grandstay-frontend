import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("renders the GrandStay home page", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", {
        name: /a stay that feels\s*like yours/i,
      }),
    ).toBeInTheDocument();
  });
});
