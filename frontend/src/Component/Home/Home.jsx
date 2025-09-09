import React from 'react'
import Hero from './Hero'
import FeaturedCollection from './FeaturedCollection'
import AboutPage from './About'
import CategoryHighlights from './CategoryHighlights'
import StorytellingSection from './StorytellingSection'
import Newsletter from './NewsLetter'

const Home = () => {
  return (
    <div>
      <Hero />
      <FeaturedCollection />
      <AboutPage />
      <CategoryHighlights />
      <StorytellingSection />
      <Newsletter />
    </div>
  )
}

export default Home
