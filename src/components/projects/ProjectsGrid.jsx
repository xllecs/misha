import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'

import gridData from "./grid-data.json"
import Project from "./Project"
import ProjectView from './ProjectView'
import VideoPlayer from './VideoPlayer'
import { useProjectView, useVideoPlayer } from './ProjectsUtils'

import '../../assets/styles/projects/Grid.css'

const ProjectsGrid = () => {
  const videoPlayerRef = useRef(null)

  const { projectView, projectId, handleProjectView, handleHomeReturn } = useProjectView('.grid-content')
  const { selectedVideo, handleViewVideo, handleCloseVideo } = useVideoPlayer(videoPlayerRef)
  
  const gridContentRef = useRef(null)
  const videos = gridData[projectId]?.videos

  gsap.registerPlugin(ScrollTrigger)
  gsap.registerPlugin(useGSAP)

  useGSAP(() => {
    console.log('projectView', projectView)

    if (!projectView) {
      gsap.set('body', {
        overflow: 'hidden',
      })

      gsap.from(".grid-content", {
        opacity: 0,
        duration: .8,
        onComplete: () => {
          gsap.set("body", {
            overflow: 'auto',
          })
        }
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
          markers: true,
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
  }, { dependencies: [projectView], revertOnUpdate: true } )

  useEffect(() => {
    const handleMouseMove = (event) => {
      const x = event.clientX / window.innerWidth
      const y = event.clientY / window.innerHeight

      gsap.to(".project-wrapper", {
        x: (index) => (x - 0.5) * (index % 5 + 1) * 40,
        y: (index) => (y - 0.5) * (Math.floor(index / 5) + 1) * 40,
        duration: .7,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <div className="grid-wrapper">
      {projectView ? <ProjectView videos={videos} onReturnHome={handleHomeReturn} onViewVideo={handleViewVideo} /> :
        <div className="grid-content" ref={gridContentRef}>
          {gridData.map((project, projectId) => (
            <Project key={`project-${projectId}`}
              title={project.title}
              imageUrl={project.imageUrl}
              position={project.position}
              onClick={() => handleProjectView(projectId)} />
          ))}
        </div>}
      {selectedVideo && <div ref={videoPlayerRef}><VideoPlayer videoSrc={selectedVideo} onClose={handleCloseVideo} /></div>}
    </div>
  )
}

export default ProjectsGrid
