import {useContext, useEffect, useState} from "react";
import QuickAccessProvider from "../../../../hooks/QuickAccessProvider";
import EVENTS from "../../../../utils/EVENTS";
import useMinimalEngine from "../../../../engine-editor/useMinimalEngine";
import useFlow from "../../components/hooks/useFlow";
import Material from "../nodes/Material";
import TextureSample from "../nodes/TextureSample";
import Add from "../nodes/math/Add";
import TextureCoords from "../nodes/static/TextureCoords";
import Float from "../nodes/math/Float";
import Divide from "../nodes/math/Divide";
import Sine from "../nodes/math/Sine";
import NormalVector from "../nodes/static/NormalVector";
import ParallaxOcclusionMapping from "../nodes/ParallaxOcclusionMapping";
import RGB from "../nodes/RGB";
import ToTangentSpace from "../nodes/static/ToTangentSpace";
import AbsoluteWorldPosition from "../nodes/static/AbsoluteWorldPosition";
import ViewDirection from "../nodes/static/ViewDirection";
import CameraCoords from "../nodes/static/CameraCoords";
import ElapsedTime from "../nodes/static/ElapsedTime";
import Multiply from "../nodes/math/Multiply";
import PerlinNoise from "../nodes/math/PerlinNoise";
import BreakVec2 from "../nodes/vec/BreakVec2";
import DotVec2 from "../nodes/vec/DotVec2";
import LerpVec2 from "../nodes/vec/LerpVec2";
import LerpVec4 from "../nodes/vec/LerpVec4";
import LerpVec3 from "../nodes/vec/LerpVec3";
import DotVec3 from "../nodes/vec/DotVec3";
import DotVec4 from "../nodes/vec/DotVec4";
import BreakVec4 from "../nodes/vec/BreakVec4";
import BreakVec3 from "../nodes/vec/BreakVec3";
import Vec2 from "../nodes/vec/Vec2";
import Vec3 from "../nodes/vec/Vec3";
import Vec4 from "../nodes/vec/Vec4";
import Max from "../nodes/math/Max";
import Min from "../nodes/math/Min";
import OneMinus from "../nodes/math/OneMinus";
import Clamp from "../nodes/math/Clamp";
import MakeVector from "../nodes/vec/MakeVector";
import Saturate from "../nodes/math/Saturate";
import Saturation from "../nodes/math/Saturation";
import Pow from "../nodes/math/Pow";
import SceneColor from "../nodes/SceneColor";
import LoaderProvider from "../../../../../components/loader/LoaderProvider";
import getNewInstance from "../utils/getNewInstance";


export default function useMaterialView(file,setAlert) {
    const {
        nodes, setNodes,
        links, setLinks,
        groups, setGroups,
        changed, setChanged,
        selected, setSelected,
        impactingChange, setImpactingChange,
    } = useFlow()

    const [realTime, setRealTime] = useState(true)
    const quickAccess = useContext(QuickAccessProvider)
    const load = useContext(LoaderProvider)
    const engine = useMinimalEngine(true, true, true, true)

    useEffect(() => {
        load.pushEvent(EVENTS.LOADING_MATERIAL)
        if (engine.gpu && engine.meshes.length > 0)
            parse(file, quickAccess, setNodes, setLinks, engine, load)

    }, [file, engine.gpu, engine.meshes])


    return {
        realTime, setRealTime,
        impactingChange, setImpactingChange,
        nodes, setNodes,
        links, setLinks,
        groups, setGroups,
        changed, setChanged,
        selected, setSelected,
        engine, quickAccess, load,
        setAlert
    }
}

function parse(file, quickAccess, setNodes, setLinks, engine, load) {
    quickAccess.fileSystem
        .readRegistryFile(file.registryID)
        .then(res => {
            if (res) {
                quickAccess.fileSystem
                    .readFile(quickAccess.fileSystem.path + '\\assets\\' + res.path, 'json')
                    .then(file => {
                        if (file && Object.keys(file).length > 0) {
                            const newNodes = file.nodes.map(f => {
                                const i = getNewInstance(f.instance)
                                if(i)
                                    Object.keys(f).forEach(o => {
                                        if(o !== 'inputs' && o !== 'output') {
                                            if (o === 'texture' && i instanceof TextureSample)
                                                i[o] = quickAccess.images.find(i => i.registryID === f[o].registryID)
                                            else
                                                i[o] = f[o]
                                        }
                                    })
                                return i
                            }).filter(e => e !== null && e !== undefined)
                            // applyViewport(file.response, engine, setAlert)
                            setNodes(newNodes)
                            setLinks(file.links)

                            load.finishEvent(EVENTS.LOADING_MATERIAL)
                        } else {
                            // applyViewport({}, engine, setAlert)
                            setNodes([new Material()])
                            load.finishEvent(EVENTS.LOADING_MATERIAL)
                        }
                    })
            } else
                load.finishEvent(EVENTS.LOADING_MATERIAL)
        })
}