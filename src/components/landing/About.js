'use client'
import React from 'react'
import { about, mySkills } from '@/config/About'
import Image from 'next/image'
import Container from '../common/Container'
import SectionHeading from '../common/SectionHeading'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'
import { useTheme } from 'next-themes'
import { Separator } from '../ui/separator'

const About = () => {

  const { theme } = useTheme()

  const avatar = theme === 'dark' ? '/assets/mon-y.png' : '/assets/mon-b.png';


  return (
    <Container className={'mt-20'}>
      <SectionHeading subHeading={'About'} heading={'Me'} />

      <div className='mt-8 flex flex-col gap-5 md:flex-row'>
        <Image src={avatar} alt='Avatar' width={100} height={100} className='border-secondary size-60 rounded-md border-2 ' />

        <div className='mt-4'>
          <h3 className='text-2xl font-bold'>{about.name}</h3>
          <p className='text-secondary mt-4'>{about.desc}</p>
          {/* <div className='h-px w-full rounded-full bg-secondary mt-7'></div> */}
          <Separator/>
          <p className='text-secondary mt-8 font-bold'>Skills</p>
          <div className='flex flex-wrap gap-2'>
            {mySkills.map((skill) => (
              <Tooltip key={skill.key}>
                <TooltipTrigger>
                  <div className='mt-2 size-7 hover:cursor-pointer'>{skill}</div>
                </TooltipTrigger>
                <TooltipContent>{skill.key}</TooltipContent>
              </Tooltip>
            ))}
          </div>
        </div>
      </div>
    </Container>
  )
}

export default About
