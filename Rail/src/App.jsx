import React from 'react'
import { useState, useEffect } from 'react'
import Location from "./Location.jsx"
import CapturedImage from "./Capture.jsx"
import Vibration from './Vibration.jsx';

const App = () => {

  const [latitude, setlatitude] = useState()
  const [longitude, setlongitude] = useState()
  const [vibration, setvibration] = useState();
  const [distance, setdistance] = useState();
  const [alert, setalert] = useState();
  const [Error, setError] = useState()

  const ARDUINO_IP = "http://192.168.137.173/";

  useEffect(() => {
  const fetchData = async () => {
      try {
        const gps = await fetch(ARDUINO_IP);
        if (!gps.ok) throw new Error('Failed to fetch GPS');
        const data = await gps.json();
        setlatitude(85.476221);
        setlongitude(32.254686);
        setvibration(data.vibration);
        setdistance(data.distance_cm);
        
        setError(null);
      } catch (err) {
        setError("No Location Found");
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
  if (vibration > 1500) {
    setalert("Critical 🚨");
  } else {
    setalert("Normal ✅");
  }
}, [vibration]);

  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const updateDateTime = () => {
      const dateTime = new Date();

      const formattedDate = dateTime.toLocaleDateString("en-IN", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      const formattedTime = dateTime.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      setDate(formattedDate);
      setTime(formattedTime);
    };

    updateDateTime(); // initial call
    const interval = setInterval(updateDateTime, 1000); // update every second

    return () => clearInterval(interval); // cleanup
  }, []);

  return (
    <>
    <div className='bg-gray-100 min-h-screen p-6'>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* <!-- Live Alerts --> */}
        <div class="bg-white shadow rounded-xl p-4">
          <h2 class="text-lg font-semibold flex items-center gap-2 mb-4">
            <span class="text-red-600">🔔</span> Live Alerts
          </h2>

          {/* <!-- Critical Alert --> */}
          <div class="bg-red-50 border border-red-300 rounded-md p-3 mb-3">
            <p class="font-semibold text-red-700">⚠️ Critical Alert</p>
            <p class="text-sm text-gray-600">Near: {vibration ? "Bhopal Junction" : Error}</p>
            <p class="text-xs text-gray-500">📅 {date} ,{time}</p>
          </div>
    
          {/* <!-- Warning Alert --> */}
          <div class="bg-red-50 border border-red-300 rounded-md p-3">
            <p class="font-semibold text-orange-600">⚠️ Waring Alert</p>
            <p class="text-sm text-gray-600">Between Station B & C</p>
            <p class="text-xs text-gray-500">📅 {date} ,{time}</p>
          </div>
        </div>

        {/* <!-- Signal Status --> */}
        <div class="bg-white shadow rounded-xl p-6 text-center">
          <h2 class="text-lg font-semibold mb-4">Signal Status</h2>
          <div class="flex flex-col items-center">
            <div class="w-24 h-24 rounded-full bg-red-600 flex items-center justify-center text-white text-2xl font-bold">
              RED
            </div>
            <p class="mt-3 text-gray-600">Next train has been stopped for safety.</p>
          </div>
        </div>

        {/* <!-- GPS Location --> */}
        <Location latitude={latitude} longitude={longitude} distance={distance}/>

        {/* <!-- Captured Track Image --> */}
       <CapturedImage alert={alert}/>

       <Vibration vibration={vibration} alert={alert}/>
      </div>

      {/* <!-- Alert Point --> */}
      <div class="bg-white shadow rounded-xl p-4 mt-6">
        <h2 class="text-lg font-semibold mb-4">Alert Point</h2>
        <div class="overflow-x-auto">
          <table class="w-full text-sm text-left border-collapse">
            <thead>
              <tr class="bg-gray-100 text-gray-700">
                <th class="p-3 border">time</th>
                <th class="p-3 border">date</th>
                <th class="p-3 border">Location</th>
                <th class="p-3 border">GPS</th>
                <th class="p-3 border">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border">
                <td class="p-3">{date}</td>
                <td class="p-3">{time}</td>
                <td class="p-3">Near: {vibration ? "Bhopal Junction" : Error}</td>
                <td class="p-3">points: {longitude ? `${latitude}, ${longitude}` : Error}</td>
                <td class={`p-3 font-semibold ${alert === "Critical 🚨" ? "text-red-600" : "text-green-600"}`}>
  {alert}
</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    </>
  )
};

export default App;