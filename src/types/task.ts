import { tags } from "../utils/variables";

export interface TaskProps {
    id: string;
    tagsArray: (keyof typeof tags)[];
    descr: string;
    date: string;
    currentDay: Date;
}

export interface TaskType {
    id: string;
    description: string;
    tagsArray: (keyof typeof tags)[] | [];
    date: string;
}

export interface HolidayType {
    date: string;
    name: string;
    localName: string;
    countryCode: string;
}