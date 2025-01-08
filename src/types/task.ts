import { tags } from "../utils/variables";

export interface TaskProps {
    tagsArray: (keyof typeof tags)[];
    descr: string;
}

export interface TaskType {
    id: string;
    description: string;
    tagsArray: (keyof typeof tags)[];
    date: string;
    completed?: boolean;
}

export interface HolidayType {
    date: string;
    name: string;
    localName: string;
    countryCode: string;
}