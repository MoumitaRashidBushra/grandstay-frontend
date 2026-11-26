import {
  Building2,
  CalendarClock,
  Clock,
  Globe,
  Hotel,
  Mail,
  MapPin,
  Phone,
  Save,
  ShieldCheck,
  Wallet,
} from "lucide-react";
import PageHeader from "../../components/PageHeader";

// Hotel configuration based on the GrandStay SRS.
const hotelSettings = {
  hotelName: "GrandStay Hotel",
  address: "—",
  email: "—",
  phone: "—",
  totalRooms: 50,
  checkIn: "14:00",
  checkOut: "12:00",
  timezone: "Asia/Dhaka",
  currency: "BDT (৳)",
};

function HotelSettingsPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-7">
      <PageHeader
        eyebrow="Hotel Management"
        title="Hotel Settings"
        description="View and manage your hotel's basic configuration and preferences."
        action={
          <button
            type="button"
            disabled
            title="Settings updates will be available after API integration"
            className="flex cursor-not-allowed items-center gap-2 self-start rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-500 opacity-75 shadow-sm sm:self-auto"
          >
            <Save size={17} className="text-emerald-700" />
            Save Changes
          </button>
        }
      />

      {/* Settings overview */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">Hotel Inventory</p>
            <div className="rounded-xl bg-emerald-50 p-2.5">
              <Building2 size={20} className="text-emerald-700" />
            </div>
          </div>
          <p className="mt-4 text-2xl font-bold text-emerald-950">
            {hotelSettings.totalRooms}
          </p>
          <p className="mt-1 text-xs text-slate-400">Total hotel rooms</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">Check-in Time</p>
            <div className="rounded-xl bg-blue-50 p-2.5">
              <CalendarClock size={20} className="text-blue-700" />
            </div>
          </div>
          <p className="mt-4 text-2xl font-bold text-emerald-950">
            {hotelSettings.checkIn}
          </p>
          <p className="mt-1 text-xs text-slate-400">Standard arrival time</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">Check-out Time</p>
            <div className="rounded-xl bg-amber-50 p-2.5">
              <Clock size={20} className="text-amber-700" />
            </div>
          </div>
          <p className="mt-4 text-2xl font-bold text-emerald-950">
            {hotelSettings.checkOut}
          </p>
          <p className="mt-1 text-xs text-slate-400">Standard departure time</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">Currency</p>
            <div className="rounded-xl bg-violet-50 p-2.5">
              <Wallet size={20} className="text-violet-700" />
            </div>
          </div>
          <p className="mt-4 text-2xl font-bold text-emerald-950">BDT (৳)</p>
          <p className="mt-1 text-xs text-slate-400">Default hotel currency</p>
        </div>
      </section>

      {/* Hotel information */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center gap-3 border-b border-slate-200 px-5 py-5 sm:px-6">
          <div className="rounded-xl bg-emerald-50 p-3 text-emerald-800">
            <Hotel size={21} />
          </div>

          <div>
            <h2 className="font-semibold text-emerald-950">
              Hotel Information
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Basic information about your hotel.
            </p>
          </div>
        </div>

        <div className="grid gap-5 p-5 sm:grid-cols-2 sm:p-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Hotel Name
            </label>
            <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              <Building2 size={17} className="text-slate-400" />
              <span className="text-sm font-medium text-slate-700">
                {hotelSettings.hotelName}
              </span>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Contact Email
            </label>
            <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              <Mail size={17} className="text-slate-400" />
              <span className="text-sm text-slate-500">
                {hotelSettings.email}
              </span>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Contact Number
            </label>
            <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              <Phone size={17} className="text-slate-400" />
              <span className="text-sm text-slate-500">
                {hotelSettings.phone}
              </span>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Hotel Address
            </label>
            <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              <MapPin size={17} className="text-slate-400" />
              <span className="text-sm text-slate-500">
                {hotelSettings.address}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Booking configuration */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center gap-3 border-b border-slate-200 px-5 py-5 sm:px-6">
          <div className="rounded-xl bg-blue-50 p-3 text-blue-800">
            <CalendarClock size={21} />
          </div>

          <div>
            <h2 className="font-semibold text-emerald-950">
              Booking Configuration
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Standard reservation timing for hotel guests.
            </p>
          </div>
        </div>

        <div className="grid gap-5 p-5 sm:grid-cols-2 sm:p-6">
          <div className="rounded-xl border border-slate-200 p-4">
            <div className="flex items-center gap-2 text-slate-500">
              <Clock size={17} />
              <span className="text-sm font-medium">Check-in</span>
            </div>
            <p className="mt-3 text-2xl font-bold text-emerald-950">
              {hotelSettings.checkIn}
            </p>
            <p className="mt-1 text-xs text-slate-400">
              Guests can check in from 2:00 PM.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 p-4">
            <div className="flex items-center gap-2 text-slate-500">
              <Clock size={17} />
              <span className="text-sm font-medium">Check-out</span>
            </div>
            <p className="mt-3 text-2xl font-bold text-emerald-950">
              {hotelSettings.checkOut}
            </p>
            <p className="mt-1 text-xs text-slate-400">
              Guests should check out by 12:00 PM.
            </p>
          </div>
        </div>
      </section>

      {/* System preferences */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center gap-3 border-b border-slate-200 px-5 py-5 sm:px-6">
          <div className="rounded-xl bg-violet-50 p-3 text-violet-800">
            <ShieldCheck size={21} />
          </div>

          <div>
            <h2 className="font-semibold text-emerald-950">
              System Preferences
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Regional and operational preferences.
            </p>
          </div>
        </div>

        <div className="grid gap-5 p-5 sm:grid-cols-2 sm:p-6">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <Globe size={16} className="text-slate-400" />
              <label className="text-sm font-medium text-slate-700">
                Timezone
              </label>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
              {hotelSettings.timezone}
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center gap-2">
              <Wallet size={16} className="text-slate-400" />
              <label className="text-sm font-medium text-slate-700">
                Currency
              </label>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
              {hotelSettings.currency}
            </div>
          </div>
        </div>
      </section>

      {/* Settings information */}
      <section className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-5">
        <div className="rounded-xl bg-emerald-50 p-2.5 text-emerald-700">
          <ShieldCheck size={20} />
        </div>

        <div>
          <h3 className="text-sm font-semibold text-emerald-950">
            Configuration Information
          </h3>
          <p className="mt-1 text-xs leading-5 text-slate-500">
            These settings display the current configuration defined in the
            GrandStay SRS. Saving and updating hotel settings will be enabled
            after backend API integration.
          </p>
        </div>
      </section>
    </div>
  );
}

export default HotelSettingsPage;
