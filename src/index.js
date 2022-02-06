'use strict'
    //jest 내장 기능
    //useFakeTimers() : 타이머 사용 함수
    //clearAllTimers() : 이후 사용되도록 선언된 타이머 까지 제거
    //advanceTimersByTime() :jest.advanceTimersByTime(msToRun)

class Sensor {
    constructor(status) {
        this.powerStatus = 'off'; // off, on
        this.status = status; // id1, idle, sensingDistance, reportingData
        this.reportingInterval = 10000; // 10000 (ms) 초기값
        this.sensor = [];
    }
    turn(powerStatus) {
        if (powerStatus === 'off') this.powerStatus = powerStatus;
        if (this.status === 'id1') {
            this.powerStatus = powerStatus; //on
            this.status = 'idle'; // 유휴
        } else if (this.status = 'idle') {
            if(powerStatus === 'on') {
                throw new Error('켜져있는데 또 키는거 안돼');
            } else {
                this.powerStatus = powerStatus; //off
            }
            // '유휴 상태에서 설정된 reportingInterval 값(단위: ms) 만큼 기다린 후 거리 측정을 한다.'
            setInterval(() => { this.status = 'sensingDistance'; console.log(this.status); }, 10000);
            // '거리 측정에 걸리는 시간은 항상 500ms 이내여야 한다.'
            // '데이터 보고에 걸리는 시간은 항상 1000ms 이내여야 하며, 데이터 보고 후 유휴 상태로 돌아간다.' 
        } 
    }  
}

class IotServer {
    constructor() {
        this.deviceId = deviceId;
        this.actionId = actionId;
        this.payload = payload;
        this.event = {};
    }

    // 'CHANGE_REPORTING_INTERVAL 액션이 발생하면 기기에 설정되어 있던 reportingInterval 값을 전달 받은 값으로 교체해야 한다.'
    start([sensor]) {

    }

    // '기기가 꺼지면 기기는 서버로 부터 어떠한 이벤트도 수신할 수 없다.'
    publish({deviceId, actionId, payload}) {
        this.deviceId = deviceId;
        this.actionId = actionId;
        this.payload = payload;
    };
}

module.exports = {
    Sensor,
    IotServer,
};
