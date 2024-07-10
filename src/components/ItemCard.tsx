'use client'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Separator} from '@/components/ui/separator';
import React, {Dispatch, SetStateAction} from "react";
import {X} from "lucide-react";
import {cn} from "@/lib/utils";

type Props = {
    showCard: Dispatch<SetStateAction<boolean>>,
    children: React.ReactNode,
    title: string,
    description: string,
    size: "default" | "lg"
}

const CardVariants = {
    base : "relative w-full h-full overflow-auto",
    size: {
        default: "md:fixed md:h-auto md:top-[20%] md:left-[25%] md:w-[50%]",
        lg: "lg:fixed lg:h-auto lg:top-[10%] lg:left-[20%] lg:w-[60%]"

    }
}

const ItemCard  = ({showCard, children, title, description, size} : Props) => {

    return (
        <div className="fixed bg-black w-full h-full top-0 left-0 bg-opacity-40 z-20">
            <Card className={cn(CardVariants.base, CardVariants.size[size])}>
                <X  strokeWidth={2} size={32} className="cursor-pointer text-destructive absolute top-0 right-1" onClick={() => showCard(false)} />
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                    <Separator/>
                </CardHeader>
                <CardContent>
                    <>{children}</>
                </CardContent>
            </Card>
        </div>
    )
}

export default ItemCard;