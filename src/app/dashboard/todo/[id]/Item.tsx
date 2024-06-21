'use client'

import {TodoItem} from "@/lib/types";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible";
import {ChevronDown} from "lucide-react";
import {useState} from "react";
import Point from "@/app/dashboard/todo/[id]/Point";
import {sortFunc} from "@/app/dashboard/todo/[id]/ItemsTable";


type Props = {
    item : TodoItem,
    todoId: string,
}

const Item = ({item, todoId} : Props) => {

    const [isOpen, setIsOpen] = useState(false);

    const handleClick = (event: React.MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
        setIsOpen(!isOpen);
    }

    return (
        <>
            {item.points.length > 0 ? (
                <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                    <CollapsibleTrigger
                        className="flex flex-row items-center justify-center cursor-pointer hover:underline"
                        onClick={(event) => handleClick(event)}
                    >
                        {item.content}
                        <ChevronDown
                            size={23}
                            className="transition-transform duration-500 ease-in"
                            style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                        />
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                        <div className="overflow-hidden flex flex-col gap-2 mt-1">
                            {item.points.sort(sortFunc).map((point) => (
                                <Point
                                    content={point.content}
                                    isDone={point.isDone}
                                    isImportant={point.isImportant}
                                    key={point._id}
                                    id={point._id}
                                    todoId={todoId}
                                    itemId={item._id}
                                />
                            ))}
                        </div>
                     </CollapsibleContent>
                </Collapsible>
                ) : (
                <span>{item.content}</span>
            )}

        </>
    )

}

export default Item;
