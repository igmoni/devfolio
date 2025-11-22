import { cn } from '@/lib/utils'
import React from 'react'
import ProjectCard from './ProjectCard'

const ProjectList = ({ projects, className }) => {
    if (projects.length === 0) {
        return (
            <div className='text-center py-8'>
                <p className='text-muted-foreground'>No projects found.</p>
            </div>
        )
    }
    return (
        <div className={cn('grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2', className)}>
            {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
            ))}
        </div>
    )
}

export default ProjectList
