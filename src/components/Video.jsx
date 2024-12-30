import '../assets/styles/Video.css'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

const Video = () => {
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
        <video autoPlay loop muted>
          <source src="src/assets/videos/cyanide.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="grey-bg"></div>
    </>
  )
}

export default Video
