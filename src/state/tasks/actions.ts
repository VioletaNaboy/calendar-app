import { createAsyncThunk } from '@reduxjs/toolkit';
import { TaskType } from '../../types/task';
import { HolidayType } from '../../types/task';
import { getUserCountry } from '../../utils/getCountry';

export const fetchTasks = createAsyncThunk<TaskType[], void>(
    'tasks/fetchTasks',
    async () => {
        const currentYear = new Date().getFullYear();
        const countryCode = await getUserCountry();


        const holidaysResponse = await fetch(`https://date.nager.at/api/v3/PublicHolidays/${currentYear}/${countryCode}`);

        const prevHolidaysResponse = await fetch(`https://date.nager.at/api/v3/PublicHolidays/${currentYear - 1}/${countryCode}`);
        const nextHolidaysResponse = await fetch(`https://date.nager.at/api/v3/PublicHolidays/${currentYear + 1}/${countryCode}`);

        const worldwideHolidaysResponse = await fetch(`https://date.nager.at/api/v3/NextPublicHolidaysWorldwide`);

        if (!holidaysResponse.ok || !prevHolidaysResponse.ok || !nextHolidaysResponse.ok || !worldwideHolidaysResponse.ok) {
            throw new Error('Failed to fetch holidays');
        }
        const [holidays, prevHolidays, nextHolidays, worldwideHolidays] = await Promise.all([
            holidaysResponse.json(),
            prevHolidaysResponse.json(),
            nextHolidaysResponse.json(),
            worldwideHolidaysResponse.json(),
        ]);


        const combinedHolidays: HolidayType[] = [
            ...holidays,
            ...prevHolidays,
            ...nextHolidays,
            ...worldwideHolidays,
        ];
        ///const holidays: HolidayType[] = await holidaysResponse.json();
        const holidayTasks: TaskType[] = combinedHolidays.map((holiday) => ({
            id: `holiday-${holiday.date}`,
            description: holiday.name,
            date: holiday.date,
            tagsArray: ['holiday'],
        }));

        return holidayTasks;
    }
);