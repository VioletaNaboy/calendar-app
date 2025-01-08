import { useState } from 'react';
import { getDays } from '../utils/getDays';
export const useCalendar = (current: Date, length: number) => {
    const [currentDate, setcurrentDate] = useState(new Date(current.setHours(0, 0, 0, 0)))
    const { days, firstDay, lastDay } = getDays(currentDate, length)
    const start = firstDay.toLocaleString('en-US', { month: 'long', year: 'numeric' });
    const end = lastDay.toLocaleString('en-US', { month: 'long', year: 'numeric' });
    const currentMonth = start === end ? start : `${start} - ${end}`
    const setNextGrid = () => {
        const day = new Date(lastDay);
        day.setDate(lastDay.getDate() + 1);
        setcurrentDate(day)
    }
    const setPrevGrid = () => {
        const day = new Date(firstDay);
        day.setDate(firstDay.getDate() - length);
        setcurrentDate(day)
    }

    return { days, currentMonth, setNextGrid, setPrevGrid }

};

