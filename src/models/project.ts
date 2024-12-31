import { Modal } from 'dva';

export default {
    namespace: 'project',
    state:{
        currentComponent:{},
        components:[]
    },
    effects:{

    },
    reducers:{
        setState(state, {payload}){
            return {
                ...state,
                ...payload
            }
        }
    }
} as Modal