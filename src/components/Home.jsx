import '../assets/styles/Home.css'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { renderText } from '../utils/renderText'

import Grid from "./grid/Grid"
import Video from './Video'
import { useRef } from 'react'
import Scroll from './miscs/Scroll'
import Audio from './miscs/Audio'

const Home = () => {
  const text = ['MISHA MISHA', 'MISHA', 'MISHA']
  const textLineRefs = useRef([])

  const homeRef = useRef()

  gsap.registerPlugin(useGSAP)

  useGSAP(() => {
    gsap.from('.text-line .letter', {
      y: 115,
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
      y: 115,
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
    
    tl2.to('.text-line .letter', {
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
  })

  return (
    <div className="home-wrapper" ref={homeRef}>
      <Video />
      <div className="home-desc-wrapper">
        {text.map((line, lineIndex) => (
          <div className="text-line" key={`line-${lineIndex}`} ref={el => textLineRefs.current[lineIndex] = el}>
            {renderText(line)}
          </div>
        ))}
      </div>
      <Grid />
      <Audio />
      <img src="src/assets/images/misha-logo.png" className="home-logo"></img>
      <Scroll />
    </div>
  )
}

export default Home
