import '../../assets/styles/grid/Grid.css'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef, useState } from 'react'

import gridData from "./grid-data.json"
import GridGame from "./GridGame"
import GridGameView from './GridGameView'
import VideoPlayer from './VideoPlayer'
import { useDispatch } from 'react-redux'
import { playAudio, stopAudio } from '../../redux/play'
import ReactLenis from 'lenis/react'

const Grid = () => {
  const [gameView, setGameView] = useState(false)
  const [gameId, setGameId] = useState(null)
  const [selectedVideo, setSelectedVideo] = useState(null)
  const dispatch = useDispatch()
  
  const videoPlayerRef = useRef(null)
  const gridContentRef = useRef(null)
  const lenisRef = useRef()
  const videos = gridData[gameId]?.videos

  const handleGameView = (gameIndex) => {
    setGameId(gameIndex)
    gsap.to(".grid-content", {
      opacity: 0,
      onComplete: () => {
        setGameView(true)
      }
    })
  }

  if (gameView) {
    gsap.set('.app-content', {
      overflow: 'hidden'
    })
    // document.body.style.overflow = 'hidden'
  } else {
    gsap.set('.app-content', {
      overflow: 'auto'
    })
    // document.body.style.overflow = 'auto'
  }

  const handleViewVideo = (videoUrl) => {
    gsap.from(videoPlayerRef.current, {
      opacity: 0,
      onStart: () => {
        setSelectedVideo(videoUrl)
        dispatch(stopAudio())
      }
    })
  }

  const handleClose = () => {
    gsap.to(videoPlayerRef.current, {
      opacity: 0,
      duration: .3,
      onComplete: () => {
        setSelectedVideo(null)
      }
    })
  }

  const returnHome = () => {
    gsap.to(".game-view-wrapper", {
      opacity: 0,
      onComplete: () => {
        setGameView(false)
        window.scrollTo({ top: 0 })
      }
    })
  }

  gsap.registerPlugin(ScrollTrigger)
  gsap.registerPlugin(useGSAP)

  useGSAP(() => {
    if (!gameView) {
      gsap.from(".grid-content", {
        opacity: 0,
        duration: .8,
      })

      gsap.to(".grid-content", {
        transform: 'rotateY(0deg) translateY(-50%) translateX(-50%)',
        left: '50%',
        opacity: 1,
        scrollTrigger: {
          trigger: ".grid-wrapper",
          scrub: true,
          start: "top top",
          end: "bottom 361",
        },
        immediateRender: false,
        onUpdate: () => {
          gsap.set(".grid-content", {
            pointerEvents: 'none',
          })
        },
        onComplete: () => {
          gsap.set(".grid-content", {
            pointerEvents: 'auto',
          })
        },
      })
    }
  }, { dependencies: [gameView], revertOnUpdate: true } )

  useEffect(() => {
    const handleMouseMove = (event) => {
      const x = event.clientX / window.innerWidth;
      const y = event.clientY / window.innerHeight;

      gsap.to(".game-wrapper", {
        x: (index) => (x - 0.5) * (index % 5 + 1) * 40,
        y: (index) => (y - 0.5) * (Math.floor(index / 5) + 1) * 40,
        duration: .7,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [])

  return (
    <div className="grid-wrapper">
      {gameView ? <GridGameView videos={videos} onReturnHome={returnHome} onViewVideo={handleViewVideo} /> :
        <div className="grid-content" ref={gridContentRef}>
          {gridData.map((game, gameIndex) => (
            <GridGame key={`game-${gameIndex}`}
              title={game.title}
              imageUrl={game.imageUrl}
              position={game.position}
              onClick={() => handleGameView(gameIndex)} />
          ))}
        </div>}
      {selectedVideo && <div ref={videoPlayerRef}><VideoPlayer videoSrc={selectedVideo} onClose={handleClose} /></div>}
    </div>
  )
}

export default Grid
