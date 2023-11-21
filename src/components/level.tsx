import React , { useEffect, useState } from 'react'
import './level.css'
import { useRecoilState, useRecoilValue} from 'recoil'
import { dayAlarmState } from '../states/alarmState'

const Level = () => {
  const alarms = useRecoilValue(dayAlarmState);
  const [alarmsStatus, setAlarmsStatus] = useRecoilState(dayAlarmState);
  const [level, setLevel] = useState(alarms.gimmick.level.answer);

  const totalButtons = 10;

  useEffect(() => {
    setLevel(alarms.gimmick.level.answer);
    for (let i = 1; i <= totalButtons; i++) {
      const button = document.getElementById(i.toString());
      if (button) {
        if (i <= alarms.gimmick.level.answer) {
          if (i <= 5) {
            button.classList.add('levelFirst');
          } else if (i <= 8) {
            button.classList.add('levelSecond');
          } else {
            button.classList.add('levelThird');
          }
        } else {
          button.className = 'level';
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

    const onlyFirstButtonLit = Array.from(document.getElementsByClassName('levelFirst')).length === 1
      && !document.getElementsByClassName('levelSecond').length
      && !document.getElementsByClassName('levelThird').length;
      let updatedAlarmsStatus: typeof alarmsStatus = { ...alarmsStatus };
  
    if (clickedId === 1 && onlyFirstButtonLit) {
      for (let i = 1; i <= totalButtons; i++) {
        const button = document.getElementById(i.toString());
        if (button) {
          button.className = 'level';
        }
      }
      setLevel(0)
      updatedAlarmsStatus = { ...alarmsStatus, gimmick: { ...alarmsStatus.gimmick, level: { ...alarmsStatus.gimmick.level, answer: 0 } } };
    } else {
      setLevel(clickedId)
      updatedAlarmsStatus = { ...alarmsStatus, gimmick: { ...alarmsStatus.gimmick, level: { ...alarmsStatus.gimmick.level, answer: clickedId } } };
      for (let i = 1; i <= totalButtons; i++) {
        const button = document.getElementById(i.toString());
        if (button) {
          if (i <= clickedId) {
            if (i <= 5) {
              button.classList.add('levelFirst');
            } else if (i <= 8) {
              button.classList.add('levelSecond');
            } else {
              button.classList.add('levelThird');
            }
          } else {
            button.className = 'level';
          }
        }
      }
    }
    setAlarmsStatus(updatedAlarmsStatus);
  }

  return (
    <div id='levelComponent' className='gimmickComponent'>
      <h2>解除状態</h2>
      <div className='levelBox mx-auto'>
        {[...Array(10)].map((_, i) => (
          <div
            key={i + 1}
            id={(i+1).toString()}
            className="level"
            onClick={handleClick}
          ></div>
        ))}
      </div>
    </div>
  )
}

export default Level