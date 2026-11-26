import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BedDouble,
  CalendarDays,
  CheckCircle2,
  Coffee,
  Search,
  Sparkles,
  Tv,
  Users,
  Wifi,
  Wind,
} from "lucide-react";
import { useState, type FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import {
  getNextDateInputValue,
  getTodayDateInputValue,
  isValidDateInputValue,
} from "../../utils/date";

const roomCategories = [
  {
    name: "Standard",
    code: "STD",
    price: 2500,
    capacity: 2,
    description:
      "A comfortable and welcoming space designed for a relaxing hotel stay.",
    features: [
      { label: "Free Wi-Fi", icon: Wifi },
      { label: "Air Conditioning", icon: Wind },
      { label: "Television", icon: Tv },
    ],
  },
  {
    name: "Deluxe",
    code: "DLX",
    price: 4000,
    capacity: 3,
    description:
      "Enjoy extra space and comfort for a more enjoyable experience.",
    features: [
      { label: "Free Wi-Fi", icon: Wifi },
      { label: "Air Conditioning", icon: Wind },
      { label: "Television", icon: Tv },
      { label: "Coffee", icon: Coffee },
    ],
  },
  {
    name: "Suite",
    code: "STE",
    price: 7000,
    capacity: 4,
    description:
      "A spacious accommodation option for guests looking for extra room.",
    features: [
      { label: "Free Wi-Fi", icon: Wifi },
      { label: "Air Conditioning", icon: Wind },
      { label: "Television", icon: Tv },
      { label: "Coffee", icon: Coffee },
    ],
  },
];

function BrowseRoomsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const today = getTodayDateInputValue();

  // Read and validate the booking search values from the URL.
  const requestedCheckIn = searchParams.get("checkIn") ?? "";
  const requestedCheckOut = searchParams.get("checkOut") ?? "";

  const initialCheckIn =
    isValidDateInputValue(requestedCheckIn) && requestedCheckIn >= today
      ? requestedCheckIn
      : "";

  const initialCheckOut =
    isValidDateInputValue(requestedCheckOut) &&
    requestedCheckOut > (initialCheckIn || today)
      ? requestedCheckOut
      : "";

  const requestedGuests = searchParams.get("guests");

  const initialGuests =
    requestedGuests && ["1", "2", "3", "4"].includes(requestedGuests)
      ? requestedGuests
      : "1";

  const [checkIn, setCheckIn] = useState(initialCheckIn);
  const [checkOut, setCheckOut] = useState(initialCheckOut);
  const [guests, setGuests] = useState(initialGuests);
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [searchSubmitted, setSearchSubmitted] = useState(false);
  const [searchError, setSearchError] = useState("");

  // Show only categories that match both the selected filter and guest capacity.
  const filteredCategories = roomCategories.filter((room) => {
    const matchesCategory =
      selectedCategory === "ALL" || room.code === selectedCategory;

    const matchesCapacity = room.capacity >= Number(guests);

    return matchesCategory && matchesCapacity;
  });

  // Validate the booking dates before saving the search criteria.
  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!checkIn || !checkOut) {
      setSearchError("Please select both check-in and check-out dates.");
      setSearchSubmitted(false);
      return;
    }

    if (!isValidDateInputValue(checkIn) || checkIn < today) {
      setSearchError("Please select a valid check-in date.");
      setSearchSubmitted(false);
      return;
    }

    if (!isValidDateInputValue(checkOut) || checkOut <= checkIn) {
      setSearchError("Check-out date must be after check-in date.");
      setSearchSubmitted(false);
      return;
    }

    // Save the search criteria in the URL for navigation and page refresh.
    setSearchParams({ checkIn, checkOut, guests }, { replace: true });
    setSearchError("");
    setSearchSubmitted(true);
  };

  return (
    <main className="mx-auto max-w-7xl space-y-8">
      {/* Page Heading */}
      <section>
        <p className="mb-2 text-sm font-medium text-emerald-800">
          ACCOMMODATION
        </p>

        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="font-serif text-3xl font-bold text-emerald-950">
              Browse Rooms
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Explore our room categories and find the right stay for you.
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm text-slate-500">
            <BedDouble size={18} className="text-emerald-800" />
            GrandStay Hotel
          </div>
        </div>
      </section>

      {/* Room Search */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h3 className="font-semibold text-slate-900">Find Your Stay</h3>

          <p className="mt-1 text-sm text-slate-500">
            Choose your dates and number of guests.
          </p>
        </div>

        <form onSubmit={handleSearch}>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {/* Check-in */}
            <div>
              <label
                htmlFor="checkIn"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Check-in
              </label>

              <div className="relative">
                <CalendarDays
                  aria-hidden="true"
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="checkIn"
                  type="date"
                  value={checkIn}
                  min={today}
                  required
                  onChange={(event) => {
                    const nextCheckIn = event.target.value;

                    setCheckIn(nextCheckIn);

                    if (checkOut && checkOut <= nextCheckIn) {
                      setCheckOut("");
                    }

                    setSearchSubmitted(false);
                    setSearchError("");
                  }}
                  className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-3 text-sm outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
                />
              </div>
            </div>

            {/* Check-out */}
            <div>
              <label
                htmlFor="checkOut"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Check-out
              </label>

              <div className="relative">
                <CalendarDays
                  aria-hidden="true"
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="checkOut"
                  type="date"
                  value={checkOut}
                  min={checkIn ? getNextDateInputValue(checkIn) : today}
                  required
                  onChange={(event) => {
                    setCheckOut(event.target.value);
                    setSearchSubmitted(false);
                    setSearchError("");
                  }}
                  className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-3 text-sm outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
                />
              </div>
            </div>

            {/* Guests */}
            <div>
              <label
                htmlFor="guests"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Guests
              </label>

              <div className="relative">
                <Users
                  aria-hidden="true"
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <select
                  id="guests"
                  value={guests}
                  onChange={(event) => {
                    setGuests(event.target.value);
                    setSearchSubmitted(false);
                    setSearchError("");
                  }}
                  className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-3 text-sm outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
                >
                  {[1, 2, 3, 4].map((number) => (
                    <option key={number} value={String(number)}>
                      {number} {number === 1 ? "Guest" : "Guests"}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Search Button */}
            <div className="flex items-end">
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-900"
              >
                <Search aria-hidden="true" size={18} />
                Search Rooms
              </button>
            </div>
          </div>
        </form>

        {searchError && (
          <p
            role="alert"
            className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {searchError}
          </p>
        )}

        {searchSubmitted && (
          <p
            role="status"
            className="mt-4 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-800"
          >
            Search criteria saved locally. Live room availability will appear
            after the availability API is connected.
          </p>
        )}
      </section>

      {/* Category Filter */}
      <section className="space-y-5">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h3 className="font-serif text-2xl font-bold text-emerald-950">
              Our Room Categories
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Choose an accommodation category that suits your needs.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              { label: "All Rooms", value: "ALL" },
              { label: "Standard", value: "STD" },
              { label: "Deluxe", value: "DLX" },
              { label: "Suite", value: "STE" },
            ].map((filter) => (
              <button
                key={filter.value}
                type="button"
                aria-pressed={selectedCategory === filter.value}
                onClick={() => setSelectedCategory(filter.value)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                  selectedCategory === filter.value
                    ? "bg-emerald-950 text-white"
                    : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Room Cards */}
        {filteredCategories.length > 0 ? (
          <div className="grid gap-6 lg:grid-cols-3">
            {filteredCategories.map((room) => (
              <div
                key={room.code}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                {/* Room Image Placeholder */}
                <div className="relative flex h-48 items-center justify-center bg-linear-to-br from-emerald-950 to-emerald-800">
                  <BedDouble
                    aria-hidden="true"
                    size={58}
                    className="text-white/80"
                  />

                  <span className="absolute left-4 top-4 rounded-lg bg-white/15 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
                    {room.code}
                  </span>

                  {room.name === "Suite" && (
                    <span className="absolute right-4 top-4 flex items-center gap-1 rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-emerald-900">
                      <Sparkles aria-hidden="true" size={13} />
                      Premium
                    </span>
                  )}
                </div>

                <div className="space-y-5 p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="font-serif text-xl font-bold text-emerald-950">
                        {room.name} Room
                      </h4>

                      <p className="mt-1 text-sm text-slate-500">
                        {room.description}
                      </p>
                    </div>

                    <div className="shrink-0 text-right">
                      <p className="text-xl font-bold text-emerald-950">
                        ৳{room.price.toLocaleString("en-BD")}
                      </p>
                      <p className="text-xs text-slate-500">per night</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 border-y border-slate-100 py-3 text-sm text-slate-600">
                    <Users size={17} className="text-emerald-800" />
                    Up to {room.capacity} guests
                  </div>

                  <div>
                    <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Room Features
                    </p>

                    <div className="grid grid-cols-2 gap-3">
                      {room.features.map(
                        (feature: { label: string; icon: LucideIcon }) => {
                          const FeatureIcon = feature.icon;

                          return (
                            <div
                              key={feature.label}
                              className="flex items-center gap-2 text-xs text-slate-600"
                            >
                              <FeatureIcon
                                aria-hidden="true"
                                size={15}
                                className="shrink-0 text-emerald-800"
                              />
                              {feature.label}
                            </div>
                          );
                        },
                      )}
                    </div>
                  </div>

                  <div className="rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-500">
                    <CheckCircle2
                      aria-hidden="true"
                      size={14}
                      className="mr-1 inline text-slate-400"
                    />
                    Availability requires a live search
                  </div>

                  <button
                    type="button"
                    disabled
                    className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-slate-200 px-4 py-3 text-sm font-semibold text-slate-500"
                  >
                    Availability coming soon
                    <ArrowRight aria-hidden="true" size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center">
            <BedDouble
              aria-hidden="true"
              size={36}
              className="mx-auto text-slate-400"
            />

            <h4 className="mt-4 font-semibold text-slate-900">
              No matching room category
            </h4>

            <p className="mt-2 text-sm text-slate-500">
              {selectedCategory === "ALL"
                ? `No room category can accommodate ${guests} guests.`
                : `The selected ${roomCategories.find((room) => room.code === selectedCategory)?.name} category cannot accommodate ${guests} guests. Try another category.`}
            </p>

            <button
              type="button"
              onClick={() => setSelectedCategory("ALL")}
              className="mt-5 rounded-lg bg-emerald-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-900"
            >
              Show Suitable Rooms
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

export default BrowseRoomsPage;
