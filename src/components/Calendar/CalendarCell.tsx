import { useEffect, useState } from "react";
import { useAppSelector } from "../../state/hooks";
import { Day, TaskWrapper } from "./StyledCalendar"
import { Task } from "../Task/Task"
import { TaskType } from "../../types/task"
import { getTasksByDate } from "../../utils/getTasksByDate";
import { selectTasks } from "../../state/tasks/tasksSlice";

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

    return (
        <Day className={day.toDateString() === new Date().toDateString() ? "active" : ""}>
            {day.toDateString()}
            <TaskWrapper>
                {filteredTasks.map(task => (
                    <Task descr={task.description} tagsArray={task.tagsArray} />
                ))}
            </TaskWrapper>
        </Day>
    )
}