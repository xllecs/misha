import '../../assets/styles/grid/GridGameView.css'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useEffect, useRef } from 'react'
import ReactLenis from 'lenis/react'
import { renderText } from '../../utils/renderText'

const GridGameView = ({ videos, onReturnHome, onViewVideo }) => {
  const lenisRef = useRef()

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
    gsap.from('.game-view-wrapper', {
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
    const handleMouseMove = (event) => {
      const x = event.clientX / window.innerWidth
      const y = event.clientY / window.innerHeight

      gsap.to(".game-video-wrapper", {
        x: (index) => (x - 0.2) * (index % 5 + 1) * 10,
        y: (index) => (y - 0.2) * (Math.floor(index / 5) + 1) * 10,
        duration: .7,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)

    function update(time) {
      lenisRef.current?.lenis?.raf(time * 1000)
    }

    gsap.ticker.add(update)

    return () => {
      gsap.ticker.remove(update)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <div className="game-view-wrapper">
      <div className="game-view-content">
        <div className="return-home" onClick={onReturnHome}>
          <span></span>
        </div>
        {videos ? 
          <ReactLenis
            options={{
              autoRaf: false,
              orientation: "horizontal",
              gestureOrientation: "both",
            }}
            ref={lenisRef}
            className="scrollable-content"
          >
            <div className="videos-wrapper">
              {videos.map((video, videoIndex) => (
                <div key={`video-${videoIndex}`} className="game-video-wrapper"
                  onClick={() => onViewVideo(video.videoUrl)}
                  onMouseEnter={gameEnter}
                  onMouseLeave={gameLeave}>
                  <div className="image" style={{backgroundImage: `url(${video.thumbnailUrl})`}}></div>
                  <div className="title-wrapper">{video.title}</div>
                </div>
              ))}
            </div>
          </ReactLenis> :
          <div className="no-videos">{renderText('NOTHING TO SHOW YET.')}</div>}
      </div>
    </div>
  )
}

export default GridGameView
