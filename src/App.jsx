import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useEffect, useState } from 'react'

import { useDispatch } from 'react-redux'
import { stopAudio } from './redux/play.js'
import { setIsSmallScreen } from './redux/resize.js'

import Home from './components/Home.jsx'
import Landing from './components/Landing.jsx'

import './App.css'
import './assets/styles/Responsive.css'

function App() {
  const [landing, setLanding] = useState(true)
  const dispatch = useDispatch()
  
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
    window.scrollTo(0, 0)
  })

  gsap.registerPlugin(useGSAP)

  useGSAP(() => {
    if (landing) {
      gsap.set('body', {
        overflow: 'hidden'
      })
    } else {
      gsap.set('body', {
        overflow: 'auto'
      })
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

  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize)

    if (windowWidth <= 576 || (windowWidth > 576 && windowWidth <= 768)) {
      dispatch(setIsSmallScreen())
    }

    return () => window.removeEventListener('resize', handleResize);
  }, [dispatch, windowWidth])

  return (
    <div className="app-wrapper">
      <div className="app-content">
        <Landing onPageEnter={handlePageEnter} onPageEnterNoSound={handlePageEnterNoSound} />
        {!landing && <Home />}
      </div>
    </div>
  )
}

export default App
