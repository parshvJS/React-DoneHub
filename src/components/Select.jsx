import React,{useId} from 'react';

import { forwardRef } from 'react';

function Select({
    options,
    label='',
    className='',
    ...props
},ref) {
    const id=useId()
    return (
        <>
            {label && <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor={id}>
                {label}
            </label >}

            <select {...props} id={id} ref={ref} className={` bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${className}`}>
  {
    options?.map((option)=>(
        <option key={option}>
            {option}
        </option>
    ))
  }


            </select>
        </>
    );
}

export default forwardRef(Select);