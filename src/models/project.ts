import {customG6GraphData} from "../../initializationData/customG6GraphData";
// @ts-ignore
import {Modal, Effects} from 'dva';
import type {EffectsCommandMap} from 'dva';
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
        * setNodeData({payload}: any, {put, select}: EffectsCommandMap): Generator<any, void, any> {
            const currentComponent = yield select((state: any) => state.project.currentComponent);
            const {type, value} = payload;
            if (!type) return;
            let nodes = currentComponent.data.nodes;
            if (type.includes('-')) {
                const types = type.split('-');
                nodes = nodes.map((item: EdgeType) => {
                    return {
                        ...item,
                        [types[0]]: {
                            ...item[types[0]],
                            [types[1]]: value
                        }
                    }
                });
            } else {
                nodes = nodes.map((item: EdgeType) => {
                    return {
                        ...item,
                        [type]: value
                    }
                });
            }
            const newCurrentComponent = {...currentComponent, data: {...currentComponent.data, nodes}};
            yield put({
                type: 'setState',
                payload: {
                    currentComponent: newCurrentComponent
                }
            })
        },
        * setG6Data({payload}: any, {put}: EffectsCommandMap) {
            yield put({
                type: 'setState',
                payload: {
                    currentComponent: payload.value
                }
            })
        },
        * setEdgeData({payload}: any, {put, select}: EffectsCommandMap): Generator<any, void, any> {
            const currentComponent = yield select((state: any) => state.project.currentComponent);
            const {type, value} = payload;
            if (!type) return;
            let edges = currentComponent.data.edges;
            if (type.includes('-')) {
                const types = type.split('-');
                edges = edges.map((item: EdgeType) => {
                    return {
                        ...item,
                        [types[0]]: {
                            ...item[types[0]],
                            [types[1]]: value
                        }
                    }
                });
            } else {
                edges = edges.map((item: EdgeType) => {
                    return {
                        ...item,
                        [type]: value
                    }
                });
            }
            const newCurrentComponent = {...currentComponent, data: {...currentComponent.data, edges}};
            yield put({
                type: 'setState',
                payload: {
                    currentComponent: newCurrentComponent
                }
            })
        },
        * setCurrentNode({payload}: { id: string }, {put, select}: EffectsCommandMap): Generator<any, void, any> {
            const currentComponent = yield select(state => state.project.currentComponent);
            const {id} = payload;
            const nodes = currentComponent.data.nodes;
            const targetNode = nodes.find(f => f.id === id);
            yield put({
                type: 'setState',
                payload: {
                    currentNode: targetNode,
                }
            })
        },
        * setCurrentEdge({payload}: { id: string }, {put, select}: EffectsCommandMap): Generator<any, void, any> {
            const currentComponent = yield select(state => state.project.currentComponent);
            const {id} = payload;
            const edges = currentComponent.data.edges;
            const targetEdge = edges.find(f => f.id === id);
            yield put({
                type: 'setState',
                payload: {
                    currentEdge: targetEdge,
                }
            })
        }
    },
    reducers: {
        setState(state: IState, {payload}: { payload: Partial<IState> }) {
            return {
                ...state,
                ...payload
            }
        }
    }
} as ProjectModal