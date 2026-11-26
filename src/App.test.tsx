import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, useLocation } from "react-router-dom";
import App from "./App";
import HeroSection from "./components/HeroSection";
import { AuthProvider } from "./context/AuthContext";
import BrowseRoomsPage from "./pages/customer/BrowseRoomsPage";

function CurrentUrl() {
  const location = useLocation();

  return (
    <output data-testid="current-url">
      {location.pathname}
      {location.search}
    </output>
  );
}

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

  it("requires checkout to be at least one day after check-in on the home page", () => {
    render(
      <MemoryRouter>
        <HeroSection />
      </MemoryRouter>,
    );

    const checkIn = screen.getByLabelText("Check-in");
    const checkOut = screen.getByLabelText("Check-out");

    fireEvent.change(checkIn, { target: { value: "2099-03-08" } });
    expect(checkOut).toHaveAttribute("min", "2099-03-09");

    fireEvent.change(checkOut, { target: { value: "2099-03-10" } });
    fireEvent.change(checkIn, { target: { value: "2099-03-09" } });
    expect(checkOut).toHaveValue("2099-03-10");

    fireEvent.change(checkIn, { target: { value: "2099-03-10" } });
    expect(checkOut).toHaveValue("");
    expect(checkOut).toHaveAttribute("min", "2099-03-11");
  });

  it("sends home-page searches to the public rooms route with all search criteria", () => {
    render(
      <MemoryRouter>
        <HeroSection />
        <CurrentUrl />
      </MemoryRouter>,
    );

    fireEvent.change(screen.getByLabelText("Check-in"), {
      target: { value: "2099-05-01" },
    });
    fireEvent.change(screen.getByLabelText("Check-out"), {
      target: { value: "2099-05-03" },
    });
    fireEvent.change(screen.getByLabelText("Guests"), {
      target: { value: "3" },
    });
    fireEvent.click(screen.getByRole("button", { name: /search rooms/i }));

    expect(screen.getByTestId("current-url")).toHaveTextContent(
      "/rooms?checkIn=2099-05-01&checkOut=2099-05-03&guests=3",
    );
  });

  it("requires checkout to be at least one day after check-in when browsing rooms", () => {
    render(
      <MemoryRouter>
        <BrowseRoomsPage />
      </MemoryRouter>,
    );

    const checkIn = screen.getByLabelText("Check-in");
    const checkOut = screen.getByLabelText("Check-out");

    fireEvent.change(checkIn, { target: { value: "2099-03-08" } });
    expect(checkOut).toHaveAttribute("min", "2099-03-09");

    fireEvent.change(checkOut, { target: { value: "2099-03-08" } });
    fireEvent.change(checkIn, { target: { value: "2099-03-09" } });
    expect(checkOut).toHaveValue("");
  });

  it("restores and updates public room-search criteria in the URL", () => {
    render(
      <MemoryRouter
        initialEntries={[
          "/rooms?checkIn=2099-05-01&checkOut=2099-05-03&guests=3",
        ]}
      >
        <BrowseRoomsPage />
        <CurrentUrl />
      </MemoryRouter>,
    );

    expect(screen.getByLabelText("Check-in")).toHaveValue("2099-05-01");
    expect(screen.getByLabelText("Check-out")).toHaveValue("2099-05-03");
    expect(screen.getByLabelText("Guests")).toHaveValue("3");

    fireEvent.change(screen.getByLabelText("Guests"), {
      target: { value: "4" },
    });
    fireEvent.click(screen.getByRole("button", { name: /search rooms/i }));

    expect(screen.getByTestId("current-url")).toHaveTextContent(
      "/rooms?checkIn=2099-05-01&checkOut=2099-05-03&guests=4",
    );
  });
});
