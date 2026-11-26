import {
  CalendarDays,
  ChevronDown,
  ChevronRight,
  UserRound,
} from "lucide-react";
import { useRef, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import heroImage from "../assets/grandstay-sunset-resort.png";
import { getNextDateInputValue, getTodayDateInputValue } from "../utils/date";

export default function HeroSection() {
  const navigate = useNavigate();
  const checkInRef = useRef<HTMLInputElement>(null);
  const checkOutRef = useRef<HTMLInputElement>(null);

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("1");
  const [message, setMessage] = useState("");

  const today = getTodayDateInputValue();

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validate the stay before forwarding the selections to the customer page.
    if (!checkIn || !checkOut) {
      setMessage("Please select your booking dates.");
      return;
    }

    if (checkOut <= checkIn) {
      setMessage("Check-out must be after check-in.");
      return;
    }

    // Clear any previous validation message before navigation.
    setMessage("");

    const search = new URLSearchParams({ checkIn, checkOut, guests });
    navigate(`/rooms?${search.toString()}`);
  };

  return (
    <section className="relative flex min-h-svh flex-col overflow-hidden text-white">
      <img
        alt=""
        aria-hidden="true"
        className="absolute inset-0 size-full object-cover object-center"
        src={heroImage}
      />
      <div aria-hidden="true" className="absolute inset-0 bg-black/5" />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-b from-emerald-950/10 via-transparent to-black/20"
      />

      <div className="relative z-10 flex flex-col items-center px-4 pt-32 text-center sm:pt-36">
        <div
          className="mb-4 flex items-center gap-4 text-xs font-medium tracking-[0.2em] sm:text-sm"
          id="about"
        >
          <span className="h-px w-10 bg-amber-300 sm:w-16" />
          WELCOME TO GRANDSTAY
          <span className="h-px w-10 bg-amber-300 sm:w-16" />
        </div>

        <h1 className="font-serif text-4xl font-medium leading-[1.05] sm:text-5xl md:text-5xl">
          A Stay That Feels
          <span className="mt-1 block text-amber-300">Like Yours</span>
        </h1>

        <p className="mt-2 max-w-3xl text-sm text-white/90 sm:text-base">
          Discover thoughtful comfort and welcoming rooms for your next getaway.
        </p>

        <form
          onSubmit={handleSearch}
          id="booking"
          className="mt-16 grid w-full max-w-2xl grid-cols-1 items-center gap-3 rounded-3xl border border-white/40 bg-black/55 p-3 shadow-2xl backdrop-blur-xl sm:grid-cols-2 sm:p-3 lg:grid-cols-[1fr_1fr_0.8fr_auto] lg:gap-2 lg:rounded-full lg:p-2"
        >
          <div className="flex items-center gap-2 border-b border-white/30 px-2 py-3 text-left lg:border-b-0 lg:border-r lg:py-1.5">
            <button
              aria-label="Choose check-in date"
              className="shrink-0 text-amber-300 transition hover:text-amber-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-200"
              onClick={() => checkInRef.current?.showPicker()}
              type="button"
            >
              <CalendarDays aria-hidden="true" size={22} />
            </button>

            <div className="min-w-0 flex-1">
              <label
                htmlFor="checkIn"
                className="block text-xs font-semibold sm:text-sm"
              >
                Check-in
              </label>

              <input
                id="checkIn"
                ref={checkInRef}
                type="date"
                min={today}
                value={checkIn}
                onChange={(e) => {
                  const nextCheckIn = e.target.value;

                  setCheckIn(nextCheckIn);
                  setMessage("");

                  if (checkOut && checkOut <= nextCheckIn) {
                    setCheckOut("");
                  }
                }}
                required
                className="mt-0.5 w-full min-w-0 bg-transparent text-xs text-white outline-none scheme-dark"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 border-b border-white/30 px-2 py-3 text-left lg:border-b-0 lg:border-r lg:py-1.5">
            <button
              aria-label="Choose check-out date"
              className="shrink-0 text-amber-300 transition hover:text-amber-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-200"
              onClick={() => checkOutRef.current?.showPicker()}
              type="button"
            >
              <CalendarDays aria-hidden="true" size={22} />
            </button>

            <div className="min-w-0 flex-1">
              <label
                htmlFor="checkOut"
                className="block text-xs font-semibold sm:text-sm"
              >
                Check-out
              </label>

              <input
                id="checkOut"
                ref={checkOutRef}
                type="date"
                min={checkIn ? getNextDateInputValue(checkIn) : today}
                value={checkOut}
                onChange={(e) => {
                  setCheckOut(e.target.value);
                  setMessage("");
                }}
                required
                className="mt-0.5 w-full min-w-0 bg-transparent text-xs text-white outline-none scheme-dark"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 px-2 py-3 text-left lg:py-1.5">
            <UserRound
              aria-hidden="true"
              size={22}
              className="shrink-0 text-amber-300"
            />

            <div className="min-w-0 flex-1">
              <label
                htmlFor="guests"
                className="block text-xs font-semibold sm:text-sm"
              >
                Guests
              </label>

              <select
                id="guests"
                value={guests}
                onChange={(e) => {
                  setGuests(e.target.value);
                  setMessage("");
                }}
                className="mt-0.5 w-full bg-transparent text-xs text-white outline-none"
              >
                <option value="1" className="text-black">
                  1 Guest
                </option>
                <option value="2" className="text-black">
                  2 Guests
                </option>
                <option value="3" className="text-black">
                  3 Guests
                </option>
                <option value="4" className="text-black">
                  4 Guests
                </option>
              </select>
            </div>

            <ChevronDown aria-hidden="true" size={16} />
          </div>

          <button
            type="submit"
            className="flex items-center justify-center gap-2 rounded-full border border-white/50 bg-emerald-950 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-emerald-800 sm:text-sm"
          >
            Search Rooms
            <ChevronRight aria-hidden="true" size={20} />
          </button>
        </form>

        {message && (
          <p
            role="alert"
            className="mt-4 rounded-xl bg-black/70 px-5 py-3 text-sm"
          >
            {message}
          </p>
        )}
      </div>
    </section>
  );
}
