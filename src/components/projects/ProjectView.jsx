import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import ReactLenis from 'lenis/react'
import { renderText } from '../../utils/renderText'

import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

import '../../assets/styles/components/projects/ProjectView.css'

const ProjectView = ({ videos, onReturnHome, onViewVideo }) => {
  const lenisRef = useRef()
  const videosRef = useRef()
  const nothingRef = useRef()

  const { isSmallScreen } = useSelector(state => state.screenSize)

  const gameEnter = (e) => {
    const image = e.currentTarget.querySelector('.image')
    gsap.to(image, {
      filter: 'saturate(1)',
      scale: 1.3,
      duration: .3,
    })
  }

  const gameLeave = (e) => {
    const image = e.currentTarget.querySelector('.image')
    gsap.to(image, {
      filter: 'saturate(0)',
      scale: 1,
      duration: .3,
    })
  }

  gsap.registerPlugin(useGSAP)

  useGSAP(() => {    
    gsap.from('.project-view-wrapper', {
      opacity: 0,
    })

    if (nothingRef.current) {
      gsap.from('.no-videos .letter', {
        y: '2.5vw',
        duration: .3,
        ease: "power4.out",
        stagger: {
          each: .025
        }
      })
    }
  }, [])

  useEffect(() => {
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
          onClick={onReturnHome}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M31 36L19 24L31 12"/></svg>
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
