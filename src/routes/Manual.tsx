import React, { useEffect, useState } from 'react'
import { Accordion, AccordionHeader } from 'react-bootstrap';
import { fetchDayAlarmSettingsFromAPI } from '../api/alarmApi';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import './Manual.css';

const Manual = () => {
  
  const [gimmickData, setGimmickData] = useState<any>(null);

  useEffect(() => {
    // 曜日ごとの設定情報をAPIから取得
    fetchDayAlarmSettingsFromAPI({day:'mon'})
      .then(data => setGimmickData(data))
      .catch(error => console.error(error));
  }, []);

  if(gimmickData && !gimmickData.enable){
    return (
      <div className='manual-body'>
      <header className='manual-header p-3 sticky-top'>
        <div className='manual-back position-absolute'>
          <Link to={'/'}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </Link>
        </div>
        <span className='text-white fs-3 p-1 mx-auto'>Gimmit</span>
      </header>
      <div>
      <span className='d-block mx-auto'>今日のアラームは未設定のため、マニュアルはありません。</span>
      </div>
      </div>
    );
  }

  return (
    <div className='manual-body'>
    <header className='manual-header p-3 sticky-top'>
      <div className='manual-back position-absolute'>
        <Link to={'/'}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </Link>
      </div>
      <span className='text-white fs-3 p-1 mx-auto'>Gimmit</span>
    </header>
      <span className='h2 ms-3 my-3 d-block'>今日のマニュアル</span>
      <div className='manual-accordion-box'>
      <Accordion alwaysOpen>
        {gimmickData && Object.keys(gimmickData.gimmick).map((key) => 
          gimmickData.gimmick[key].enable && <Accordion.Item eventKey={key} key={key}>
            <AccordionHeader>
              {key === 'wires' && <span>ワイヤー</span>}
              {key === 'toggleSW' && <span>トグルスイッチ</span>}
              {key === 'keySW' && <span>キースイッチ</span>}
              {key === 'lightsOut' && <span>ライツアウト</span>}
              {key === 'level' && <span>レベルメーター</span>}
            </AccordionHeader>
            <Accordion.Body>
              <p>{key}の説明</p>
              <p>{key}の説明</p>
              <p>{key}の説明</p>
              <p>{key}の説明</p>
              <p>{key}の説明</p>
              <p>{key}の説明</p>
            </Accordion.Body>
          </Accordion.Item>
        )}
      </Accordion>
      </div>
    </div>
  );
};

export default Manual;