import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useEffect, useRef, useState } from 'react'

import projectsData from "./projects-data.json"
import Project from "./Project"
import ProjectView from './ProjectView'
import VideoPlayer from './VideoPlayer'
import { useProjectView, useVideoPlayer } from './ProjectsUtils'

import '../../assets/styles/components/projects/ProjectsVertical.css'

const ProjectsVertical = () => {
  const videoPlayerRef = useRef(null)

  const { projectView, projectId, handleProjectView, handleHomeReturn } = useProjectView(".projects-content")
  const { selectedVideo, handleViewVideo, handleCloseVideo } = useVideoPlayer(videoPlayerRef)
  
  const gridContentRef = useRef(null)
  const videos = projectsData[projectId]?.videos

  gsap.registerPlugin(useGSAP)

  useGSAP(() => {    
    if (!projectView) {
      gsap.set('body', {
        overflow: 'hidden',
      })

      gsap.from(".projects-content", {
        opacity: 0,
        duration: .8,
        onComplete: () => {
          gsap.set("body", {
            overflow: 'auto',
          })
        }
      })
    }
  }, { dependencies: [projectView], revertOnUpdate: true } )

  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const [initialPositions, setInitialPositions] = useState([])

  useEffect(() => {
    if (gridContentRef.current && projectsData.length > 0) {
      const positions = projectsData.map((_, index) => {
        const div = gridContentRef.current.children[index]
        if (div) {
          const rect = div.getBoundingClientRect()
          return rect.top + window.scrollY
        }
        return 0
      })
      setInitialPositions(positions)
    }
  }, [])

  return (
    <div className="projects-wrapper">
      {projectView ? <ProjectView videos={videos} onReturnHome={handleHomeReturn} onViewVideo={handleViewVideo} /> :
        <div className="projects-content" style={{ transform: `translate(-50%, ${-scrollY}px)` }} ref={gridContentRef}>
          {projectsData.map((project, projectIndex) => (
            <Project key={`project-${projectIndex}`}
              title={project.title}
              imageUrl={project.imageUrl}
              projectView={projectView}
              initialPosition={initialPositions[projectIndex]}
              onClick={() => handleProjectView(projectIndex)} />
          ))}
        </div>}
      {selectedVideo && <div ref={videoPlayerRef}><VideoPlayer videoSrc={selectedVideo} onClose={handleCloseVideo} /></div>}
    </div>
  )
}

export default ProjectsVertical
