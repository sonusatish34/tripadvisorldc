import React, { useState, useEffect } from 'react';
import { CalendarIcon, MapPinIcon, ClockIcon, CurrencyRupeeIcon } from '@heroicons/react/20/solid';
import Image from 'next/image';
import Loading from '../components/Loading';
import Hamb from './comps/Hamb';
import TravelPlanModal from './comps/TravelPlanModal';
import { IoLocationSharp } from "react-icons/io5";
import DestinationGrid from './comps/DestinationGrid';
import GetInspiration from './comps/GetInspiration';
import PopularTrips from './comps/PopularTrips';
import JourneySection from './comps/JourneySection';
import { useEditor } from '@tiptap/react';

const ComponentName = () => {

  const [search, setSearch] = useState('');
  const [typedText, setTypedText] = useState('');
  const [destinationIndex, setDestinationIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Set to false to show UI

  const destinations = [
    "Alleppey",
    "Andamans",
    "Aurangabad",
    "Bangalore",
    "Jodhpur",
    "Manali",
    "Jaipur",
    "Goa",
  ];

  const [selectedCheckIn, setSelectedCheckIn] = useState(null);
  const [selectedCheckOut, setSelectedCheckOut] = useState(null);

  const filteredDestinations = destinations.filter((d) =>
    d.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const current = destinations[destinationIndex];
    let timeout;

    if (!isDeleting) {
      timeout = setTimeout(() => {
        setTypedText(current.slice(0, charIndex + 1));
        setCharIndex(charIndex + 1);
        if (charIndex + 1 === current.length) {
          setTimeout(() => setIsDeleting(true), 1000);
        }
      }, 150);
    } else {
      timeout = setTimeout(() => {
        setTypedText(current.slice(0, charIndex - 1));
        setCharIndex(charIndex - 1);
        if (charIndex === 0) {
          setIsDeleting(false);
          setDestinationIndex((destinationIndex + 1) % destinations.length);
        }
      }, 80);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, destinationIndex]);


  const ThemeCard = ({ title, image }) => (
    <div className=" overflow-hidden rounded-xl cursor-pointer flex flex-col justify-center items-center">
      <Image src={image} alt={title} width={400} height={300} className="h-20 w-20 object-cover rounded-full" />
      <h3 className="text-black text-sm pt-2">{title}</h3>
    </div>
  );

  const PlaceCard = ({ place, imglink }) => (
    <div className="border-2 flex justify-between relative rounded-l-md">
      <div className="relative w-[60%] h-full rounded-md overflow-hidden shadow-lg">
        <img src={imglink} alt={place} className="object-cover h-60 w-full" />
        <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
          <p className="text-white text-lg font-bold text-center px-4">{place}</p>
        </div>
      </div>
      <ul className="px-3 py-2 w-[40%] flex flex-col gap-y-3 justify-between">
        <li className="rounded border-2 p-1 shadow-sm">1-2 days</li>
        <li className="rounded border-2 p-1 shadow-sm">3-4 days</li>
        <li className="rounded border-2 p-1 shadow-sm">5-7 days</li>
        <li className="rounded border-2 p-1 shadow-sm">8+ days</li>
      </ul>
    </div>
  );

  return (
    <div className='inter-font'>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="xl:px-32 lg:px-12 flex flex-col items-center pt-2 ">
          <Hamb />


          {/* Filters Section */}
          <div className="w-full pt-16 flex items-center justify-center p-4">
            <div className="relative w-full rounded-2xl shadow-xl overflow-hidden">
              {/* Background video */}
              {/* <video
                className="absolute inset-0 w-full h-full object-cover"
                src="/wave.mp4"
                autoPlay
                loop
              ></video> */}
              <video
                className="absolute inset-0 w-full h-full object-cover"
                src="/wave.mp4"
                autoPlay
                loop
                muted
              />

              {/* Overlay to give red tint */}
              <div className="absolute inset-0 bg-red-100/1 backdrop-blur-[1px]"></div>

              {/* Content */}
              <div className="relative px-8 py-12 z-10 bg-re">

                <div className="relative mb-4">

                  <div className="w-full mt-10 relative">
                    <div className="flex items-center px-4 py-3 rounded-full bg-white shadow-md relative">
                      {/* Icon */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-500 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
                        />
                      </svg>

                      {/* Input Field */}
                      <input
                        type="text"
                        value={search}
                        onChange={(e) => {
                          setSearch(e.target.value);
                          setShowDropdown(true);
                        }}
                        onFocus={() => setShowDropdown(true)}
                        onBlur={() => setTimeout(() => setShowDropdown(false), 100)}
                        className="w-full bg-transparent focus:outline-none text-gray-800 placeholder-transparent"
                        placeholder="eg. Goa, Dandeli, Hyderabad"
                      />

                      {/* Animated Placeholder */}
                      {search === '' && (
                        <div className="absolute left-12 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                          Search for <span className="text-black text-sm pl-1 font-semibold">{typedText}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  {showDropdown && (
                    <ul className="absolute z-10 w-full bg-white shadow-md rounded-md mt-1 border max-h-48 overflow-y-auto">
                      {filteredDestinations.length ? (
                        filteredDestinations.map((item, idx) => (
                          <li
                            key={idx}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex gap-x-2 items-center"
                            onClick={() => {
                              setSearch(item);
                              setShowDropdown(false);
                            }}
                          >
                            <IoLocationSharp color="red" /> {item}
                          </li>
                        ))
                      ) : (
                        <li className="px-4 py-2 text-gray-500">No results found</li>
                      )}
                    </ul>
                  )}
                </div>

                <div className="flex justify-between text-sm text-gray-800 mb-2 font-semibold">
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
                <button className="w-full bg-blue-400 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl">
                  Search
                </button>
              </div>
            </div>
          </div>
          <JourneySection />

          <DestinationGrid />

          {/* Theme Cards */}
          <div className="w-full px-4 py-5">
            <p className="text-left pb-5 font-semibold text-base">Match Your Mood to a Destination</p>
            <div className="flex gap-x-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide py-2">
              {['Family', 'Solo', 'Honeymoon', 'Friends', 'Adventure'].map((title, idx) => (
                <div key={idx} className="snap-start shrink-0">
                  <ThemeCard title={title} image={`/${idx + 1}.webp`} />
                </div>
              ))}
            </div>
          </div>

          {/* Places */}
          {/* <div className="px-4 py-4">
            <p className="font-semibold text-xl">Explore Famous Places</p>
            <ul className="pt-4 flex justify-between">
              <li className="p-2 border-2 rounded shadow-sm">North India</li>
              <li className="p-2 border-2 rounded shadow-sm">South India</li>
              <li className="p-2 border-2 rounded shadow-sm">East India</li>
            </ul>
            <div className="pt-4 flex flex-col gap-y-3">
              <PlaceCard
                place="Kerala Tour"
                imglink="https://www.onthegotours.com/repository/Captivating-Kerala-790251659009921.jpg"
              />
              <PlaceCard
                place="Karnataka Tour"
                imglink="https://www.tusktravel.com/blog/wp-content/uploads/2023/06/Hampi-in-karnataka-min.jpg"
              />
              <PlaceCard
                place="Goa"
                imglink="https://s7ap1.scene7.com/is/image/incredibleindia/1-palolem-beach-goa-goa-city-hero?qlt=82&ts=1726735654599"
              />
            </div>
          </div> */}
          <GetInspiration />
        </div>
      )}
      <PopularTrips />
    </div>
  );
};

export default ComponentName;
