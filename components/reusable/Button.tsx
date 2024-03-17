import React from 'react'

type Props = {
    children: React.ReactNode,
    onClick? : () => void
};

function Button({ children , onClick}: Props) {
    return (
        <button onClick = {onClick} className='text-sm md:text-md cursor-pointer text-white py-3 px-6 rounded-lg bg-primary hover:bg-red-700 transition-colors duration-300'>
            {children}
        </button>
    )
}

export default Button;