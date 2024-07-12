import CalendarDayCard from "@/components/CalendarDayCard";
import {capitalizeFirstLetter} from "@/lib/utils";
import {clsx} from "clsx";
import {useGetCalendar} from "@/lib/client/CalendarHooks";
import {Dispatch, SetStateAction} from "react";
import {DayInfo} from "@/app/dashboard/calendar/page";


type Props = {
    calendarDate: Date,
    today: Date,
    setDayInfo: Dispatch<SetStateAction<DayInfo | null>>,
    setShowDayInfo: Dispatch<SetStateAction<boolean>>
}

const CalendarDays = ({calendarDate, today, setShowDayInfo, setDayInfo} : Props) => {

    const {calendar, isLoading} = useGetCalendar(calendarDate.getMonth(), calendarDate.getFullYear());

    const getMonthDays = () => {
        let nextMonth = new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1, 0);
        const days: string[] = [];

        for(let d = new Date(calendarDate); d <= nextMonth ; d.setDate(d.getDate() + 1)) {
            days.push(capitalizeFirstLetter(d.toLocaleString('default', {weekday: 'long'})));
        }
        return days;
    }

    const getDayEvents = (dayNumber: number) => {
        if(!isLoading && calendar){
            return calendar.events.filter((item) => new Date(item.date).toLocaleString('default', {day: 'numeric'}) == String(dayNumber));
        }
        return []
    }

    return (
        <div className="p-5 grid grid-cols-[repeat(auto-fill,minmax(200px,_1fr))] gap-3">
            { getMonthDays().map((date, index) => (
                <CalendarDayCard
                    key={index}
                    day={index}
                    weekDay={date}
                    events={getDayEvents(index)}
                    className={clsx("", {"bg-secondary/50 hover:bg-secondary/40" : today.getDate() === index+1 && today.getMonth() === calendarDate.getMonth() && today.getFullYear() == calendarDate.getFullYear()})}
                    onClick={() => {
                        setDayInfo({
                            events: getDayEvents(index),
                            date: new Date(calendarDate.getFullYear(), calendarDate.getMonth(), index+1)
                        });
                        setShowDayInfo(true);
                    }}
                />
            ))

            }

        </div>
    )
}

export default CalendarDays;