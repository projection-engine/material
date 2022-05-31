import Node from "../../../../components/Node"
import {DATA_TYPES} from "../../../../../../engine/templates/DATA_TYPES"
import NODE_TYPES from "../../../../components/NODE_TYPES"
import checkFloat from "../../checkFloat"


export default class Vec3 extends Node {
    v = [0,0,0]
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
            {label: 'Vector', key: 'v', type: DATA_TYPES.VEC3},
        ], [
            {label: 'Value', key: 'VEC3_VAR', type: DATA_TYPES.VEC3},
        ]);

        this.name = 'Vec3'
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

            this.uniformName = `VEC3_VAR${index}`
            uniformData.push({
                key: this.uniformName,
                data: this.v,
                type: DATA_TYPES.VEC3
            })
            uniforms.push({
                label: this.name,
                key: this.uniformName,
                type: DATA_TYPES.VEC3,
                value: this.v
            })

            return `uniform float ${this.uniformName};`
        } else {
            this.uniformName = `VEC3_VAR${index}`
            return `#define ${this.uniformName} vec3(${checkFloat(this.v[0])}, ${checkFloat(this.v[1])}, ${checkFloat(this.v[2])})`
        }
    }

    getFunctionCall(_, index) {
        this.VEC3_VAR = 'VEC3_VAR' + index
        return ''
    }
}