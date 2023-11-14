export async function fetchDayAlarmSettingsFromAPI({ day }: { day: 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun' }) {
  // API未実装のためダミーデータを返す
  console.log('曜日:'+day);
  return {
    "enable": true,
    "alarm": "1100",
    "gimmick": {
      "wires": {
        "enable": true,
        "answer": [true, true, true, true]
      },
      "toggleSW": {
        "enable": true,
        "answer": [true, true, true, true, true]
      },
      "keySW": {
        "enable": true,
                "pattern":[true,false],
        "default": [true, true, true]
      },
      "lightsOut": {
        "enable": true,
        "default": [false, true, false, true, false, true, false, true, false]
      },
      "level": {
        "enable": true,
        "answer": 5
      }
    }
  };
}

export async function sendDayAlarmSettingsToAPI({ day }: { day: 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun' },data: Record<string, any>) {
  try {
    // 実際のAPIエンドポイントにデータを送信するコードをここに実装
    console.log('曜日が'+day+'のアラーム設定をサーバーに送信:', data);
    // 実際のAPIとの通信を行うコードをここに実装
  } catch (error) {
    console.error('APIデータ送信エラー:', error);
    throw error;
  }
}