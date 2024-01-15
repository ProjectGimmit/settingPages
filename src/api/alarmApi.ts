import { dayManual,weekDay,sendDayTimer } from "../types/dayManual";

//トップページ用API呼び出し
export async function fetchAlarmSettingsFromAPI() {
  try {
    const response = await fetch('http://127.0.0.1:8000/alarm');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching alarm settings:', error);
  }
}

export async function fetchDayAlarmSettingsFromAPI({ day }: { day: weekDay }) {
  //API実装済み
  try {
    const response = await fetch('http://127.0.0.1:8000/'+day);
    const data = await response.json();
    return data;
  }
  catch (error) {
    console.error('Error fetching alarm settings:', error);
  }
}

export async function sendDayAlarmSettingsToAPI({ day }: { day: weekDay },data: dayManual) {
  try {
    await fetch('http://127.0.0.1:8000/config/'+day, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
  } catch (error) {
    console.error('APIデータ送信エラー:', error);
    throw error;
  }
}

//曜日別アラームを設定をサーバーに送信
export async function sendDayTimerSettingToAPI({ day }: { day: string },data: sendDayTimer) {
  try {
    data['alarm'] = data['alarm'].replace(':','');
    await fetch('http://127.0.0.1:8000/alarm/'+day, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
  } catch (error) {
    console.error('APIデータ送信エラー:', error);
    throw error;
  }
}

//試しにギミックを実行する処理をサーバーに送信
export async function sendGimmickToAPI({ day }: { day: weekDay }) {
  try {
    const response = await fetch('http://127.0.0.1:8000/trial/'+day);
    const data = await response.json();
    return data;
  }
  catch (error) {
    console.error('Error fetching alarm settings:', error);
  }
}