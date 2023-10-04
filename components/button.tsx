import { cn } from "@/lib/utils"

interface ButtonProps {
    type?: 'button' | 'submit' | 'reset' | undefined
    fullWidth?: boolean
    children?: React.ReactNode
    onClick?: () => void
    disabled?: boolean
    danger?: boolean
    secondary?: boolean
}

const Button = ({
    children,
    type,
    fullWidth,
    onClick,
    disabled,
    danger,
    secondary
}: ButtonProps) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={cn(
                "flex justify-center rounded-md px-3 py-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
                fullWidth && "w-full",
                disabled && "bg-gray-200 text-gray-500 cursor-default opacity-50",
                danger && "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500",
                secondary ? 'text-gray-900' : 'text-white',
                !secondary && !danger && "bg-indigo-600 hover:bg-indigo-700 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
            )}
        >
            {children}
        </button>
    )
}

export default Button