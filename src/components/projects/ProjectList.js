'use client'
import { cn } from '@/lib/utils'
import React from 'react'
import ProjectCard from './ProjectCard'
import { motion } from 'motion/react'

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.18, // delay between each card
        },
    },
}

const ProjectList = ({ projects, className }) => {
    if (projects?.length === 0) {
        return (
            <div className='text-center py-8'>
                <p className='text-muted-foreground'>No projects found.</p>
            </div>
        )
    }

    return (
        <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className={cn(
                'grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2',
                className
            )}
        >
            {projects?.map((project) => (
                <ProjectCard key={project.id} project={project} />
            ))}
        </motion.div>
    )
}

export default ProjectList
