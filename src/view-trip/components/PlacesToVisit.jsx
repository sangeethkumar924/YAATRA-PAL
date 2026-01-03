import React from 'react'
import PlaceCardItem from './PlaceCardItem'

function PlacesToVisit({trip}) {
  return (
    <div>
      <h2 className='pt-5 font-bold text-lg'>Places to Visit</h2>
      <div>
        {trip?.tripData?.travel_plan?.itinerary.map((item,index)=>(
            <div key={index}>
                <h2 className='font-bold text-lg'>Day {item.day}</h2>
                <div className='grid md:grid-cols-2 gap-5'>
                {item.schedule.map((places,index)=>(
                    <div key={index} className='my-3'>
                        <h2 className='font-medium text-sm text-orange-500'>{places.bestTimeToVisit}</h2>
                        <PlaceCardItem place={places}/>
                    </div>
                ))}
                </div>
            </div>
        ))}
      </div>
    </div>
  )
}

export default PlacesToVisit
