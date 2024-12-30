import './App.css'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useEffect,  useRef,  useState } from 'react'

import Home from './components/Home.jsx'
import Landing from './components/Landing.jsx'
import { useDispatch } from 'react-redux'
import { stopAudio } from './redux/play.js'
import ReactLenis from 'lenis/react'

function App() {
  const [landing, setLanding] = useState(true)
  const dispatch = useDispatch()
  const lenisRef = useRef()
  
  const handlePageEnter = () => {
    gsap.to('.landing-wrapper', {
      opacity: 0,
      display: 'none',
    })

    setLanding(false)
  }

  const handlePageEnterNoSound = () => {
    gsap.to('.landing-wrapper', {
      opacity: 0,
      display: 'none',
    })

    setLanding(false)
    dispatch(stopAudio())
  }

  useEffect(() => {
    window.scrollTo({ top: 0 })
  })

  // useEffect(() => {
  //   function update(time) {
  //     lenisRef.current?.lenis?.raf(time * 1000);
  //   }

  //   gsap.ticker.add(update);

  //   return () => gsap.ticker.remove(update);
  // }, [])

  gsap.registerPlugin(useGSAP)

  useGSAP(() => {
    if (landing) {
      gsap.set('.app-wrapper', {
        overflow: 'hidden'
      })
      // document.body.style.overflow = 'hidden'
    } else {
      gsap.set('.app-wrapper', {
        overflow: 'auto'
      })
      // document.body.style.overflow = 'auto'
    }
  }, [landing])

  // const progressEnter = () => {
  //   console.log('asd')
  //   gsap.to('.test-wrapper .progress-bar', {
  //     height: '2vw',
  //     duration: .2,
  //   })
  // }

  // const progressLeave = () => {
  //   gsap.to('.test-wrapper .progress-bar', {
  //     height: '0.2vw',
  //     duration: .2,
  //   })
  // }

  return (
    <div className="app-wrapper">
      {/* <ReactLenis
        options={{
          autoRaf: false,
          orientation: "vertical",
          // gestureOrientation: "both",
        }}
        ref={lenisRef}
        className="app-content"
      > */}
      <div className="app-content">
        <Landing onPageEnter={handlePageEnter} onPageEnterNoSound={handlePageEnterNoSound} />
        {!landing && <Home />}
      </div>
      {/* </ReactLenis> */}
    </div>
  )
}

export default App
