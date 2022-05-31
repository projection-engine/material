import Node from "../../../../../../components/Node"
import {DATA_TYPES} from "../../../../../../../../engine/templates/DATA_TYPES"
import NODE_TYPES from "../../../../../../components/NODE_TYPES"


export default class ATan extends Node {
    constructor() {
        super([
            {label: 'A', key: 'a', accept: [DATA_TYPES.NUMBER]}
        ], [
            {label: 'Result', key: 'res', type: DATA_TYPES.NUMBER}
        ]);
        this.name = 'ArcTangent'
        this.size = 1
    }

    get type() {
        return NODE_TYPES.FUNCTION
    }

    static compile(tick, {a}, entities, attributes, nodeID) {
        attributes[nodeID] = {}
        attributes[nodeID].res = Math.atan(a)

        return attributes
    }
}