import React, { useEffect,useState } from 'react'
import './toggle.css'
import { useRecoilState, useRecoilValue} from 'recoil'
import { dayAlarmState } from '../states/alarmState'

const Toggle: React.FC = () => {

  const alarms = useRecoilValue(dayAlarmState);
  const [alarmsStatus, setAlarmsStatus] = useRecoilState(dayAlarmState);
  const [counts, setCount] = useState([false, false, false, false, false]);
  const values = [16, 8, 4, 2, 1];

  useEffect(() => {
    setCount([alarms.gimmick.toggleSW.answer[0], alarms.gimmick.toggleSW.answer[1], alarms.gimmick.toggleSW.answer[2], alarms.gimmick.toggleSW.answer[3], alarms.gimmick.toggleSW.answer[4]]);
  }, [alarms]);

  const handleClick = (index: number) => {
    const newCount = [...counts];
    newCount[index] = !newCount[index];
    setCount(newCount);
    setAlarmsStatus({ ...alarmsStatus, gimmick: { ...alarmsStatus.gimmick, toggleSW: { ...alarmsStatus.gimmick.toggleSW, answer: newCount } } });
  }

  const calculateSum = (): number => {
    let sum = 0;
    for (let i = 0; i < counts.length; i++) {
      if (counts[i]) {
        sum += values[i];
      }
    }
    return sum;
  }

  return (
    <div className='toggle p-3' id='toggleSWComponent'>
      <h2>正解の数値</h2><br />
      <h2>{calculateSum().toString()}</h2>
      <div>
        {values.map((_value, index) => (
          <span key={index} onClick={() => handleClick(index)} className='mx-2'>
            {counts[index] ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="35" height="50" viewBox="0 0 23 30" fill="none">
                <ellipse cx="11.5" cy="24.5" rx="11.5" ry="5.5" fill="#D9D9D9"/>
                <rect x="4" y="3" width="15" height="21" fill="#B4B4B4"/>
                <ellipse cx="11.5" cy="3.5" rx="7.5" ry="3.5" fill="#D9D9D9"/>
                <ellipse cx="11.5" cy="23.5" rx="7.5" ry="3.5" fill="#B4B4B4"/>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="35" height="50" viewBox="0 0 23 30" fill="none">
                <ellipse cx="11.5" cy="5.5" rx="11.5" ry="5.5" transform="rotate(-180 11.5 5.5)" fill="#D9D9D9"/>
                <rect x="19" y="27" width="15" height="21" transform="rotate(-180 19 27)" fill="#B4B4B4"/>
                <ellipse cx="11.5" cy="26.5" rx="7.5" ry="3.5" transform="rotate(-180 11.5 26.5)" fill="#D9D9D9"/>
                <ellipse cx="11.5" cy="6.5" rx="7.5" ry="3.5" transform="rotate(-180 11.5 6.5)" fill="#B4B4B4"/>
              </svg>
            )}
          </span>
        ))}
      </div>
    </div>
  )
}

export default Toggle