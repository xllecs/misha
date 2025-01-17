import { useRef } from 'react'
import { useSelector } from 'react-redux'
import { renderText } from '../../utils/renderText'

import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/all'

import '../../assets/styles/components/projects/Project.css'

const Project = ({title, imageUrl, position, projectView, initialPosition, onClick}) => {
  const style = position
    ? { top: `${position.y}%`, left: `${position.x}%` }
    : { position: 'relative', pointerEvents: 'none' }

  const projectRef = useRef()

  const { isSmallScreen } = useSelector(state => state.screenSize)

  const projectEnter = (e) => {
    const image = e.childNodes[0]
    const letters = e.childNodes[1].querySelectorAll('.letter')

    gsap.to(image, {
      filter: 'saturate(1)',
      scale: 1.3,
      duration: .3,
    })
      
    gsap.to(letters, {
      y: 0,
      ease: "power4.out",
      duration: .3,
      stagger: {
        each: .025
      }
    })
  }

  const projectLeave = (e) => {
    const image = e.childNodes[0]
    gsap.to(image, {
      filter: 'saturate(0)',
      scale: 1,
      duration: .3,
    })

    const letters = e.childNodes[1].querySelectorAll('.letter')
    gsap.to(letters, {
      y: 40,
      ease: "power4.in",
      duration: .3,
      stagger: {
        each: .025
      }
    })
  }

  gsap.registerPlugin(useGSAP)
  gsap.registerPlugin(ScrollTrigger)

  useGSAP(() => {
    if (isSmallScreen) {
      const div = projectRef.current

      const start = initialPosition + window.scrollY - window.innerHeight * 0.1
      const end = initialPosition + window.scrollY + div.offsetHeight - window.innerHeight * 0.08

      ScrollTrigger.create({
        trigger: '.projects-wrapper',
        start: `${start + 50} 360`,
        end: `${end + 200} 630`,
        onEnter: () => {
          gsap.to(div, {
            opacity: 1,
            duration: .3,
          })
          gsap.set(div, {
            pointerEvents: 'auto',
          })
          projectEnter(div)
        },
        onLeave: () => {
          gsap.to(div, {
            opacity: .5,
            duration: .3,
          })
          gsap.set(div, {
            pointerEvents: 'none',
          })
          projectLeave(div)
        },
        onEnterBack: () => {
          gsap.to(div, {
            opacity: 1,
            duration: .3,
          })
          gsap.set(div, {
            pointerEvents: 'auto',
          })
          projectEnter(div)
        },
        onLeaveBack: () => {
          gsap.to(div, {
            opacity: .5,
            duration: .3,
          })
          gsap.set(div, {
            pointerEvents: 'none',
          })
          projectLeave(div)
        },
      })
    }
  }, { dependencies: [projectView, initialPosition], revertOnUpdate: true })

  return (
    <div className="project-wrapper" onClick={onClick} style={style} ref={projectRef}
      onMouseEnter={!isSmallScreen ? (e) => projectEnter(e.currentTarget) : undefined}
      onMouseLeave={!isSmallScreen ? (e) => projectLeave(e.currentTarget) : undefined}>
      <div className="image" style={{backgroundImage: `url(${imageUrl})`}}></div>
      <div className="title-wrapper">{renderText(title)}</div>
    </div>
  )
}

export default Project
