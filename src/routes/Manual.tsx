import React, { useEffect, useState } from 'react'
import { Accordion, AccordionHeader } from 'react-bootstrap';
import { fetchDayAlarmSettingsFromAPI } from '../api/alarmApi';

const Manual = () => {
  
  const [gimmickData, setGimmickData] = useState<{ [key: string]: { enable: boolean; answer?: boolean[] | number; pattern?: boolean[]; default?: boolean[]; }; } | null>(null);

  useEffect(() => {
    // 曜日ごとの設定情報をAPIから取得
    fetchDayAlarmSettingsFromAPI({day:'mon'})
      .then(data => setGimmickData(data.gimmick))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>Gimmit</h1>
      <p>今日のマニュアル</p>
      <Accordion alwaysOpen>
        {gimmickData && Object.keys(gimmickData).map((key) => 
          gimmickData[key].enable && <Accordion.Item eventKey={key} key={key}>
            <AccordionHeader>
              {key === 'wires' && <p>ワイヤー</p>}
              {key === 'toggleSW' && <p>トグルスイッチ</p>}
              {key === 'keySW' && <p>キースイッチ</p>}
              {key === 'lightsOut' && <p>ライツアウト</p>}
              {key === 'level' && <p>レベルメーター</p>}
            </AccordionHeader>
            <Accordion.Body>
              <p>{key}の説明</p>
            </Accordion.Body>
          </Accordion.Item>
        )}
      </Accordion>
    </div>
  );
};

export default Manual;