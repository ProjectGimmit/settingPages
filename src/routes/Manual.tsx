import { useEffect, useState } from 'react'
import { Accordion, AccordionHeader} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { fetchDayAlarmSettingsFromAPI, sendGimmickToAPI } from '../api/alarmApi';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import './Manual.css';
import { dayManual,weekDay } from '../types/dayManual';

const Manual = () => {

  const daysOfWeek: Array< weekDay > = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  const [gimmickData, setGimmickData] = useState<dayManual>();
  const [weekDay, setWeekDay] = useState<weekDay>(daysOfWeek[new Date().getDay()]);

  useEffect(() => {
    // 曜日ごとの設定情報をAPIから取得
    fetchDayAlarmSettingsFromAPI({day:weekDay})
      .then(data => setGimmickData(data as dayManual))
      .catch(error => console.error(error));
  }, [weekDay]);

  const wireManual = (answer : [boolean,boolean,boolean,boolean]) => {
    //全てtrueの場合
    if (answer[0] && answer[1] && answer[2] && answer[3]) {
      return '全て接続する';
    }
    //全てfalseの場合
    if (!answer[0] && !answer[1] && !answer[2] && !answer[3]) {
      return '全て接続しない';
    }
    let wire1 : string = '';
    let wire2 : string = '';
    if (answer[0]) {
      wire1 += '赤';
    }
    else {
      wire2 += '赤';
    }
    if (answer[1]) {
      wire1.length === 0 ? wire1 += '黄' : wire1 += '、黄';
    }
    else {
      wire2.length === 0 ? wire2 += '黄' : wire2 += '、黄';
    }
    if (answer[2]) {
      wire1.length === 0 ? wire1 += '緑' : wire1 += '、緑';
    }
    else {
      wire2.length === 0 ? wire2 += '緑' : wire2 += '、緑';
    }
    if (answer[3]) {
      wire1.length === 0 ? wire1 += '青' : wire1 += '、青';
    }
    else {
      wire2.length === 0 ? wire2 += '青' : wire2 += '、青';
    }
    return `${wire2}を切断し、${wire1}を接続する。`;
  }

  //ワイヤーが有効だった場合のマニュアル表示関数
  const wiresManual = () => {
    let monday,tuesday,wednesday,thursday,friday,saturday,sunday : string;
    if(gimmickData){
      (weekDay === 'mon') ? monday = wireManual(gimmickData.gimmick.wires.answer) : monday = wireManual([!gimmickData.gimmick.wires.answer[0],gimmickData.gimmick.wires.answer[1],gimmickData.gimmick.wires.answer[2],gimmickData.gimmick.wires.answer[3]]);
      (weekDay === 'tue') ? tuesday = wireManual(gimmickData.gimmick.wires.answer) : tuesday = wireManual([gimmickData.gimmick.wires.answer[0],!gimmickData.gimmick.wires.answer[1],gimmickData.gimmick.wires.answer[2],gimmickData.gimmick.wires.answer[3]]);
      (weekDay === 'wed') ? wednesday = wireManual(gimmickData.gimmick.wires.answer) : wednesday = wireManual([gimmickData.gimmick.wires.answer[0],gimmickData.gimmick.wires.answer[1],!gimmickData.gimmick.wires.answer[2],gimmickData.gimmick.wires.answer[3]]);
      (weekDay === 'thu') ? thursday = wireManual(gimmickData.gimmick.wires.answer) : thursday = wireManual([gimmickData.gimmick.wires.answer[0],gimmickData.gimmick.wires.answer[1],gimmickData.gimmick.wires.answer[2],!gimmickData.gimmick.wires.answer[3]]);
      (weekDay === 'fri') ? friday = wireManual(gimmickData.gimmick.wires.answer) : friday = wireManual([!gimmickData.gimmick.wires.answer[0],!gimmickData.gimmick.wires.answer[1],gimmickData.gimmick.wires.answer[2],gimmickData.gimmick.wires.answer[3]]);
      (weekDay === 'sat') ? saturday = wireManual(gimmickData.gimmick.wires.answer) : saturday = wireManual([gimmickData.gimmick.wires.answer[0],!gimmickData.gimmick.wires.answer[1],!gimmickData.gimmick.wires.answer[2],gimmickData.gimmick.wires.answer[3]]);
      (weekDay === 'sun') ? sunday = wireManual(gimmickData.gimmick.wires.answer) : sunday = wireManual([gimmickData.gimmick.wires.answer[0],gimmickData.gimmick.wires.answer[1],!gimmickData.gimmick.wires.answer[2],!gimmickData.gimmick.wires.answer[3]]);
    return (
      <div>
        <ul>
          <li>左から赤・黄・緑・青の4本のワイヤーがあり、<span style={{fontWeight: "bold"}}>それぞれを正しい状態にすることでクリアとなる。</span></li>
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
              <td>{tuesday}</td>
            </tr>
            <tr>
              <td>水曜日</td>
              <td>{wednesday}</td>
            </tr>
            <tr>
              <td>木曜日</td>
              <td>{thursday}</td>
            </tr>
            <tr>
              <td>金曜日</td>
              <td>{friday}</td>
            </tr>
            <tr>
              <td>土曜日</td>
              <td>{saturday}</td>
            </tr>
            <tr>
              <td>日曜日</td>
              <td>{sunday}</td>
            </tr>
          </tbody>
        </table>
        <span className='text-danger'>※実機では設定によってクリアパターンは変わります。</span>
      </div>
    );
    }
    return null;
  }

  //トグルスイッチ
  const toggleSWManual = () => {
    return (
      <div>
        <ul>
          <li>各スイッチは左から順に、16,8,4,2,1の数値が割り当てられており、<span style={{fontWeight: "bold"}}>ONになっているスイッチの数値の合計がディスプレイに表示されている数値と一致した時、クリアとなる。</span></li>
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
          <li>キースイッチは、各鍵の動作を駆使して３つの青色のランプを<span style={{fontWeight: "bold"}}>すべて点灯した状態にすることでクリアとなる。</span></li>
          <li>各鍵の動作パターンは4パターンあり、<span style={{fontWeight: "bold"}}>右上の黄色のランプの状態</span>を確認することで識別できます。</li>
          <li>各鍵は左から、鍵A、鍵B、鍵Cとする。</li>
          {/* <ul>
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
          </ul> */}
        </ul>
        <div className='manual-pattern-box-flex'>
              <div className='pattern'>
                <p>点灯状態</p>
                <img src="./images/pattern_1.png" alt="" className='' style={{height: "30px"}} />
              </div>
              <div className='inner'>
                  <div>鍵A</div>
                  <div>鍵B</div>
                  <div>鍵C</div>
                  <div>
                    <p>左のランプを</p>
                    <p>点灯</p>
                  </div>
                  <div>
                    <p>すべてのランプを</p>
                    <p>反転</p>
                  </div>
                  <div>
                    <p>右のランプを</p>
                    <p>消灯</p>
                  </div>
              </div>
        </div>
        <div style={{height: "30px"}}></div>

        <div className='manual-pattern-box-flex'>
              <div className='pattern'>
                <p>点灯状態</p>
                <img src="./images/pattern_2.png" alt="" className='' style={{height: "30px"}} />
              </div>
              <div className='inner'>
                  <div>鍵A</div>
                  <div>鍵B</div>
                  <div>鍵C</div>
                  <div>
                    <p>すべてのランプを</p>
                    <p>反転</p>
                  </div>
                  <div>
                    <p>左のランプを</p>
                    <p>点灯</p>
                  </div>
                  <div>
                    <p>右のランプを</p>
                    <p>消灯</p>
                  </div>
              </div>
        </div>
        <div style={{height: "30px"}}></div>

        <div className='manual-pattern-box-flex'>
              <div className='pattern'>
                <p>点灯状態</p>
                <img src="./images/pattern_3.png" alt="" className='' style={{height: "30px"}} />
              </div>
              <div className='inner'>
                  <div>鍵A</div>
                  <div>鍵B</div>
                  <div>鍵C</div>
                  <div>
                    <p>左のランプを</p>
                    <p>点灯</p>
                  </div>
                  <div>
                    <p>右のランプを</p>
                    <p>消灯</p>
                  </div>
                  <div>
                    <p>すべてのランプを</p>
                    <p>反転</p>
                  </div>
              </div>
        </div>
        <div style={{height: "30px"}}></div>

        <div className='manual-pattern-box-flex'>
              <div className='pattern'>
                <p>点灯状態</p>
                <img src="./images/pattern_4.png" alt="" className='' style={{height: "30px"}} />
              </div>
              <div className='inner'>
                  <div>鍵A</div>
                  <div>鍵B</div>
                  <div>鍵C</div>
                  <div>
                    <p>右のランプを</p>
                    <p>消灯</p>
                  </div>
                  <div>
                    <p>すべてのランプを</p>
                    <p>反転</p>
                  </div>
                  <div>
                    <p>左のランプを</p>
                    <p>点灯</p>
                  </div>
              </div>
        </div>
        <div style={{height: "30px"}}></div>

      </div>
    );
  }

  //ライツアウト
  const lightsOutManual = () => {
    return (
      <div>
        <ul>
          <li>3×3の合計9個のライト<span style={{fontWeight: "bold"}}>全てが消灯している状態を作ることが出来ればクリアとなる。</span></li>
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
    if(!gimmickData){
      return null;
    }
    const answerLevel : number = gimmickData.gimmick.level.answer;
    const day = new Date().getDate();
    let levela,levelb,levelc,leveld : number;
    (day % 4 === 0 && day % 3 === 0) ? levela = answerLevel : levela = (answerLevel + 2) % 10;
    (day % 4 === 0 && day % 3 !== 0) ? levelb = answerLevel : levelb = (answerLevel + 4) % 10;
    (day % 4 !== 0 && day % 3 === 0) ? levelc = answerLevel : levelc = (answerLevel + 6) % 10;
    (day % 4 !== 0 && day % 3 !== 0) ? leveld = answerLevel : leveld = (answerLevel + 8) % 10;

    return (
      <div>
        <ul>
          <li>LEDの光っている数によってレベルが0~10の状態が表され、<span style={{fontWeight: "bold"}}>正しいレベルに3秒間合わせることでクリアとなる。</span></li>
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
        <span className='text-danger'>※実機では設定によって正解のレベルは変わります。</span>
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
          <img src="./images/error_logo.png" alt="" className='p-3 w-100' />
        </div>
      </div>
    );
  }

  return (
    <div className='manual-body'>
      <header className='manual-header p-3 sticky-top d-flex align-items-center justify-content-between'>
        <span className='text-white fs-3 mx-auto'>Gimmit</span>
        <div className='manual-header-empty'></div>
      </header>
      <div className='manual-text-box'>
        <span className='h2 my-3 d-block'>Gimmitとは</span>
        <p>Gimmitとは爆弾解除をモチーフとした新感覚のIoT目覚まし時計です。</p>
        <p>Gimmitは、ギミックを切り抜け目覚ましを止めろ！というコンセプトのもと、ユーザーが用意された様々な"Gimmick"を"Time Limit"までにすべて解除する、本物の爆弾解除のような体験をしてもらうことができる目覚まし時計となっています。</p>
        <p>目覚まし時計の本体は以下の画像のようになっています。</p>
        <span style={{fontSize: "0.8rem"}} className='text-muted'>▼本体画像</span>
        <img src="./images/Manual01.png" alt="目覚まし時計本体解説" className='p-3 w-100'/>
        <p>Gimmitの利用方法としては設定方法と解除方法の2つの操作があります。</p>
        <span className='h2 my-3 d-block'>設定方法</span>
        <p>GimmitのWEBアプリにて、設定をすることができます。</p>
        <p>トップページでは各曜日のアラーム時間と、アラームのON,OFFの設定ができます。</p>
        <span style={{fontSize: "0.8rem"}} className='text-muted'>▼トップページ</span>
        <img src="./images/ss1.png" alt="" className='p-3 w-100'/>
        <p>各曜日の歯車マークの設定ボタンを押すと設定ページを開くことができ、各ギミックの初期状態や、どのギミックを作動させるかなどの設定ができます。</p>
        <span style={{fontSize: "0.8rem"}} className='text-muted'>▼設定ページ</span>
        <img src="./images/ss2.png" alt="" className='p-3 w-100'/>
        <span className='h2 my-3 d-block'>解除方法</span>
        <p>設定した時間になるとアラームが鳴りだします。</p>
        <img src="./images/Manual02.png" alt="目覚まし時計本体解説" className='p-3 w-50 mx-auto'/>
        <p>アラームを止めるには、本体の右下にある上の画像の<span className='text-danger'>赤い解除ボタン</span>を<span className='fw-bold'>1回</span>押してください。</p>
        <p>アラームを止めるとゲーム開始となり、右上に表示される制限時間内に赤色のランプが点灯しているギミックをマニュアルを参考にしてクリアしてください。</p>
        <p>以下はマニュアルの例です。実際の内容とは多少異なります。</p>
        <hr />
        <span className='h2 my-3 d-block'>解除までの流れ</span>
        <ul>
          <li>アラーム解除に必要なギミックは各ギミックの左上にあるランプの状態で決まります。</li>
          <ul>
            <li>どちらも点灯していない場合</li>
            <img src="./images/pattern_1.png" alt="" className='m-3' style={{height: "30px"}} />
            <p>今日そのギミックはクリアする必要はありません。</p>
            <li>赤色のランプが点灯している場合</li>
            <img src="./images/gimmick_1.png" alt="" className='m-3' style={{height: "30px"}} />
            <p>まだクリアできていないギミックです。</p>
            <li>緑色のランプが点灯している場合</li>
            <img src="./images/gimmick_2.png" alt="" className='m-3' style={{height: "30px"}} />
            <p>クリア済みのギミックです。</p>
          </ul>
          <li>必要なギミックをすべてクリアしたら、解除ボタンを押してください。</li>
          <li><span className='text-danger'>どうしても解除できない場合は<span style={{fontWeight: "bold"}}>側面の緊急停止ボタン</span>を押してください。</span></li>
        </ul>
      </div>
      <div className='manual-accordion-box'>
        {gimmickData && (Object.keys(gimmickData.gimmick) as Array<keyof typeof gimmickData.gimmick>).map((key) =>
          gimmickData.gimmick[key].enable &&
            <Accordion defaultActiveKey={key} key={key}>
              <Accordion.Item eventKey={key} key={key}>
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
            </Accordion>
        )}
      </div>
    </div>
  );
};

export default Manual;