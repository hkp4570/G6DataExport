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

    useEffect(() => {
        if(!graphRef.current){
            const graph = new Graph({
                container: containerRef.current!,
                node:{}, // 默认节点
                edge: {}, // 默认边
                data: currentComponent.data,
            });
            graphRef.current = graph;

            graph.render();
        }


        return () => {
            const graph = graphRef.current;
            if (graph) {
                graph.destroy();
                graphRef.current = undefined;
            }
        }
    }, []);
    return <div>
        <div className={styles.custom_wrapper} ref={containerRef} />
        <Drawer open mask={false} width={'600'} closeIcon={null}>
            <RightPanel/>
        </Drawer>
    </div>
};

export default Index;
