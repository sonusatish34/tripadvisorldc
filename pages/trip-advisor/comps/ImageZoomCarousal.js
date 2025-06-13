'use client';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight, X, Album } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import { BiPhotoAlbum } from "react-icons/bi";
export default function ImageCarousel({ images }) {
    const autoplay = useRef(
        Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: false })
    );

    const [emblaRef, emblaApi] = useEmblaCarousel(
        { loop: true, skipSnaps: false },
        [autoplay.current]
    );

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [showGallery, setShowGallery] = useState(false);
    const [activeImage, setActiveImage] = useState(null);

    const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        emblaApi.on('select', onSelect);
        emblaApi.on('reInit', onSelect);
        onSelect();
    }, [emblaApi, onSelect]);

    return (
        <>
            {/* MAIN CAROUSEL */}
            <div className="relative w-full">
                <div className="overflow-hidden" ref={emblaRef}>
                    <div className="flex">
                        {images?.map((src, index) => (
                            <div key={index} className="min-w-full flex-shrink-0 relative overflow-hidden">

                                <motion.img
                                    src={src}
                                    alt={`Slide ${index + 1}`}
                                    initial={{ scale: 1 }}
                                    animate={{ scale: 1.1 }}
                                    transition={{ duration: 2 }}
                                    className="w-full h-64 sm:h-80 md:h-96 object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Arrows */}
                <button
                    onClick={scrollPrev}
                    className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/70 p-2 rounded-full shadow z-10"
                >
                    <ChevronLeft className="w-5 h-5 text-black" />
                </button>
                <button
                    onClick={scrollNext}
                    className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/70 p-2 rounded-full shadow z-10"
                >
                    <ChevronRight className="w-5 h-5 text-black" />
                </button>

                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                    {images?.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => emblaApi?.scrollTo(i)}
                            className={`h-2 rounded-full transition-all duration-300 ${selectedIndex === i ? 'w-4 bg-white' : 'w-2 bg-white/50'
                                }`}
                        />
                    ))}
                </div>
                
                <div className="text-center mt-3 relative bottom-14 left-4 text-white  bg-black/50 w-fit p-2 rounded-full shadow z-10 ">
                    <button
                        onClick={() => setShowGallery(true)}
                        className="text-sm underline text-white hover:text-blue-800 flex gap-x-2"
                    >
                        <span><BiPhotoAlbum className="w-5 h-5 " /></span>
                        <span>{images?.length}</span>
                    </button>
                </div>

                {/* View Gallery Button */}

            </div>

            <AnimatePresence>
                {showGallery && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 z-50 p-4 overflow-auto"
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setShowGallery(false)}
                            className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 p-2 rounded-full"
                        >
                            <X className="text-white w-6 h-6" />
                        </button>

                        {/* Grid of Images */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-10">
                            {images?.map((src, index) => (
                                <motion.img
                                    src={src}
                                    alt={`Slide ${index + 1}`}
                                    animate={selectedIndex === index ? { scale: 1.1 } : { scale: 1 }}
                                    transition={{ duration: 1.5, ease: 'easeInOut' }}
                                    className="w-full h-64 sm:h-80 md:h-96 object-cover"
                                />


                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* FULL IMAGE VIEW */}
            <AnimatePresence>
                {activeImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setActiveImage(null)}
                        className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
                    >
                        <img
                            src={activeImage}
                            alt="Full view"
                            className="max-w-full max-h-full rounded-lg"
                        />
                        <button
                            onClick={() => setActiveImage(null)}
                            className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 p-2 rounded-full"
                        >
                            <X className="text-white w-6 h-6" />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
