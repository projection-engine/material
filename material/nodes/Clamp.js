import Node from '../../components/Node'
import {DATA_TYPES} from "../../components/DATA_TYPES";
import NODE_TYPES from "../../components/NODE_TYPES";


export default class Clamp extends Node {
    constructor() {
        super([
            {label: 'in', key: 'a', accept: [DATA_TYPES.FLOAT]},
            {label: 'Min', key: 'b', accept: [DATA_TYPES.FLOAT] },
            {label: 'Max', key: 'c', accept: [DATA_TYPES.FLOAT] }
        ], [
            {label: 'Result', key: 'clampRes', type: DATA_TYPES.FLOAT}
        ]);
        this.name = 'Clamp'
        this.size = 2
    }

    get type() {
        return NODE_TYPES.FUNCTION
    }


     getFunctionInstance() {
        return ''
    }

    async  getInputInstance(index) {
        return ''
    }

    getFunctionCall({a,b, c}, index) {
        this.clampRes = 'clampRes' + index
        if(b && a && c)
            return `float ${this.clampRes} = clamp(${a.name}, ${b.name}, ${c.name});`
        else
            return `float ${this.clampRes};`
    }

}