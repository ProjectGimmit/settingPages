import { useState,useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil'
import { dayAlarmState } from '../states/alarmState'
import './wire.css';

const WireLogic = ({ onMinusClick, isBanVisible, onBanClick, minusColor }) => {
return (
    <div style={{ position: 'relative', margin: '0 0px' }}>
    {!isBanVisible && (
        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="155" viewBox="0 0 14 103" fill="none" onClick={onMinusClick}>
            <rect y="30" width="14" height="20" fill="#7D7D7D"/>
            <rect y="53" width="14" height="20" fill="#7D7D7D"/>
            <rect x="5" width="5" height="30" fill={minusColor}/>
            <rect x="5" y="73" width="5" height="30" fill={minusColor}/>
        </svg>
        )}
    

    {isBanVisible && (
        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="155" viewBox="0 0 14 103" fill="none" onClick={onMinusClick}>
            <rect y="30" width="14" height="43" fill="#7D7D7D"/>
            <rect x="5" width="5" height="30" fill={minusColor}/>
            <rect x="5" y="73" width="5" height="30" fill={minusColor}/>
        </svg>
    )}
    </div>
);
};

const Wire = () => {
    const alarms = useRecoilValue(dayAlarmState);
    const [alarmsStatus, setAlarmsStatus] = useRecoilState(dayAlarmState);
    const [banIcons, setBanIcons] = useState(Array(4).fill(false));
    // const [minusColors, setMinusColors] = useState(['#FF2F2F', '#FFF72F', '#58FF2F', '#2F8EFF']); //線の色
    const minusColors = ['#FF2F2F', '#FFF72F', '#58FF2F', '#2F8EFF']; //線の色
    useEffect(() => {
        setBanIcons(alarmsStatus.gimmick.wires.answer);
    }
    , [alarms]);

    const handleMinusClick = (index: number) => {
        const newBanIcons = [...banIcons];
        newBanIcons[index] = !newBanIcons[index];
        setBanIcons(newBanIcons);
        setAlarmsStatus({ ...alarmsStatus, gimmick: { ...alarmsStatus.gimmick, wires: { ...alarmsStatus.gimmick.wires, answer: newBanIcons } } });
    };

    return (
        <div>
        <h3>解除状態</h3>
        <div style={{ display: 'flex' }} id='wiresBox'>
            {banIcons.map((isBanVisible, index) => (
            <WireLogic
                key={index}
                onMinusClick={() => handleMinusClick(index)}
                isBanVisible={isBanVisible}
                onBanClick={() => handleMinusClick(index)}
                minusColor={minusColors[index]}
            />
            ))}
        </div>
        </div>
    );
};

export default Wire;