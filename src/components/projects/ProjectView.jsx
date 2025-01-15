import '../../assets/styles/projects/ProjectView.css'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useEffect, useRef, useState } from 'react'
import ReactLenis from 'lenis/react'
import { renderText } from '../../utils/renderText'
import { useSelector } from 'react-redux'

const ProjectView = ({ videos, onReturnHome, onViewVideo }) => {
  const lenisRef = useRef()
  const videosRef = useRef()
  const nothingRef = useRef()
  const [position, setPosition] = useState(0)

  const { isSmallScreen } = useSelector(state => state.screenSize )

  const gameEnter = (e) => {
    const image = e.currentTarget.querySelector('.image')
    gsap.to(image, {
      filter: 'saturate(1)',
      scale: 1.3,
      duration: .3,
    })
      
    const letters = e.currentTarget.querySelectorAll('.title-wrapper .letter')
    gsap.to(letters, {
      y: 0,
      ease: "power3.in",
      duration: .2,
      stagger: {
        each: .04
      }
    })
  }

  const gameLeave = (e) => {
    const image = e.currentTarget.querySelector('.image')
    gsap.to(image, {
      filter: 'saturate(0)',
      scale: 1,
      duration: .3,
    })

    const letters = e.currentTarget.querySelectorAll('.title-wrapper .letter')
    gsap.to(letters, {
      y: 40,
      ease: "power3.in",
      duration: .2,
      stagger: {
        each: .04
      }
    })
  }

  gsap.registerPlugin(useGSAP)

  useGSAP(() => {    
    gsap.from('.project-view-wrapper', {
      opacity: 0,
    })

    gsap.from('.no-videos .letter', {
      y: '2.5vw',
      duration: .3,
      ease: "power4.out",
      stagger: {
        each: .025
      }
    })
  }, [])

  useEffect(() => {
    const rect = videosRef.current ? videosRef.current.getBoundingClientRect() : nothingRef.current.getBoundingClientRect()
    setPosition(rect.left)

    function update(time) {
      lenisRef.current?.lenis?.raf(time * 1000)
    }

    gsap.ticker.add(update)

    return () => {
      gsap.ticker.remove(update)
    }
  }, [])

  return (
    <div className="project-view-wrapper">
      <div className="project-view-content">
        <div className="return-home"
          style={{ left: `${position - 90}px`, position: 'absolute' }}
          onClick={onReturnHome}>
          <span></span>
        </div>
        {videos ? 
          <ReactLenis
            options={{ autoRaf: false, orientation: isSmallScreen ? 'vertical' : 'horizontal' }}
            ref={lenisRef}
            className="scrollable-content"
          >
            <div className="videos-wrapper" ref={videosRef}>
              {videos.map((video, videoIndex) => (
                <div key={`video-${videoIndex}`} className="project-video-wrapper"
                  onClick={() => onViewVideo(video.videoUrl)}
                  onMouseEnter={gameEnter}
                  onMouseLeave={gameLeave}>
                  <div className="image" style={{backgroundImage: `url(${video.thumbnailUrl})`}}></div>
                  <div className="title-wrapper">{video.title}</div>
                </div>
              ))}
            </div>
          </ReactLenis> :
          <div className="no-videos" ref={nothingRef}>{renderText('NOTHING TO SHOW YET')}</div>}
      </div>
    </div>
  )
}

export default ProjectView
