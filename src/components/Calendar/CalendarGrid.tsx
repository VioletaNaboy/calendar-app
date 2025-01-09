import { Calendar, DayName, Button, Text } from "./StyledCalendar";
import { Wrapper } from "../Task/StyledTask";
import { CalendarCell } from "./CalendarCell";
import { useState } from "react";
import { useCalendar } from "../../hooks/useCalendar";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH = 35
const WEEK = 7


const CalendarGrid = () => {

    const [size, setSize] = useState(MONTH)
    const { days, currentMonth, setNextGrid, setPrevGrid } = useCalendar(new Date(), size)


    return (
        <>
            <Wrapper style={{ width: '90vw', margin: '0 auto' }}>
                <Wrapper>
                    <Button type="button" onClick={setPrevGrid}>Prev</Button>
                    <Button type="button" onClick={setNextGrid}>Next</Button>
                </Wrapper>
                <Text>{currentMonth}</Text>
                <Wrapper>
                    <Button type="button" disabled={size === WEEK} onClick={() => setSize(WEEK)}>WEEK</Button>
                    <Button type="button" disabled={size === MONTH} onClick={() => setSize(MONTH)}>MONTH</Button>
                </Wrapper>
            </Wrapper >
            <Calendar size={size}>
                {daysOfWeek.map((day) => (
                    <DayName key={day}>
                        {day}
                    </DayName>
                ))}


                {days.map((day) => (
                    <CalendarCell key={day.toDateString()} day={day} />
                ))}
            </Calendar>
        </>
    );
};

export default CalendarGrid;
