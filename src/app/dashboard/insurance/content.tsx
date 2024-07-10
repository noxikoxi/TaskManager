'use client'

import {useContext, useEffect, useState} from "react";
import {SideNavContext} from "@/lib/Context/SideNavContext";
import {Car} from "@/lib/types";
import CarCard from "@/components/CarCard";
import ItemCard from "@/components/ItemCard";
import CarForm from "@/components/forms/CarForm";

type Props = {
    cars: Car[]
}

export default function Content({cars} : Props){
    const {changeActive} = useContext(SideNavContext);

    const [showUpdate, setShowUpdate] = useState<boolean>(false);
    const [selectedCar, setSelectedCar] = useState<Car | null>(null);

    useEffect(() => {
        changeActive("Inspection & Insurance")
    }, []);



    return (
        <div>
            {cars && cars.length > 0 && (<div className="flex flex-col justify-center gap-8 pt-5 md:p-10 md:grid md:gap-5 xl:grid-cols-2">
                    {cars.map((car) => (
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