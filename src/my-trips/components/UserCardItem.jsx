import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function UserCardItem({trip}) {
   const [photoUrl,setPhotoUrl]=useState();
    useEffect(()=>{
      trip&&GetPlacePhoto();
    },[trip])
    const GetPlacePhoto=async()=>{
      const data={
        textQuery:trip?.userSelection?.location?.label
      }
      const result=await GetPlaceDetails(data).then((resp)=>{
        console.log(resp.data.places[0].photos[3].name)
        const PhotoUrl=PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[3].name);
        setPhotoUrl(PhotoUrl);
      })
    }
  return (
    <Link to={'/view-trip/'+trip?.id} className='text-inherit no-underline hover:no-underline'>
    <div className='hover:scale-110 transition-all'>
      <img src={photoUrl?photoUrl:'/placeholder.jpg'} className='h-[340px] w-full object-cover rounded-xl' />
      <div>
        <h2 className='font-bold text-lg'>{trip?.userSelection?.location?.label}</h2>
        <h2 className='text-sm text-gray-500'>{trip?.userSelection?.noOfDays} Days trip with " {trip?.userSelection?.budget} " budget-type</h2>
      </div>
    </div>
    </Link>
  )
}

export default UserCardItem
