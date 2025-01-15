import '../../assets/styles/projects/Projects.css'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef, useState } from 'react'

import gridData from "./grid-data.json"
import Project from "./Project"
import ProjectView from './ProjectView'
import VideoPlayer from './VideoPlayer'
import { useProjectView, useVideoPlayer } from './ProjectsUtils'

const ProjectsVertical = () => {
  const videoPlayerRef = useRef(null)

  const { projectView, projectId, handleProjectView, handleHomeReturn } = useProjectView(".projects-content")
  const { selectedVideo, handleViewVideo, handleCloseVideo } = useVideoPlayer(videoPlayerRef)
  
  const gridContentRef = useRef(null)
  const videos = gridData[projectId]?.videos

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

  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [])

  return (
    <div className="projects-wrapper">
      {projectView ? <ProjectView videos={videos} onReturnHome={handleHomeReturn} onViewVideo={handleViewVideo} /> :
        <div className="projects-content" style={{ transform: `translate(-50%, ${-scrollY}px)` }} ref={gridContentRef}>
          {gridData.map((game, gameIndex) => (
            <Project key={`game-${gameIndex}`}
              title={game.title}
              imageUrl={game.imageUrl}
              projectView={projectView}
              onClick={() => handleProjectView(gameIndex)} />
          ))}
        </div>}
      {selectedVideo && <div ref={videoPlayerRef}><VideoPlayer videoSrc={selectedVideo} onClose={handleCloseVideo} /></div>}
    </div>
  )
}

export default ProjectsVertical
