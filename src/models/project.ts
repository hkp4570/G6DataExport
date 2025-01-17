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
        * setNodeData({payload}:any,{put, select}:any):Generator<any, void, any>{
            const currentComponent = yield select((state:any) => state.project.currentComponent);
            const { type, value } = payload;
            if(!type) return;
            let nodes = currentComponent.data.nodes;
            if(type.includes('-')){
                const types = type.split('-');
                nodes = nodes.map((item:EdgeType) => {
                    return {
                        ...item,
                        [types[0]]:{
                            ...item[types[0]],
                            [types[1]]:value
                        }
                    }
                });
            }else{
                nodes = nodes.map((item:EdgeType) => {
                    return {
                        ...item,
                        [type]:value
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
        },
        * setG6Data({payload}:any,{put}:any){
            yield put({
                type: 'setState',
                payload:{
                    currentComponent: payload.value
                }
            })
        },
        * setEdgeData({payload}:any,{put, select}:any):Generator<any,void,any>{
            const currentComponent = yield select((state:any) => state.project.currentComponent);
            const { type, value } = payload;
            if(!type) return;
            let edges = currentComponent.data.edges;
            if(type.includes('-')){
                const types = type.split('-');
                edges = edges.map((item:EdgeType) => {
                    return {
                        ...item,
                        [types[0]]:{
                            ...item[types[0]],
                            [types[1]]:value
                        }
                    }
                });
            }else{
                edges = edges.map((item:EdgeType) => {
                    return {
                        ...item,
                        [type]:value
                    }
                });
            }
            const newCurrentComponent = {...currentComponent, data:{...currentComponent.data, edges}};
            yield put({
                type: 'setState',
                payload:{
                    currentComponent:newCurrentComponent
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