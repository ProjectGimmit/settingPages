import React, { useEffect, useState } from 'react';
import { Accordion, Card, Col, Container, Form, Row, useAccordionButton } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { fetchAlarmSettingsFromAPI, sendDayTimerSettingToAPI } from '../api/alarmApi';
import './Top.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

const Top: React.FC = () => {
  // fetchAlarmSettingsFromAPIで取得するalarmの型を定義
  type GimmickEnable = {
    [key: string]: boolean;
    keySW: boolean;
    level: boolean;
    lightsOut: boolean;
    toggleSW: boolean;
    wires: boolean;
  };

  type AlarmSetting = {
    [key: string]: {
      enable: boolean;
      alarm: string;
      gimmickEnable: GimmickEnable;
      limit: number;
    };
  };
  

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

//const GRAY = 'rgba(56, 56, 56, 0.6)';
//const BLACK = 'rgba(36, 36, 36, 0.6)';

const [isToggled, setToggled] = useState<Record<string, boolean>>({});

const handleToggle = (label: string) => {
  setToggled({
    ...isToggled,
    [label]: !isToggled[label],
  });
};

function ContextAwareToggle({ children, eventKey, callback }: { children: React.ReactNode, eventKey: string, callback?: (eventKey: string) => void }) {

  const decoratedOnClick = useAccordionButton(
    eventKey,
    () => callback && callback(eventKey),
  );

  return (
    <button
      type="button"
      style={{ backgroundColor: '#373737'}}
      onClick={decoratedOnClick}
    >
      {children}
    </button>
  );
}

  const [gimmickSettings, setGimmickSettings] = useState<AlarmSetting>();

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
      setGimmickSettings(alarmSettings);
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
    sendDayTimerSettingToAPI({day:days.filter((d) => d.label === day)[0].state[0].en}, {enable: days.filter((d) => d.label === day)[0].state[0].checked, alarm: event.target.value});
  };

  const handleCheckChange = (day: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const newDays = days.map((d) =>
      d.label === day
        ? { ...d, state: [{ ...d.state[0], checked: event.target.checked }] }
        : d
    );
    setDays(newDays);
    sendDayTimerSettingToAPI({day:days.filter((d) => d.label === day)[0].state[0].en}, {enable: event.target.checked, alarm: days.filter((d) => d.label === day)[0].state[0].time});
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

      // 今日の曜日を取得
      const todaySelectedDay = selectedDays.find((d) => d.day === currentDay);
      const todayIndex = selectedDays.findIndex((d) => d.day === currentDay);
    
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

          if (diffTime < 0) {
            // 現在時刻より前の場合は次の週の同じ曜日の時間を取得する
            countdownDate.setDate(countdownDate.getDate() + 7);
            countdownDate.setHours(parseInt(nextDay.time.split(':')[0]));
            countdownDate.setMinutes(parseInt(nextDay.time.split(':')[1]));
            
            if (todaySelectedDay !== undefined) {
              const nextSelectedDay = selectedDays[(todayIndex + 1) % selectedDays.length];
              if (selectedDays.length > 1) {
                /* 当日を除く最も近い曜日に設定された時刻までのカウントダウンを表示する */
                countdownDate.setDate(countdownDate.getDate() - 7 + (nextSelectedDay.day - currentDay + 7) % 7);
                countdownDate.setHours(parseInt(nextSelectedDay.time.split(':')[0]));
                countdownDate.setMinutes(parseInt(nextSelectedDay.time.split(':')[1]));
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
  <div className="top-container">
    <div className='mt-3 mb-3'>
      <h1>Gimmit</h1>
    </div>
    <div className='time-limit'>
      <div>アラーム解除まで残り</div>
      <div className='time'>{time}</div>
    </div>

    <div className='timer-box'>
    {days.map((day) => (
      <div className='time-container' key={day.label}>
        <Accordion defaultActiveKey={day.label} className='custom-Accordion'>
          <Card className='custom-Card'>
            <Card.Header className='custom-CardHeader'>
              <span id={`label-of-${day.state[0].en}`} className='day-of-week ms-3 me-3'>{day.label}</span>
              <Form.Control 
                type="time" 
                value={day.state[0].time} 
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (e.target.value !== '') {
                    handleTimeChange(day.label, e)
                  } 
                }}
                style={{ width: '40%' }}
              />
              <Link to={`/${day.state[0].en}/config`} className='setting-btn'>
                <svg xmlns="http://www.w3.org/2000/svg" width="31" height="31" viewBox="0 0 31 31" fill="none">
                  <path opacity="0.4" d="M15.8232 20.263C18.4537 20.263 20.5862 18.1305 20.5862 15.4999C20.5862 12.8693 18.4537 10.7368 15.8232 10.7368C13.1926 10.7368 11.0601 12.8693 11.0601 15.4999C11.0601 18.1305 13.1926 20.263 15.8232 20.263Z" stroke="white" strokeWidth="1.5" strokeLinecap="square"/>
                  <path d="M24.6112 24.1743L24.0455 20.2473L27.7291 18.7737V12.2265L24.0468 10.7534L24.6126 6.8257L18.9425 3.55208L15.8237 6.00597L12.705 3.55208L7.03488 6.8257L7.60051 10.7527L3.91663 12.2265V18.7737L7.6018 20.248L7.03627 24.1743L12.7064 27.4479L15.8237 24.9952L18.9411 27.4479L24.6112 24.1743Z" stroke="white" strokeWidth="1.5" strokeLinecap="square"/>
                </svg>
              </Link>
              <Form.Check
                type="switch"
                /* 修正前id={`custom-switch-${day.label}`} */
                id={`custom-switch-${day.state[0].en}`}
                checked={day.state[0].checked}
                onChange={(e) => handleCheckChange(day.label, e)}
              />

              <ContextAwareToggle eventKey={day.label} callback={() => handleToggle(day.label)}>
                {isToggled[day.label] ? (
                  <FontAwesomeIcon icon={faChevronDown} style={{ color: "#ffffff"}} />
                ) : (
                  <FontAwesomeIcon icon={faChevronUp} style={{ color: "#ffffff"}} />
                )}
              </ContextAwareToggle>
            </Card.Header>
          </Card>
          <Accordion.Collapse eventKey={day.label}>
            <Card.Body>
              <Container>
              <Row className='align-items-center'>
                <Col xs={8} sm={8}>
                  <div className='gimmick'>
                    {gimmickSettings && gimmickSettings[day.state[0].en] && gimmickSettings[day.state[0].en].gimmickEnable && 
                      Object.keys(gimmickSettings[day.state[0].en].gimmickEnable)
                        .filter(key => gimmickSettings[day.state[0].en].gimmickEnable[key] === true)
                        .map((name, index) => (
                          <React.Fragment key={index}>
                          {name === 'keySW' ? (
                          <svg xmlns="http://www.w3.org/2000/svg" width="11" height="22" viewBox="0 0 11 22" fill="none" style={{marginRight: '10px'}}>
                            <rect x="4" y="10" width="3" height="12" fill="white"/>
                            <rect x="7" y="15" width="3" height="2" fill="white"/>
                            <rect x="7" y="20" width="3" height="2" fill="white"/>
                            <circle cx="5.5" cy="5.5" r="4.25" stroke="white" stroke-width="2.5"/>
                          </svg>
                          ) : name === 'level' ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="15" viewBox="0 0 22 15" fill="none">
                              <rect x="1" y="1" width="20" height="13" stroke="white" stroke-width="2"/>
                              <rect x="4" y="4" width="2" height="7" fill="white"/>
                              <rect x="7" y="4" width="2" height="7" fill="white"/>
                              <rect x="10" y="4" width="2" height="7" fill="white"/>
                              <rect x="13" y="4" width="2" height="7" fill="white"/>
                              <rect x="16" y="4" width="2" height="7" fill="white"/>
                            </svg>
                          ) : name === 'lightsOut' ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none" style={{marginRight: '10px'}}>
                              <rect width="5" height="5" fill="white"/>
                              <rect x="7" width="5" height="5" fill="white"/>
                              <rect x="14" width="5" height="5" fill="white"/>
                              <rect y="7" width="5" height="5" fill="white"/>
                              <rect x="7" y="7" width="5" height="5" fill="white"/>
                              <rect x="14" y="7" width="5" height="5" fill="white"/>
                              <rect y="14" width="5" height="5" fill="white"/>
                              <rect x="7" y="14" width="5" height="5" fill="white"/>
                              <rect x="14" y="14" width="5" height="5" fill="white"/>
                            </svg>
                          ) : name === 'toggleSW' ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="21" viewBox="0 0 17 21" fill="none" style={{marginRight: '10px'}}>
                              <ellipse cx="8.5" cy="17" rx="8.5" ry="4" fill="white"/>
                              <rect x="4" y="2" width="9" height="14" fill="white"/>
                              <ellipse cx="8.5" cy="2.5" rx="4.5" ry="2.5" fill="white"/>
                              <path d="M15 16.4654C15 17.8461 12.3137 18.9654 9 18.9654C5.68629 18.9654 3 17.8461 3 16.4654C3 15.0847 5.68629 13.9654 9 13.9654C12.3137 13.9654 15 15.0847 15 16.4654Z" fill="white"/>
                            </svg>
                          ) : name === 'wires' ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="8" height="28" viewBox="0 0 8 28" fill="none" style={{marginRight: '10px'}}>
                              <rect y="6" width="8" height="7" fill="white"/>
                              <rect y="15" width="8" height="7" fill="white"/>
                              <path d="M3 0H5V6H3V0Z" fill="white"/>
                              <rect x="3" y="22" width="2" height="6" fill="white"/>
                            </svg>
                          ): null}
                          </React.Fragment>
                    ))}
                  </div>
                </Col>
                <Col xs={4} sm={4}>
                    <span className='fs-4'>{gimmickSettings?.[day.state[0].en]?.limit}</span>sec
                </Col>
              </Row>
              </Container>
            </Card.Body>
          </Accordion.Collapse>
        </Accordion>
      </div>
    ))}
    </div>
    <Link to={`/manual`}>
      <button id='manual-btn' className='mt-3'>
      <span id='manual-txt' className='d-block'>
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="38" viewBox="0 0 25 38" fill="none" id='manual-icon'>
          <path d="M21.114 6.9817C20.0186 6.45069 18.8145 6.22311 17.6598 6.22311C15.7354 6.22311 13.6629 6.82998 12.2318 8.49886C10.8008 6.82998 8.72832 6.22311 6.80385 6.22311C4.87938 6.22311 2.80687 6.82998 1.37585 8.49886V30.7253C1.37585 31.1046 1.62258 31.4839 1.86931 31.4839C1.968 31.4839 2.01735 31.408 2.11604 31.408C3.44836 30.4219 5.37283 29.7391 6.80385 29.7391C8.72832 29.7391 10.8008 30.346 12.2318 32.0149C13.5642 30.7253 15.9821 29.7391 17.6598 29.7391C19.2882 29.7391 20.966 30.1943 22.3477 31.3322C22.4464 31.408 22.4957 31.408 22.5944 31.408C22.8411 31.408 23.0878 31.0287 23.0878 30.6494V8.49886C22.4957 7.81613 21.8542 7.36099 21.114 6.9817ZM21.114 27.4634C20.0284 26.9324 18.8441 26.7048 17.6598 26.7048C15.9821 26.7048 13.5642 27.691 12.2318 28.9806V11.5332C13.5642 10.2436 15.9821 9.25744 17.6598 9.25744C18.8441 9.25744 20.0284 9.48501 21.114 10.016V27.4634Z" fill="white"/>
          <path d="M17.6598 15.3261C18.5283 15.3261 19.3672 15.4626 20.1271 15.7206V13.4145C19.3475 13.1869 18.5086 13.0503 17.6598 13.0503C15.9821 13.0503 14.4623 13.4903 13.2188 14.3096V16.8281C14.334 15.8571 15.8834 15.3261 17.6598 15.3261Z" fill="white"/>
          <path d="M13.2188 18.3452V20.8637C14.334 19.8927 15.8834 19.3617 17.6598 19.3617C18.5283 19.3617 19.3672 19.4983 20.1271 19.7562V17.4501C19.3475 17.2225 18.5086 17.086 17.6598 17.086C15.9821 17.086 14.4623 17.5411 13.2188 18.3452Z" fill="white"/>
          <path d="M17.6598 21.1368C15.9821 21.1368 14.4623 21.5768 13.2188 22.3961V24.9146C14.334 23.9436 15.8834 23.4126 17.6598 23.4126C18.5283 23.4126 19.3672 23.5491 20.1271 23.807V21.5009C19.3475 21.2582 18.5086 21.1368 17.6598 21.1368Z" fill="white"/>
        </svg>解除マニュアル</span>
      </button>
    </Link>
  </div>
  );
};

export default Top;