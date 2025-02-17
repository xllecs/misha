import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/all'

import { useRef } from 'react'
import { useSelector } from 'react-redux'

import ProjectsGrid from "../components/projects/ProjectsGrid"
import Video from '../components/Video'
import Scroll from '../components/miscs/Scroll'
import Audio from '../components/miscs/Audio'
import ProjectsVertical from '../components/projects/ProjectsVertical'

import '../assets/styles/pages/Home.css'
import TextAnim from '../components/miscs/TextAnim'

const Home = ({ landing }) => {
  const homeRef = useRef()

  gsap.registerPlugin(useGSAP)
  gsap.registerPlugin(ScrollTrigger)

  const { isSmallScreen } = useSelector(state => state.screenSize)

  useGSAP(() => {
    if (!landing) {
      gsap.from('.text-line .letter', {
        y: 120,
        duration: .5,
        ease: "power4.out",
        delay: .3,
        stagger: {
          each: .04
        },
      })
  
      const tl1 = gsap.timeline({
        scrollTrigger: {
          trigger: ".grid-wrapper",
          start: "200 top",
          end: "bottom top",
          toggleActions: "play reverse play reverse",
        }
      })
      
      tl1.to('.text-line .letter', {
        y: 120,
        duration: .5,
        ease: "power4.in",
        stagger: {
          each: .04
        },
      })
  
      const tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: ".grid-wrapper",
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      })
      
      tl2.to('.text-anim-wrapper', {
        filter: 'blur(6px)',
      })
  
      const tl3 = gsap.timeline({
        scrollTrigger: {
          trigger: ".grid-wrapper",
          start: "30 top",
          end: "bottom top",
          toggleActions: "play reverse play reverse",
        }
      })
    
      tl3.to('.scroll-wrapper', {
        opacity: 0,
        duration: .7,
        display: 'none',
      })
    }
  }, {dependencies: [landing, isSmallScreen]})

  return (
    <div className="home-wrapper" ref={homeRef}>
      <Video />
      <TextAnim />
      {isSmallScreen ? <ProjectsVertical /> : <ProjectsGrid />}
      <Audio />
      <img src="src/assets/images/misha-logo.png" className="home-logo"></img>
      <Scroll />
    </div>
  )
}

export default Home
