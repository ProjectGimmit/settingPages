import { dayManual } from "../types/dayManual";

export async function sendAlarmSettingsToAPI(data: Record<string, any>) {
  try {
    // 実際のAPIエンドポイントにデータを送信するコードをここに実装
    console.log('トップページ用アラーム設定をサーバーに送信:', data);
    // 実際のAPIとの通信を行うコードをここに実装
  } catch (error) {
    console.error('APIデータ送信エラー:', error);
    throw error;
  }
}
//トップページ用API呼び出し
export async function fetchAlarmSettingsFromAPI() {
  // API未実装のためダミーデータを返す
  return {
    "mon": {
      "enable": true,
      "alarm": "1100"
    },
    "tue": {
      "enable": true,
      "alarm": "1100"
    },
    "wed": {
      "enable": true,
      "alarm": "1100"
    },
    "thu": {
      "enable": true,
      "alarm": "1100"
    },
    "fri": {
      "enable": true,
      "alarm": "1100"
    },
    "sat": {
      "enable": true,
      "alarm": "1100"
    },
    "sun": {
      "enable": true,
      "alarm": "1100"
    }
  };
}

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

export async function sendDayAlarmSettingsToAPI({ day }: { day: 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun' },data: dayManual) {
  try {
    // 実際のAPIエンドポイントにデータを送信するコードをここに実装
    console.log('曜日が'+day+'のアラーム設定をサーバーに送信:', data);
    if(data.alarm === ""){
      throw new Error("アラーム時刻が未入力です");
    }
    // 実際のAPIとの通信を行うコードをここに実装
  } catch (error) {
    console.error('APIデータ送信エラー:', error);
    throw error;
  }
}

//曜日別アラームを設定をサーバーに送信
export async function sendDayTimerSettingToAPI({ day }: { day: string },data: Record<string, any>) {
  try {
    // 実際のAPIエンドポイントにデータを送信するコードをここに実装
    console.log('曜日が'+day+'のタイマー設定をサーバーに送信:', data);
    if(data.alarm === ""){
      throw new Error("アラーム時刻が未入力です");
    }
    // 実際のAPIとの通信を行うコードをここに実装
  } catch (error) {
    console.error('APIデータ送信エラー:', error);
    throw error;
  }
}

//試しにギミックを実行する処理をサーバーに送信
export async function sendGimmickToAPI({ day }: { day: string }) {
  try {
    console.log(day+'のギミックを実行:');
    // 実際のAPIとの通信を行うコードをここに実装
  } catch (error) {
    console.error('APIデータ送信エラー:', error);
    throw error;
  }
}