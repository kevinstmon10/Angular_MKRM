export class Sensor {
    constructor(
        public id: number,
        public name: string,
        public status: string,
        public minValue: string,
        public maxValue: string,
        public stationid: string
    ){}
}