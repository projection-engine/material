import Node from "../../../../../flow/Node";
import {TYPES} from "../../../../../flow/TYPES";
import NODE_TYPES from "../../../../../flow/NODE_TYPES";
import {quat} from "gl-matrix";
import ROTATION_TYPES from "../../../../../../../services/engine/templates/ROTATION_TYPES";


export default class QuatRotateX extends Node {
    rotType = 'Global'
    constructor() {
        super([
            {label: 'Quaternion', key: 'vec', accept: [TYPES.VEC4]},
            {label: 'Angle', key: 'rad', accept: [TYPES.NUMBER]},
            {
                label: 'Type',
                key: 'rotType',
                bundled: true,
                type: TYPES.OPTIONS,
                options: [{label: 'Local', value: 'Local'}, {label: 'Global', value: 'Global'}]
            },
        ], [
            {label: 'Result', key: 'res', type: TYPES.VEC4},
        ]);
        this.name = 'QuatRotateX'
        this.size = 1
    }

    get type() {
        return NODE_TYPES.FUNCTION
    }

    static compile(tick, {vec, rad}, entities, attributes, nodeID, executors) {
        const quatA = quat.rotateX([], [0, 0, 0, 1], rad)
        attributes[nodeID] = {}
        if (executors[nodeID].rotType === 'Global')
            attributes[nodeID].res = quat.multiply([], quatA, vec)
        else
            attributes[nodeID].res = quat.multiply([], vec, quatA)
        return attributes
    }
}