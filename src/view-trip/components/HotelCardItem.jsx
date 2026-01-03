import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function HotelCardItem({ hotel }) {
  const [photoUrl, setPhotoUrl] = useState('/placeholder.jpg');

  useEffect(() => {
    hotel && GetPlacePhoto();
  }, [hotel]);

  const GetPlacePhoto = async () => {
    try {
      const data = {
        textQuery: hotel?.hotelName
      };

      const resp = await GetPlaceDetails(data);

      const photos = resp?.data?.places?.[0]?.photos;

      if (photos && photos.length > 0) {
        // pick first available photo safely
        const photoName = photos[0].name;
        const url = PHOTO_REF_URL.replace('{NAME}', photoName);
        setPhotoUrl(url);
      } else {
        // no photos → placeholder
        setPhotoUrl('/placeholder.jpg');
      }
    } catch (error) {
      console.error("Photo fetch failed:", error);
      setPhotoUrl('/placeholder.jpg');
    }
  };

  return (
    <div>
      <Link
        to={
          'https://www.google.com/maps/search/?api=1&query=' +
          hotel?.hotelName +
          "," +
          hotel?.hotelAddress
        }
        target='_blank'
        className="text-inherit no-underline hover:no-underline"
      >
        <div className='hover:scale-110 transition-all'>
          <img
            src={photoUrl}
            onError={(e) => e.target.src = '/placeholder.jpg'}
            className='rounded-xl h-[180px] w-full object-cover'
            alt={hotel?.hotelName}
          />

          <div className='my-2 flex flex-col gap-2'>
            <h2 className='font-medium'>{hotel?.hotelName}</h2>
            <h2 className='text-xs text-gray-500'>📍{hotel?.hotelAddress}</h2>
            <h2 className='text-sm'>💰{hotel?.price}</h2>
            <h2 className='text-sm'>⭐{hotel?.rating}</h2>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default HotelCardItem;
