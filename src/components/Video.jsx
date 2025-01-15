import '../assets/styles/Video.css'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

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
        trigger: ".grid-wrapper",
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
          <source src="src/assets/videos/0110.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="grey-bg"></div>
    </>
  )
}

export default Video
