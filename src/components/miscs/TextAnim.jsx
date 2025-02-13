import gsap from "gsap"

import '../../assets/styles/components/miscs/TextAnim.css'
import { useGSAP } from "@gsap/react"

const TextAnim = () => {
  const phrase1 = "Hi! I'm Misha!"
  const phrase2 = 'And this is a little window into my world.'
  const phrase3 = 'A part of me I choose to share with you,'
  const phrase4 = 'A part I hope you enjoy!'

  useGSAP(() => {
    gsap.from('.text-anim-1 .word-0', {
      opacity: 0,
      duration: .5,
      delay: .9,
    })

    gsap.from('.text-anim-1 .word-1', {
      opacity: 0,
      duration: .5,
      delay: 1.25,
    })

    gsap.from('.text-anim-1 .word-2', {
      opacity: 0,
      duration: .5,
      delay: 1.45,
    })

    gsap.to('.text-anim-1 .word', {
      opacity: 0,
      duration: .5,
      delay: 1.7,
    })

    gsap.from('.text-anim-2 .word-0', {
      opacity: 0,
      duration: .5,
      delay: 2,
    })

    gsap.from('.text-anim-2 .word-1', {
      opacity: 0,
      duration: .5,
      delay: 2.1,
    })

    gsap.from('.text-anim-2 .word-2', {
      opacity: 0,
      duration: .5,
      delay: 2.5,
    })

    gsap.from('.text-anim-2 .word-3', {
      opacity: 0,
      duration: .5,
      delay: 2.6,
    })

    gsap.from('.text-anim-2 .word-4', {
      opacity: 0,
      duration: .5,
      delay: 2.7,
    })

    gsap.from('.text-anim-2 .word-5', {
      opacity: 0,
      duration: .5,
      delay: 2.9,
    })

    gsap.from('.text-anim-2 .word-6', {
      opacity: 0,
      duration: .5,
      delay: 3.25,
    })

    gsap.from('.text-anim-2 .word-7', {
      opacity: 0,
      duration: .5,
      delay: 3.35,
    })

    gsap.from('.text-anim-2 .word-8', {
      opacity: 0,
      duration: .5,
      delay: 3.55,
    })

    gsap.to('.text-anim-2 .word', {
      opacity: 0,
      duration: .5,
      delay: 3.85,
      stagger: true
    })

    gsap.from('.text-anim-3 .word-0', {
      opacity: 0,
      duration: .5,
      delay: 4.25,
    })

    gsap.from('.text-anim-3 .word-1', {
      opacity: 0,
      duration: .5,
      delay: 4.35,
    })

    gsap.from('.text-anim-3 .word-2', {
      opacity: 0,
      duration: .5,
      delay: 4.45,
    })

    gsap.from('.text-anim-3 .word-3', {
      opacity: 0,
      duration: .5,
      delay: 4.55,
    })

    gsap.from('.text-anim-3 .word-4', {
      opacity: 0,
      duration: .5,
      delay: 4.7,
    })

    gsap.from('.text-anim-3 .word-5', {
      opacity: 0,
      duration: .5,
      delay: 4.95,
    })

    gsap.from('.text-anim-3 .word-6', {
      opacity: 0,
      duration: .5,
      delay: 5.15,
    })

    gsap.from('.text-anim-3 .word-7', {
      opacity: 0,
      duration: .5,
      delay: 5.35,
    })

    gsap.from('.text-anim-3 .word-8', {
      opacity: 0,
      duration: .5,
      delay: 5.55,
    })

    gsap.from('.text-anim-3 .word-9', {
      opacity: 0,
      duration: .5,
      delay: 5.7,
    })

    gsap.to('.text-anim-3 .word', {
      opacity: 0,
      duration: .5,
      delay: 6.15,
      stagger: true
    })

    gsap.from('.text-anim-4 .word-0', {
      opacity: 0,
      duration: .5,
      delay: 6.55,
    })

    gsap.from('.text-anim-4 .word-1', {
      opacity: 0,
      duration: .5,
      delay: 6.7,
    })

    gsap.from('.text-anim-4 .word-2', {
      opacity: 0,
      duration: .5,
      delay: 6.95,
    })

    gsap.from('.text-anim-4 .word-3', {
      opacity: 0,
      duration: .5,
      delay: 7.15,
    })

    gsap.from('.text-anim-4 .word-4', {
      opacity: 0,
      duration: .5,
      delay: 7.35,
    })

    gsap.from('.text-anim-4 .word-5', {
      opacity: 0,
      duration: .5,
      delay: 7.55,
    })

    gsap.from('.text-anim-4 .word-6', {
      opacity: 0,
      duration: .5,
      delay: 7.7,
    })

    gsap.to('.text-anim-4 .word', {
      opacity: 0,
      duration: .5,
      delay: 9.7,
      stagger: true
    })
  })

  return (
    <div className="text-anim-wrapper">
      <div className="text-anim-1 text-anim">
        {phrase1.split(' ').map((word, wordIndex) => (
          <div className={`word word-${wordIndex}`} key={`word-${wordIndex}`}>{word + '\u00A0'}</div>
        ))}
      </div>

      <div className="text-anim-2 text-anim">
        {phrase2.split(' ').map((word, wordIndex) => (
          <div className={`word word-${wordIndex}`} key={`word-${wordIndex}`}>{word + '\u00A0'}</div>
        ))}
      </div>

      <div className="text-anim-3 text-anim">
        {phrase3.split(' ').map((word, wordIndex) => (
          <div className={`word word-${wordIndex}`} key={`word-${wordIndex}`}>{word + '\u00A0'}</div>
        ))}
      </div>

      <div className="text-anim-4 text-anim">
        {phrase4.split(' ').map((word, wordIndex) => (
          <div className={`word word-${wordIndex}`} key={`word-${wordIndex}`}>{word + '\u00A0'}</div>
        ))}
      </div>
    </div>
  )
}

export default TextAnim
