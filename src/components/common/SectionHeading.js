import React from 'react'

export default function SectionHeading({ subHeading, heading }) {
    return (
        <div>
            <p className='text-secondary text-sm'>{subHeading}</p>
            <p className='text-2xl font-bold'>{heading}</p>
        </div>
    )
}
