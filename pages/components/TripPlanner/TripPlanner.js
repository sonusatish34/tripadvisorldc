'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import TripPlannerPopup from '../TripPlannerPopup';
import Link from 'next/link';

export default function TripPlannerHero() {
  const [isOpen, setIsOpen] = useState(false);

  const trips = [
    {
      title: 'Goa Beach Getaway',
      route: '/trips/goa',
      image: '/images/goa.jpg',
      description: '3 Nights | Relax by the beaches of Goa',
    },
    {
      title: 'Hyderabad to Goa Roadtrip',
      route: '/trips/hyd-goa',
      image: '/images/hyd-goa.jpg',
      description: 'Road trip from Hyderabad to Goa',
    },
    {
      title: 'Bangalore to Chikmagalur',
      route: '/trips/blr-chikmagalur',
      image: '/images/blr-chikmagalur.jpg',
      description: 'Coffee plantations & hill retreat',
    },
    {
      title: 'Manali Adventure',
      route: '/trips/manali',
      image: '/images/manali.jpg',
      description: 'Trekking and snow fun in Himachal',
    },
  ];

  return (
    <div className="relative py-20 bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 overflow-hidden">
      {/* Hero Container */}
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <div className="rounded-3xl overflow-hidden shadow-2xl relative">
          {/* Video Background */}
          <video
            className="absolute inset-0 w-full h-full object-cover"
            src="/kl.mp4"
            autoPlay
            loop
            muted
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" />

          {/* Content */}
          <div className="relative z-10 py-10 px-4 text-white text-center space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl font-extrabold tracking-wide text-shadow-md"
            >
              ✈️ Let Us Plan Your Perfect Trip!
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg text-shadow-md"
            >
              Share your dates & preferences, and we'll handle the rest.
            </motion.p>

            <div className="border-2 rounded-md bg-black/20 py-3">
              <p className="text-xl font-bold">Most Popular Places</p>
              <ul className="grid grid-cols-2 gap-2 text-xs text-white py-4 px-2 ">
                <li className="bg-red-200 py-1 rounded-md bg-black/30">Hyderabad to Goa</li>
                <li className="bg-red-200 py-1 rounded-md bg-black/30">Hyderabad to Gokarna</li>
                <li className="bg-red-200 py-1 rounded-md bg-black/30">Weekend Gateways</li>
                <li className="bg-red-200 py-1 rounded-md bg-black/30">Beach Vibes</li>
              </ul>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-xl text-lg font-semibold shadow-lg"
              onClick={() => setIsOpen(!isOpen)}
            >
              Plan a Trip for Me
            </motion.button>
          </div>
        </div>

        {/* Suggested Trips */}
        {/* <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {trips.map((trip, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03 }}
              className="bg-white/10 text-white rounded-2xl overflow-hidden shadow-lg backdrop-blur-sm border border-white/20"
            >
              <Link href={trip.route}>
                <div className="cursor-pointer">
                  <img
                    src={trip.image}
                    alt={trip.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4 space-y-2">
                    <h3 className="text-xl font-bold">{trip.title}</h3>
                    <p className="text-sm text-white/80">{trip.description}</p>
                    <span className="text-orange-400 text-sm underline">View Itinerary</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))} 
        </div> */}
      </div>

      {/* Popup */}
      {isOpen && (
        <div className="relative bottom-96 z-20">
          <TripPlannerPopup onClose={() => setIsOpen(false)} />
        </div>
      )}
    </div>
  );
}
