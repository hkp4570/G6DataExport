import React, {useEffect, useRef, useState} from 'react';
import {Graph, NodeEvent} from '@antv/g6';
import {Drawer} from 'antd';
import styles from './index.less';
import RightPanel from "@/components/RightPanel";
import {useDispatch} from 'dva';
import {useGetReduxData} from "@/hooks";

const Index = () => {
    const {firstNode, currentComponent,currentSelectNodes,currentSelectEdges} = useGetReduxData();
    const dispatch = useDispatch();
    const containerRef = useRef<HTMLDivElement | null>(null);
    const graphRef = useRef<Graph>();
    const [drawerOpen, setDrawerOpen] = useState(false);

    // 点击了节点或者边
    const handleElement = (event) => {
        console.log(event, 'element')
        const shiftKey = event.shiftKey;
        const targetType = event.targetType; // node, edge canvas
        if (targetType === 'node') {
            setDrawerOpen(true);
            const id = event.target.id;
            dispatch({
                type: 'project/setCurrentSelectNodes',
                payload: {
                    id,
                    multiple: shiftKey,
                }
            })
        } else if (targetType === 'edge') {
            setDrawerOpen(true);
            const id = event.target.id;
            dispatch({
                type: 'project/setCurrentSelectEdges',
                payload: {
                    id,
                    multiple: shiftKey,
                }
            })
        } else if (targetType === 'canvas') {
            if (drawerOpen) {
                setDrawerOpen(false);
            }
        }
    }
    const createG6 = () => {
        const graph = new Graph({
            container: containerRef.current!,
            behaviors: [
                // {
                //     type: 'click-select',
                //     multiple: true,
                //     trigger: ['shift'],
                //     onClick: handleElement,
                // },
                'drag-element'
            ],
            node: {
                type: (d: any) => d.data.type,
                style: {
                    x: (d: any) => d.data.x,
                    y: (d: any) => d.data.y,
                    size: (d: any) => d.data.size,
                    labelText: (d: any) => d.data.labelText,
                    fill: (d: any) => d.data.fill || '#1783FF',
                    stroke: (d: any) => d.data.stroke || '#1783FF',
                    lineWidth: (d: any) => d.data.lineWidth || 1,

                    label: (d: any) => d.data.label !== false,
                    labelFill: (d: any) => d.data.labelFill || '#000000',
                    labelFontSize: (d: any) => d.data.labelFontSize || 12,
                    labelFontWeight: (d: any) => d.data.labelFontWeight || 400,
                    labelPlacement: (d: any) => d.data.labelPlacement || 'center',

                    port: (d: any) => d.data.port,
                    ports: (d: any) => d.data.ports,
                    portR: (d: any) => d.data.portR,
                    portLineWidth: (d: any) => d.data.portLineWidth,
                    portStroke: (d: any) => d.data.portStroke,
                }
            },
            edge: {
                type: (d: any) => d.data.type,
                style: {
                    startArrow: (d: any) => {
                        if (typeof d.data.startArrow !== 'boolean') {
                            return false;
                        }
                        return d.data.startArrow
                    },
                    endArrow: (d: any) => d.data.endArrow !== false,
                    startArrowOffset: (d: any) => d.data.startArrowOffset || 0,
                    startArrowSize: (d: any) => d.data.startArrowSize || 8,
                    startArrowType: (d: any) => d.data.startArrowType || 'triangle',
                    endArrowOffset: (d: any) => d.data.endArrowOffset || 0,
                    endArrowSize: (d: any) => d.data.endArrowSize || 8,
                    endArrowType: (d: any) => d.data.endArrowType || 'triangle',
                    stroke: (d: any) => d.data.stroke || '#000000',
                    lineWidth: (d: any) => d.data.lineWidth || 1,
                    lineDash: (d: any) => d.data.lineDash || 0,

                    label: (d: any) => d.data.label !== false,
                    labelText: (d: any) => d.data.labelText,
                    labelFontSize: (d: any) => d.data.labelFontSize || 12,
                    labelFontWeight: (d: any) => d.data.labelFontWeight || 400,
                    labelAutoRotate: (d: any) => d.data.labelAutoRotate !== false,
                    labelFill: (d: any) => d.data.labelFill || '#000000',
                    labelPlacement: (d: any) => d.data.labelPlacement || 0.5,
                    labelOffsetX: (d: any) => d.data.labelOffsetX || 0,
                    labelOffsetY: (d: any) => d.data.labelOffsetY || 0,
                }
            }, // 默认边
            data: currentComponent.data,
        });
        graphRef.current = graph;
        graph.on(NodeEvent.CLICK, (event) => {
            console.log(event, 'event');
        } )
        graph.render();
    }
    useEffect(() => {
        if (!graphRef.current) {
            createG6();
        }
        return () => {
            const graph = graphRef.current;
            if (graph) {
                graph.destroy();
                graph.off();
                graphRef.current = undefined;
            }
        }
    }, []);
    useEffect(() => {
        const graph = graphRef.current;
        if(graph){
            const data = currentSelectNodes.map(item => ({id:item.id, style: {zIndex:0}, data: {...item.data}}));
            console.log(data, 'data')
            graph.updateNodeData(data);
            console.log(graph.getNodeData(), 'getNodeData');
        }
    }, [currentSelectNodes])
    return <div>
        <div className={styles.custom_wrapper} ref={containerRef}/>
        <Drawer open={drawerOpen} mask={false} width={'600'} closeIcon={null}>
            <RightPanel/>
        </Drawer>
    </div>
};

export default Index;
