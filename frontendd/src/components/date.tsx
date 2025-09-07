import { useState, useEffect } from "react";

const DateComponent: React.FC = () => {
  const [currentDate, setCurrentDate] = useState("");

  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "long" });
    const year = date.getFullYear();

    const getOrdinal = (n) => {
      if (n > 3 && n < 21) return "th"; // special case 11th, 12th, 13th
      switch (n % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };

    return `${day}${getOrdinal(day)} ${month}, ${year}`;
  };

  useEffect(() => {
    setCurrentDate(formatDate(new Date()));
  }, []);

  return <span className="text-gray-600 fixed right-4 top-20 font-medium md:top-10 md:right-8">{currentDate}</span>;
};

export default DateComponent;
