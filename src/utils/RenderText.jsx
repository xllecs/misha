export const renderText = (text) => {
  return text.split('').map((letter, letterIndex) => (
    <div className="letter" key={`letter-${letterIndex}`}>{letter === ' ' ? '\u00A0' : letter}</div>
  ))
}
