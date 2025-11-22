'use client'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'
import { DialogContent, Dialog, DialogTitle, DialogTrigger } from '../ui/dialog'

import { Link } from 'next-view-transitions'
import Image from 'next/image'
import { useState } from 'react'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import Website from '@/svgs/Website'
import Github from '@/svgs/Github'


const ProjectCard = ({ project }) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);


    return (
        <Card className='group h-full w-full overflow-hidden transition-all p-0 border-gray-100 dark:border-gray-800 shadow-none'>
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
                    <div>

                    </div>
                </div>

            </CardContent>
            <CardHeader className='p-0'>

            </CardHeader>

        </Card>
    )
}

export default ProjectCard
