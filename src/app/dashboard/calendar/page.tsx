'use client'

import DashboardTopBar from "@/components/DashboardTopBar";
import MonthNavigation from "@/app/dashboard/calendar/MonthNavigation";
import CalendarDays from "@/app/dashboard/calendar/CalendarDays";
import {useContext, useEffect, useState} from "react";
import {SideNavContext} from "@/lib/Context/SideNavContext";
import ItemCard from "@/components/ItemCard";
import {Event} from "@/lib/types";
import EventList from "@/app/dashboard/calendar/EventList";

export type DayInfo = {
    events: Event[],
    date: Date
}

export default function Home() {

    const {changeActive} = useContext(SideNavContext);


    useEffect(() => {
        changeActive("Calendar")
    }, []);


    const today = new Date();
    const [calendarDate, setCalendarDate] = useState<Date>(new Date(today.getFullYear(), today.getMonth(), 1));
    const [showDayInfo, setShowDayInfo] = useState<boolean>(false );
    const [dayInfo, setDayInfo] = useState<DayInfo | null>(null);

    return (
        <div className="relative inset-0">
        <DashboardTopBar
            linkList={["/dashboard/calendar"]}
            textList={["Calendar"]}
            options={{
                Notebooks: false,
                Notes: false,
                Todo: false,
                Car: false,
                Event: true
            }}
        />
            <div className="flex flex-col gap-2 relative">
                <MonthNavigation calendarDate={calendarDate} setCalendarDate={setCalendarDate} today={today} />
                <CalendarDays calendarDate={calendarDate} today={today} setDayInfo={setDayInfo} setShowDayInfo={setShowDayInfo}/>
            </div>

            {showDayInfo && dayInfo  && (
                <ItemCard showCard={setShowDayInfo}
                          title={dayInfo.date.toLocaleString('default', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                          description="Informations about this date" size="default">
                    <EventList events={dayInfo.events}/>
                </ItemCard>
            )}
        </div>
    )
};