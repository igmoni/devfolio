'use client'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'
import { DialogContent, Dialog, DialogTitle, DialogTrigger } from '../ui/dialog'

import { Link } from 'next-view-transitions'
import Image from 'next/image'
import { useState } from 'react'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import Website from '@/svgs/Website'
import Github from '@/svgs/Github'
import ArrowRight from '@/svgs/ArrowRight'


const ProjectCard = ({ project }) => {
    const [dialogOpen, setDialogOpen] = useState(false);


    return (
        <Card className='group h-full w-full group overflow-hidden transition-all p-0 pb-0 border-gray-100 dark:border-gray-800 shadow-none'>
            <CardContent className={'px-6'}>
                <div className='flex items-cenetr justify-between gap-4'>
                    <Link href={project.projectsDetailsPageSlug}>
                        <h3 className='text-xl font-semibold leading-tight group-hover:text-primary hover:cursor-pointer'>{project.title}</h3>
                    </Link>
                    <div className='flex items-center gap-2'>
                        <Tooltip>
                            <TooltipTrigger>
                                <Link className='text-secondary flex size-6 items-center justify-center hover:text-primary transition-colors' href={project.link} target='_blank'>
                                    <Website /></Link>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>View Website</p>
                            </TooltipContent>
                            <TooltipTrigger>
                                {project.github && (
                                    <Link
                                        className="text-secondary flex size-6 items-center justify-center hover:text-primary transition-colors"
                                        href={project.github}
                                        target="_blank"
                                    >
                                        <Github />
                                    </Link>
                                )}
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>View GitHub</p>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                </div>

                <p className='text-secondary line-clamp-3'>{project.desc}</p>

                <div>
                    <h4 className='text-sm font-medium mb-2 text-secondary'>
                        Technologies
                    </h4>
                    <div className='flex flex-wrap gap-2'>
                        {project.technologies.map((tech, idx) => (
                            <Tooltip key={idx}>
                                <TooltipTrigger>
                                    <div className='size-6 hover:scale-120 transition-all duration-300 hover:cursor-pointer'>{tech.icon}</div>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>{tech.name}</p>
                                </TooltipContent>
                            </Tooltip>
                        ))}

                    </div>
                </div>
            </CardContent>
            {
                <CardFooter className='p-6 pt-0 flex justify-between'>
                    <div className={`flex items-center gap-1 rounded-md px-2 py-1 text-xs ${project.isWorking ? 'border-green-300 bg-green-500/10' : 'border-red-300 bg-red-500/10'}`}>

                        {project.isWorking ? (
                            <>
                                <div className='size-2 rounded-full bg-green-500 animate-pulse' />
                                All Systems Operational
                            </>
                        ) : (
                            <>
                                <div className='size-2 rounded-full bg-red-500 animate-pulse' />
                                Building
                            </>
                        )}
                    </div>
                    <Link href={project.projectsDetailsPageSlug} className='text-secondary flex items-center gap-2 text-sm hover:underline underline-offset-4 hover:text-primary transition-colors'>
                        View Details <ArrowRight className='size-4' />
                    </Link>
                </CardFooter>
            }

           <CardHeader className="p-0 pl-[58px] pb-0 relative">

    {/* Image wrapper (NOT absolute now) */}
    <div className="w-full pl-5 lg:pl-[58px]">

        {/* Image container that expands upward on hover */}
        <div className="relative z-20 h-[200px] lg:h-[250px] lg:group-hover:h-[300px]
            transition-all duration-500 rounded-tl-2xl rounded-br-2xl overflow-hidden">

            <Image
                fill
                src="/projects/balc.jpg"
                alt="Image"
                className="object-cover rounded-tl-2xl rounded-br-2xl"
            />

            {/* VIDEO OVERLAY (unchanged) */}
            {project.video && (
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                        <div className="absolute inset-0 flex cursor-pointer items-center justify-center 
                            bg-black/20 opacity-0 transition-opacity duration-300 
                            group-hover:opacity-100 hover:backdrop-blur-xs">
                            <button className="flex size-16 items-center justify-center rounded-full 
                                bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors duration-200">
                                <PlayCircle />
                            </button>
                        </div>
                    </DialogTrigger>

                    <DialogContent className="max-w-4xl w-full p-0 border-0">
                        <div className="aspect-video w-full">
                            <video
                                className="h-full w-full object-cover rounded-lg"
                                src={project.video}
                                autoPlay
                                loop
                                controls
                            />
                        </div>
                        <DialogTitle className="sr-only">{project.title}</DialogTitle>
                    </DialogContent>
                </Dialog>
            )}
        </div>

        {/* Glow layer (left side glow) */}
        <div className="absolute inset-0 z-10 rounded-tl-2xl rounded-br-2xl opacity-0 
            group-hover:opacity-80 transition-all duration-500 
            bg-gradient-to-r from-blue-500/60 via-purple-500/40 to-transparent 
            blur-2xl pointer-events-none">
        </div>

    </div>
</CardHeader>


        </Card>
    )
}

export default ProjectCard
