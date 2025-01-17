import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

import '../assets/styles/components/Video.css'

const Video = () => {
  const bgVideoRef = useRef()
  const { isPlaying } = useSelector(state => state.audio)

  useEffect(() => {
    isPlaying ? bgVideoRef.current.volume = .1 : bgVideoRef.current.volume = 0
  }, [isPlaying])

  gsap.registerPlugin(useGSAP)

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
