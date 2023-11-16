import React, { forwardRef } from "react";
import { useId } from "react";

const Input = forwardRef(function Input({

    label,
    type = 'text',
    className = '',
    placeholder = 'Enter',
    ...props
}, ref) {
    const id = useId()
    return (
        <div className="w-full">
            {label && <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor={id}>
                {label}
            </label >}

            <input type={type}
                className={`flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
                ref={ref} {...props} id={id} />
        </div>
    )
})

export default Input;