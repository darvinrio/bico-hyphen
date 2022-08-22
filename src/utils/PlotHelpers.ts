import { add, format, differenceInCalendarDays, isFuture } from 'date-fns'

export const dateFormatter = (date: number) => {
    return format(new Date(date), "MMM dd, yyyy");
}