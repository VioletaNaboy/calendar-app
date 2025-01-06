export const getDays = (date: Date, length: number) => {
    const indexOfDay = date.getDay();
    const firstDay = new Date(date);
    const lastDay = new Date(date);
    firstDay.setDate(date.getDate() - indexOfDay);
    lastDay.setDate(date.getDate() + length - indexOfDay - 1);

    const days = [];

    let currentDate = new Date(firstDay);
    while (currentDate <= lastDay) {
        days.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return days;

};


