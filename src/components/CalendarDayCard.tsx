import {Card} from "@/components/ui/card";
import {Event} from "@/lib/types";
import {cn} from "@/lib/utils";
import {CircleAlert} from "lucide-react";

type Props = {
    day: number,
    weekDay: string,
    events: Event[],
    className?: string,
    onClick?: () => void
}


const CalendarDayCard = ({day, weekDay, events, className, onClick} : Props) => {
    return (
        <Card
            className={cn("relative flex flex-col cursor-pointer hover:border-secondary hover:bg-card/80 max-h-[150px] 2xl:max-h-[250px]", className)}
            onClick={onClick}
        >
            <div className="row-span-2 border-b p-4 text-xl flex flex-row justify-evenly ">
                <h2 className="font-bold"> {day + 1}</h2>
                <h3>{weekDay}</h3>
            </div>
            <div className="row-span-3 overflow-auto min-h-[100px]">
                <ul className="ms-4">
                {events.sort((e1, e2) => e1.isImportant && !e2.isImportant ? -1 : 1).map((event) => (
                    <div key={event._id} className="flex flex-row items-center gap-2">
                        {event.isImportant && <CircleAlert size={18} />}
                        <li className={"text-sm"} >{event.title}</li>
                    </div>
                ))}
                </ul>
            </div>
        </Card>
    )

}

export default CalendarDayCard;