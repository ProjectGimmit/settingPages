import { atom } from 'recoil';

export const alarmsState = atom({
  key: 'alarmsState',
  default: {
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
          "answer": 10
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
            "answer": 10
          }
        }
    }
  },
});
