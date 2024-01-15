import React,{useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Toast from 'react-bootstrap/Toast';
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
import { dayManual,weekDay } from '../types/dayManual';

const Config = ({ day }: { day: weekDay }) => {
  const [alarms, setAlarms] = useRecoilState(dayAlarmState);
  const [gimmickNum, setGimmickNum] = React.useState(5);
  const [saveAlarms, setSaveAlarms] = React.useState(alarms);
  const [showToast, setShowToast] = React.useState(false);
  const [modalShow, setModalShow] = React.useState(false);
  let updatedAlarmsStatus: typeof alarms = { ...alarms };
  
  // 画面が最初に呼び出されたときにAPIから設定情報を取得
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchDayAlarmSettingsFromAPI({day:day});
        setAlarms(data);
        setSaveAlarms(data);
      } catch (error) {
        // エラーハンドリング
      }
    };
    fetchData();
  }, []);

  // 保存ボタン
  const save = () => {
    sendDayAlarmSettingsToAPI({day:day},alarms as dayManual);
    setShowToast(true);
    setSaveAlarms(alarms);
  }

  // 変更前の時間を保持
  const [prevValue, setPrevValue] = useState(alarms.alarm.slice(0, 2) + ':' + alarms.alarm.slice(2, 4));

  //modal
  interface MyVerticallyCenteredModalProps {
    onHide: () => void;
  }

  function MyVerticallyCenteredModal(props: MyVerticallyCenteredModalProps) {
    return (
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            変更が保存されていません
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className='mb-0'>
            本当に戻ってもよろしいですか？
          </p>
        </Modal.Body>
        <Modal.Footer className='justify-content-between'>
          <Link to={'/'}>
            <Button className='btn-danger' onClick={props.onHide}>保存せずに戻る</Button>
          </Link>
          <Link to={'/'}>
            <Button className='btn-success' onClick={() => {save();props.onHide()}}>保存して戻る</Button>
          </Link>
        </Modal.Footer>
      </Modal>
    );
  }

  function handleBack(e : React.MouseEvent<SVGSVGElement, MouseEvent>){
    //Linkでの画面遷移を防ぐ
    if(JSON.stringify(saveAlarms) !== JSON.stringify(alarms)){
      e.preventDefault();
    }
    setModalShow(true);
  }

  useEffect(() => {
    init();
  }, [alarms]);

  function init() {
    //タイマーの初期化
    const timer = document.getElementById('config-timer') as HTMLInputElement;
    timer.value = alarms.alarm.slice(0, 2) + ':' + alarms.alarm.slice(2, 4);
    //ラジオボタンの初期化
    const limit30 = document.getElementById('limit-30') as HTMLInputElement;
    const limit60 = document.getElementById('limit-60') as HTMLInputElement;
    const limit90 = document.getElementById('limit-90') as HTMLInputElement;
    const limit120 = document.getElementById('limit-120') as HTMLInputElement;
    if(alarms.limit === 30){
      limit30.checked = true;
    }
    else if(alarms.limit === 60){
      limit60.checked = true;
    }
    else if(alarms.limit === 90){
      limit90.checked = true;
    }
    else if(alarms.limit === 120){
      limit120.checked = true;
    }

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

    //全てのConfigComponentBoxを非表示にする
    const componentBox = document.getElementsByClassName('configComponentBox') as HTMLCollectionOf<HTMLElement>;
    for(let i = 0; i < componentBox.length; i++){
      componentBox[i].style.display = 'none';
    }
    //RandomSettingBoxのd-noneを削除
    const RandomSettingBox = document.getElementById('RandomSettingBox') as HTMLDivElement;
    RandomSettingBox.classList.remove('d-none');
    //RandomSettingBoxNumの値を変更
    const RandomSettingBoxNum = document.getElementById('RandomSettingBoxNum') as HTMLSpanElement;
    RandomSettingBoxNum.textContent = gimmickNum.toString();
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
    }
  }

  //name = 'limit'のラジオボタンが変更されたときの処理
  function handleRadio(e: React.ChangeEvent<HTMLInputElement>) {
    const limit = Number(e.target.value);
    updatedAlarmsStatus = { ...alarms, limit: limit };
    setAlarms(updatedAlarmsStatus);
  }
  

  return (
    <div className='configContainer'>
    <header className='config-header p-3 sticky-top d-flex align-items-center'>
    <Toast style={{ position: 'fixed', top: '5%', left: '50%', transform: 'translate(-50%, -50%)', width: '10em' }} show={showToast} onClose={() => setShowToast(false)} delay={3000} autohide className='saveToast'>
      <Toast.Body>保存しました</Toast.Body>
    </Toast>
      <div className='config-back d-inline'>
        <Link to={'/'}>
          <FontAwesomeIcon icon={faChevronLeft}  onClick={handleBack}/>
        </Link>
        <MyVerticallyCenteredModal
          {...{ show: modalShow, onHide: () => setModalShow(false) }}
        />
        </div>
        <span className='text-white fs-3 p-1'>Gimmit</span>
      <div className='btn btn-outline-success p-2' onClick={save}>保存</div>
    </header>
    <div id='wrapper'>
      <div className='timerSettingBox mb-3'>
        <Form.Control
          type='time'
          id='config-timer'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            if (value === '') {
              e.target.value = prevValue;
            } else {
              setPrevValue(value);
              handleTimeChange(e);
            }
          }}
          className='w-50 mx-auto'>
        </Form.Control>
      </div>
      <div className='align-items-center my-2 mx-auto random-box'>
        <Form.Select aria-label='Default select example' className='config-number-selector d-inline' defaultValue='5' onChange={handleSelector}>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
        </Form.Select>
        <span className='text-white mx-3'>個のギミックを</span>
        <Button onClick={Random} className='btn-secondary'><FontAwesomeIcon icon={faDice}  /> ランダムに設定</Button>
      </div>
      <div className='align-items-center my-2 mx-auto random-box py-2'>
        <span className='text-white mx-3'>タイムリミット:</span>
          {/* radio */}
          <Form.Check
            name='limit'
            type='radio'
            id='limit-30'
            value={30}
            label='30秒'
            onChange={handleRadio}
          />
          <Form.Check
            className='ms-4'
            name='limit'
            type='radio'
            id='limit-60'
            value={60}
            label='60秒'
            onChange={handleRadio}
          />
          <Form.Check
            className='ms-4'
            name='limit'
            type='radio'
            id='limit-90'
            value={90}
            label='90秒'
            onChange={handleRadio}
          />
          <Form.Check
            className='ms-4'
            name='limit'
            type='radio'
            id='limit-120'
            value={120}
            label='120秒'
            onChange={handleRadio}
          />
      </div>
      <div className='configComponentBox'>
        <div className='configComponentBoxHeader'>
          <span className='configComponentBoxTitle'>ワイヤースイッチ</span>
            <Form.Check
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
            <Form.Check 
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
            <Form.Check
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
            <Form.Check
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
            <Form.Check
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
      <div className='py-5 text-center d-none' id='RandomSettingBox'>
        <p className='text-white mx-auto'><span id='RandomSettingBoxNum'></span>個のギミックがランダムに設定されました</p>
        <Button className='d-block mx-auto btn btn-info' onClick={() => {
          const componentBox = document.getElementsByClassName('configComponentBox') as HTMLCollectionOf<HTMLElement>;
          for(let i = 0; i < componentBox.length; i++){
            componentBox[i].style.display = 'block';
          }
          const RandomSettingBox = document.getElementById('RandomSettingBox') as HTMLDivElement;
          RandomSettingBox.classList.add('d-none');
        }}>設定を表示</Button>
      </div>
    </div>
    </div>
  )
}

export default Config