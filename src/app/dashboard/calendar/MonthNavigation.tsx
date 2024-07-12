import {Dispatch, SetStateAction} from "react";
import {ChevronsLeft, ChevronsRight, RotateCcw} from "lucide-react";
import {capitalizeFirstLetter} from "@/lib/utils";
import {Button} from "@/components/ui/button";


type Props = {
    calendarDate: Date,
    setCalendarDate: Dispatch<SetStateAction<Date>>,
    today: Date
}

export default function MonthNavigation({calendarDate, setCalendarDate, today} : Props){

    const changeMonth = (value: number) => {
        let nextMonth = new Date(calendarDate);
        nextMonth.setMonth(calendarDate.getMonth() + value);
        setCalendarDate(nextMonth);
    }

    return (

            <div className="flex flex-row items-center w-full justify-center mt-2">
                <div className="flex flex-row justify-center items-center gap-2">
                    <ChevronsLeft size={30} className="cursor-pointer" onClick={() => changeMonth(-1)} />
                    <h1 className="text-2xl">{capitalizeFirstLetter(calendarDate.toLocaleString('default', {month: 'long'}))}</h1>
                    <h1 className="text-2xl">{calendarDate.getFullYear()}</h1>
                    <ChevronsRight size={30} className="cursor-pointer" onClick={() => changeMonth(1)} />
                </div>
                {(calendarDate.getFullYear() != today.getFullYear() || calendarDate.getMonth() != today.getMonth()) && (
                    <div className="absolute left-5 top-4">
                        <Button variant="outline" type="button" onClick={() => {
                            setCalendarDate(new Date(today.getFullYear(), today.getMonth(), 1));
                        }
                        }>
                            <RotateCcw size={18} />
                            <span className="font-semibold ps-2">Today</span>
                        </Button>
                    </div>
                    )
                }
            </div>
    )
}