import React, { useState } from 'react';

// ライツアウト配列
const LightsOut = () => {
  const [lights, setLights] = useState([
    [true, true, true],
    [true, true, true],
    [true, true, true]
  ]);

  const handleClick = (row: number, col: number) => {
    const newLights = lights.map((rowArr, rowIndex) =>
      rowArr.map((light, colIndex) =>
        rowIndex === row && colIndex === col ? !light : light
      )
    );

    setLights(newLights);
  };

  return (
    <div>
      <h3>初期状態</h3>
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
                background: light ? '#C0C0C0' : '#B0FFA0',
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default LightsOut;
