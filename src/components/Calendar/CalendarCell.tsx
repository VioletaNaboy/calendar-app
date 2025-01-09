import { useEffect, useState } from "react";
import { useAppSelector } from "../../state/hooks";
import { Day, TaskWrapper, PlusBtn } from "./StyledCalendar"
import { Task } from "../Task/Task"
import { TaskType } from "../../types/task"
import { getTasksByDate } from "../../utils/getTasksByDate";
import { selectTasks } from "../../state/tasks/tasksSlice";
import { normalizeDate } from "../../utils/getDays";

interface CalendarCellProps {
    day: Date;
}

export const CalendarCell: React.FC<CalendarCellProps> = ({ day }) => {
    const { items, status, error } = useAppSelector(selectTasks);
    const [filteredTasks, setFilteredTasks] = useState<TaskType[]>([]);

    useEffect(() => {
        if (items) {
            const today = day;
            const tasksForToday = getTasksByDate(items, today);
            setFilteredTasks(tasksForToday);
        }
    }, [items]);
    const handlePlusClick = () => {
        const emptyTask = {
            id: String(new Date().getTime()),
            description: '',
            tagsArray: [],
            date: ''
        }
        const addedTask = [emptyTask, ...filteredTasks,]
        setFilteredTasks(addedTask)
    }
    return (
        <Day
            className={day.toDateString() === new Date().toDateString() ? "active" : ""}
        >
            {day.toLocaleString('en-EU', { day: 'numeric', month: 'short' })}

            {status === 'fulfilled' ? (
                <>
                    {normalizeDate(day) >= normalizeDate(new Date()) && (<PlusBtn type="button" onClick={() => handlePlusClick()}>{"+"}</PlusBtn>)}
                    <TaskWrapper>
                        {filteredTasks.map(task => (
                            <Task key={task.id} descr={task.description} tagsArray={task.tagsArray} id={task.id} date={task.date} currentDay={day} />
                        ))}
                    </TaskWrapper></>
            ) : status === 'rejected' || error !== null ? (<div>Error... Reload page </div>) : (<div>Loading...</div>)

            }

        </Day>
    )
}