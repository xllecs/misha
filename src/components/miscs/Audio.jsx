import '../../assets/styles/miscs/Audio.css'
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { useGSAP } from '@gsap/react'
import { useDispatch, useSelector } from 'react-redux'
import { playAudio, stopAudio } from '../../redux/play'

const Audio = () => {
  const { isPlaying } = useSelector(state => state.audio)
  const dispatch = useDispatch()
  const audioRef = useRef(null)
  const barsRef = useRef([])

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play()
    } else {
      audioRef.current.pause()
    }
  })

  const animateAudio = (isPlaying) => {
    if (!isPlaying) {
      gsap.set('#background-audio', {
        onComplete: () => {
          audioRef.current.pause()
          barsRef.current.forEach(bar => {
            bar.style.animationPlayState = 'paused'
          })
        }
      })
    } else {
      gsap.set('#background-audio', {
        onComplete: () => {
          audioRef.current.play()
          barsRef.current.forEach(bar => {
            bar.style.animationPlayState = 'running'
          })
        }
      })
    }
  }

  const toggleAudio = () => {
    if (!isPlaying) {
      dispatch(playAudio())
      animateAudio(false)
    } else {
      dispatch(stopAudio())
      animateAudio(true)
    }
  }

  gsap.registerPlugin(useGSAP)
  useGSAP(() => {
    animateAudio(isPlaying)

    return () => {
      gsap.killTweensOf('#background-audio')
    }
  }, [isPlaying])

  return (
    <div className="audio-wrapper" onClick={toggleAudio}>
      <audio id="background-audio" ref={audioRef}>
        <source src="src/assets/chihiro.mp3" type="audio/mp3" />
      </audio>
      <div className="bars">
        <span className="bar" ref={el => barsRef.current[0] = el}></span>
        <span className="bar" ref={el => barsRef.current[1] = el}></span>
        <span className="bar" ref={el => barsRef.current[2] = el}></span>
        <span className="bar" ref={el => barsRef.current[3] = el}></span>
      </div>
    </div>
  )
}

export default Audio
