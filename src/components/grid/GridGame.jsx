import '../../assets/styles/grid/GridGame.css'
import { renderText } from '../../utils/renderText'
import gsap from 'gsap'

const GridGame = ({title, imageUrl, position, onClick}) => {
    const gameEnter = (e) => {
    const image = e.currentTarget.querySelector('.image')
    gsap.to(image, {
      filter: 'saturate(1)',
      scale: 1.3,
      duration: .3,
    })
      
    const letters = e.currentTarget.querySelectorAll('.title-wrapper .letter')
    gsap.to(letters, {
      y: 0,
      ease: "power4.out",
      duration: .3,
      stagger: {
        each: .025
      }
    })
  }

  const gameLeave = (e) => {
    const image = e.currentTarget.querySelector('.image')
    gsap.to(image, {
      filter: 'saturate(0)',
      scale: 1,
      duration: .3,
    })

    const letters = e.currentTarget.querySelectorAll('.title-wrapper .letter')
    gsap.to(letters, {
      y: 40,
      ease: "power4.in",
      duration: .3,
      stagger: {
        each: .025
      }
    })
  }

  return (
    <div className="game-wrapper" onClick={onClick} style={{top: `${position.y}%`, left: `${position.x}%`}}
      onMouseEnter={gameEnter}
      onMouseLeave={gameLeave}>
      <div className="image" style={{backgroundImage: `url(${imageUrl})`}}></div>
      <div className="title-wrapper">{renderText(title)}</div>
    </div>
  )
}

export default GridGame
