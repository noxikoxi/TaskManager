import { Slash } from "lucide-react"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

type Props = {
    // List of links
    linkList: string[],

    // List of visible texts
    textList: string[]
}


const BreadCrumb = ({linkList, textList} : Props ) => {
    return (
        <Breadcrumb>
            <BreadcrumbList className="font-semibold text-xl text-foreground tracking-tight">
                {textList.map((text, index) => (
                    <div key={index} className="flex items-center gap-3">
                        <BreadcrumbItem >
                            <BreadcrumbLink href={linkList[index]}>{text}</BreadcrumbLink>
                        </BreadcrumbItem>
                        {index < textList.length-1 && (
                        <BreadcrumbSeparator>
                            <Slash strokeWidth={3}/>
                        </BreadcrumbSeparator>
                        )}
                    </div>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    )
}

export default BreadCrumb;