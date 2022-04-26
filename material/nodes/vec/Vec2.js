import Node from '../../../components/Node'
import {DATA_TYPES} from "../../../components/DATA_TYPES";
import NODE_TYPES from "../../../components/NODE_TYPES";
import checkFloat from "../../utils/checkFloat";


export default class Vec2 extends Node {
    v = [0,0]
    uniform = false

    constructor() {
        super([
            {
                label: 'As uniform',
                key: 'uniform',
                type: DATA_TYPES.OPTIONS,
                options: [
                    {label: 'Yes', data: true},
                    {label: 'No', data: false}
                ]
            },
            {label: 'Vector', key: 'v', type: DATA_TYPES.VEC2},
        ], [
            {label: 'Value', key: 'VEC2_VAR', type: DATA_TYPES.VEC2},
        ]);

        this.name = 'Vec2'
        this.size = 2
    }

    get type() {
        if (this.uniform)
            return NODE_TYPES.VARIABLE
        else
            return NODE_TYPES.STATIC
    }

    getFunctionInstance() {
        return ''
    }

    async getInputInstance(index, uniforms, uniformData) {

        if (this.uniform) {

            this.uniformName = `VEC2_VAR${index}`
            uniformData.push({
                key: this.uniformName,
                data: this.v,
                type: DATA_TYPES.VEC2
            })
            uniforms.push({
                label: this.name,
                key: this.uniformName,
                type: DATA_TYPES.VEC2,
                value: this.v
            })

            return `uniform float ${this.uniformName};`
        } else {
            this.uniformName = `VEC2_VAR${index}`
            return `#define ${this.uniformName} vec2(${checkFloat(this.v[0])}, ${checkFloat(this.v[1])})`
        }
    }

    getFunctionCall(_, index) {
        this.VEC2_VAR = 'VEC2_VAR' + index
        return ''
    }
}