import { useEffect, useRef, useState } from 'react'
import '../../assets/styles/grid/VideoPlayer.css'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

const VideoPlayer = ({ videoSrc, onClose }) => {
  const [play, setPlay] = useState(true)
  const [volume, setVolume] = useState(1)
  const videoRef = useRef(null)
  const progressRef = useRef(null)

  const handlePlay = () => {
    let tl = gsap.timeline({
      onComplete: () => {
        tl.revert()
      }
    })
    const duration = .25
    const opacity = .75

    if (play) {
      tl.to('.pause-center', {
        opacity: opacity,
        duration: duration,
        scale: 1.3,
      })
      .to('.pause-center', {
        opacity: 0,
        duration: duration,
      })
      videoRef.current.pause()
    } else {
      tl.to('.play-center', {
        opacity: opacity,
        duration: duration,
        scale: 1.3,
      })
      .to('.play-center', {
        opacity: 0,
        duration: duration,
      })
      videoRef.current.play()
    }
    setPlay(!play)
  }

  gsap.registerPlugin(useGSAP)
  useGSAP(() => {
    gsap.from('.video-player-wrapper', {
      duration: .3,
      opacity: 0,
    })
  }, [])

  useEffect(() => {
    const videoElement = videoRef.current
    const handleEnded = () => {
      setPlay(false)
    }

    videoElement.addEventListener('ended', handleEnded)

    return () => {
      videoElement.removeEventListener('ended', handleEnded)
    }
  }, [])

  const videoEnter = () => {
    gsap.to('.video-gradient, .video-controls', {
      opacity: 1,
      duration: .2,
      display: 'flex',
    })
  }

  const videoLeave = () => {
    gsap.to('.video-gradient, .video-controls', {
      opacity: 0,
      duration: .2,
      display: 'none',
    })
  }

  const videoTime = () => {
    const percentage = videoRef.current.currentTime / videoRef.current.duration * 100
    gsap.to('.progress-bar', {
      width: `${percentage}%`,
    })
  }

  const videoSeek = (e) => {
    const rect = progressRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / progressRef.current.offsetWidth) * videoRef.current.duration
    videoRef.current.currentTime = newTime
  }

  const progressEnter = () => {
    gsap.to('.progress-wrapper', {
      height: '0.5vw',
      duration: .2,
    })
  }

  const progressLeave = () => {
    gsap.to('.progress-wrapper', {
      height: '0.2vw',
      duration: .2,
      delay: .2,
    })
  }

  const changeVolume = (e) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    videoRef.current.volume = newVolume
  }

  return (
    <div className="video-player-wrapper">
      <div className="video-player-bg"></div>
      <div className="video-player" onMouseEnter={videoEnter} onMouseLeave={videoLeave}>
        <video autoPlay ref={videoRef} onClick={handlePlay} onTimeUpdate={videoTime}>
          <source src={videoSrc} type="video/mp4" />
        </video>

        <svg className="close-icon" onClick={onClose} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m7.05 5.636l4.95 4.95l4.95-4.95l1.414 1.414l-4.95 4.95l4.95 4.95l-1.415 1.414l-4.95-4.95l-4.949 4.95l-1.414-1.414l4.95-4.95l-4.95-4.95L7.05 5.636Z"/></svg>

        <svg className="play-center" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 23c6.075 0 11-4.925 11-11S18.075 1 12 1S1 5.925 1 12s4.925 11 11 11Zm-3.5-5.37V6.37L18.25 12L8.5 17.63Z"/></svg> :
        <svg className="pause-center" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 23c6.075 0 11-4.925 11-11S18.075 1 12 1S1 5.925 1 12s4.925 11 11 11ZM8 7h3v10H8V7Zm5 0h3v10h-3V7Z"/></svg>

        <div className="video-gradient"></div>
        <div className="video-controls">
          <div className="video-controls-content">
            <div className="progress-wrapper" onClick={e => videoSeek(e)} ref={progressRef} onMouseEnter={progressEnter} onMouseLeave={progressLeave}>
              <div className="progress-bar"></div>
            </div>

            <div className="below">
              <div className="play-pause" onClick={handlePlay}>
                {play ?
                  <svg className="play-bottom" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.25 12L8.5 17.629V6.37L18.25 12Z"/></svg> :
                  <svg className="pause-bottom" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M11 17V7H8v10h3Zm5 0V7h-3v10h3Z"/></svg>}
              </div>
              <div className="volume-container">
                <input type="range" id="volume-slider" min="0" max="1" step="0.01" value={volume} onInput={changeVolume} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoPlayer
