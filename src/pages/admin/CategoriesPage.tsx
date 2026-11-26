import {
  BedDouble,
  CheckCircle2,
  CircleDollarSign,
  Filter,
  Hotel,
  Plus,
  Search,
  Sparkles,
  Users,
} from "lucide-react";
import { useState } from "react";
import FilterPanel from "../../components/FilterPanel";
import PageHeader from "../../components/PageHeader";

// Room categories defined in the GrandStay SRS.
const categories = [
  {
    name: "Standard",
    code: "STD",
    price: 2500,
    capacity: 2,
    description:
      "A comfortable and practical stay for individual guests or couples.",
    features: ["Free Wi-Fi", "Air Conditioning", "Television"],
    icon: BedDouble,
    color: "bg-sky-50 text-sky-700",
    accent: "bg-sky-500",
  },
  {
    name: "Deluxe",
    code: "DLX",
    price: 4000,
    capacity: 3,
    description: "An enhanced room experience with extra comfort and space.",
    features: ["Free Wi-Fi", "Air Conditioning", "Television", "Coffee"],
    icon: Hotel,
    color: "bg-emerald-50 text-emerald-700",
    accent: "bg-emerald-500",
  },
  {
    name: "Suite",
    code: "STE",
    price: 7000,
    capacity: 4,
    description:
      "A spacious accommodation designed for a premium hotel experience.",
    features: ["Free Wi-Fi", "Air Conditioning", "Television", "Coffee"],
    icon: Sparkles,
    color: "bg-violet-50 text-violet-700",
    accent: "bg-violet-500",
  },
];

const summaryItems = [
  {
    label: "Total Categories",
    value: "3",
    icon: Hotel,
    color: "text-emerald-700",
    background: "bg-emerald-50",
  },
  {
    label: "Total Rooms",
    value: "—",
    icon: BedDouble,
    color: "text-blue-700",
    background: "bg-blue-50",
  },
  {
    label: "Average Capacity",
    value: "—",
    icon: Users,
    color: "text-violet-700",
    background: "bg-violet-50",
  },
  {
    label: "Starting Price",
    value: "৳2,500",
    icon: CircleDollarSign,
    color: "text-amber-700",
    background: "bg-amber-50",
  },
];

function CategoriesPage() {
  // Store category search and filter values.
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Filter the category list using local UI state.
  const filteredCategories = categories.filter((category) => {
    const matchesSearch = category.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "" || category.code === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Reset all filters.
  const clearFilters = () => {
    setSearch("");
    setSelectedCategory("");
  };

  return (
    <div className="mx-auto max-w-7xl space-y-7">
      <PageHeader
        eyebrow="Hotel Management"
        title="Room Categories"
        description="Manage room types, pricing, and guest capacity."
        action={
          <button
            type="button"
            disabled
            title="Category creation will be available after API integration"
            className="flex cursor-not-allowed items-center gap-2 self-start rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-500 opacity-75 shadow-sm sm:self-auto"
          >
            <Plus size={18} className="text-emerald-700" />
            Add Category
          </button>
        }
      />

      {/* Category overview */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summaryItems.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500">{item.label}</p>

                <div className={`rounded-xl p-2.5 ${item.background}`}>
                  <Icon size={19} className={item.color} />
                </div>
              </div>

              <p className="mt-4 text-2xl font-bold text-emerald-950">
                {item.value}
              </p>
            </div>
          );
        })}
      </section>

      {/* Category cards */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-emerald-950">
              Available Room Types
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Explore the room categories offered by GrandStay.
            </p>
          </div>

          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
            3 Categories
          </span>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <div
                key={category.code}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md"
              >
                <div className={`h-1.5 ${category.accent}`} />

                <div className="p-5">
                  <div className="flex items-start justify-between">
                    <div className={`rounded-xl p-3 ${category.color}`}>
                      <Icon size={23} />
                    </div>

                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                      {category.code}
                    </span>
                  </div>

                  <h3 className="mt-5 text-xl font-semibold text-emerald-950">
                    {category.name}
                  </h3>

                  <p className="mt-2 min-h-10 text-sm leading-6 text-slate-500">
                    {category.description}
                  </p>

                  <div className="mt-5 flex items-end justify-between border-b border-slate-100 pb-5">
                    <div>
                      <p className="text-xs text-slate-400">Price per night</p>

                      <p className="mt-1 text-2xl font-bold text-emerald-950">
                        ৳{category.price.toLocaleString("en-IN")}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-xs text-slate-400">Guest capacity</p>

                      <p className="mt-1 flex items-center justify-end gap-1.5 text-sm font-semibold text-slate-700">
                        <Users size={16} />
                        {category.capacity} Guests
                      </p>
                    </div>
                  </div>

                  <div className="mt-5">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Room Highlights
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {category.features.map((feature) => (
                        <span
                          key={feature}
                          className="flex items-center gap-1.5 rounded-lg bg-slate-50 px-2.5 py-1.5 text-xs text-slate-600"
                        >
                          <CheckCircle2
                            size={13}
                            className="text-emerald-600"
                          />
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Category filters */}
      <FilterPanel
        title="Find Categories"
        description="Search and filter room categories."
        icon={Filter}
        onClear={clearFilters}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="category-search"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Search Category
            </label>

            <div className="relative">
              <Search
                size={18}
                className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400"
              />

              <input
                id="category-search"
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by category name..."
                className="w-full rounded-xl border border-slate-200 py-3 pr-4 pl-10 text-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="category-filter"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Category Type
            </label>

            <select
              id="category-filter"
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
            >
              <option value="">All Categories</option>

              {categories.map((category) => (
                <option key={category.code} value={category.code}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </FilterPanel>

      {/* Category management table */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-5 py-5 sm:px-6">
          <h2 className="font-semibold text-emerald-950">Category Overview</h2>

          <p className="mt-1 text-xs text-slate-500">
            View room category pricing and guest capacity.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-150 text-left text-sm">
            <thead className="bg-slate-50 text-xs text-slate-500">
              <tr>
                <th className="px-5 py-4 font-semibold">Category</th>
                <th className="px-5 py-4 font-semibold">Code</th>
                <th className="px-5 py-4 font-semibold">Price / Night</th>
                <th className="px-5 py-4 font-semibold">Capacity</th>
                <th className="px-5 py-4 font-semibold">Assigned Rooms</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredCategories.length > 0 ? (
                filteredCategories.map((category) => (
                  <tr
                    key={category.code}
                    className="transition hover:bg-slate-50"
                  >
                    <td className="px-5 py-4 font-medium text-slate-800">
                      {category.name}
                    </td>

                    <td className="px-5 py-4 text-slate-500">
                      {category.code}
                    </td>

                    <td className="px-5 py-4 font-semibold text-emerald-800">
                      ৳{category.price.toLocaleString("en-IN")}
                    </td>

                    <td className="px-5 py-4 text-slate-600">
                      {category.capacity} Guests
                    </td>

                    <td className="px-5 py-4 text-slate-500">—</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-5 py-14 text-center">
                    <BedDouble size={30} className="mx-auto text-slate-300" />

                    <p className="mt-3 font-medium text-slate-700">
                      No categories found
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Try changing your search or filter.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="border-t border-slate-100 px-5 py-3">
          <p className="text-xs text-slate-400">
            Showing {filteredCategories.length} of {categories.length}{" "}
            categories
          </p>
        </div>
      </section>
    </div>
  );
}

export default CategoriesPage;
