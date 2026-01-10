import React from 'react'
import { Instrument_Serif } from 'next/font/google'

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
});


export default function SectionHeading({ subHeading, heading }) {
    return (
        <div>
            <p className='text-secondary text-sm'>{subHeading}</p>
            <p className={`${instrumentSerif.className} text-4xl  font-bold italic`}>{heading}</p>
        </div>
    )
}
