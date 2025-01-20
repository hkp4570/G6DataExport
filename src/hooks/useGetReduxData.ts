import {useMemo} from "react";
import {useSelector} from 'dva';

export default function useGetReduxData() {
    const currentComponent = useSelector((state: any) => state.project.currentComponent);
    const currentSelectNodes = useSelector((state: any) => state.project.currentSelectNodes);
    const currentSelectEdges = useSelector((state: any) => state.project.currentSelectEdges);
    const data = useMemo(() => {
        const firstNode = currentSelectNodes[0];
        const firstEdge = currentSelectEdges[0];
        return {firstNode, firstEdge, currentComponent, currentSelectNodes, currentSelectEdges};
    }, [currentSelectNodes, currentSelectEdges])
    return data;
}