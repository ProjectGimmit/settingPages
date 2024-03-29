import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil'
import { dayAlarmState } from '../states/alarmState'

//TODO:ライツアウトの順番を左下から1,2,3,4,5,6,7,8,9とする

// ライツアウト配列
const LightsOut = () => {
  const alarms = useRecoilValue(dayAlarmState);
  const [alarmsStatus, setAlarmsStatus] = useRecoilState(dayAlarmState);
  let updatedAlarmsStatus: typeof alarmsStatus = { ...alarmsStatus };
  const [lights, setLights] = useState([
    [false, false, false],
    [false, false, false],
    [false, false, false]
  ]);

  useEffect(() => {
    setLights([
      // [alarms.gimmick.lightsOut.default[0], alarms.gimmick.lightsOut.default[1], alarms.gimmick.lightsOut.default[2]],
      // [alarms.gimmick.lightsOut.default[3], alarms.gimmick.lightsOut.default[4], alarms.gimmick.lightsOut.default[5]],
      // [alarms.gimmick.lightsOut.default[6], alarms.gimmick.lightsOut.default[7], alarms.gimmick.lightsOut.default[8]]
      [alarms.gimmick.lightsOut.default[6], alarms.gimmick.lightsOut.default[7], alarms.gimmick.lightsOut.default[8]],
      [alarms.gimmick.lightsOut.default[3], alarms.gimmick.lightsOut.default[4], alarms.gimmick.lightsOut.default[5]],
      [alarms.gimmick.lightsOut.default[0], alarms.gimmick.lightsOut.default[1], alarms.gimmick.lightsOut.default[2]]
    ]);
  }, [alarms]);

  const handleClick = (row: number, col: number) => {
    const newLights = lights.map((rowArr, rowIndex) =>
      rowArr.map((light, colIndex) =>
        rowIndex === row && colIndex === col ? !light : light
      )
    );
    setLights(newLights);
    updatedAlarmsStatus = { ...alarmsStatus, gimmick: { ...alarmsStatus.gimmick, lightsOut: { ...alarmsStatus.gimmick.lightsOut, default: newLights[2].concat(newLights[1], newLights[0]) } } };
    setAlarmsStatus(updatedAlarmsStatus);
  };

  return (
    <div>
      <h2>初期状態</h2>
      {lights.map((row, rowIndex) => (
        <div key={rowIndex}>
          {row.map((light, colIndex) => (
            <button
              key={colIndex}
              onClick={() => handleClick(rowIndex, colIndex)}
              style={{
                width: '5rem',
                height: '5rem',
                margin: '1rem',
                background: light ? '#0d6efd' : '#C0C0C0',
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default LightsOut;
