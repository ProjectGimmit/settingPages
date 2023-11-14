import React, { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import Form from 'react-bootstrap/Form';

const Key = () => {
    const alarms = useRecoilValue(dayAlarmState);
    const [alarmsStatus, setAlarmsStatus] = useRecoilState(dayAlarmState);
    const [isSolidIcon1, setIsSolidIcon1] = useState(true);
    const [isSolidIcon2, setIsSolidIcon2] = useState(true);
    const [isSolidIcon3, setIsSolidIcon3] = useState(true);

    const handleIconClick1 = () => {
        setIsSolidIcon1(!isSolidIcon1);
    };

    const handleIconClick2 = () => {
        setIsSolidIcon2(!isSolidIcon2);
    };

    const handleIconClick3 = () => {
        setIsSolidIcon3(!isSolidIcon3);
    };

    const iconStyle1 = { color: isSolidIcon1 ? "#D9D9D9" : "#ADF1AC", marginRight: "10px" };
    const iconStyle2 = { color: isSolidIcon2 ? "#D9D9D9" : "#ADF1AC", marginRight: "10px" };
    const iconStyle3 = { color: isSolidIcon3 ? "#D9D9D9" : "#ADF1AC" };

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
            <Form.Select aria-label="Default select example">
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