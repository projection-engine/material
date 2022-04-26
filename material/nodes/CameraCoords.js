import Node from '../../components/Node'
import {DATA_TYPES} from "../../components/DATA_TYPES";
import NODE_TYPES from "../../components/NODE_TYPES";


export default class CameraCoords extends Node {

    constructor() {
        super([], [
            {label: 'Coordinates', key: 'cameraVec', type: DATA_TYPES.VEC3}
        ]);

        this.name = 'CameraCoords'
        this.size = 2
    }

    get type() {
        return NODE_TYPES.STATIC
    }

    getFunctionInstance() {
        return ''
    }

    async getInputInstance(index) {
        return ''
    }
    getFunctionCall() {
        this.cameraVec = 'cameraVec'
        return ''
    }
}