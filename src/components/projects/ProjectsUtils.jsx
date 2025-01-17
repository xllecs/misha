import { useState } from "react";
import gsap from "gsap";

import { useDispatch } from "react-redux";
import { stopAudio } from '../../redux/play'

export const useProjectView = (className) => {
  const [projectView, setProjectView] = useState(false);
  const [projectId, setProjectId] = useState(null)

  const handleProjectView = (projectId) => {
    setProjectId(projectId)
    gsap.to(className, {
      opacity: 0,
      onComplete: () => {
        setProjectView(true)
      }
    })
  }

  const handleHomeReturn = () => {
    gsap.to(".project-view-wrapper", {
      opacity: 0,
      onComplete: () => {
        setProjectView(false)
        window.scrollTo({ top: 0 })
      }
    });
  };

  return { projectView, projectId, handleProjectView, handleHomeReturn };
}

export const useVideoPlayer = (videoPlayerRef) => {
  const [selectedVideo, setSelectedVideo] = useState(null)
  const dispatch = useDispatch()

  const handleViewVideo = (videoUrl) => {
    gsap.from(videoPlayerRef.current, {
      opacity: 0,
      onStart: () => {
        setSelectedVideo(videoUrl)
        dispatch(stopAudio())
      }
    })
  }

  const handleCloseVideo = () => {
    gsap.to(videoPlayerRef.current, {
      opacity: 0,
      duration: .3,
      onComplete: () => {
        setSelectedVideo(null)
      }
    })
  }

  return { selectedVideo, handleViewVideo, handleCloseVideo }
} 
