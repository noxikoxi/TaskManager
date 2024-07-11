'use client'

import {useContext, useEffect, useState} from "react";
import {SideNavContext} from "@/lib/Context/SideNavContext";
import {Car} from "@/lib/types";
import CarCard from "@/components/CarCard";
import ItemCard from "@/components/ItemCard";
import CarForm from "@/components/forms/CarForm";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {ChevronsUpDown} from "lucide-react";

type Props = {
    cars: Car[]
}

const SORT_OPTIONS = [
    {
        label: "Default",
        value: "default"
    },
    {
        label: "Brand",
        value: "brand"
    },
    {
        label: "Insurance Date",
        value: "insurance"
    },
]

export default function Content({cars} : Props){
    const {changeActive} = useContext(SideNavContext);

    const [showUpdate, setShowUpdate] = useState<boolean>(false);
    const [selectedCar, setSelectedCar] = useState<Car | null>(null);
    const [carsData, setCarsData] = useState<Car[]>(cars);
    const [sortOptionLabel, setSortOptionLabel] = useState<string>("Default");

    useEffect(() => {
        changeActive("Inspection & Insurance")
    }, []);

    const sortCars = (sortOption : string) => {
        switch (sortOption){
            case "brand":
                setCarsData([...carsData.sort((c1, c2) => c1.brand < c2.brand ? -1 : 1)]);
                break
            case "insurance":
                setCarsData([...carsData.sort((c1, c2) => new Date(c1.insuranceTo) < new Date(c2.insuranceTo) ? -1 : 1)]);
                break;
            case "default":
                setCarsData([...cars]);
                break
            default:
                setCarsData([...cars]);
                break
        }
    };


    return (
        <div className="flex flex-col gap-0">
            <div className="pt-5 ps-5 md:ps-10">
                <h3 className="p-1">Sort By:</h3>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Button variant="outline" className="w-[150px]">
                            <div className="flex flex-row justify-between w-full">
                                <span>{sortOptionLabel}</span>
                                <ChevronsUpDown size={18} className="-me-2"/>
                            </div>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        {SORT_OPTIONS.map((option, index) => (
                            <DropdownMenuItem
                                key={index}
                                onClick={() => {
                                    setSortOptionLabel(option.label);
                                    sortCars(option.value);
                                }}
                            >
                                <span>{option.label}</span>
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {cars && cars.length > 0 && (<div className="flex flex-col justify-center gap-8 p-5 md:ps-10 md:grid md:gap-5 xl:grid-cols-2">
                    {carsData.map((car) => (
                        <CarCard
                            car={car}
                            key={car._id}
                            selectCar={setSelectedCar}
                            showEditing={setShowUpdate}
                        />
                    ))
                    }
                </div>
            )}
            {showUpdate && <ItemCard
                showCard={setShowUpdate}
                description="Update your car informations"
                title="Update your car"
                size="lg"
            >
                <CarForm showCard={setShowUpdate} car={selectedCar}/>
            </ItemCard> }
        </div>
    )
}