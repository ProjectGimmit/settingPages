
export type dayManual = {
    enable: boolean;
    alarm: string;
    limit: number;
    gimmick: {
      wires: {
        enable: boolean;
        answer: [boolean,boolean,boolean,boolean];
      };
      toggleSW: {
        enable: boolean;
        answer: [boolean,boolean,boolean,boolean,boolean];
      };
      keySW: {
        enable: boolean;
        pattern: [boolean,boolean];
        default: [boolean,boolean,boolean];
      };
      lightsOut: {
        enable: boolean;
        default: [boolean,boolean,boolean,boolean,boolean,boolean,boolean,boolean,boolean];
      };
      level: {
        enable: boolean;
        answer: number;
      };
    };
  };

  export type weekDay = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";

  export type dayTimer = {
    enable: boolean;
    alarm: string;
    limit: number;
    gimmickEnable : [keySW: boolean, level: boolean, lightsOut: boolean, toggleSW: boolean, wires: boolean];
  }

  export type sendDayTimer = {
    enable: boolean;
    alarm: string;
  }
