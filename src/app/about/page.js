import Description from '@/components/about/Description'
import Education from '@/components/about/Education'
import Experience from '@/components/about/Experience'
import Features from '@/components/about/Features'
import HeroHeading from '@/components/about/Hero'
import Container from '@/components/common/Container'
import React from 'react'

const page = () => {
  return (
    <Container className={'py-16'}>
      <HeroHeading/>
      <Description/>
      <Experience/>
      <Education/>
      <Features/>
    </Container>
  )
}

export default page
