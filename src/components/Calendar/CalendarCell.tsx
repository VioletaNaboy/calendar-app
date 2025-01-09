import { useEffect, useState } from "react";
import { useAppSelector } from "../../state/hooks";
import { Day, TaskWrapper, PlusBtn } from "./StyledCalendar"
import { Task } from "../Task/Task"
import { TaskType } from "../../types/task"
import { getTasksByDate } from "../../utils/getTasksByDate";
import { selectTasks, selectFilteredTasks } from "../../state/tasks/tasksSlice";
import { normalizeDate } from "../../utils/getDays";
import { useDragAndDrop } from "../../hooks/useDragAndDrop";

interface CalendarCellProps {
    day: Date;
}

export const CalendarCell: React.FC<CalendarCellProps> = ({ day }) => {
    const { status, error } = useAppSelector(selectTasks);
    const items = useAppSelector(selectFilteredTasks);
    const [filteredTasks, setFilteredTasks] = useState<TaskType[]>([]);
    const { handleDragOver, handleDrop } = useDragAndDrop()

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
    const hasPassed = normalizeDate(day) <= normalizeDate(new Date())
    return (
        <Day
            onDrop={(e) => handleDrop(day.toDateString(), e)}
            onDragOver={handleDragOver}
            className={day.toDateString() === new Date().toDateString() ? "active" : hasPassed ? 'passed' : ''}
        >
            {day.toLocaleString('en-EU', { day: 'numeric', month: 'short' })}

            {status === 'fulfilled' ? (
                <>
                    {!hasPassed && (<PlusBtn type="button" onClick={() => handlePlusClick()}>{"+"}</PlusBtn>)}
                    <TaskWrapper>
                        {filteredTasks.map((task, i) => (
                            <Task key={task.id} descr={task.description} tagsArray={task.tagsArray} id={task.id} date={task.date} currentDay={day} index={i} />
                        ))}
                    </TaskWrapper></>
            ) : status === 'rejected' || error !== null ? (<div>Error... Reload page </div>) : (<div>Loading...</div>)

            }
        </Day>
    )
}