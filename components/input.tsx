'use client'

import { cn } from "@/lib/utils"
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form"

interface InputProps {
    label: string
    id: string
    type?: string
    required?: boolean
    register: UseFormRegister<FieldValues>
    errors: FieldErrors
    disabled?: boolean
}

const Input: React.FC<InputProps> = ({
    errors,
    id,
    label,
    register,
    required,
    type,
    disabled
}) => {
    return (
        <div>
            <label
                className="block text-sm font-medium text-gray-900 leading-6"
                htmlFor={id}
            >
                {label}
            </label>
            <div className="mt-2">
                <input
                    id={id}
                    type={type}
                    autoComplete={id}
                    disabled={disabled}
                    {...register(id, { required })}
                    className={
                        cn(
                            "form-input block w-full rounded-md border border-zinc-200 py-1.5 text-gray-900 shadow-sm ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
                            errors[id] && "border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500",
                            disabled && "bg-gray-50 text-gray-500 opacity-50 cursor-not-allowed"
                        )
                    }
                />
            </div>
        </div>
    )
}

export default Input