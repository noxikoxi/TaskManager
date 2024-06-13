import {Loader2} from "lucide-react";
import {Button} from "@/components/ui/button";
import React from "react";

type Props = {
    className?: string
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined
}
const LoadingButton : React.FC<Props> = ({className, variant} : Props) => {

    return (
        <Button disabled className={className} variant={variant}>
            <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
            Loading
        </Button>
    )
}

export default LoadingButton;