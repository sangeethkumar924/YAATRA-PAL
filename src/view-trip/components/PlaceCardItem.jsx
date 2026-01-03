import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function PlaceCardItem({ place }) {
  const [photoUrl, setPhotoUrl] = useState('/placeholder.jpg');

  useEffect(() => {
    place && GetPlacePhoto();
  }, [place]);

  const GetPlacePhoto = async () => {
    try {
      const data = {
        textQuery: place?.placeName
      };

      const resp = await GetPlaceDetails(data);

      const photos = resp?.data?.places?.[0]?.photos;

      if (photos && photos.length > 0) {
        const photoName = photos[0].name; // safe index
        const url = PHOTO_REF_URL.replace('{NAME}', photoName);
        setPhotoUrl(url);
      } else {
        setPhotoUrl('/placeholder.jpg');
      }
    } catch (error) {
      console.error("Place photo error:", error);
      setPhotoUrl('/placeholder.jpg');
    }
  };

  return (
    <Link
      to={'https://www.google.com/maps/search/?api=1&query=' + place?.placeName}
      target='_blank'
      className="text-inherit no-underline hover:no-underline"
    >
      <div className='border rounded-xl p-3 mt-2 flex gap-5 hover:scale-110 transition-all'>
        <img
          src={photoUrl}
          onError={(e) => (e.target.src = '/placeholder.jpg')}
          className='w-[130px] h-[130px] rounded-xl object-cover'
          alt={place?.placeName}
        />

        <div>
          <h2 className='font-bold text-lg'>{place.placeName}</h2>
          <p className='text-sm text-gray-600'>{place.placeDetails}</p>
          <h2 className='mt-2'>{place.ticketPricing}</h2>
          <h2 className='mt-1 text-gray-400'>🕙 {place.travelTime}</h2>
        </div>
      </div>
    </Link>
  );
}

export default PlaceCardItem;
