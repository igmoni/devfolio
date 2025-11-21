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
import FreelanceText from './FreelanceText'

const Hero = () => {
    const { name, title, button } = heroConfig
    const { theme } = useTheme()

    const avatar = theme === 'dark' ? '/assets/mon-y.png' : '/assets/mon-b.png';

    return (
        <Container className={'mx-auto  flex-col pt-10 max-w-5xl flex items-center justify-center'}>
            <Image src={avatar} alt='Avatar' width={100} height={100} className='size-52 rounded-full' />

            <div className='mt-8 flex flex-col items-center gap-5'>
                <h1 className='tracking-tighter font-bold text-lg lg:text-6xl  text-shadow-md text-primary dark:text-white'>{name}</h1>
                <FreelanceText />
                <h1 className='text-secondary tracking-tight font-medium'>{title}</h1>

                <Link href={button.href}>
                    <Button variant={button.variant} className={'bg-primary dark:bg-white'}>
                        {button.icon}
                        {button.text}
                    </Button>
                </Link>

                <div className=' flex gap-4'>
                    {socialLinks.map((link) => (
                        <Tooltip key={link.name} delayDuration={0}>
                            <TooltipTrigger asChild>
                                <Link href={link.href} key={link.name} className='text-secondary flex items-center gap-2'>
                                    <span className='size-7'>{link.icon}</span></Link>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{link.name}</p>
                            </TooltipContent>
                        </Tooltip>
                    ))}
                </div>


                <Spotify/>

          

            </div>

        </Container>
    )
}

export default Hero



const Spotify = () => {

}