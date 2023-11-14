import React,{useEffect} from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import { alarmsState } from '../states/alarmState'
import { useRecoilState } from 'recoil'
import { sendAlarmSettingsToAPI,fetchAlarmSettingsFromAPI } from '../api/alarmApi'
import Level from '../components/level'
import LightsOut from '../components/lightsOut'
import Form from 'react-bootstrap/Form';
import './Config.css'

const Config = ({ day }: { day: 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun' }) => {
  const [alarms, setAlarms] = useRecoilState(alarmsState);
  const updatedAlarmsStatus: typeof alarms = { ...alarms };
  
  // 画面が最初に呼び出されたときにAPIから設定情報を取得
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAlarmSettingsFromAPI();
        setAlarms(data);
        init();
      } catch (error) {
        // エラーハンドリング
      }
    };
    fetchData();
  }, []);

  const save = () => {
    sendAlarmSettingsToAPI(alarms);
  }

  function init() {
    //ライツアウトの初期化
    if (alarms[day].gimmick.lightsOut.enable) {
      const lightsOutCheck = document.getElementById('lightsOutCheck') as HTMLInputElement;
      lightsOutCheck.checked = true;
    }
    else {
      componentDisplay('lightsOutButtonComponent',false);
    }
    //レベルメーターの初期化
    if (alarms[day].gimmick.level.enable) {
      const levelCheck = document.getElementById('levelCheck') as HTMLInputElement;
      levelCheck.checked = true;
    }
    else {
      componentDisplay('levelButtonComponent',false);
    }
  }

  function componentDisplay( id: string , bool : boolean) {
    const component = document.getElementById(id) as HTMLDivElement;
    if(bool){
      component.style.display = 'block';
    }
    else{
      component.style.display = 'none';
    }
  }


  function Check(gimmick : string) {
    if(gimmick === 'wires'){
      updatedAlarmsStatus[day] = { ...alarms[day], gimmick: { ...alarms[day].gimmick, wires: { ...alarms[day].gimmick.wires, enable : !alarms[day].gimmick.wires.enable} } };
      componentDisplay('wiresComponent',!alarms[day].gimmick.wires.enable);
    }
    else if(gimmick === 'toggleSW'){
      updatedAlarmsStatus[day] = { ...alarms[day], gimmick: { ...alarms[day].gimmick, toggleSW: { ...alarms[day].gimmick.toggleSW, enable : !alarms[day].gimmick.toggleSW.enable} } };
      componentDisplay('toggleSWComponent',!alarms[day].gimmick.toggleSW.enable);
    }
    else if(gimmick === 'keySW'){
      updatedAlarmsStatus[day] = { ...alarms[day], gimmick: { ...alarms[day].gimmick, keySW: { ...alarms[day].gimmick.keySW, enable : !alarms[day].gimmick.keySW.enable} } };
      componentDisplay('keySWComponent',!alarms[day].gimmick.keySW.enable);
    }
    else if(gimmick === 'lightsOut'){
      updatedAlarmsStatus[day] = { ...alarms[day], gimmick: { ...alarms[day].gimmick, lightsOut: { ...alarms[day].gimmick.lightsOut, enable : !alarms[day].gimmick.lightsOut.enable} } };
      componentDisplay('lightsOutComponent',!alarms[day].gimmick.lightsOut.enable);
    }
    else if(gimmick === 'level'){
      updatedAlarmsStatus[day] = { ...alarms[day], gimmick: { ...alarms[day].gimmick, level: { ...alarms[day].gimmick.level, enable : !alarms[day].gimmick.level.enable} } };
      componentDisplay('levelButtonComponent',!alarms[day].gimmick.level.enable);
    }
    setAlarms(updatedAlarmsStatus);
  }

  return (
    <div id='wrapper'>
      <header>
        <Button variant="success" onClick={save}>Save</Button>
      </header>
      <div>
        時刻設定
      </div>
      <div className='configComponentBox'>
        <div className='configComponentBoxHeader'>
          <span className='configComponentBoxTitle'>ライツアウト</span>
            <Form.Check // prettier-ignore
              id='lightsOutCheck'
              onClick={() => Check('lightsOut')}
              type="switch"
            />
        </div>
        <LightsOut day={day}></LightsOut>
      </div>
      <div className='configComponentBox'>
        <div className='configComponentBoxHeader'>
          <span className='configComponentBoxTitle'>レベルメーター</span>
            <Form.Check // prettier-ignore
              id='levelCheck'
              onClick={() => Check('level')}
              type="switch"
            />
        </div>
        <Level day={day}></Level>
      </div>
    </div>
  )
}

export default Config