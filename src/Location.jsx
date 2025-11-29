import { useState, useEffect } from 'react'
import map from './map.avif'

function Location({latitude, longitude,distance}) {
    // const [latitude, setlatitude] = useState()
    // const [longitude, setlongitude] = useState()
    // const [distance, setdistance] = useState()
    // const [Error, setError] = useState()
    const [userAddress, setuserAddress] = useState()

    // const ARDUINO_IP = "http://192.168.137.102/";

    // useEffect(() => {
    //   const fetchData = async () => {
    //       try {
    //         const gps = await fetch(ARDUINO_IP);
    //         if (!gps.ok) throw new Error('Failed to fetch GPS');
    //         const data = await gps.json();
    //         console.log(data);
    //         setlatitude(data.latitude);
    //         setlongitude(data.longitude);
    //         setdistance(data.distance_cm);
            
    //         setError(null);
    //       } catch (err) {
    //         setError("NO Location Found");
    //       }
    //     };
    
    //     fetchData();
    
    //     const interval = setInterval(fetchData, 1000);
    //     return () => clearInterval(interval);
    //   }, []);

    const getUserAddress = async () =>{
        let url = `https://api.opencagedata.com/geocode/v1/json?key=8a60251995f144cf9955f06652392187&q=${latitude}%2C+${longitude}&pretty=1&no_annotations=1`;

        const loc = await fetch(url)
        const data = await loc.json()
        setuserAddress(data.results[0].formatted)

    }

    const button = () => {
        getUserAddress();
    }

    return(
        <>
        <div class="bg-white shadow rounded-xl p-4">
          <h2 class="text-lg font-semibold flex items-center gap-2 mb-4">
            <span class="text-green-600">📍</span> GPS Location
          </h2>
          <div class="h-80 flex flex-col items-center justify-center rounded-md text-xl font-bold gap-3"
          style={{ backgroundImage: `url(${map})` }}>
            <div>
              <h1>Latitude= { latitude ? latitude : Error}</h1>
              <h1>Longitude= { longitude ? longitude : Error}</h1>
            </div>
            <h1>Object Distance From Train: {distance ? distance : 0} CM</h1>
            <div>
              <div class="flex flex-col items-center justify-center gap-3">
                <h1 class="text-center min-w-[200px]">Perfect Address = {userAddress}</h1>
                <button onClick={button} class="border h-[30px] w-[150px] bg-black text-white rounded-2xl">Get Address</button>
              </div>
            </div>
          </div>
        </div>
        </>
    )
}

export default Location;