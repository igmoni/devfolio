import Description from '@/components/about/Description'
import HeroHeading from '@/components/about/Hero'
import Container from '@/components/common/Container'
import React from 'react'

const page = () => {
  return (
    <Container className={'py-16'}>
      <HeroHeading/>
      <Description/>
    </Container>
  )
}

export default page
