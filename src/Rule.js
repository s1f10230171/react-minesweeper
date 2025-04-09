import React from 'react'

export const GameRule = () => {
  return (
    <div className='gamerule'>
      <h2>マインスイーパーとは</h2>
      <p>
        数字は周り８マスにある💣の数を表しています。<br />
        💣を踏まずにすべてのマスを開けばクリア！
      </p>
    </div>
  );
};

const Rule = () => {
  return (
    <div>
        <GameRule />
        <div>
          <h2>攻略のコツ</h2>
          <p>初手は運です</p>
        </div>
    </div>
  )
};

export default Rule