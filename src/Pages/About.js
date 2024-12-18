import React from 'react'
import Aboutbanner from '../component/about/Aboutbanner'
import Team from '../component/about/Team'
import FourthAbout from '../component/about/FourthAbout'
import SecondAbout from '../component/about/SecondAbout'
import ThirdAbout from '../component/about/ThirdAbout'


const About = () => {
  return (
   <>
     <Aboutbanner/>
     <SecondAbout/>
     <ThirdAbout/>
    {/* <Team/> */}
    <FourthAbout/>
   </>
  )
}

export default About