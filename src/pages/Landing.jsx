import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { renderText } from '../utils/renderText'

import '../assets/styles/pages/Landing.css'

const Landing = ({ onPageEnter, onPageEnterNoSound }) => {
  const promoTitle = 'PROMO SERVICES'
  const promoDesc = 'Lovely promoter of Metin2, FiveM and BDO!'
  const buttonText = 'SEE MORE'

  useGSAP(() => {
    gsap.from('.landing-content, .landing-buttons', {
      opacity: 0,
      duration: 1.7,
    })

    gsap.from('.landing-title .letter', {
      y: "1.3em",
      duration: .8,
      ease: "power4.out",
      stagger: {
        each: .05
      },
    })

    gsap.from('.right-side .link', {
      y: 35,
      duration: 1,
      opacity: 0,
      ease: "power3.out",
      stagger: {
        each: .2
      },
    })

    gsap.from('.landing-desc .letter', {
      y: "1.3em",
      duration: .3,
      ease: "power4.out",
      stagger: {
        each: .02
      },
    })
  }, [])

  const buttonEnter = () => {
    gsap.to('.words-up .letter', {
      y: "-1.3em",
      duration: .3,
      stagger: {
        each: .02
      },
    })

    gsap.to('.words-down .letter', {
      y: "-1.3em",
      duration: .3,
      stagger: {
        each: .02
      },
    })
  }

  const buttonLeave = () => {
    gsap.to('.words-up .letter', {
      y: 0,
      duration: .3,
      stagger: {
        each: .02
      },
    })

    gsap.to('.words-down .letter', {
      y: 0,
      duration: .3,
      stagger: {
        each: .02
      },
    })
  }

  const linkEnter = (e) => {
    gsap.to(e.currentTarget, {
      opacity: 1,
      duration: .4
    })
  }

  const linkLeave = (e) => {
    gsap.to(e.currentTarget, {
      opacity: .75,
      duration: .4
    })
  }

  return (
    <div className="landing-wrapper">
      <div className="landing-content">
        <img src="src/assets/images/misha-new-logo.png" className="misha-logo" />

        <div className="right-side">
          <div className="right-side-content">
            <div className="landing-title">
              {renderText(promoTitle)}
            </div>

            <div className="landing-desc">
              {renderText(promoDesc)}
            </div>

            <div className="links">
              <a href='https://discord.gg/mishasel' onMouseEnter={e => linkEnter(e)} onMouseLeave={e => linkLeave(e)} target="_blank"><svg className="link" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16"><path d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011a.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0a8.258 8.258 0 0 0-.412-.833a.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02a.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059a.051.051 0 0 0-.018-.011a8.875 8.875 0 0 1-1.248-.595a.05.05 0 0 1-.02-.066a.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085a8.254 8.254 0 0 1-1.249.594a.05.05 0 0 0-.03.03a.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019a13.235 13.235 0 0 0 4.001-2.02a.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612c0-.889.637-1.613 1.438-1.613c.807 0 1.45.73 1.438 1.613c0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612c0-.889.637-1.613 1.438-1.613c.807 0 1.451.73 1.438 1.613c0 .888-.631 1.612-1.438 1.612Z"/></svg></a>
              <a href='https://www.youtube.com/@Mishaele' onMouseEnter={e => linkEnter(e)} onMouseLeave={e => linkLeave(e)} target="_blank"><svg xmlns="http://www.w3.org/2000/svg" className="link" width="24" height="24" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg></a>
              <a href='https://www.tiktok.com/@misha_pinkpetal' onMouseEnter={e => linkEnter(e)} onMouseLeave={e => linkLeave(e)} target="_blank"><svg className="link" width="24" height="24" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M16.656 1.029c1.637-0.025 3.262-0.012 4.886-0.025 0.054 2.031 0.878 3.859 2.189 5.213l-0.002-0.002c1.411 1.271 3.247 2.095 5.271 2.235l0.028 0.002v5.036c-1.912-0.048-3.71-0.489-5.331-1.247l0.082 0.034c-0.784-0.377-1.447-0.764-2.077-1.196l0.052 0.034c-0.012 3.649 0.012 7.298-0.025 10.934-0.103 1.853-0.719 3.543-1.707 4.954l0.020-0.031c-1.652 2.366-4.328 3.919-7.371 4.011l-0.014 0c-0.123 0.006-0.268 0.009-0.414 0.009-1.73 0-3.347-0.482-4.725-1.319l0.040 0.023c-2.508-1.509-4.238-4.091-4.558-7.094l-0.004-0.041c-0.025-0.625-0.037-1.25-0.012-1.862 0.49-4.779 4.494-8.476 9.361-8.476 0.547 0 1.083 0.047 1.604 0.136l-0.056-0.008c0.025 1.849-0.050 3.699-0.050 5.548-0.423-0.153-0.911-0.242-1.42-0.242-1.868 0-3.457 1.194-4.045 2.861l-0.009 0.030c-0.133 0.427-0.21 0.918-0.21 1.426 0 0.206 0.013 0.41 0.037 0.61l-0.002-0.024c0.332 2.046 2.086 3.59 4.201 3.59 0.061 0 0.121-0.001 0.181-0.004l-0.009 0c1.463-0.044 2.733-0.831 3.451-1.994l0.010-0.018c0.267-0.372 0.45-0.822 0.511-1.311l0.001-0.014c0.125-2.237 0.075-4.461 0.087-6.698 0.012-5.036-0.012-10.060 0.025-15.083z"></path></svg></a>
            </div>
          </div>
        </div>
      </div>

      <div className="landing-buttons">
        <div className="enter-button"
          onClick={onPageEnter}
          onMouseEnter={buttonEnter}
          onMouseLeave={buttonLeave}>
            <div className="enter-button-content">
              <div className="enter-text">
                <div className="words-up">
                  {renderText(buttonText)}
                </div>
                <div className="words-down">
                  {renderText(buttonText)}
                </div>
              </div>
              <div className="enter-arrow">
                <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 48 48"><path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M19 12L31 24L19 36"/></svg>
              </div>
            </div>
        </div>
        <div className="no-sound" onClick={onPageEnterNoSound}>ENTER WITHOUT SOUND</div>
      </div>
    </div>
  )
}

export default Landing
