'use client'
import React from 'react'
import { heroConfig, socialLinks } from '@/config/Hero'
import { cn } from '@/lib/utils'
import { Link } from 'next-view-transitions'
import Image from 'next/image'
import Container from '../common/Container'
import { Button } from '../ui/button'
import { TooltipContent, Tooltip, TooltipTrigger } from '../ui/tooltip'
import { useTheme } from 'next-themes'
import { motion } from 'motion/react'

const Hero = () => {
    const { name, title, button } = heroConfig
    const { theme } = useTheme()

    const avatar = theme === 'dark' ? '/assets/mon-y.png' : '/assets/mon-b.png';

    return (
        <Container className={'mx-auto  flex-col pt-10 max-w-5xl flex items-center justify-center'}>
            <Image src={avatar} alt='Avatar' width={100} height={100} className='size-52 rounded-full' />

            <div className='mt-8 flex flex-col items-center gap-2'>
                <h1 className='tracking-tighter font-bold text-lg lg:text-6xl  text-shadow-md text-primary dark:text-white'>{name}</h1>
                <Freelance />
                <h1 className='text-secondary tracking-tight font-medium'>{title}</h1>

                <Link href={button.href}> 
                    <Button  variant={button.variant}>
                        {button.icon}
                        
                        {button.text}
                    </Button>
                </Link>
            
            
            </div>

        </Container>
    )
}

export default Hero

const Freelance = () => {
    return (
        <div className="bg-[#3a9502]/60 dark:bg-[#3a9502]/20 flex w-[180px] relative text-[12px] items-center p-2 gap-2 text-white font-semibold rounded-[6px] px-3">

            {/* Pulse Animation */}
            <span className="relative inline-flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#4ADE80] opacity-75 animate-ping"></span>
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#4ADE80]"></span>
            </span>

            <span className="absolute left-8 z-20">Available for freelance</span>
        </div>
    );
};
