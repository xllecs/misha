import { useRef, useState } from "react"

import gsap from "gsap"
import { useGSAP } from '@gsap/react'

import { useDispatch, useSelector } from 'react-redux'
import { playAudio, stopAudio } from '../../redux/play'

import '../../assets/styles/components/miscs/Audio.css'

const Audio = () => {
  const { isPlaying } = useSelector(state => state.audio)
  const dispatch = useDispatch()
  
  const audioRef = useRef(null)
  const barsRef = useRef([])
  const barAnimationsRef = useRef([])

  const [initialHeights, setInitialHeights] = useState([])
  const [initialOpacities, setInitialOpacities] = useState([])

  const createBounceAnimation = (bar, delay = 0) => {
    return gsap.to(bar, {
      keyframes: [
        { height: '30%', opacity: 0.2, duration: 0.22 },
        { height: '100%', opacity: 0.6, duration: 0.44 },
        { height: '50%', opacity: 0.3, duration: 0.3 },
        { height: '75%', opacity: 0.55, duration: 0.16 },
        { height: '60%', opacity: 0.4, duration: 0.18 },
      ],
      repeat: -1,
      yoyo: true,
      delay: delay,
      duration: 2,
      paused: true
    })
  }

  useGSAP(() => {
    if (barsRef.current) {
      barAnimationsRef.current = barsRef.current.map((bar, index) => {
        const delays = [0, -2.2, -3.7, -5]
        return createBounceAnimation(bar, delays[index] || 0)
      })
    }
  }, {dependencies: []})

  const animateAudio = (isPlaying) => {
    let heights = []
    let opacities = []

    if (barAnimationsRef.current) {
      barAnimationsRef.current.forEach((animation, index) => {
        if (isPlaying) {
          gsap.to(barsRef.current[index], {
            height: initialHeights[index],
            opacity: initialOpacities[index], duration: .25,
            onComplete: () => {
              animation.play()
            }})          
          } else {
            animation.pause()
            heights.push(barsRef.current[index].clientHeight)
            opacities.push(barsRef.current[index].style.opacity)
            gsap.to(barsRef.current[index], { height: '15%', opacity: '.1', duration: .4 })
          }
      })
    }

    setInitialHeights(heights)
    setInitialOpacities(opacities)
  }

  const toggleAudio = () => {
    if (!isPlaying) {
      dispatch(playAudio())
      animateAudio(true)
    } else {
      dispatch(stopAudio())
      animateAudio(false)
    }
  }

  gsap.registerPlugin(useGSAP)

  useGSAP(() => {
    animateAudio(isPlaying)

    // return () => {
    //   gsap.killTweensOf('#background-audio')
    // }
  }, {dependencies: [isPlaying]})

  return (
    <div className="audio-wrapper" onClick={toggleAudio}>
      <audio id="background-audio" ref={audioRef}>
        <source src="src/assets/chihiro.mp3" type="audio/mp3" />
      </audio>
      <div className="bars">
        <div className="bar" ref={el => barsRef.current[0] = el}></div>
        <div className="bar" ref={el => barsRef.current[1] = el}></div>
        <div className="bar" ref={el => barsRef.current[2] = el}></div>
        <div className="bar" ref={el => barsRef.current[3] = el}></div>
      </div>
    </div>
  )
}

export default Audio
