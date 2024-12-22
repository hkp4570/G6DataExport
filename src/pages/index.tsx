import React, {useEffect, useRef} from 'react';
import { Graph } from '@antv/g6';
import { Drawer } from 'antd';
import styles from './index.less';
import RightPanel from "@/components/RightPanel";

const Index = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const graph = new Graph({
            container: containerRef.current!,
            data: {
                nodes: [
                    {
                        id: 'node-1',
                        style: { x: 50, y: 100 },
                    },
                    {
                        id: 'node-2',
                        style: { x: 150, y: 100 },
                    },
                ],
                edges: [{ id: 'edge-1', source: 'node-1', target: 'node-2' }],
            },
        });

        graph.render();
    }, []);
    return <div>
        <div className={styles.custom_wrapper} ref={containerRef} />
        <Drawer open mask={false} width={'600'} closeIcon={null}>
            <RightPanel/>
        </Drawer>
    </div>
};

export default Index;
