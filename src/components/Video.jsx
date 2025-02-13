import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'

import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

import '../assets/styles/components/Video.css'

const Video = () => {
  const [isVisible, setIsVisible] = useState(true)
  const bgVideoRef = useRef()
  const { isPlaying } = useSelector(state => state.audio)

  const handleVisibilityChange = () => {
    setIsVisible(!document.hidden)
  }

  useEffect(() => {
    document.addEventListener('visibilitychange', handleVisibilityChange)

    isVisible ? bgVideoRef.current.play() : bgVideoRef.current.pause()

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [isVisible])

  useEffect(() => {
    isPlaying ? bgVideoRef.current.volume = .3 : bgVideoRef.current.volume = 0
  }, [isPlaying])

  useGSAP(() => {
    gsap.to('.video-wrapper', {
      filter: 'blur(6px)',
      scrollTrigger: {
        trigger: ".projects-wrapper",
        start: "top top",
        end: "bottom top",
        scrub: true,
      }
    })
  })

  return (
    <>
      <div className="video-wrapper">
        <video autoPlay loop ref={bgVideoRef}>
          <source src="src/assets/videos/bg-video.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="grey-bg"></div>
    </>
  )
}

export default Video
