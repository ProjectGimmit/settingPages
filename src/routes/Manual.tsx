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
    fetchDayAlarmSettingsFromAPI({ day: 'mon' })
      .then(data => setGimmickData(data))
      .catch(error => console.error(error));
  }, []);

  //ワイヤーが有効だった場合のマニュアル表示関数
  const wiresManual = () => {
    const monday = "dummy";
    return (
      <div>
        <ul>
          <li>左から赤・黄・緑・青の4本のワイヤーがあり、それぞれを正しい状態にすることでクリアとなる。</li>
          <li>クリアパターンはアラームが設定される曜日ごとに決まっており、以下の表で対応する。</li>
        </ul>
        <table className='table'>
          <thead>
            <tr>
              <th>曜日</th>
              <th>クリアパターン</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>月曜日</td>
              <td>{monday}</td>
            </tr>
            <tr>
              <td>火曜日</td>
              <td>赤、緑を切断し、黄と青を接続する</td>
            </tr>
            <tr>
              <td>水曜日</td>
              <td>赤、緑を切断し、黄と青を接続する</td>
            </tr>
            <tr>
              <td>木曜日</td>
              <td>赤、緑を切断し、黄と青を接続する</td>
            </tr>
            <tr>
              <td>金曜日</td>
              <td>赤、緑を切断し、黄と青を接続する</td>
            </tr>
            <tr>
              <td>土曜日</td>
              <td>赤、緑を切断し、黄と青を接続する</td>
            </tr>
            <tr>
              <td>日曜日</td>
              <td>赤、緑を切断し、黄と青を接続する</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  //トグルスイッチ
  const toggleSWManual = () => {
    return (
      <div>
        <ul>
          <li>各スイッチは左から順に、16,8,4,2,1の数値が割り当てられており、ONになっているスイッチの数値の合計がディスプレイに表示されている数値と一致した時、クリアとなる。</li>
          <li>各スイッチは上にするとON、下にするとOFFになる。</li>
          <p>例）26を作る場合は以下のようになる。（16 + 8 + 2 = 26）</p>
        </ul>
        <img src="./images/toggleSW01.png" alt="" className='w-100' />
      </div>
    );
  }

  //キースイッチ
  const keySWManual = () => {
    return (
      <div>
        <ul>
          <li>キースイッチは、各鍵の動作を駆使して３つの青色のランプをすべて点灯した状態にすることでクリアとなる。</li>
          <li>各鍵の動作パターンは4パターンあり、右上の黄色のランプの状態を確認することで識別できます。</li>
          <li>各鍵は左から、鍵A、鍵B、鍵Cとする。</li>
          <ul>
            <li>どちらも点灯していない場合</li>
            <div className='manual-pattern-box'>
              <p>鍵A：1番左のランプを点灯</p>
              <p>鍵B：すべてのランプを反転</p>
              <p>鍵C：1番右のランプを消灯</p>
            </div>
            <li>左のランプのみ点灯している場合</li>
            <div className='manual-pattern-box'>
              <p>鍵A：すべてのランプを反転</p>
              <p>鍵B：1番左のランプを点灯</p>
              <p>鍵C：1番右のランプを消灯</p>
            </div>
            <li>右のランプのみ点灯している場合</li>
            <div className='manual-pattern-box'>
              <p>鍵A：1番左のランプを点灯</p>
              <p>鍵B：1番右のランプを消灯</p>
              <p>鍵C：すべてのランプを反転</p>
            </div>
            <li>どちらのランプも点灯している場合</li>
            <div className='manual-pattern-box'>
              <p>鍵A：1番右のランプを消灯</p>
              <p>鍵B：すべてのランプを反転</p>
              <p>鍵C：1番左のランプを点灯</p>
            </div>
          </ul>
        </ul>
      </div>
    );
  }

  //ライツアウト
  const lightsOutManual = () => {
    return (
      <div>
        <ul>
          <li>3×3の合計9個のライト全てが消灯している状態を作ることが出来ればクリアとなる。</li>
          <li>押したボタンを基準に、上下左右の十字の位置にあるライトが反転する。つまり、点灯していたものは消灯に、消灯していたものは点灯に変わる。</li>
        </ul>
        <p>例）赤枠で囲まれている真ん中のライトを押した場合</p>
        <img src="./images/lightsOut01.png" alt="" className='w-100' />
        <p>以下のように黒枠で囲われている部分のライトがすべて反転します</p>
        <img src="./images/lightsOut02.png" alt="" className='w-100' />
      </div>
    );
  }

  //レベルメーター
  const levelManual = () => {
    //今日の日だけを取得
    const answerLevel : number = gimmickData.gimmick.level.answer;
    console.log(gimmickData.gimmick.level.answer);
    const day = new Date().getDate();
    if(day % 4 === 0 && day % 3 === 0){
      var levela = answerLevel;
      var levelb = (answerLevel + 2) % 10;
      var levelc = (answerLevel + 4) % 10;
      var leveld = (answerLevel + 6) % 10;
    }
    else if(day % 4 === 0 && day % 3 !== 0){
      var levela = (answerLevel + 2) % 10;
      var levelb = answerLevel;
      var levelc = (answerLevel + 4) % 10;
      var leveld = (answerLevel + 6) % 10;
    }
    else if(day % 4 !== 0 && day % 3 === 0){
      var levela = (answerLevel + 2) % 10;
      var levelb = (answerLevel + 4) % 10;
      var levelc = answerLevel;
      var leveld = (answerLevel + 6) % 10;
    }
    else{
      var levela = (answerLevel + 2) % 10;
      var levelb = (answerLevel + 4) % 10;
      var levelc = (answerLevel + 6) % 10;
      var leveld = answerLevel;
    }

    return (
      <div>
        <ul>
          <li>LEDの光っている数によってレベルが0~10の状態が表され、正しいレベルに3秒間合わせることでクリアとなる。</li>
          <li>LEDの下のつまみを回すことでレベルの上下をすることができる。</li>
          <li>LEDは左から順番に1からレベルの数だけ点灯していく。</li>
        </ul>
        <p>例1) レベル3の場合</p>
        <img src="./images/level01.png" alt="" />
        <p>例2) レベル9の場合</p>
        <img src="./images/level02.png" alt="" />
        <ul>
          <li>正しいレベルは今日の日付を下記の表に照らし合わせたものとなる。</li>
        </ul>
        <table className='table table-bordered manual-level-table'>
          <thead>
            <tr>
              <th className='table-active'>今日の日付</th>
              <th className='table-active'>3で割り切れる</th>
              <th className='table-active'>3で割り切れない</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th className='table-active'>4で割り切れる</th>
              <td>レベル{levela}</td>
              <td>レベル{levelb}</td>
            </tr>
            <tr>
              <th className='table-active'>4で割り切れない</th>
              <td>レベル{levelc}</td>
              <td>レベル{leveld}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  if (gimmickData && !gimmickData.enable) {
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
      <div className='manual-text-box'>
        <span className='h2 my-3 d-block'>マニュアル</span>
        <p>これは、爆弾解除をモチーフに作られた新感覚目覚まし時計です。</p>
        <p>あなたは以下のマニュアルをよく読んで制限時間内に必要なギミックをすべてクリアし、爆弾解除を目指してください。</p>
        <span className='h2 my-3 d-block'>解除までの流れ</span>
        <ul>
          <li>爆弾解除に必要なギミックは左上にあるランプの状態で決まります。</li>
          <ul>
            <li>どちらも点灯していない場合</li>
            <p>今日そのギミックはクリアする必要はありません。</p>
            <li>赤色のランプが点灯している場合</li>
            <p>まだクリアできていないギミックです。</p>
            <li>緑色のランプが点灯している場合</li>
            <p>クリア済みのギミックです。</p>
          </ul>
          <li>必要なギミックをすべてクリアしたら、解除ボタンを押してください。</li>
          <li><span className='text-danger'>どうしても解除できない場合は側面の緊急停止ボタンを押してください。</span></li>
        </ul>
      </div>
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
                {key === 'wires' && wiresManual()}
                {key === 'toggleSW' && toggleSWManual()}
                {key === 'keySW' && keySWManual()}
                {key === 'lightsOut' && lightsOutManual()}
                {key === 'level' && levelManual()}
              </Accordion.Body>
            </Accordion.Item>
          )}
        </Accordion>
      </div>
    </div>
  );
};

export default Manual;