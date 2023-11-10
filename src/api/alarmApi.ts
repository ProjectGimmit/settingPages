export async function sendAlarmSettingsToAPI(data: Record<string, any>) {
    try {
      // 実際のAPIエンドポイントにデータを送信するコードをここに実装
      console.log('アラーム設定をサーバーに送信:', data);
      // 実際のAPIとの通信を行うコードをここに実装
    } catch (error) {
      console.error('APIデータ送信エラー:', error);
      throw error;
    }
  }
