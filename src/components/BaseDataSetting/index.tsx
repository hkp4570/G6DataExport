import React, { useCallback, useMemo } from 'react';
import { Select, Row, Col, InputNumber, ColorPicker } from 'antd';
import type { Color } from 'antd';
import {nodeTypeOptions} from '../../../initializationData/customG6GraphData';
import { useSelector, useDispatch } from 'dva';

const BaseDataSetting = () => {
    const dispatch = useDispatch();
    const currentComponent = useSelector((state:any) => state.project.currentComponent); 
    const currentNode = useSelector((state:any) => state.project.currentNode); 

    const compNode = useMemo(() => {
        const { data: {nodes} } = currentComponent;
        const firstNodes = nodes[0];
        return firstNodes;
    },[currentComponent])
    
    const handleNodeTypeChange = (event:string) => {
        dispatch({
            type: 'project/setDefaultNodeData',
            payload:{
                type: 'type',
                value: event,
            }
        })
    }
    const handleNodeSizeChange = useCallback((type:string, event:number | null) => {
        dispatch({
            type: 'project/setDefaultNodeData',
            payload: {
                type,
                value: event,
            }
        })
    },[])
    const handleNodeColorChange = (type:string, color: Color) => {
        dispatch({
            type: 'project/setDefaultNodeData',
            payload: {
                type,
                value: color.toHexString(),
            }
        })
    }
    const handleNodeLineWidthChange = (type:string, event:number | null) => {
        dispatch({
            type: 'project/setDefaultNodeData',
            payload: {
                type,
                value: event
            }
        })
    }

    return <div>
          <Row align={'middle'} style={{marginBottom: '16px'}}>
                <Col span={4}>节点类型：</Col>
                <Col span={15}>
                <Select
                    defaultValue={compNode.type}
                    style={{ width: 120 }}
                    onChange={handleNodeTypeChange}
                    options={nodeTypeOptions}
                    ></Select>
                </Col>
            </Row>
            <Row align={'middle'} style={{marginBottom: '16px'}}>
                <Col span={4}>节点大小：</Col>
                <Col span={15}>
                    <InputNumber 
                        onChange={(event) => handleNodeSizeChange('width', event)} 
                        min={0} 
                        placeholder='宽' 
                        style={{marginRight:'8px'}}
                        defaultValue={compNode.style.size[0]}
                    ></InputNumber>
                    <InputNumber 
                        onChange={(event) => handleNodeSizeChange('height', event)} 
                        min={0} 
                        placeholder='高'
                        defaultValue={compNode.style.size[1]}
                        ></InputNumber>
                </Col>
            </Row>
            <Row align={'middle'}>
                <Col span={3}>填充色：</Col>
                <Col span={5}>
                    <ColorPicker defaultValue={compNode.style.fill || '#1783FF'} showText onChange={(event) => handleNodeColorChange('fill', event)}></ColorPicker>
                </Col>
                <Col span={3}>描边色：</Col>
                <Col span={5}>
                    <ColorPicker defaultValue={compNode.style.stroke || '#1783FF'} showText onChange={(event) => handleNodeColorChange('stroke', event)}></ColorPicker>
                </Col>
                <Col span={4}>描边宽度：</Col>
                <Col span={4}>
                    <InputNumber 
                        onChange={(event) => handleNodeLineWidthChange('lineWidth', event)}
                        min={0} 
                        defaultValue={compNode.style.lineWidth }
                    ></InputNumber>
                </Col>
            </Row>
    </div>
}

export default BaseDataSetting;