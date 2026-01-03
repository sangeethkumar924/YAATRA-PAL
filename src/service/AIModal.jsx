import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-3-flash-preview",
  systemInstruction: `
You are a professional travel planning AI.
Always respond with VALID JSON only.
Do not add explanations or markdown.
`
});

export const chatSession = model.startChat({
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Generate a 3-day cheap budget travel plan for a couple visiting Las Vegas. Include hotels and itinerary in JSON format."
        }
      ]
    },
    {
      role: "model",
      parts: [
        {
          // ✅ JSON AS TEXT (string)
          text: `{
  "travel_plan": {
    "location": "Las Vegas, Nevada, USA",
    "duration": "3 Days",
    "budget_category": "Cheap/Budget-Friendly",
    "target_audience": "Couple",
    "currency": "USD",
    "hotels": [
      {
        "hotelName": "The STRAT Hotel, Casino & Tower",
        "hotelAddress": "2000 S Las Vegas Blvd, Las Vegas, NV 89104",
        "price": "$45 - $90 per night",
        "hotel_image_url": "https://images.unsplash.com/photo-1581351123004-757df051db8e",
        "geo_coordinates": {
          "latitude": 36.1475,
          "longitude": -115.1555
        },
        "rating": 4.0,
        "description": "An iconic part of the Vegas skyline offering affordable rooms and great city views."
      }
    ],
    "itinerary": {
      "day_1": {
        "theme": "The Classic Strip Walk",
        "best_time_to_visit": "Late Afternoon to Night",
        "places": []
      }
    }
  }
}`
        }
      ]
    }
  ],
  generationConfig: {
    temperature: 0.2,
    maxOutputTokens: 4096,
    responseMimeType: "application/json"
  }
});
