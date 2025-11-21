'use client'
import React from 'react'
import { motion} from 'motion/react'
import { Link } from 'next-view-transitions'
import SectionHeading from '../common/SectionHeading'
import { Button } from '../ui/button'
import Container from '../common/Container'

const Projects = () => {
  return (
    <Container className={'mt-20'}>
        <SectionHeading subHeading={'Featured'} heading={'Projects'}/>

        
    </Container>
  )
}

export default Projects
