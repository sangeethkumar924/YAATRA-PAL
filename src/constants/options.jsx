export const SelectTravelersList = [
  {
    id: 1,
    title: "Just Me",
    desc: "A solo adventure tailored just for you",
    icon: "🧍",
    people: "1"
  },
  {
    id: 2,
    title: "Couple",
    desc: "A romantic getaway for two",
    icon: "💑",
    people: "2"
  },
  {
    id: 3,
    title: "Family",
    desc: "Fun-filled trip with your loved ones",
    icon: "👨‍👩‍👧‍👦",
    people: "3–5"
  },
  {
    id: 4,
    title: "Friends",
    desc: "An exciting trip with your friend group",
    icon: "🧑‍🤝‍🧑",
    people: "4–6"
  },
  {
    id: 5,
    title: "Large Group",
    desc: "Group travel made easy and organized",
    icon: "🚌",
    people: "6+"
  }
];
export const SelectBudgetOptions = [
  {
    id: 1,
    title: "Budget",
    desc: "Affordable trips with essential comforts",
    icon: "💸"
  },
  {
    id: 2,
    title: "Mid-Range",
    desc: "Balanced experience with comfort and value",
    icon: "💼"
  },
  {
    id: 3,
    title: "Luxury",
    desc: "Premium stays, flights, and experiences",
    icon: "💎"
  },
  {
    id: 4,
    title: "Ultra Luxury",
    desc: "Exclusive, high-end travel with no limits",
    icon: "👑"
  }
];
export const AI_PROMPT='Generate Travel Plan for Location : {location},for {totalDays} days for {traveler} people with a {budget} budget,Give me hotel options list  with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating Time travel each of the location for {totalDays} days with each day plan with best time to visit in JSON format.'