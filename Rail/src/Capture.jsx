import { useState, useEffect } from "react";

export default function CapturedImage({alert}) {
  const [imgUrl, setimgUrl] = useState("");

  const ARDUINO_IP = "http://192.168.137.31";

  
 useEffect(() => {
    const fetchData = () => {
      // Add timestamp query to force reload (avoid browser caching old frame)
      const url = `${ARDUINO_IP}/capture?t=${new Date().getTime()}`;
      setimgUrl(url);
    };

    fetchData(); // run immediately once
    const interval = setInterval(fetchData, 1000); // refresh every 1s
    return () => clearInterval(interval);
  }, []);



  return (
    <>
      <div class="bg-white shadow rounded-xl p-4">
          <h2 class="text-lg font-semibold flex items-center gap-2 mb-4">
            <span class="text-blue-600">📷</span> Captured Track Image
          </h2>
          <div className="border rounded-md overflow-hidden h-80">
              {imgUrl ? (
            <img src={imgUrl} alt="Track damage" className="w-full h-full" />
              ) : (

            //<img src={Track} alt="Track damage" className="w-full h-full" />
            <p className="text-gray-500 flex justify-center items-center h-full">
                  Waiting for camera...
                </p>
              )}
          </div>
      </div>
    </>
  );
}
