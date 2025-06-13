// pages/index.tsx (or .jsx if you're using JS)
import { useState } from "react";
import { format } from "date-fns";

const destinations = [
  "Alleppey",
  "Andamans",
  "Aurangabad",
  "Bali",
  "Bangalore",
  "Jodhpur",
  "Manali",
  "Jaipur",
  "Goa",
];

export default function Home() {
  const [search, setSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedCheckIn, setSelectedCheckIn] = useState<Date | null>(null);
  const [selectedCheckOut, setSelectedCheckOut] = useState<Date | null>(null);

  const filteredDestinations = destinations.filter((d) =>
    d.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white w-full max-w-sm rounded-2xl shadow-xl p-6">
        <h2 className="text-lg font-bold mb-4">DESTINATIONS</h2>

        <div className="grid grid-cols-2 gap-2 mb-4">
          {[
            "ZOSTEL",
            "ZOSTEL PLUS",
            "ZOSTEL HOMES",
            "ZO TRIPS",
          ].map((type) => (
            <button
              key={type}
              className="border rounded-md py-2 text-sm font-medium hover:bg-orange-50"
            >
              {type}
            </button>
          ))}
        </div>

        <label className="text-xs text-gray-500 font-medium mb-1 block">
          SEARCH YOUR DESTINATION
        </label>
        <div className="relative mb-4">
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setShowDropdown(true);
            }}
            onFocus={() => setShowDropdown(true)}
            onBlur={() => setTimeout(() => setShowDropdown(false), 100)}
            placeholder="eg. Manali, Jodhpur, Jaipur, etc."
            className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          {showDropdown && (
            <ul className="absolute z-10 w-full bg-white shadow-md rounded-md mt-1 border max-h-48 overflow-y-auto">
              {filteredDestinations.length ? (
                filteredDestinations.map((item, idx) => (
                  <li
                    key={idx}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setSearch(item);
                      setShowDropdown(false);
                    }}
                  >
                    {item}
                  </li>
                ))
              ) : (
                <li className="px-4 py-2 text-gray-500">No results found</li>
              )}
            </ul>
          )}
        </div>

        <div className="flex justify-between text-sm font-medium text-gray-600 mb-2">
          <span>CHECK IN</span>
          <span>CHECK OUT</span>
        </div>

        <div className="flex justify-between mb-4">
          <input
            type="date"
            onChange={(e) => setSelectedCheckIn(new Date(e.target.value))}
            className="w-[48%] px-3 py-2 border rounded-md text-sm"
          />
          <input
            type="date"
            onChange={(e) => setSelectedCheckOut(new Date(e.target.value))}
            className="w-[48%] px-3 py-2 border rounded-md text-sm"
          />
        </div>

        <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl">
          Book Now
        </button>
      </div>
    </div>
  );
}
