import React,{useEffect} from 'react'
import { Link } from 'react-router-dom'
import { alarmsState } from '../states/alarmState'
import { useRecoilState } from 'recoil'
import { sendAlarmSettingsToAPI } from '../api/alarmApi'
import Level from '../components/level'

async function fetchAlarmSettingsFromAPI() {
  // API未実装のためダミーデータを返す
  console.log("fetchAlarmSettingsFromAPI");
  return {
    "mon": {
      "enable": true,
      "alarm": "1100",
      "gimmick": {
        "wires": {
          "enable": true,
          "answer": [true, true, true, true]
        },
        "toggleSW": {
          "enable": true,
          "answer": 31
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
    },
    "tue": {
        "enable": true,
        "alarm": "1100",
        "gimmick": {
          "wires": {
            "enable": true,
            "answer": [true, true, true, true]
          },
          "toggleSW": {
            "enable": true,
            "answer": 31
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
            "answer": 10
          }
        }
    },
    "wed": {
        "enable": true,
        "alarm": "1100",
        "gimmick": {
          "wires": {
            "enable": true,
            "answer": [true, true, true, true]
          },
          "toggleSW": {
            "enable": true,
            "answer": 31
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
            "answer": 10
          }
        }
    },
    "thu": {
        "enable": true,
        "alarm": "1100",
        "gimmick": {
          "wires": {
            "enable": true,
            "answer": [true, true, true, true]
          },
          "toggleSW": {
            "enable": true,
            "answer": 31
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
            "answer": 10
          }
        }
    },
    "fri": {
        "enable": true,
        "alarm": "1100",
        "gimmick": {
          "wires": {
            "enable": true,
            "answer": [true, true, true, true]
          },
          "toggleSW": {
            "enable": true,
            "answer": 31
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
            "answer": 10
          }
        }
    },
    "sat": {
        "enable": true,
        "alarm": "1100",
        "gimmick": {
          "wires": {
            "enable": true,
            "answer": [true, true, true, true]
          },
          "toggleSW": {
            "enable": true,
            "answer": 31
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
            "answer": 10
          }
        }
    },
    "sun": {
        "enable": true,
        "alarm": "1100",
        "gimmick": {
          "wires": {
            "enable": true,
            "answer": [true, true, true, true]
          },
          "toggleSW": {
            "enable": true,
            "answer": 31
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
            "answer": 10
          }
        }
    }
  };
}


const Config = ({ day }: { day: 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun' }) => {
  const [alarms, setAlarms] = useRecoilState(alarmsState);
  
  // 画面が最初に呼び出されたときにAPIから設定情報を取得
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAlarmSettingsFromAPI();
        setAlarms(data);
      } catch (error) {
        // エラーハンドリング
      }
    };
    fetchData();
  }, []);

  const handleTimeChange = (newTime: string, day: keyof typeof alarms) => {
    const updatedAlarms = { ...alarms };
    updatedAlarms[day] = { 
      ...updatedAlarms[day], 
      alarm: newTime
    };
    setAlarms(updatedAlarms);
    sendAlarmSettingsToAPI(updatedAlarms);
  };


  return (
    <div>
      <div>
        カウントダウンタイマー
      </div>
      <div>
        <Level day={day}></Level>
      </div>
    </div>
  )
}

export default Config