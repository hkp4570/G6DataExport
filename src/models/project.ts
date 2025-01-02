import {customG6GraphData} from "../../initializationData/customG6GraphData";
// @ts-ignore
import {Modal} from 'dva';
import {G6GraphType} from "@/utils/def-type";

type IState = {
    currentComponent: G6GraphType,
    components: any []
}

interface ProjectModal extends Modal {
    state: IState,
}

export default {
    namespace: 'project',
    state: {
        currentComponent: customG6GraphData,
        components: []
    },
    effects: {},
    reducers: {
        setState(state: IState, {payload}: { payload: any }) {
            return {
                ...state,
                ...payload
            }
        }
    }
} as ProjectModal