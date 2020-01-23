export class Sensor {
    constructor(
        public id: number,
        public name: string,
        public status: string,
        public min_value: string,
        public max_value: string,
        public stationid: string
    ){}
}