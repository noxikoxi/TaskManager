import {Car} from "@/lib/types";
import React, {Dispatch, SetStateAction} from "react";
import {Card} from "@/components/ui/card";
import {CarFront} from "lucide-react";
import {clsx} from "clsx";

type Props = {
    selectCar: Dispatch<SetStateAction<Car | null>>
    showEditing: Dispatch<SetStateAction<boolean>>
    car : Car
}

const CarCard = ({selectCar, showEditing, car} : Props) => {

    const today = new Date();
    const isInsuranceDanger = ((new Date(car.insuranceTo.toString()).getTime() - today.getTime()) / (1000 * 60 * 60 * 24)) < 14;
    const isInspectionDanger = ((new Date(car.inspectionTo.toString()).getTime() - today.getTime()) / (1000 * 60 * 60 * 24)) < 14;

    const handleClick = () => {
        selectCar(car);
        showEditing(true);
    }

    return (
        <Card
            className="relative grid grid-cols-5 cursor-pointer hover:border-secondary hover:bg-card/80"
            onClick={handleClick}
        >
            <div className="col-span-2 border-r p-5">
                <div className="flex flex-col h-full items-center justify-center gap-1 text-xl">
                    <CarFront className="absolute left-3 top-3" strokeWidth={2} size={40} />
                    <span> {car.brand}</span>
                    <span> {car.model}</span>
                    {car.productionYear && <span>{String(car.productionYear)}</span>}
                    <span>{car.registration}</span>
                </div>
            </div>
            <div className="col-span-3">
                <div className="grid grid-rows-5">
                    <div className="row-span-3 flex flex-col border-b p-5 md:text-xl">
                        <span className={clsx("flex flex-col items-center lg:flex-row lg:justify-between lg:gap-6", isInsuranceDanger && "text-destructive")}><span className="font-semibold">Insurance valid until:</span>{car.insuranceTo.toString().split('T')[0]}</span>
                        <span className={clsx("flex flex-col items-center lg:flex-row lg:justify-between", isInspectionDanger && "text-destructive")}><span className="font-semibold">Inspection valid until:</span>{car.inspectionTo.toString().split('T')[0]}</span>
                        {car.insurancePrice && <span className="flex flex-col items-center lg:flex-row lg:justify-between"><span className="font-semibold">Insurance Price: </span>{String(car.insurancePrice)}</span>}
                    </div>
                    <div className="row-span-2 flex flex-col items-center pt-2">
                        <span className="font-semibold text-xl">Description</span>
                        {car.description && <span className="text-muted-foreground">{car.description}</span>}
                    </div>
                </div>
            </div>
        </Card>

    )

}

export default CarCard;