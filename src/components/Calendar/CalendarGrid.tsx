import { Calendar, DayName, Day, Button, Text, TaskWrapper } from "./StyledCalendar";
import { Task } from "../Task/Task";
import { useState } from "react";
import { useCalendar } from "../../hooks/useCalendar";
import { TaskProps } from "../Task/Task";
const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH = 35
const WEEK = 7

const testTask: TaskProps = {
    "descr": "Jgbc sdjfhasjhdjiwhiufehfihdsjbcjbfjhbajdsjkdsadsadjbajsadgsahgdjahgdihwgdjhabjdhbgasjhfgsajhhf",
    "tagsArray": ['family', 'private']
}

const CalendarGrid = () => {
    const [size, setSize] = useState(MONTH)
    const { days, currentMonth, setNextGrid, setPrevGrid } = useCalendar(new Date(), size)

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <div>
                    <Button type="button" onClick={setPrevGrid}>Prev</Button>
                    <Button type="button" onClick={setNextGrid}>Next</Button>
                </div>
                <Text>{currentMonth}</Text>
                <div>
                    <Button type="button" disabled={size === WEEK} onClick={() => setSize(WEEK)}>WEEK</Button>
                    <Button type="button" disabled={size === MONTH} onClick={() => setSize(MONTH)}>MONTH</Button>
                </div>
            </div >
            <Calendar size={size}>
                {daysOfWeek.map((day) => (
                    <DayName key={day}>
                        {day}
                    </DayName>
                ))}


                {days.map((day, index) => (
                    <Day key={index} className={day.toDateString() === new Date().toDateString() ? "active" : ""}>
                        {day.toDateString()}
                        <TaskWrapper>
                            <Task descr={testTask.descr} tagsArray={testTask.tagsArray} />
                        </TaskWrapper>
                    </Day>
                ))}
            </Calendar>
        </>
    );
};

export default CalendarGrid;
