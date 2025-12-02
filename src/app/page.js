import React from 'react'
import Container from '@/components/common/Container'
import Hero from '@/components/landing/Hero'
import Projects from '@/components/landing/Projects'
import About from '@/components/landing/About'
import Github from '@/components/landing/Github'
import Blog from '@/components/landing/Blog'
import ContactForm from '@/components/contact/ContactForm'
import Contact from '@/components/landing/Contact'

const page = () => {
  return (
    <Container className={'min-h-screen py-16'}>
        <Hero/>
        <Projects/>
        <About/>
        <Github/>
        <Blog/>
        <Contact />
        </Container>
  )
}

export default page
