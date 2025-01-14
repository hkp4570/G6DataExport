import {customG6GraphData} from "../../initializationData/customG6GraphData";
// @ts-ignore
import {Modal, Effects} from 'dva';
import {G6GraphType, NodeType, EdgeType} from "@/utils/def-type";

type IState = {
    currentComponent: G6GraphType,
    currentNode: NodeType | null,
    currentEdge: EdgeType | null,
}

interface ProjectModal extends Modal {
    state: IState,
    effects: Effects
}

export default {
    namespace: 'project',
    state: {
        currentComponent: customG6GraphData,
        currentNode: null,
        currentEdge: null,
    },
    effects: {
        * setDefaultNodeData({payload}:any,{put, select}:any):Generator<any, void, any>{
            const currentComponent = yield select((state:any) => state.project.currentComponent);
            const { type, value } = payload;
            if(!type) return;
            let nodes = currentComponent.data.nodes;
            if(type === 'width' || type === 'height'){
                nodes = currentComponent.data.nodes.map((item:NodeType) => {
                    return {
                        ...item,
                        style:{
                            ...item.style,
                            size: type === 'width' ? [value, item.style.size[1]] : [item.style.size[0], value],
                        }
                    }
                });
            } else if (type === 'type'){
                nodes = currentComponent.data.nodes.map((item:NodeType) => {
                    return {
                        ...item,
                        [type]: value,
                    }
                });
            }else{
                nodes = currentComponent.data.nodes.map((item:NodeType) => {
                    return {
                        ...item,
                        style:{
                            ...item.style,
                            [type]:value
                        }
                    }
                });
            }
            const newCurrentComponent = {...currentComponent, data:{...currentComponent.data, nodes}};
            yield put({
                type: 'setState',
                payload:{
                    currentComponent: newCurrentComponent
                }
            })
        }
    },
    reducers: {
        setState(state: IState, {payload}: { payload: any }) {
            return {
                ...state,
                ...payload
            }
        }
    }
} as ProjectModal