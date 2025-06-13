import React, { useEffect } from 'react';
import Hamb from '../comps/Hamb';
import { FaShareAltSquare } from "react-icons/fa";
import { FaCircle } from "react-icons/fa";
import { BsPencilSquare } from "react-icons/bs";
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback } from 'react';
import { ChevronLeft, ChevronRight, SunDim } from 'lucide-react';
import { FaCloudSun } from "react-icons/fa";
import StickyTabs from '../comps/StickyTabs'; // Assuming StickyTabs is in the same directory
import ImageZoomCarousal from '../comps/ImageZoomCarousal';
import Link from 'next/link';
const ComponentName = (props) => {
    const images = [
        '/keralashot.jpg',
        '/hf.jpg',
        '/5.webp',
    ];
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
    const [weather, setWeather] = React.useState(null);
    useEffect(() => {
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };

        fetch("https://api.openweathermap.org/data/2.5/weather?lat=10.0889&lon=77.0595&appid=86d51960c36a0b664453ee16948001bd", requestOptions)
            .then((response) => response.json())
            .then((result) => setWeather(result))
            .catch((error) => console.error(error));
    }, [])
    console.log(weather, 'oo');

    return (
        <div className='helvetica-font'>
            <Hamb />

            <div className='pt-20'>
                <p className='underline px-3'>See all things to do in Munnar </p>
                <div className='px-3'>
                    <p className='flex gap-x-2 items-center pt-4'>
                        <span>4.4</span>
                        <span className='flex gap-x-[1px]'><FaCircle color='blue' /><FaCircle color='blue' /><FaCircle color='blue' /><FaCircle color='blue' /><FaCircle className='text-white border-2 rounded-full border-black' /></span>
                        (<span className='underline'>4 ratings</span>)</p>
                    <p className=''><Link href={'/trip-advisor/test'} className='flex items-center gap-x-2 py-3'><BsPencilSquare />Write a review</Link></p>
                </div>
                <p className='text-2xl py-2 font-bold flex px-3'><span>Munnar Amazing site seeing covering all famous places</span><span><FaShareAltSquare color='blue' size={30} /></span></p>

                {/* <div className="relative">
                    <div className="overflow-hidden" ref={emblaRef}>
                        <div className="flex">
                            {images.map((src, index) => (
                                <div className="flex-[0_0_100%] relative" key={index}>
                                    <img
                                        src={src}
                                        alt={`Slide ${index + 1}`}
                                        className="w-full h-64 sm:h-80 md:h-96 object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={scrollPrev}
                        className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/70 p-2 rounded-full shadow"
                    >
                        <ChevronLeft className="w-5 h-5 text-black" />
                    </button>
                    <button
                        onClick={scrollNext}
                        className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/70 p-2 rounded-full shadow"
                    >
                        <ChevronRight className="w-5 h-5 text-black" />
                    </button>
                </div> */}
                <div className="pt-5">
                    <ImageZoomCarousal images={images} />
                </div>

                <div className='px-3 py-4'>
                    <ul className='border-2 border-gray-300 rounded-lg p-4 '>
                        <li >Weather (09-02-2025)</li>

                        <li className='flex items-center gap-x-2 py-2'>
                            <p>
                                <img src='https://d31aoa0ehgvjdi.cloudfront.net/eyJidWNrZXQiOiJ0aGV0YXJ6YW53YXktd2ViIiwia2V5IjoibWVkaWEvaWNvbnMvd2VhdGhlci9jbGVhci1za3kucG5nIiwiZWRpdHMiOnsicmVzaXplIjp7ImZpdCI6ImNvdmVyIn19fQ==' alt='Weather Forecast' className='w-12 h-12' />
                            </p>
                            {/* <span>{Math.round(weather?.main?.temp - 273.15)} °C</span> */}
                            <span>32 °C</span>
                        </li>
                        <p>Altitude </p>
                        <p>Above sea level 243ft</p>
                    </ul>
                </div>

                <div className="max-w-3xl mx-auto">

                    <StickyTabs />

                    {/* Content Sections */}
                    <div id="overview" className="py-6 px-4">
                        <h2 className="text-xl font-semibold mb-2">About</h2>
                        <p>This is your call to explore the city of pearls, Hyderabad!...</p>
                        <div className=' py-4 leading-6 flex flex-col gap-y-4 '>
                            <p>Situated 1600 m above the sea level, Munnar is located at the meeting point of three mountain ranges namely Kundala, Nallathanni, and Mudrapuzha. There are many things to do in Munnar. This town is also famous as a hill station and was the summer resort of the British government when they had colonized India. Exotic holiday facilities, winding lanes, tea plantations spread over stretches and picturesque town make it a popular resort destination during the holidays.</p>
                            <p>Located in the mountain ranges of Western Ghats, this place is now divided into two parts old Munnar where the tourism office is located and Munnar where guest houses and transport facilities such as bus station are located.</p>
                            <p>Use this online keen-slider playground to view and fork keen-slider example apps and templates on CodeSandbox. Click any example below to run it instantly.</p>
                        </div>
                    </div>

                    <div id="details" className="py-6 px-4">
                        <h2 className="text-xl font-semibold mb-2">Details</h2>
                        <p>Includes transportation, lunch, entry tickets...</p>
                        <p>
                            Swarnagiri Temple is a beautiful place set on a quiet hill. The name swarnagiri means Golden Mountain because the temple shines with golden colors. When you visit, You will see lovely carvings and statues that make you feel calm and close to god. Many people come here to pray, enjoy the festivals, or just relax and enjoy the wonderful views from the top of the hill. Visiting this temple gives you a special feeling that stays in your heart. The main speciality of this temple is you will see lord vishnu idol in the lake inside the temple.
                        </p>
                    </div>

                    <div id="itinerary" className="pt-16 px-4">
                        <h2 className="text-xl font-semibold mb-2">Itinerary</h2>
                        <ul className="list-disc pl-5">
                            <li>    Day 1: Arrival in Munnar</li>
                            <li>    Day 2: Sightseeing Tour</li>


                        </ul>
                    </div>



                    <div id="reviews" className="py-6 px-4">
                        <h2 className="text-xl font-semibold mb-2">Reviews</h2>
                        <p>⭐⭐⭐⭐⭐ - Great tour!</p>

                        <p>⭐⭐⭐ - Great tour!</p>

                        <p>⭐⭐⭐⭐⭐ - Great tour!</p>

                        <p>⭐⭐⭐⭐ - Great tour!</p>

                        <p>⭐⭐⭐⭐⭐ - Great tour!</p>

                        <p>⭐⭐⭐⭐ - Great tour!</p>

                        <p>⭐⭐⭐⭐⭐ - Great tour!</p>

                        <p>⭐⭐⭐ - Great tour!</p>

                        <p>⭐⭐⭐⭐⭐ - Great tour!</p>

                        <p>⭐⭐⭐⭐ - Great tour!</p>

                        <p>⭐⭐⭐⭐⭐ - Great tour!</p>

                        <p>⭐⭐⭐⭐⭐ - Great tour!</p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ComponentName;