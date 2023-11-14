import React , { useEffect, useState } from 'react'
import './level.css'
import { useRecoilState, useRecoilValue, atom } from 'recoil'
import { alarmsState } from '../states/alarmState'

const Level = ({ day }: { day: 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun' }) => {
  const alarms = useRecoilValue(alarmsState);
  const [alarmsStatus, setAlarmsStatus] = useRecoilState(alarmsState);
  const [level, setLevel] = useState(alarms[day].gimmick.level.answer);

  const totalButtons = 10;

  useEffect(() => {
    setLevel(alarms[day].gimmick.level.answer);
    for (let i = 1; i <= totalButtons; i++) {
      const button = document.getElementById(i.toString());
      if (button) {
        if (i <= alarms[day].gimmick.level.answer) {
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
  , [alarms]);

  const handleClick = (event: { target: { id: any; }; }) => {
    const clickedId = Number(event.target.id);
    //clickedIdが1~10の場合のみ処理を行う
    if (clickedId < 1 || clickedId > 10 || isNaN(clickedId)) {
      return;
    }

    const onlyFirstButtonLit = Array.from(document.getElementsByClassName('levelButtonFirst')).length === 1
      && !document.getElementsByClassName('levelButtonSecond').length
      && !document.getElementsByClassName('levelButtonThird').length;
      const updatedAlarmsStatus: typeof alarmsStatus = { ...alarmsStatus };
  
    if (clickedId === 1 && onlyFirstButtonLit) {
      for (let i = 1; i <= totalButtons; i++) {
        const button = document.getElementById(i.toString());
        if (button) {
          button.className = 'levelButton';
        }
      }
      setLevel(0)
      updatedAlarmsStatus[day] = { ...alarmsStatus[day], gimmick: { ...alarmsStatus[day].gimmick, level: { ...alarmsStatus[day].gimmick.level, answer: 0 } } };
    } else {
      setLevel(clickedId)
      updatedAlarmsStatus[day] = { ...alarmsStatus[day], gimmick: { ...alarmsStatus[day].gimmick, level: { ...alarmsStatus[day].gimmick.level, answer: clickedId } } };
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
    setAlarmsStatus(updatedAlarmsStatus);
  }

  return (
    <div id='levelButtonComponent' className='gimmickComponent'>
      <h2>解除状態</h2>
      <div className='levelButtonBox mx-auto'>
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