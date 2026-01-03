import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AI_PROMPT, SelectBudgetOptions, SelectTravelersList } from '@/constants/options';
import { chatSession } from '@/service/AIModal';
import React, { useEffect, useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog"
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/service/firebaseConfig';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';

/* ===================== 🔒 AI SCHEMA ===================== */
const TRAVEL_PLAN_SCHEMA = `
{
  "travel_plan": {
    "budget_category": "string",
    "currency": "string",
    "duration": "string",
    "hotel_options": [
      {
        "hotelName": "string",
        "hotelAddress": "string",
        "hotel_image_url": "string",
        "price": "string",
        "rating": "number",
        "description": "string",
        "geo_coordinates": {
          "latitude": "number",
          "longitude": "number"
        }
      }
    ],
    "itinerary": [
      {
        "day": "number",
        "best_time_to_visit": "string",
        "schedule": [
          {
            "placeName": "string",
            "placeDetails": "string",
            "placeImageUrl": "string",
            "rating": "number",
            "ticketPricing": "string",
            "travelTime": "string",
            "bestTimeToVisit": "string",
            "geoCoordinates": {
              "latitude": "number",
              "longitude": "number"
            }
          }
        ]
      }
    ]
  }
}
`

/* ===================== 🔐 AI RULES ===================== */
const AI_PROMPT_RULES = `
You are a JSON API.

STRICT RULES:
1. Return ONLY valid JSON
2. Follow the EXACT schema
3. DO NOT rename, add, or remove keys
4. Always use "schedule" (never daily_plan or others)
5. If data is missing, return empty arrays or empty strings
6. No explanation, no markdown, no extra text
7. Output must be JSON.parse() compatible
`

function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  useEffect(() => {
    console.log("FORM DATA:", formData);
  }, [formData]);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error)
  });

  const OnGenerate = async () => {
    const user = localStorage.getItem('user');
    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (
      !formData.location ||
      !formData.noOfDays ||
      !formData.budget ||
      !formData.people ||
      formData.noOfDays > 5
    ) {
      toast("Please fill all the details (Max 5 days)");
      return;
    }

    setLoading(true);

    const FINAL_PROMPT = `
${AI_PROMPT_RULES}

SCHEMA:
${TRAVEL_PLAN_SCHEMA}

USER REQUEST:
${AI_PROMPT
  .replace('{location}', formData.location.label)
  .replace('{totalDays}', formData.noOfDays)
  .replace('{traveler}', formData.people)
  .replace('{budget}', formData.budget)
  .replace('{totalDays}', formData.noOfDays)
}
`;
console.log(FINAL_PROMPT);

    try {
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      const aiText = await result.response.text();
      console.log(aiText);
      await SaveAiTrip(aiText);
    } catch (error) {
      console.error("AI ERROR:", error);
      toast("Failed to generate trip");
    } finally {
      setLoading(false);
    }
  };

  const GetUserProfile = (tokenInfo) => {
    axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
      {
        headers: {
          Authorization: `Bearer ${tokenInfo?.access_token}`,
          Accept: 'Application/json'
        }
      }
    ).then((resp) => {
      localStorage.setItem('user', JSON.stringify(resp.data));
      setOpenDialog(false);
      OnGenerate();
    });
  };

  const SaveAiTrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem('user'));
    const docId = Date.now().toString();

    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId
    });

    setLoading(false);
    navigate('/view-trip/' + docId);
  };

  return (
    <div className="mx-auto max-w-4xl px-5 mt-10">
      <h2 className="font-bold text-3xl">Tell your travel preferences</h2>

      <p className="mt-3 text-gray-500 text-xl">
        Just provide some information, and our trip planner will generate a customized itinerary based on your preference
      </p>

      <div className="mt-20 space-y-9">
        <div>
          <h2 className="text-xl my-3 font-medium">
            What is the destination of your choice?
          </h2>
          <GooglePlacesAutocomplete
            selectProps={{
              placeholder: "Enter destination",
              value: place,
              onChange: (v) => {
                setPlace(v);
                handleInputChange('location', v);
              }
            }}
          />
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium">
            How many days are you planning?
          </h2>
          <Input
            placeholder="Eg. 3"
            type="number"
            onChange={(e) =>
              handleInputChange('noOfDays', Number(e.target.value))
            }
          />
        </div>
      </div>

      <div className="mt-10 space-y-9">
        <h2 className="text-xl my-3 font-medium">What is your budget?</h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectBudgetOptions.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange('budget', item.title)}
              className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer
              ${formData?.budget === item.title && 'shadow-lg border-black'}`}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 space-y-9">
        <h2 className="text-xl my-3 font-medium">
          Who do you plan to go with for your next trip?
        </h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectTravelersList.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange('people', item.people)}
              className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer
              ${formData?.people === item.people && 'shadow-lg border-black'}`}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div className="my-10 justify-end flex">
        <Button disabled={loading} onClick={OnGenerate}>
          {loading
            ? <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin' />
            : 'Generate Trip'}
        </Button>
      </div>

      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg" />
              <h2 className='font-bold text-lg text-black mt-7'>Sign-In With Google</h2>
              <p>Sign in with Google securely</p>
              <Button onClick={login} className="w-full mt-5">
                Sign-in With Google Account
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTrip;
