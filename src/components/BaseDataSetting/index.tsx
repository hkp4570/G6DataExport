import React, {useCallback, useMemo, useState} from 'react';
import {Select, Row, Col, InputNumber, ColorPicker, Switch, Input, Radio} from 'antd';
import type {GetProp, ColorPickerProps} from 'antd';
import {
    nodeTypeOptions,
    fontWeightOptions,
    labelPlacementOptions,
    edgeTypeOptions,
    edgeArrowTypeOptions, edgeLabelPlacement
} from '@/assets/static';
import {useSelector, useDispatch} from 'dva';
import {debounce} from "@/utils";

type Color = GetProp<ColorPickerProps, 'value'>;
const BaseDataSetting = () => {
    const dispatch = useDispatch();
    const currentComponent = useSelector((state: any) => state.project.currentComponent);
    const currentNode = useSelector((state: any) => state.project.currentNode);
    const {firstNodes: compNode, firstEdges: compEdge} = useMemo(() => {
        const {data: {nodes, edges}} = currentComponent;
        const firstNodes = nodes[0];
        const firstEdges = edges[0];
        return {firstNodes, firstEdges};
    }, [currentComponent])
    const [edgeLabelType, setEdgeLabelType] = useState<'default' | 'percentage'>(typeof compEdge.style.labelPlacement === 'string' ? 'default' : 'percentage');

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
    const handleNodeLabelFontWeightChange = (type: string, event: number | string) => {
        dispatch({
            type: 'project/setDefaultNodeData',
            payload: {
                type,
                value: event
            }
        })
    }
    const handleEdgeChange = (type: string, event: any) => {
        dispatch({
            type: 'project/setEdgeData',
            payload: {
                type,
                value: event,
            }
        })
    }
    // TODO: 修改文本时可使用防抖
    const debounceHandleEdgeChange = debounce(handleEdgeChange, 1000);
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
        <Row align={'middle'} style={{marginBottom: '16px'}}>
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
        <Row align={'middle'} style={{marginBottom: '16px'}}>
            <Col span={3}>边类型：</Col>
            <Col span={5}>
                <Select
                    defaultValue={compEdge.type || 'line'}
                    style={{width: 200}}
                    onChange={event => handleEdgeChange('type', event)}
                    options={edgeTypeOptions}
                />
            </Col>
        </Row>
        <Row align={'middle'} style={{marginBottom: '16px'}}>
            <Col span={4}>起始箭头：</Col>
            <Col span={5}>
                <Switch defaultChecked={compEdge.style.startArrow || false}
                        onChange={(event) => handleEdgeChange('style-startArrow', event)}/>
            </Col>
            <Col span={5}>起始箭头偏移量：</Col>
            <Col span={5}>
                <InputNumber
                    onChange={(event) => handleEdgeChange('style-startArrowOffset', event)}
                    min={0}
                    defaultValue={compEdge.style.startArrowOffset || 0}
                />
            </Col>
        </Row>
        <Row align={'middle'} style={{marginBottom: '16px'}}>
            <Col span={3}>箭头大小：</Col>
            <Col span={5}>
                <InputNumber
                    onChange={(event) => handleEdgeChange('style-startArrowSize', event)}
                    min={1}
                    defaultValue={compEdge.style.startArrowSize || 8}
                />
            </Col>
            <Col span={3}>箭头类型：</Col>
            <Col span={5}>
                <Select
                    defaultValue={compEdge.style.startArrowType || 'triangle'}
                    style={{width: 200}}
                    onChange={event => handleEdgeChange('style-startArrowType', event)}
                    options={edgeArrowTypeOptions}
                />
            </Col>
        </Row>
        <Row align={'middle'} style={{marginBottom: '16px'}}>
            <Col span={4}>终点箭头：</Col>
            <Col span={5}>
                <Switch defaultChecked={compEdge.style.endArrow || false}
                        onChange={(event) => handleEdgeChange('style-endArrow', event)}/>
            </Col>
            <Col span={5}>终点箭头偏移量：</Col>
            <Col span={5}>
                <InputNumber
                    onChange={(event) => handleEdgeChange('style-endArrowOffset', event)}
                    min={0}
                    defaultValue={compEdge.style.endArrowOffset || 0}
                />
            </Col>
        </Row>
        <Row align={'middle'} style={{marginBottom: '16px'}}>
            <Col span={3}>箭头大小：</Col>
            <Col span={5}>
                <InputNumber
                    onChange={(event) => handleEdgeChange('style-endArrowSize', event)}
                    min={1}
                    defaultValue={compEdge.style.endArrowSize || 8}
                />
            </Col>
            <Col span={3}>箭头类型：</Col>
            <Col span={5}>
                <Select
                    defaultValue={compEdge.style.endArrowType || 'triangle'}
                    style={{width: 200}}
                    onChange={event => handleEdgeChange('style-endArrowType', event)}
                    options={edgeArrowTypeOptions}
                />
            </Col>
        </Row>
        <Row align={'middle'} style={{marginBottom: '16px'}}>
            <Col span={3}>边颜色：</Col>
            <Col span={5}>
                <ColorPicker defaultValue={compEdge.style.stroke || '#000000'} showText
                             onChange={(event) => handleEdgeChange('style-stroke', event.toHexString())}/>
            </Col>
        </Row>
        <Row align={'middle'} style={{marginBottom: '16px'}}>
            <Col span={3}>边宽度：</Col>
            <Col span={5}>
                <InputNumber
                    onChange={(event) => handleEdgeChange('style-lineWidth', event)}
                    min={1}
                    defaultValue={compEdge.style.lineWidth || 1}
                />
            </Col>
        </Row>
        <Row align={'middle'} style={{marginBottom: '16px'}}>
            <Col span={5}>虚线偏移量：</Col>
            <Col span={5}>
                <InputNumber
                    onChange={(event) => handleEdgeChange('style-lineDash', event)}
                    min={0}
                    defaultValue={compEdge.style.lineDash || 0}
                />
            </Col>
        </Row>
        <Row align={'middle'} style={{marginBottom: '16px'}}>
            <Col span={4}>标签显隐：</Col>
            <Col span={5}>
                <Switch defaultChecked={compEdge.style.label || true}
                        onChange={(event) => handleEdgeChange('style-label', event)}/>
            </Col>
            <Col span={4}>标签文本：</Col>
            <Col span={5}>
                <Input placeholder="标签文本" style={{width: 120}}
                       onChange={(event) => handleEdgeChange('style-labelText', event.target.value)}/>
            </Col>
        </Row>
        <Row align={'middle'} style={{marginBottom: '16px'}}>
            <Col span={4}>自动旋转：</Col>
            <Col span={5}>
                <Switch defaultChecked={compEdge.style.labelAutoRotate || true}
                        onChange={(event) => handleEdgeChange('style-labelAutoRotate', event)}/>
            </Col>
            <Col span={4}>标签颜色：</Col>
            <Col span={5}>
                <ColorPicker defaultValue={compEdge.style.labelFill || '#000000'} showText
                             onChange={(event) => handleEdgeChange('style-labelFill', event.toHexString())}/>
            </Col>
        </Row>
        <Row align={'middle'} style={{marginBottom: '16px'}}>
            <Col span={4}>字体大小：</Col>
            <Col span={5}>
                <InputNumber
                    onChange={(event) => handleEdgeChange('style-labelFontSize', event)}
                    min={6}
                    defaultValue={compEdge.style.labelFontSize || 12}
                />
            </Col>
            <Col span={4}>字体粗细：</Col>
            <Col span={5}>
                <Select
                    defaultValue={compEdge.style.labelFontWeight || 400}
                    style={{width: 200}}
                    onChange={event => handleEdgeChange('style-labelFontWeight', event)}
                    options={fontWeightOptions}
                />
            </Col>
        </Row>
        <Row align={'middle'} style={{marginBottom: '16px'}}>
            <Col span={4}>标签位置：</Col>
            <Col span={5}>
                <Radio.Group defaultValue={edgeLabelType} size="small"
                             onChange={event => setEdgeLabelType(event.target.value)}>
                    <Radio.Button value="default">默认</Radio.Button>
                    <Radio.Button value="percentage">百分比</Radio.Button>
                </Radio.Group>
            </Col>
            <Col span={10}>
                {
                    edgeLabelType === 'default' ? (<Select
                        defaultValue={(typeof compEdge.style.labelPlacement) === 'string' ? compEdge.style.labelPlacement : 'center'}
                        style={{width: 200}}
                        onChange={event => handleEdgeChange('style-labelPlacement', event)}
                        options={edgeLabelPlacement}
                    />) : (<InputNumber defaultValue={(typeof compEdge.style.labelPlacement) === 'number' ? compEdge.style.labelPlacement : 0.5} min={0} max={1} step={0.1}
                                        onChange={event => handleEdgeChange('style-labelPlacement', event)}/>)
                }
            </Col>
        </Row>
        <Row align={'middle'} style={{marginBottom: '16px'}}>
            <Col span={4}>偏移量：</Col>
            <Col span={5}>
                <InputNumber defaultValue={compEdge.style.labelOffsetX || 0} min={0} placeholder={'X轴'}
                             onChange={event => handleEdgeChange('style-labelOffsetX', event)}/>
            </Col>
            <Col>
                <InputNumber defaultValue={compEdge.style.labelOffsetY || 0} min={0} placeholder={'Y轴'}
                             onChange={event => handleEdgeChange('style-labelOffsetY', event)}/>
            </Col>
        </Row>
    </div>
}

export default BaseDataSetting;