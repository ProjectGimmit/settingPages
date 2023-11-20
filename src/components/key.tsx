import React, { useEffect,useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil'
import { dayAlarmState } from '../states/alarmState'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import Form from 'react-bootstrap/Form';

const Key = () => {
    const alarms = useRecoilValue(dayAlarmState);
    const [alarmsStatus, setAlarmsStatus] = useRecoilState(dayAlarmState);
    const [isSolidIcon1, setIsSolidIcon1] = useState(alarmsStatus.gimmick.keySW.default[0]);
    const [isSolidIcon2, setIsSolidIcon2] = useState(alarmsStatus.gimmick.keySW.default[1]);
    const [isSolidIcon3, setIsSolidIcon3] = useState(alarmsStatus.gimmick.keySW.default[2]);
    
    useEffect(() => {
        setIsSolidIcon1(alarmsStatus.gimmick.keySW.default[0]);
        setIsSolidIcon2(alarmsStatus.gimmick.keySW.default[1]);
        setIsSolidIcon3(alarmsStatus.gimmick.keySW.default[2]);

        //patternの初期化
        let selectedPatternNum = 1;
        if(alarmsStatus.gimmick.keySW.pattern[0]){
            selectedPatternNum += 1;
        }
        if(alarmsStatus.gimmick.keySW.pattern[1]){
            selectedPatternNum += 2;
        }
        //valueが1~4になり、対応するoptionが選択される
        const selectPattern = document.getElementById('selectPattern') as HTMLSelectElement;
        selectPattern.value = selectedPatternNum.toString();
    }, [alarms]);

    const handleIconClick1 = () => {
        setIsSolidIcon1(!isSolidIcon1);
        setAlarmsStatus({ ...alarmsStatus, gimmick: { ...alarmsStatus.gimmick, keySW: { ...alarmsStatus.gimmick.keySW, default: [!isSolidIcon1, isSolidIcon2, isSolidIcon3] } } });
    };

    const handleIconClick2 = () => {
        setIsSolidIcon2(!isSolidIcon2);
        setAlarmsStatus({ ...alarmsStatus, gimmick: { ...alarmsStatus.gimmick, keySW: { ...alarmsStatus.gimmick.keySW, default: [isSolidIcon1, !isSolidIcon2, isSolidIcon3] } } });
    };

    const handleIconClick3 = () => {
        setIsSolidIcon3(!isSolidIcon3);
        setAlarmsStatus({ ...alarmsStatus, gimmick: { ...alarmsStatus.gimmick, keySW: { ...alarmsStatus.gimmick.keySW, default: [isSolidIcon1, isSolidIcon2, !isSolidIcon3] } } });
    };

    const handleSelectChange = (event: { target: { value: {value:1|2|3|4}; }; }) => {
        const selectedPattern = Number(event.target.value);
        switch (selectedPattern) {
            case 1:
                setAlarmsStatus({ ...alarmsStatus, gimmick: { ...alarmsStatus.gimmick, keySW: { ...alarmsStatus.gimmick.keySW, pattern:[false,false] } } });
                break;
            case 2:
                setAlarmsStatus({ ...alarmsStatus, gimmick: { ...alarmsStatus.gimmick, keySW: { ...alarmsStatus.gimmick.keySW, pattern:[false,true] } } });
                break;
            case 3:
                setAlarmsStatus({ ...alarmsStatus, gimmick: { ...alarmsStatus.gimmick, keySW: { ...alarmsStatus.gimmick.keySW, pattern:[true,false] } } });
                break;
            case 4:
                setAlarmsStatus({ ...alarmsStatus, gimmick: { ...alarmsStatus.gimmick, keySW: { ...alarmsStatus.gimmick.keySW, pattern:[true,true] } } });
                break;
            default:
                break;
        }
    };
    const iconStyle1 = { color: isSolidIcon1 ? "#ADF1AC" : "#D9D9D9", marginRight: "10px" };
    const iconStyle2 = { color: isSolidIcon2 ? "#ADF1AC" : "#D9D9D9", marginRight: "10px" };
    const iconStyle3 = { color: isSolidIcon3 ? "#ADF1AC" : "#D9D9D9" };

    const icon1 = isSolidIcon1 ? faCircle : faCircle;
    const icon2 = isSolidIcon2 ? faCircle : faCircle;
    const icon3 = isSolidIcon3 ? faCircle : faCircle;

    return (
        <div id='keySWComponent' className='gimmickComponent'>
            <div>
                <h2>初期状態</h2>
                <FontAwesomeIcon icon={icon1} size="5x" style={iconStyle1} onClick={handleIconClick1} />
                <FontAwesomeIcon icon={icon2} size="5x" style={iconStyle2} onClick={handleIconClick2} />
                <FontAwesomeIcon icon={icon3} size="5x" style={iconStyle3} onClick={handleIconClick3} />
            </div>
            <div>
                <h2>解除パターン</h2>
                <Form.Select aria-label="Default select example" id="selectPattern" onChange={handleSelectChange}>
                    <option value="1">パターン1</option>
                    <option value="2">パターン2</option>
                    <option value="3">パターン3</option>
                    <option value="4">パターン4</option>
                </Form.Select>
            </div>
        </div>
    );
}

export default Key;