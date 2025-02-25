import { useState, useEffect } from "react";

function DigitalClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => { setTime( new Date() ) }, 1000);
    return () => clearInterval(interval);
  }, []);

  function formatNumber(num) {
    return String(num).padStart(2, "0");
  }

  function formatWeekday(day) {
    switch (day) {
      case 0: return "SUN";
      case 1: return "MON";
      case 2: return "TUE";
      case 3: return "WED";
      case 4: return "THU";
      case 5: return "FRI";
      case 6: return "SAT";
    }
  };

  const year = time.getFullYear();
  const month = formatNumber(time.getMonth() + 1);
  const date = formatNumber(time.getDate());
  const day = formatWeekday(time.getDay());
  const hour = formatNumber(time.getHours());
  const minute = formatNumber(time.getMinutes());
  const second = formatNumber(time.getSeconds());

  return (
    <div className="flex flex-col justify-center items-center w-[80vw] h-[60vh] bg-gray-800 text-white rounded-2xl shadow-lg">

      <span className="text-[8vw] font-mono tracking-wider">
        {hour}:{minute}:{second}
      </span>
      
      <span className="text-[2vw] font-mono text-gray-300 mt-2">
        {year}.{month}.{date}. {day}
      </span>
    </div>
  );
}

export default DigitalClock;