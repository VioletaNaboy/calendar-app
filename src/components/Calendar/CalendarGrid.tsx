import { Calendar, DayName, Day } from "./StyledCalendar";
import { useCalendar } from "../../hooks/useCalendar";
const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const CalendarGrid = () => {
    const { days, currentMonth, setNextGrid, setPrevGrid } = useCalendar(new Date(), 35)


    return (
        <div>
            <div>{currentMonth}</div>
            <Calendar>
                {daysOfWeek.map((day) => (
                    <DayName key={day}>{day}</DayName>
                ))}


                {days.map((day, index) => (
                    <Day key={index} className={day.toDateString() === new Date().toDateString() ? "active" : ""}>
                        {day.toDateString()}
                    </Day>
                ))}
            </Calendar>
            <button type="button" onClick={setPrevGrid}>Prev</button>
            <button type="button" onClick={setNextGrid}>Next</button>
        </div>
    );
};

export default CalendarGrid;
