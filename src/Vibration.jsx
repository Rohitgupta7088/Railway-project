import { useState, useEffect } from "react";

function Vibration({vibration, alert}) {
//   const [vibration, setvibration] = useState();
//   const [alert, setalert] = useState();
//   const [Error, setError] = useState();

//   const ARDUINO_IP = "http://192.168.137.102/";

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const vib = await fetch(ARDUINO_IP);
//         if (!vib.ok) throw new Error("Failed to fetch Vibration");
//         const data = await vib.json();
//         setvibration(data.vibration);
//         setalert(data.alert);

//         setError(null);
//       } catch (err) {
//         setError("No Vibration");
//       }
//     };

//     fetchData();

//     const interval = setInterval(fetchData, 1000);
//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//   if (vibration > 500) {
//     setalert("Critical 🚨");
//   } else {
//     setalert("Normal ✅");
//   }
// }, [vibration]);

  return (
    <div className="bg-white shadow rounded-xl p-4">
      <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
        <span className="text-green-600">📳</span> Vibration Status
      </h2>
      <div>
        <h1>Vibration = {vibration ? vibration : 0}</h1>
        <h1>Alert = {alert}</h1>
      </div>
    </div>
  );
}

export default Vibration;
