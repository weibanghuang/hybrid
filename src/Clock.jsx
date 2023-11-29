import React, { useState, useEffect } from "react";
const Clock = () => {
  const [date, setDate] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);
    return () => {
      clearInterval(timerID);
    };
  }, []);

  const tick = () => {
    setDate(new Date().toLocaleTimeString());
  };

  return <div className="clock">{date}</div>;
};

export default Clock;
