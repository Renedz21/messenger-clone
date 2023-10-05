import { cn } from "@/lib/utils"
import Link from "next/link"

interface MobileItemProps {
    href: string,
    icon: any,
    active?: boolean,
    onClick?: () => void,
}

const MobileItem = ({
    href,
    icon: Icon,
    active,
    onClick,
}: MobileItemProps) => {

    const handleClick = () => {
        if (onClick) {
            return onClick()
        }
    }

    return (
        <Link
            onClick={handleClick}
            href={href}
            className={cn("group flex gap-x-3 rounded-md p-3 text-sm leading-6 text-gray-500 hover:text-black hover:bg-gray-100", active && "bg-gray-100 text-black")}
        >
            <Icon className="h-6 w-6" />
        </Link>
    )
}

export default MobileItem