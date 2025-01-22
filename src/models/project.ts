import {customG6GraphData} from "../../initializationData/customG6GraphData";
// @ts-ignore
import {Modal, Effects} from 'dva';
import type {EffectsCommandMap} from 'dva';
import {G6GraphType, NodeType, EdgeType} from "@/utils/def-type";

type IState = {
    currentComponent: G6GraphType,
    currentSelectNodes: NodeType [],
    currentSelectEdges: EdgeType [],
}

interface ProjectModal extends Modal {
    state: IState,
    effects: Effects
}

interface RootProjectState {
    project: IState
}

export default {
    namespace: 'project',
    state: {
        currentComponent: customG6GraphData,
        currentSelectNodes: [],
        currentSelectEdges: [],
        menuR: 'normal', // node edge data normal
    },
    effects: {
        * setNodeData({payload}: any, {put, select}: EffectsCommandMap): Generator<any, void, any> {
            const currentComponent = yield select((state: RootProjectState) => state.project.currentComponent);
            const currentSelectNodes = yield select((state: RootProjectState) => state.project.currentSelectNodes);
            const {type, value} = payload;
            if (!type) return;
            let nodes = currentComponent.data.nodes;
            let newCurrentSelectNodes;
            if (type.includes('-')) {
                const types = type.split('-');
                nodes = nodes.map((item: NodeType) => {
                    const exist = currentSelectNodes.some((s:NodeType) => s.id === item.id);
                    if (exist) {
                        return {
                            ...item,
                            [types[0]]: {
                                ...item[types[0]],
                                [types[1]]: value
                            }
                        }
                    }
                    return {...item};
                });
                newCurrentSelectNodes = currentSelectNodes.map((item: NodeType) => {
                    return {
                        ...item,
                        [types[0]]: {
                            ...item[types[0]],
                            [types[1]]: value
                        }
                    }
                })
            } else {
                nodes = nodes.map((item: EdgeType) => {
                    const exist = currentSelectNodes.some(s => s.id === item.id);
                    if (exist) {
                        return {
                            ...item,
                            [type]: value
                        }
                    }
                    return {...item};
                });
                newCurrentSelectNodes = currentSelectNodes.map((item: NodeType) => {
                    return {
                        ...item,
                        [type]: value
                    }
                })
            }
            const newCurrentComponent = {...currentComponent, data: {...currentComponent.data, nodes}};
            yield put({
                type: 'setState',
                payload: {
                    currentComponent: newCurrentComponent,
                    currentSelectNodes: newCurrentSelectNodes,
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
            const currentSelectEdges = yield select((state: any) => state.project.currentSelectEdges);
            const {type, value} = payload;
            if (!type) return;
            let edges = currentComponent.data.edges;
            let newCurrentSelectEdges;
            if (type.includes('-')) {
                const types = type.split('-');
                edges = edges.map((item: EdgeType) => {
                    const exist = currentSelectEdges.some(s => s.id === item.id);
                    if (exist) {
                        return {
                            ...item,
                            [types[0]]: {
                                ...item[types[0]],
                                [types[1]]: value
                            }
                        }
                    }
                    return {...item};
                });
                newCurrentSelectEdges = currentSelectEdges.map((item: NodeType) => {
                    return {
                        ...item,
                        [types[0]]: {
                            ...item[types[0]],
                            [types[1]]: value
                        }
                    }
                })
            } else {
                edges = edges.map((item: EdgeType) => {
                    const exist = currentSelectEdges.some(s => s.id === item.id);
                    if (exist) {
                        return {
                            ...item,
                            [type]: value
                        }
                    }
                    return {...item};
                });
                newCurrentSelectEdges = currentSelectEdges.map((item: NodeType) => {
                    return {
                        ...item,
                        [type]: value
                    }
                })
            }
            const newCurrentComponent = {...currentComponent, data: {...currentComponent.data, edges}};
            yield put({
                type: 'setState',
                payload: {
                    currentComponent: newCurrentComponent
                }
            })
        },
        * setCurrentSelectNodes({payload}: any, {put,select}: EffectsCommandMap): Generator<any, void, any> {
            const currentComponent = yield select(state => state.project.currentComponent);
            const currentSelectNodes = yield select(state => state.project.currentSelectNodes);
            const {id} = payload;
            let newCurrentSelectNodes = window.structuredClone(currentSelectNodes);
            const nodes = currentComponent.data.nodes;
            const exist = currentSelectNodes.some(s => s.id === id);
            if (exist) {
                newCurrentSelectNodes = currentSelectNodes.filter(f => f.id !== id);
            } else {
                const targetNode = nodes.find(f => f.id === id);
                newCurrentSelectNodes.push(targetNode);
            }
            yield put({
                type: 'setState',
                payload: {
                    currentSelectNodes: newCurrentSelectNodes,
                    currentSelectEdges: [],
                    menuR: newCurrentSelectNodes.length > 0 ? 'node' : 'normal',
                }
            })
        },
        * setCurrentSelectEdges({payload}: any, {
            put,
            select
        }: EffectsCommandMap): Generator<any, void, any> {
            const currentComponent = yield select(state => state.project.currentComponent);
            const currentSelectEdges = yield select(state => state.project.currentSelectEdges);
            const {id} = payload;
            let newCurrentSelectEdges = window.structuredClone(currentSelectEdges);
            const edges = currentComponent.data.edges;
            const exist = currentSelectEdges.some(s => s.id === id);
            if (exist) {
                newCurrentSelectEdges = currentSelectEdges.filter(f => f.id !== id);
            } else {
                const targetEdge = edges.find(f => f.id === id);
                newCurrentSelectEdges.push(targetEdge);
            }
            yield put({
                type: 'setState',
                payload: {
                    currentSelectEdges: newCurrentSelectEdges,
                    currentSelectNodes: [],
                    menuR: newCurrentSelectEdges.length > 0 ? 'edge' : 'normal',
                }
            })
        },
        * clearState({payload}:any, {put}:EffectsCommandMap){
            yield put({
                type: 'setState',
                payload,
            })
        },
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