import { dayManual } from "../types/dayManual";

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

export async function fetchDayAlarmSettingsFromAPI({ day }: { day: 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun' }) {
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

export async function sendDayAlarmSettingsToAPI({ day }: { day: 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun' },data: dayManual) {
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
export async function sendDayTimerSettingToAPI({ day }: { day: string },data: Record<string, any>) {
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
export async function sendGimmickToAPI({ day }: { day: string }) {
  try {
    console.log(day+'のギミックを実行:');
    // 実際のAPIとの通信を行うコードをここに実装
  } catch (error) {
    console.error('APIデータ送信エラー:', error);
    throw error;
  }
}