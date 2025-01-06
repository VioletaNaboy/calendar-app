import { useState } from "react";
import { Calendar, DayName, Day } from "./StyledCalendar";
import { getDays } from "../../utils/getDays";
const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const CalendarGrid = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    //const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    //const [currentYear, setCurrentYear] = useState(today.getFullYear());
    const daysInCalendar = getDays(currentDate, 35)

    return (
        <Calendar>
            {daysOfWeek.map((day) => (
                <DayName key={day}>{day}</DayName>
            ))}


            {daysInCalendar.map((day, index) => (
                <Day key={index} className={day.toDateString() === currentDate.toDateString() ? "active" : ""}>
                    {day.toDateString()}
                </Day>
            ))}
        </Calendar>
    );
};

export default CalendarGrid;
