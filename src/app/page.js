import React from 'react'
import Container from '@/components/common/Container'
import Hero from '@/components/landing/Hero'
import Projects from '@/components/landing/Projects'

const page = () => {
  return (
    <Container className={'min-h-screen py-16'}>
        <Hero/>
        <Projects/>
    </Container>
  )
}

export default page
