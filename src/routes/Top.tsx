import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { fetchAlarmSettingsFromAPI } from '../api/alarmApi';
import './Top.css';

const Top: React.FC = () => {
  // fetchAlarmSettingsFromAPIで取得するalarmの型を定義
  type AlarmSetting = {
    mon: { enable: boolean, alarm: string },
    tue: { enable: boolean, alarm: string },
    wed: { enable: boolean, alarm: string },
    thu: { enable: boolean, alarm: string },
    fri: { enable: boolean, alarm: string },
    sat: { enable: boolean, alarm: string },
    sun: { enable: boolean, alarm: string },
  }

  const [time, setTime] = useState("00:00:00");

  const [days, setDays] = useState([
    { label: '月', state: [{ day: 1, time: "00:00:00", checked: false, en: "mon" }] },
    { label: '火', state: [{ day: 2, time: "00:00:00", checked: false, en: "tue" }] },
    { label: '水', state: [{ day: 3, time: "00:00:00", checked: false, en: "wed" }] },
    { label: '木', state: [{ day: 4, time: "00:00:00", checked: false, en: "thu" }] },
    { label: '金', state: [{ day: 5, time: "00:00:00", checked: false, en: "fri" }] },
    { label: '土', state: [{ day: 6, time: "00:00:00", checked: false, en: "sat" }] },
    { label: '日', state: [{ day: 0, time: "00:00:00", checked: false, en: "sun" }] },
  ]);

  // alarmApiから取得したalarmを2桁ずつに分割する
  function splitIntoChunks(str: string, chunkSize: number): string[] {
    const chunks = [];
    for (let i = 0; i < str.length; i += chunkSize) {
      chunks.push(str.slice(i, i + chunkSize));
    }
    return chunks;
  }

  useEffect(() => {
    const fetchAlarmSettings = async () => {
      const alarmSettings: AlarmSetting = await fetchAlarmSettingsFromAPI();
      const newDays = [
        { label: '月', state: [{ day: 1, time: splitIntoChunks(alarmSettings.mon.alarm, 2).join(':'), checked: alarmSettings.mon.enable, en: "mon" }] },
        { label: '火', state: [{ day: 2, time: splitIntoChunks(alarmSettings.tue.alarm, 2).join(':'), checked: alarmSettings.tue.enable, en: "tue" }] },
        { label: '水', state: [{ day: 3, time: splitIntoChunks(alarmSettings.wed.alarm, 2).join(':'), checked: alarmSettings.wed.enable, en: "wed" }] },
        { label: '木', state: [{ day: 4, time: splitIntoChunks(alarmSettings.thu.alarm, 2).join(':'), checked: alarmSettings.thu.enable, en: "thu" }] },
        { label: '金', state: [{ day: 5, time: splitIntoChunks(alarmSettings.fri.alarm, 2).join(':'), checked: alarmSettings.fri.enable, en: "fri" }] },
        { label: '土', state: [{ day: 6, time: splitIntoChunks(alarmSettings.sat.alarm, 2).join(':'), checked: alarmSettings.sat.enable, en: "sat" }] },
        { label: '日', state: [{ day: 0, time: splitIntoChunks(alarmSettings.sun.alarm, 2).join(':'), checked: alarmSettings.sun.enable, en: "sun" }] },
      ];
      setDays(newDays);
    };

    fetchAlarmSettings();
  }, []);


  const handleTimeChange = (day: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const newDays = days.map((d) =>
      d.label === day
        ? { ...d, state: [{ ...d.state[0], time: event.target.value }] }
        : d
    );
    setDays(newDays);
  };

  const handleCheckChange = (day: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const newDays = days.map((d) =>
      d.label === day
        ? { ...d, state: [{ ...d.state[0], checked: event.target.checked }] }
        : d
    );
    setDays(newDays);
  };

  useEffect(() => {
    let interval: number | null = null;

    const updateCountdown = () => {
      const now = new Date();
      const currentDay = now.getDay();
      const currentTime = now.getHours() * 60 + now.getMinutes(); // 現在の時間を分単位で取得
    
      const selectedDays = days
        .filter((d) => d.state[0].checked)
        .map((d) => ({
          label: d.label,
          day: d.state[0].day,
          time: d.state[0].time,
        }));

      const todaySelectedDay = selectedDays.find((d) => d.day === currentDay);
      const todayIndex = selectedDays.findIndex((d) => d.day === currentDay);
      if (todaySelectedDay !== undefined) {
        const nextSelectedDay = selectedDays[(todayIndex + 1) % selectedDays.length];
    
        if (selectedDays.length > 0) {
          const nextDay = selectedDays.reduce((closest, day) => {
            const dayDistance = (day.day - currentDay + 7) % 7; // 曜日の差分を計算
            const timeDistance = getMinutesFromTime(day.time) - currentTime; // 時間の差分を計算
      
            if (dayDistance < closest.dayDistance || (dayDistance === closest.dayDistance && timeDistance < closest.timeDistance)) {
              return {
                label: day.label,
                dayDistance,
                timeDistance,
                time: day.time,
              };
            } else {
              return closest;
            }
          }, { label: '', dayDistance: Infinity, timeDistance: Infinity, time: '' });
      
          const countdownDate = new Date();
          countdownDate.setDate(now.getDate() + nextDay.dayDistance);
          countdownDate.setHours(parseInt(nextDay.time.split(':')[0]));
          countdownDate.setMinutes(parseInt(nextDay.time.split(':')[1]));
          countdownDate.setSeconds(0);
      
          const diffTime = countdownDate.getTime() - now.getTime();
      
          // この辺の条件が調整必要
          if (diffTime < 0) {
            // 現在時刻より前の場合は次の週の同じ曜日の時間を取得する
            countdownDate.setDate(countdownDate.getDate() + 7);
            countdownDate.setHours(parseInt(nextDay.time.split(':')[0]));
            countdownDate.setMinutes(parseInt(nextDay.time.split(':')[1]));
            if (selectedDays.length > 1 && todaySelectedDay && nextSelectedDay) {
              /* 当日を除く最も近い曜日までのカウントダウンをセットする */
              const diffWeek = nextSelectedDay.day - todaySelectedDay.day;
              if (diffWeek < 0) {
                countdownDate.setDate(countdownDate.getDate() - 7 + diffWeek + 7);
              } else {
                countdownDate.setDate(countdownDate.getDate() - 7 + diffWeek);
              }
            }
          }
      
          const newDiff = countdownDate.getTime() - now.getTime();
          const hours = Math.floor(newDiff / (1000 * 60 * 60));
          const minutes = Math.floor((newDiff % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((newDiff % (1000 * 60)) / 1000);
          setTime(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
        } else {
          // 選択された日がない場合は00:00:00を表示する
          setTime("00:00:00");
        }
      }

    };
    
    const getMinutesFromTime = (time: string): number => {
      const [hours, minutes] = time.split(':').map(Number);
      return hours * 60 + minutes;
    };

    interval = setInterval(updateCountdown, 1000);

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [days]);

  return (
    <div className="container">
    <div className='app-name'>
      <h1>Gimmit</h1>
    </div>
    <div className='time-limit'>
      <p>爆弾解除まで残り</p>
      <p className='time'>{time}</p>
    </div>

    {days.map((day) => (
      <div className='mon' key={day.label}>
        <p className='day-of-week'>{day.label}</p>
        <Form.Control type="time" value={day.state[0].time} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleTimeChange(day.label, e)} />
        <Link to={`/${day.state[0].en}/config`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="31" height="31" viewBox="0 0 31 31" fill="none">
            <path opacity="0.4" d="M15.8232 20.263C18.4537 20.263 20.5862 18.1305 20.5862 15.4999C20.5862 12.8693 18.4537 10.7368 15.8232 10.7368C13.1926 10.7368 11.0601 12.8693 11.0601 15.4999C11.0601 18.1305 13.1926 20.263 15.8232 20.263Z" stroke="white" stroke-width="1.5" stroke-linecap="square"/>
            <path d="M24.6112 24.1743L24.0455 20.2473L27.7291 18.7737V12.2265L24.0468 10.7534L24.6126 6.8257L18.9425 3.55208L15.8237 6.00597L12.705 3.55208L7.03488 6.8257L7.60051 10.7527L3.91663 12.2265V18.7737L7.6018 20.248L7.03627 24.1743L12.7064 27.4479L15.8237 24.9952L18.9411 27.4479L24.6112 24.1743Z" stroke="white" stroke-width="1.5" stroke-linecap="square"/>
          </svg>
        </Link>
        <Form>
          <Form.Check
            type="switch"
            id={`custom-switch-${day.label}`}
            checked={day.state[0].checked}
            onChange={(e) => handleCheckChange(day.label, e)}
          />
        </Form>
      </div>
    ))}
  </div>
  );
};

export default Top;