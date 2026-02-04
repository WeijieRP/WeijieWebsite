import React from 'react'
import Navbar from '../Design/Designdetail1/Navbar'
import Footer from '../Design/Designdetail2/Footer'
import GreenHabitHero from './Hero'
import ChallengeSection from './Challenege'
import GreenHabitSolutionShowcase from './Solution'
import TechStackSection from './TechStack'
import DesignJourneyCarousel from './DevelopmentJourney'
import ReflectionLearning from './ReflectionLearning'
import ArcMobileShowcase from './Showcase'

export default function Moblie2ProjectDetails2() {
  return (
    <>
    <GreenHabitHero/>
    <ChallengeSection/>
    <GreenHabitSolutionShowcase/>
    <TechStackSection/>
    <ArcMobileShowcase/>
    <DesignJourneyCarousel/>
    <ReflectionLearning/>
    <Footer/>
    </>
  )
}
