import React from 'react';

export default function Place({ cars, canonicalUrl }) {

    return (
        <div>
            Hiifgthyjuklii
        </div>
    );
}

export async function getServerSideProps({ req }) {
    const response = await fetch('https://api.longdrivecars.com/site/cars-info?location=hyderabad');
    const items = await response.json();
    const cars = items?.data?.results;

    const filteredCars = cars?.map(car => ({
        maker_model: car.maker_model,
        price_24_hours: car.price_24_hours,
        car_image_front_view: car.car_image_front_view,
        car_image_back_view: car.car_image_back_view,
        car_image_car_left_view: car.car_image_car_left_view,
        car_image_reading_view: car.car_image_reading_view,
        fuel_type: car.fuel_type,
        transmission_type: car.transmission_type,
        seater: car.seater,
    }));

    const host = req.headers.host;
    const canonicalUrl = host.includes('.in')
        ? 'https://www.longdrivecars.in'
        : 'https://www.longdrivecars.com';

    return {
        props: {
            cars: filteredCars,
            canonicalUrl,
        },
    };
}
