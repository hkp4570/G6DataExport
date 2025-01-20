import {useMemo} from "react";
import {useSelector} from 'dva';

export default function useGetReduxData(){
    const currentComponent = useSelector((state: any) => state.project.currentComponent);
    const data = useMemo(() => {
        const {data: {nodes, edges}} = currentComponent;
        const firstNode = nodes[0];
        const firstEdge = edges[0];
        return {firstNode, firstEdge};
    }, [currentComponent])
    return data;
}