import React,{useEffect} from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import { dayAlarmState } from '../states/alarmState'
import { useRecoilState } from 'recoil'
import { sendDayAlarmSettingsToAPI,fetchDayAlarmSettingsFromAPI } from '../api/alarmApi'
import Wire from '../components/wire';
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
    //ワイヤーの初期化
    enableComponent('wires',alarms.gimmick.wires.enable);
    //トグルスイッチの初期化
    enableComponent('toggleSW',alarms.gimmick.toggleSW.enable);
    //キースイッチの初期化
    enableComponent('keySW',alarms.gimmick.keySW.enable);
    //ライツアウトの初期化
    enableComponent('lightsOut',alarms.gimmick.lightsOut.enable);
    //レベルメーターの初期化
    enableComponent('level',alarms.gimmick.level.enable);
  }

  function enableComponent(id: string , bool : boolean) {
    const componentCheck = document.getElementById(id+"Check") as HTMLInputElement;
    componentCheck.checked = bool;
    componentDisplay(id+"Component",bool);
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

  function random(){
    return Math.random() < 0.5;
  }

  function randomWires(){
    const randomEnable = random();
    enableComponent("wires",randomEnable);
    updatedAlarmsStatus = { ...updatedAlarmsStatus, gimmick: { ...updatedAlarmsStatus.gimmick, wires: { ...updatedAlarmsStatus.gimmick.wires, enable : randomEnable,answer:[random(),random(),random(),random()]} } };
    setAlarms(updatedAlarmsStatus);
  }

  function randomToggleSW(){
    const randomEnable = random();
    enableComponent("toggleSW",randomEnable);
    updatedAlarmsStatus = { ...updatedAlarmsStatus, gimmick: { ...updatedAlarmsStatus.gimmick, toggleSW: { ...updatedAlarmsStatus.gimmick.toggleSW, enable : randomEnable,answer:[random(),random(),random(),random(),random()]} } };
    setAlarms(updatedAlarmsStatus);
  }

  function randomKeySW(){
    const randomEnable = random();
    enableComponent("keySW",randomEnable);
    updatedAlarmsStatus = { ...updatedAlarmsStatus, gimmick: { ...updatedAlarmsStatus.gimmick, keySW: { ...updatedAlarmsStatus.gimmick.keySW, enable : randomEnable, default:[random(),random(),random()], pattern:[random(),random()]} } };
    setAlarms(updatedAlarmsStatus);
  }

  function randomLightsOut(){
    const randomEnable = random();
    enableComponent("lightsOut",randomEnable);
    updatedAlarmsStatus = { ...updatedAlarmsStatus, gimmick: { ...updatedAlarmsStatus.gimmick, lightsOut: { ...updatedAlarmsStatus.gimmick.lightsOut, enable : randomEnable, default:[random(),random(),random(),random(),random(),random(),random(),random(),random()]} } };
    setAlarms(updatedAlarmsStatus);
  }

  function randomLevel(){
    const randomEnable = random();
    enableComponent("level",randomEnable);
    updatedAlarmsStatus = { ...updatedAlarmsStatus, gimmick: { ...updatedAlarmsStatus.gimmick, level: { ...updatedAlarmsStatus.gimmick.level, enable : randomEnable, answer:Math.floor(Math.random() * 10)} } };
    setAlarms(updatedAlarmsStatus);
  }

  //alarmsのgimmickの中身をランダムにする
  function Random(){
    //ワイヤースイッチのランダム化
    randomWires();
    //トグルスイッチのランダム化
    randomToggleSW();
    //キースイッチのランダム化
    randomKeySW();
    //ライツアウトのランダム化
    randomLightsOut();
    //レベルメーターのランダム化
    randomLevel();
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
      componentDisplay('levelComponent',!alarms.gimmick.level.enable);
    }
    setAlarms(updatedAlarmsStatus);
  }

  return (
    <div id='wrapper'>
      <header className='config-header p-3'>
        <Link to={'/'}>
          <Button>back</Button>
        </Link>
        <span className='text-white fs-3'>Gimmit</span>
        <Button variant="success" onClick={save}>Save</Button>
      </header>
      <div className='timerSettingBox'>
        <Form.Control type='time' className='w-50 mx-auto'></Form.Control>
      </div>
      <div>
        <Button onClick={Random}>random</Button>
      </div>
      <div className='configComponentBox'>
        <div className='configComponentBoxHeader'>
          <span className='configComponentBoxTitle'>ワイヤースイッチ</span>
            <Form.Check // prettier-ignore
              id='wiresCheck'
              onClick={() => Check('wires')}
              type="switch"
            />
        </div>
        <Wire></Wire>
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
        <div className='configComponentBoxHeader configComponentBoxHeaderLast'>
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