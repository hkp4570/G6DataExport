import React, {useCallback, useMemo} from 'react';
import {Select, Row, Col, InputNumber, ColorPicker, Switch, Input} from 'antd';
import type {GetProp, ColorPickerProps} from 'antd';
import {nodeTypeOptions, fontWeightOptions, labelPlacementOptions} from '@/assets/static';
import {useSelector, useDispatch} from 'dva';

type Color = GetProp<ColorPickerProps, 'value'>;
const BaseDataSetting = () => {
    const dispatch = useDispatch();
    const currentComponent = useSelector((state: any) => state.project.currentComponent);
    const currentNode = useSelector((state: any) => state.project.currentNode);

    const compNode = useMemo(() => {
        const {data: {nodes}} = currentComponent;
        const firstNodes = nodes[0];
        return firstNodes;
    }, [currentComponent])

    const handleNodeTypeChange = (event: string) => {
        dispatch({
            type: 'project/setDefaultNodeData',
            payload: {
                type: 'type',
                value: event,
            }
        })
    }
    const handleNodeSizeChange = useCallback((type: string, event: number | null) => {
        dispatch({
            type: 'project/setDefaultNodeData',
            payload: {
                type,
                value: event,
            }
        })
    }, [])
    const handleNodeColorChange = (type: string, color: Color) => {
        dispatch({
            type: 'project/setDefaultNodeData',
            payload: {
                type,
                value: color.toHexString(),
            }
        })
    }
    const handleNodeLineWidthChange = (type: string, event: number | null) => {
        dispatch({
            type: 'project/setDefaultNodeData',
            payload: {
                type,
                value: event
            }
        })
    }
    const handleNodeLabelChange = (type: string, event: boolean) => {
        dispatch({
            type: 'project/setDefaultNodeData',
            payload: {
                type,
                value: event
            }
        })
    }
    const handleNodeLabelTextChange = (type: string, event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: 'project/setDefaultNodeData',
            payload: {
                type,
                value: event.target.value
            }
        })
    }
    const handleNodeLabelFontSizeChange = (type: string, event: number | null) => {
        dispatch({
            type: 'project/setDefaultNodeData',
            payload: {
                type,
                value: event
            }
        })
    }
    const handleNodeLabelFontWeightChange = (type:string, event:number | string) => {
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
                    style={{width: 120}}
                    onChange={handleNodeTypeChange}
                    options={nodeTypeOptions}
                />
            </Col>
        </Row>
        <Row align={'middle'} style={{marginBottom: '16px'}}>
            <Col span={4}>节点大小：</Col>
            <Col span={15}>
                <InputNumber
                    onChange={(event) => handleNodeSizeChange('width', event)}
                    min={0}
                    placeholder='宽'
                    style={{marginRight: '8px'}}
                    defaultValue={compNode.style.size[0]}
                />
                <InputNumber
                    onChange={(event) => handleNodeSizeChange('height', event)}
                    min={0}
                    placeholder='高'
                    defaultValue={compNode.style.size[1]}
                />
            </Col>
        </Row>
        <Row align={'middle'} style={{marginBottom: '16px'}}>
            <Col span={3}>填充色：</Col>
            <Col span={5}>
                <ColorPicker defaultValue={compNode.style.fill || '#1783FF'} showText
                             onChange={(event) => handleNodeColorChange('fill', event)}/>
            </Col>
            <Col span={3}>描边色：</Col>
            <Col span={5}>
                <ColorPicker defaultValue={compNode.style.stroke || '#1783FF'} showText
                             onChange={(event) => handleNodeColorChange('stroke', event)}/>
            </Col>
            <Col span={4}>描边宽度：</Col>
            <Col span={4}>
                <InputNumber
                    onChange={(event) => handleNodeLineWidthChange('lineWidth', event)}
                    min={0}
                    defaultValue={compNode.style.lineWidth}
                />
            </Col>
        </Row>
        <Row align={'middle'} style={{marginBottom: '16px'}}>
            <Col span={4}>标签显隐：</Col>
            <Col span={4}>
                <Switch defaultChecked={compNode.style.label || true}
                        onChange={(event) => handleNodeLabelChange('label', event)}/>
            </Col>
        </Row>
        <Row align={'middle'} style={{marginBottom: '16px'}}>
            <Col span={4}>标签文本：</Col>
            <Col span={4}>
                <Input placeholder="标签文本" style={{width: 120}}
                       onChange={(event) => handleNodeLabelTextChange('labelText', event)}/>
            </Col>
        </Row>
        <Row align={'middle'} style={{marginBottom: '16px'}}>
            <Col span={4}>标签颜色：</Col>
            <Col span={5}>
                <ColorPicker defaultValue={compNode.style.labelFill || '#000000'} showText
                             onChange={(event) => handleNodeColorChange('labelFill', event)}/>
            </Col>
            <Col span={5}>标签字体大小：</Col>
            <Col span={5}>
                <InputNumber
                    onChange={(event) => handleNodeLabelFontSizeChange('labelFontSize', event)}
                    min={6}
                    defaultValue={compNode.style.labelFontSize || 12}
                />
            </Col>
        </Row>
        <Row align={'middle'} style={{marginBottom: '16px'}}>
            <Col span={5}>标签字体粗细：</Col>
            <Col span={5}>
                <Select
                    defaultValue={compNode.style.labelFontWeight || 400}
                    style={{width: 200}}
                    onChange={event => handleNodeLabelFontWeightChange('labelFontWeight', event)}
                    options={fontWeightOptions}
                />
            </Col>
        </Row>
        <Row align={'middle'} style={{ marginBottom: '16px' }}>
            <Col span={6}>标签相对图形位置：</Col>
            <Col span={6}>
                <Select
                    defaultValue={compNode.style.labelPlacement || 'center'}
                    style={{width: 200}}
                    onChange={event => handleNodeLabelFontWeightChange('labelPlacement', event)}
                    options={labelPlacementOptions}
                />
            </Col>
        </Row>
    </div>
}

export default BaseDataSetting;