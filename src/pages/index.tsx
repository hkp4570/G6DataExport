import React, {useEffect, useRef} from 'react';
import { Graph } from '@antv/g6';
import { Drawer } from 'antd';
import styles from './index.less';
import RightPanel from "@/components/RightPanel";
import { useSelector } from 'dva';

const Index = () => {
    const state = useSelector((state: any) => state.project);
    const currentComponent = state.currentComponent;
    const containerRef = useRef<HTMLDivElement>(null);
    const graphRef = useRef<Graph>();

    const createG6 = () => {
        const graph = new Graph({
            container: containerRef.current!,
            behaviors:['drag-canvas', 'zoom-canvas', 'drag-element', 'click-select'], // 交互
            node:{}, // 默认节点
            edge: {}, // 默认边
            data: currentComponent.data,
        });
        graphRef.current = graph;

        graph.render();
    }
    useEffect(() => {
        if(!graphRef.current){
           createG6();
        }
        return () => {
            const graph = graphRef.current;
            if (graph) {
                graph.destroy();
                graphRef.current = undefined;
            }
        }
    }, []);
    useEffect(() => {
        const graph = graphRef.current;
        if (graph) {
            graph.destroy();
            graphRef.current = undefined;
        }
        createG6();
    },[currentComponent.data.nodes, currentComponent.data.edges])
    return <div>
        <div className={styles.custom_wrapper} ref={containerRef} />
        <Drawer open mask={false} width={'600'} closeIcon={null}>
            <RightPanel/>
        </Drawer>
    </div>
};

export default Index;
