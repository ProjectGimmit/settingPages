import React,{useEffect} from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import { dayAlarmState } from '../states/alarmState'
import { useRecoilState } from 'recoil'
import { sendDayAlarmSettingsToAPI,fetchDayAlarmSettingsFromAPI } from '../api/alarmApi'
import Toggle from '../components/toggle';
import Key from '../components/key'
import Level from '../components/level'
import LightsOut from '../components/lightsOut'
import Form from 'react-bootstrap/Form';
import './Config.css'

const Config = ({ day }: { day: 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun' }) => {
  const [alarms, setAlarms] = useRecoilState(dayAlarmState);
  let updatedAlarmsStatus: typeof alarms = { ...alarms };
  
  // 画面が最初に呼び出されたときにAPIから設定情報を取得
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchDayAlarmSettingsFromAPI({day:day});
        setAlarms(data);
      } catch (error) {
        // エラーハンドリング
      }
    };
    fetchData();
  }, []);

  const save = () => {
    sendDayAlarmSettingsToAPI({day:day},alarms);
  }

  useEffect(() => {
    init();
  }, [alarms]);

  function init() {
    //トグルスイッチの初期化
    const toggleSWCheck = document.getElementById('toggleSWCheck') as HTMLInputElement;
    toggleSWCheck.checked = alarms.gimmick.toggleSW.enable;
    componentDisplay('toggleSWComponent',alarms.gimmick.toggleSW.enable);
    //キースイッチの初期化
    const keySWCheck = document.getElementById('keySWCheck') as HTMLInputElement;
    keySWCheck.checked = alarms.gimmick.keySW.enable;
    componentDisplay('keySWComponent',alarms.gimmick.keySW.enable);
    //ライツアウトの初期化
    const lightsOutCheck = document.getElementById('lightsOutCheck') as HTMLInputElement;
    lightsOutCheck.checked = alarms.gimmick.lightsOut.enable;
    componentDisplay('lightsOutComponent',alarms.gimmick.lightsOut.enable);
    //レベルメーターの初期化
    const levelCheck = document.getElementById('levelCheck') as HTMLInputElement;
    levelCheck.checked = alarms.gimmick.level.enable;
    componentDisplay('levelButtonComponent',alarms.gimmick.level.enable);
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
      updatedAlarmsStatus = { ...alarms, gimmick: { ...alarms.gimmick, wires: { ...alarms.gimmick.wires, enable : !alarms.gimmick.wires.enable} } };
      componentDisplay('wiresComponent',!alarms.gimmick.wires.enable);
    }
    else if(gimmick === 'toggleSW'){
      updatedAlarmsStatus = { ...alarms, gimmick: { ...alarms.gimmick, toggleSW: { ...alarms.gimmick.toggleSW, enable : !alarms.gimmick.toggleSW.enable} } };
      componentDisplay('toggleSWComponent',!alarms.gimmick.toggleSW.enable);
    }
    else if(gimmick === 'keySW'){
      updatedAlarmsStatus = { ...alarms, gimmick: { ...alarms.gimmick, keySW: { ...alarms.gimmick.keySW, enable : !alarms.gimmick.keySW.enable} } };
      componentDisplay('keySWComponent',!alarms.gimmick.keySW.enable);
    }
    else if(gimmick === 'lightsOut'){
      updatedAlarmsStatus = { ...alarms, gimmick: { ...alarms.gimmick, lightsOut: { ...alarms.gimmick.lightsOut, enable : !alarms.gimmick.lightsOut.enable} } };
      componentDisplay('lightsOutComponent',!alarms.gimmick.lightsOut.enable);
    }
    else if(gimmick === 'level'){
      updatedAlarmsStatus = { ...alarms, gimmick: { ...alarms.gimmick, level: { ...alarms.gimmick.level, enable : !alarms.gimmick.level.enable} } };
      componentDisplay('levelButtonComponent',!alarms.gimmick.level.enable);
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
          <span className='configComponentBoxTitle'>トグルスイッチ</span>
            <Form.Check // prettier-ignore
              id='toggleSWCheck'
              onClick={() => Check('toggleSW')}
              type="switch"
            />
        </div>
        <Toggle></Toggle>
      </div>
      <div className='configComponentBox'>
        <div className='configComponentBoxHeader'>
          <span className='configComponentBoxTitle'>キースイッチ</span>
            <Form.Check // prettier-ignore
              id='keySWCheck'
              onClick={() => Check('keySW')}
              type="switch"
            />
        </div>
        <Key></Key>
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
        <LightsOut></LightsOut>
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
        <Level></Level>
      </div>
    </div>
  )
}

export default Config