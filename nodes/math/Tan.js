import Node from "../../templates/Node"
import {DATA_TYPES} from "../../../../engine/templates/DATA_TYPES"
import NODE_TYPES from "../../templates/NODE_TYPES"


export default class Tan extends Node {
    constructor() {
        super([
            {label: "A", key: "a", accept: [DATA_TYPES.FLOAT]}
        ], [
            {label: "Result", key: "tanRes", type: DATA_TYPES.FLOAT}
        ])
        this.equalTypeInputs = true
        this.name = "Cosine"
        this.size = 2
    }

    get type() {
        return NODE_TYPES.FUNCTION
    }


    getFunctionInstance() {
        return ""
    }

    async  getInputInstance(index) {
        return ""
    }

    getFunctionCall({a}, index) {
        this.tanRes = "tanRes" + index

        if(a)
            return `float ${this.tanRes} = tan(${a.name});`
        else
            return `float ${this.tanRes} = 0.;`
    }
}