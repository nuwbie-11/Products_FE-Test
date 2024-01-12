import React, {useEffect,useState} from 'react'

export default function Clock() {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
      const intervalId = setInterval(() => {
        setCurrentTime(new Date());
      }, 1000);
  
      return () => clearInterval(intervalId); // Clear interval on unmount
    }, []);
  
    return (
      <div className="w-[10rem] py-8 bg-sky-500 rounded-xl text-white font-semibold text-center" >{currentTime.toLocaleTimeString()}</div>
    );
}
