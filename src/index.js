'use strict';
//jest 내장 기능
//useFakeTimers() : 타이머 사용 함수
//clearAllTimers() : 이후 사용되도록 선언된 타이머 까지 제거
//advanceTimersByTime() :jest.advanceTimersByTime(msToRun)

class Sensor {
    constructor(status) {
        this.powerStatus = 'off'; // off, on
        this.status = status; // id1, idle, sensingDistance, reportingData
        this.reportingInterval = 10000; // 10000 (ms) 초기값
    }
    turn(powerStatus) {
        if (powerStatus === 'off') this.powerStatus = powerStatus;
        if (this.status === 'id1') {
            this.powerStatus = powerStatus; //on
            this.status = 'idle'; // 유휴
            setTimeout(() => {
                this.status = 'sensingDistance';
                setTimeout(() => {
                    this.status = 'reportingData';
                }, 500);
                setTimeout(() => {
                    this.status = 'idle';
                }, 1000);
            }, this.reportingInterval);
        } else if ((this.status = 'idle')) {
            if (powerStatus === 'on') {
                throw new Error('켜져있는데 또 키는거 안돼');
            } else {
                this.powerStatus = powerStatus; //off
            }
        }
    }
}

class IotServer {
    constructor() {
        this.sensor = [];
    }
    start([sensor]) { // sensor 한개짜리 array...
        this.sensor.push(...[sensor]);
    }
    publish(value) {
        for (let i=0; i< this.sensor.length; i++){
            if(this.sensor[0]['powerStatus'] === 'on') {
                this.sensor[0]['reportingInterval'] = value['payload']; //3000
            }
        }
    }
}

module.exports = {
    Sensor,
    IotServer,
};
