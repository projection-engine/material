import Node from "../../../components/Node";
import COMPONENTS from "../../../../../engine/shared/templates/COMPONENTS";
import NODE_TYPES from "../../../components/NODE_TYPES";
import {DATA_TYPES} from "../../../components/DATA_TYPES";

export default class SetWorldRotation extends Node {

    constructor() {
        super([
            {label: 'Start', key: 'start', accept: [DATA_TYPES.EXECUTION]},
            {label: 'Entity', key: 'entity', accept: [DATA_TYPES.ENTITY], componentRequired: COMPONENTS.TRANSFORM},
            {label: 'Quaternion', key: 'rotation', accept: [DATA_TYPES.VEC4]},

        ], [
            {label: 'Execute', key: 'EXECUTION', type: DATA_TYPES.EXECUTION}]);
        this.name = 'SetWorldRotation'
    }

    get type() {
        return NODE_TYPES.VOID_FUNCTION
    }

    static compile(tick, {rotation, entity}, entities, attributes, nodeID) {

        entity.components[COMPONENTS.TRANSFORM].rotationQuat = rotation
        return attributes
    }
}