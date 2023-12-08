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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDice,faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import './Config.css'
import { dayManual } from '../types/dayManual';

const Config = ({ day }: { day: 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun' }) => {
  const [alarms, setAlarms] = useRecoilState(dayAlarmState);
  const [gimmickNum, setGimmickNum] = React.useState(5);
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

  // 保存ボタン
  const save = () => {
    sendDayAlarmSettingsToAPI({day:day},alarms as dayManual);
  }

  useEffect(() => {
    init();
  }, [alarms]);

  function init() {
    //タイマーの初期化
    const timer = document.getElementById('config-timer') as HTMLInputElement;
    timer.value = alarms.alarm.slice(0, 2) + ':' + alarms.alarm.slice(2, 4);
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

  // 時間の変更
  function handleTimeChange(e: React.ChangeEvent<HTMLInputElement>) {
    //e.target.value(HH:mm)を(HHmm)に変換
    const time = e.target.value.split(':').join('');
    console.log(time);
    updatedAlarmsStatus = { ...alarms, alarm: time };
    setAlarms(updatedAlarmsStatus);
  }

  function random(){
    return Math.random() < 0.5;
  }

  function randomWires(){
    updatedAlarmsStatus = { ...updatedAlarmsStatus, gimmick: { ...updatedAlarmsStatus.gimmick, wires: { ...updatedAlarmsStatus.gimmick.wires,answer:[random(),random(),random(),random()]} } };
    setAlarms(updatedAlarmsStatus);
  }

  function randomToggleSW(){
    updatedAlarmsStatus = { ...updatedAlarmsStatus, gimmick: { ...updatedAlarmsStatus.gimmick, toggleSW: { ...updatedAlarmsStatus.gimmick.toggleSW,answer:[random(),random(),random(),random(),random()]} } };
    setAlarms(updatedAlarmsStatus);
  }

  function randomKeySW(){
    updatedAlarmsStatus = { ...updatedAlarmsStatus, gimmick: { ...updatedAlarmsStatus.gimmick, keySW: { ...updatedAlarmsStatus.gimmick.keySW, default:[random(),random(),random()], pattern:[random(),random()]} } };
    setAlarms(updatedAlarmsStatus);
    if(updatedAlarmsStatus.gimmick.keySW.default[0] && updatedAlarmsStatus.gimmick.keySW.default[1] && updatedAlarmsStatus.gimmick.keySW.default[2]){
      randomKeySW();
    }
  }

  function randomLightsOut(){
    updatedAlarmsStatus = { ...updatedAlarmsStatus, gimmick: { ...updatedAlarmsStatus.gimmick, lightsOut: { ...updatedAlarmsStatus.gimmick.lightsOut, default:[random(),random(),random(),random(),random(),random(),random(),random(),random()]} } };
    setAlarms(updatedAlarmsStatus);
    //初期状態で全て消灯している場合は再度ランダム化
    if(updatedAlarmsStatus.gimmick.lightsOut.default[0] && updatedAlarmsStatus.gimmick.lightsOut.default[1] && updatedAlarmsStatus.gimmick.lightsOut.default[2] && updatedAlarmsStatus.gimmick.lightsOut.default[3] && updatedAlarmsStatus.gimmick.lightsOut.default[4] && updatedAlarmsStatus.gimmick.lightsOut.default[5] && updatedAlarmsStatus.gimmick.lightsOut.default[6] && updatedAlarmsStatus.gimmick.lightsOut.default[7] && updatedAlarmsStatus.gimmick.lightsOut.default[8]){
      randomLightsOut();
    }
  }

  function randomLevel(){
    updatedAlarmsStatus = { ...updatedAlarmsStatus, gimmick: { ...updatedAlarmsStatus.gimmick, level: { ...updatedAlarmsStatus.gimmick.level, answer:Math.floor(Math.random() * 11)} } };
    setAlarms(updatedAlarmsStatus);
  }

  //alarmsのgimmickの中身をランダムにする
  function Random(){
    const randomArray = Array(5).fill(false);
    for(let i = 0; i < gimmickNum; i++){
      randomArray[i] = true;
    }
    //配列をシャッフル
    for (let i = randomArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [randomArray[i], randomArray[j]] = [randomArray[j], randomArray[i]];
    }
    //オンオフを指定された数だけランダムにする
    updatedAlarmsStatus = { ...alarms, gimmick: { ...alarms.gimmick, wires: { ...alarms.gimmick.wires, enable : randomArray[0]} , toggleSW: { ...alarms.gimmick.toggleSW, enable : randomArray[1]} , keySW: { ...alarms.gimmick.keySW, enable : randomArray[2]} , lightsOut: { ...alarms.gimmick.lightsOut, enable : randomArray[3]} , level: { ...alarms.gimmick.level, enable : randomArray[4]} } };
    setAlarms(updatedAlarmsStatus);
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

  function handleSelector(e: React.ChangeEvent<HTMLSelectElement>) {
    //e.target.valueが1~5の場合のみ更新
    if(Number(e.target.value) >= 1 && Number(e.target.value) <= 5){
      setGimmickNum(Number(e.target.value));
      //enableComponentの引数にはgimmickの名前を渡す      
    }
  }

  return (
    <div id='wrapper'>
      <header className='config-header p-3 sticky-top'>
        <div className='config-back'>
          <Link to={'/'}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </Link>
        </div>
        <span className='text-white fs-3 p-1'>Gimmit</span>
        <div className='btn btn-outline-success p-2' onClick={save}>保存</div>
      </header>
      <div className='timerSettingBox mb-3'>
        <Form.Control type='time' id='config-timer' onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleTimeChange(e)} className='w-50 mx-auto'></Form.Control>
      </div>
      <div className='d-flex align-items-center my-2'>
        <Form.Select aria-label='Default select example' className='config-number-selector mx-auto d-inline' defaultValue='5' onChange={handleSelector}>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
        </Form.Select>
        <span className='text-white'>個のギミックを</span>
        <Button onClick={Random} className='mx-auto btn-secondary'><FontAwesomeIcon icon={faDice}  /> ランダムに設定</Button>
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
        <div id='wiresComponent' className='gimmickComponent'>
          <Wire></Wire>
          <Button className='mt-3 btn-secondary' onClick={randomWires}>ランダム設定</Button>
        </div>
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
        <div className='toggle p-3' id='toggleSWComponent'>
          <Toggle></Toggle>
          <Button className='mt-3 btn-secondary' onClick={randomToggleSW}>ランダム設定</Button>
        </div>
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
        <div id='keySWComponent' className='gimmickComponent'>
          <Key></Key>
          <Button className='mt-3 btn-secondary' onClick={randomKeySW}>ランダム設定</Button>
        </div>
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
        <div id='lightsOutComponent' className='gimmickComponent'>
          <LightsOut></LightsOut>
          <Button className='mt-3 btn-secondary' onClick={randomLightsOut}>ランダム設定</Button>
        </div>
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
        <div>
          <div id='levelComponent' className='gimmickComponent'>
            <Level></Level>
            <Button className='mt-3 btn-secondary' onClick={randomLevel}>ランダム設定</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Config