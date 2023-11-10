import React , { useEffect } from 'react'
import './level.css'

const Level = ({setLevel,level}) => {

  const totalButtons = 10;

  useEffect(() => {
    for (let i = 1; i <= totalButtons; i++) {
      const button = document.getElementById(i.toString());
      if (button) {
        if (i <= level) {
          if (i <= 5) {
            button.classList.add('levelButtonFirst');
          } else if (i <= 8) {
            button.classList.add('levelButtonSecond');
          } else {
            button.classList.add('levelButtonThird');
          }
        } else {
          button.className = 'levelButton';
        }
      }
    }
  }, []);

  const handleClick = (event: { target: { id: any; }; }) => {
    const clickedId = Number(event.target.id);

    const onlyFirstButtonLit = Array.from(document.getElementsByClassName('levelButtonFirst')).length === 1
      && !document.getElementsByClassName('levelButtonSecond').length
      && !document.getElementsByClassName('levelButtonThird').length;
  
    if (clickedId === 1 && onlyFirstButtonLit) {
      for (let i = 1; i <= totalButtons; i++) {
        const button = document.getElementById(i.toString());
        if (button) {
          button.className = 'levelButton';
        }
      }
      setLevel(0)
    } else {
      setLevel(clickedId)
      for (let i = 1; i <= totalButtons; i++) {
        const button = document.getElementById(i.toString());
        if (button) {
          if (i <= clickedId) {
            if (i <= 5) {
              button.classList.add('levelButtonFirst');
            } else if (i <= 8) {
              button.classList.add('levelButtonSecond');
            } else {
              button.classList.add('levelButtonThird');
            }
          } else {
            button.className = 'levelButton';
          }
        }
      }
    }
  }

  return (
    <div className='levelButtonComponent'>
      <h2>解除状態</h2>
      <div className='levelButtonBox'>
        {[...Array(10)].map((_, i) => (
          <div
            key={i + 1}
            id={(i+1).toString()}
            className="levelButton"
            onClick={handleClick}
          ></div>
        ))}
      </div>
    </div>
  )
}

export default Level