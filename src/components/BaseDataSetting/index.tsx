import React, {useMemo} from 'react';
import {Select, Row, Col, InputNumber, ColorPicker, Switch, Input} from 'antd';
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
    const currentEdge = useSelector((state: any) => state.project.currentEdge);
    const {firstNodes: compNode, firstEdges: compEdge} = useMemo(() => {
        const {data: {nodes, edges}} = currentComponent;
        const firstNodes = nodes[0];
        const firstEdges = edges[0];
        return {firstNodes, firstEdges};
    }, [currentComponent])

    const handleNodeChange = (type: string, event: any) => {
        dispatch({
            type: 'project/setNodeData',
            payload: {
                type,
                value: event,
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
                    defaultValue={compNode.data?.type}
                    style={{width: 120}}
                    onChange={event => handleNodeChange('data-type', event)}
                    options={nodeTypeOptions}
                />
            </Col>
        </Row>
        <Row align={'middle'} style={{marginBottom: '16px'}}>
            <Col span={4}>节点大小：</Col>
            <Col span={15}>
                <InputNumber
                    onChange={(event) => handleNodeChange('data-size', [event, compNode.data?.size[1]])}
                    min={0}
                    placeholder='宽'
                    style={{marginRight: '8px'}}
                    defaultValue={compNode.data?.size[0]}
                />
                <InputNumber
                    onChange={(event) => handleNodeChange('data-size', [compNode.data?.size[0], event])}
                    min={0}
                    placeholder='高'
                    defaultValue={compNode.data?.size[1]}
                />
            </Col>
        </Row>
        <Row align={'middle'} style={{marginBottom: '16px'}}>
            <Col span={3}>填充色：</Col>
            <Col span={5}>
                <ColorPicker defaultValue={compNode.data.fill || '#1783FF'} showText
                             onChange={(event) => handleNodeChange('data-fill', event.toHexString())}/>
            </Col>
            <Col span={3}>描边色：</Col>
            <Col span={5}>
                <ColorPicker defaultValue={compNode.data.stroke || '#1783FF'} showText
                             onChange={(event) => handleNodeChange('data-stroke', event.toHexString())}/>
            </Col>
            <Col span={4}>描边宽度：</Col>
            <Col span={4}>
                <InputNumber
                    onChange={(event) => handleNodeChange('data-lineWidth', event)}
                    min={0}
                    defaultValue={compNode.data.lineWidth}
                />
            </Col>
        </Row>
        <Row align={'middle'} style={{marginBottom: '16px'}}>
            <Col span={4}>标签显隐：</Col>
            <Col span={4}>
                <Switch defaultChecked={compNode.data.label || true}
                        onChange={(event) => handleNodeChange('data-label', event)}/>
            </Col>
        </Row>
        <Row align={'middle'} style={{marginBottom: '16px'}}>
            <Col span={4}>标签文本：</Col>
            <Col span={4}>
                <Input placeholder="标签文本" style={{width: 120}}
                       defaultValue={compNode.data.labelText}
                       onChange={(event) => handleNodeChange('data-labelText', event.target.value)}/>
            </Col>
        </Row>
        <Row align={'middle'} style={{marginBottom: '16px'}}>
            <Col span={4}>标签颜色：</Col>
            <Col span={5}>
                <ColorPicker defaultValue={compNode.data.labelFill || '#000000'} showText
                             onChange={(event) => handleNodeChange('data-labelFill', event.toHexString())}/>
            </Col>
            <Col span={5}>标签字体大小：</Col>
            <Col span={5}>
                <InputNumber
                    onChange={(event) => handleNodeChange('data-labelFontSize', event)}
                    min={6}
                    defaultValue={compNode.data.labelFontSize || 12}
                />
            </Col>
        </Row>
        <Row align={'middle'} style={{marginBottom: '16px'}}>
            <Col span={5}>标签字体粗细：</Col>
            <Col span={5}>
                <Select
                    defaultValue={compNode.data.labelFontWeight || 400}
                    style={{width: 200}}
                    onChange={event => handleNodeChange('data-labelFontWeight', event)}
                    options={fontWeightOptions}
                />
            </Col>
        </Row>
        <Row align={'middle'} style={{marginBottom: '16px'}}>
            <Col span={6}>标签相对图形位置：</Col>
            <Col span={6}>
                <Select
                    defaultValue={compNode.data.labelPlacement || 'center'}
                    style={{width: 200}}
                    onChange={event => handleNodeChange('data-labelPlacement', event)}
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
                    onChange={event => handleEdgeChange('data-type', event)}
                    options={edgeTypeOptions}
                />
            </Col>
        </Row>
        <Row align={'middle'} style={{marginBottom: '16px'}}>
            <Col span={4}>起始箭头：</Col>
            <Col span={5}>
                <Switch defaultChecked={compEdge.data.startArrow || false}
                        onChange={(event) => handleEdgeChange('data-startArrow', event)}/>
            </Col>
            <Col span={5}>起始箭头偏移量：</Col>
            <Col span={5}>
                <InputNumber
                    onChange={(event) => handleEdgeChange('data-startArrowOffset', event)}
                    min={0}
                    defaultValue={compEdge.data.startArrowOffset || 0}
                />
            </Col>
        </Row>
        <Row align={'middle'} style={{marginBottom: '16px'}}>
            <Col span={3}>箭头大小：</Col>
            <Col span={5}>
                <InputNumber
                    onChange={(event) => handleEdgeChange('data-startArrowSize', event)}
                    min={1}
                    defaultValue={compEdge.data.startArrowSize || 8}
                />
            </Col>
            <Col span={3}>箭头类型：</Col>
            <Col span={5}>
                <Select
                    defaultValue={compEdge.data.startArrowType || 'triangle'}
                    style={{width: 200}}
                    onChange={event => handleEdgeChange('data-startArrowType', event)}
                    options={edgeArrowTypeOptions}
                />
            </Col>
        </Row>
        <Row align={'middle'} style={{marginBottom: '16px'}}>
            <Col span={4}>终点箭头：</Col>
            <Col span={5}>
                <Switch defaultChecked={compEdge.data.endArrow || false}
                        onChange={(event) => handleEdgeChange('data-endArrow', event)}/>
            </Col>
            <Col span={5}>终点箭头偏移量：</Col>
            <Col span={5}>
                <InputNumber
                    onChange={(event) => handleEdgeChange('data-endArrowOffset', event)}
                    min={0}
                    defaultValue={compEdge.data.endArrowOffset || 0}
                />
            </Col>
        </Row>
        <Row align={'middle'} style={{marginBottom: '16px'}}>
            <Col span={3}>箭头大小：</Col>
            <Col span={5}>
                <InputNumber
                    onChange={(event) => handleEdgeChange('data-endArrowSize', event)}
                    min={1}
                    defaultValue={compEdge.data.endArrowSize || 8}
                />
            </Col>
            <Col span={3}>箭头类型：</Col>
            <Col span={5}>
                <Select
                    defaultValue={compEdge.data.endArrowType || 'triangle'}
                    style={{width: 200}}
                    onChange={event => handleEdgeChange('data-endArrowType', event)}
                    options={edgeArrowTypeOptions}
                />
            </Col>
        </Row>
        <Row align={'middle'} style={{marginBottom: '16px'}}>
            <Col span={3}>边颜色：</Col>
            <Col span={5}>
                <ColorPicker defaultValue={compEdge.data.stroke || '#000000'} showText
                             onChange={(event) => handleEdgeChange('data-stroke', event.toHexString())}/>
            </Col>
        </Row>
        <Row align={'middle'} style={{marginBottom: '16px'}}>
            <Col span={3}>边宽度：</Col>
            <Col span={5}>
                <InputNumber
                    onChange={(event) => handleEdgeChange('data-lineWidth', event)}
                    min={1}
                    defaultValue={compEdge.data.lineWidth || 1}
                />
            </Col>
        </Row>
        <Row align={'middle'} style={{marginBottom: '16px'}}>
            <Col span={5}>虚线偏移量：</Col>
            <Col span={5}>
                <InputNumber
                    onChange={(event) => handleEdgeChange('data-lineDash', event)}
                    min={0}
                    defaultValue={compEdge.data.lineDash || 0}
                />
            </Col>
        </Row>
        <Row align={'middle'} style={{marginBottom: '16px'}}>
            <Col span={4}>标签显隐：</Col>
            <Col span={5}>
                <Switch defaultChecked={compEdge.data.label || true}
                        onChange={(event) => handleEdgeChange('data-label', event)}/>
            </Col>
            <Col span={4}>标签文本：</Col>
            <Col span={5}>
                <Input placeholder="标签文本" style={{width: 120}}
                       onChange={(event) => handleEdgeChange('data-labelText', event.target.value)}/>
            </Col>
        </Row>
        <Row align={'middle'} style={{marginBottom: '16px'}}>
            <Col span={4}>自动旋转：</Col>
            <Col span={5}>
                <Switch defaultChecked={compEdge.data.labelAutoRotate || true}
                        onChange={(event) => handleEdgeChange('data-labelAutoRotate', event)}/>
            </Col>
            <Col span={4}>标签颜色：</Col>
            <Col span={5}>
                <ColorPicker defaultValue={compEdge.data.labelFill || '#000000'} showText
                             onChange={(event) => handleEdgeChange('data-labelFill', event.toHexString())}/>
            </Col>
        </Row>
        <Row align={'middle'} style={{marginBottom: '16px'}}>
            <Col span={4}>字体大小：</Col>
            <Col span={5}>
                <InputNumber
                    onChange={(event) => handleEdgeChange('data-labelFontSize', event)}
                    min={6}
                    defaultValue={compEdge.data.labelFontSize || 12}
                />
            </Col>
            <Col span={4}>字体粗细：</Col>
            <Col span={5}>
                <Select
                    defaultValue={compEdge.data.labelFontWeight || 400}
                    style={{width: 200}}
                    onChange={event => handleEdgeChange('data-labelFontWeight', event)}
                    options={fontWeightOptions}
                />
            </Col>
        </Row>
        <Row align={'middle'} style={{marginBottom: '16px'}}>
            <Col span={4}>标签位置：</Col>
            <Col span={10}>
                <InputNumber
                    defaultValue={compEdge.data.labelPlacement || 0.5}
                    min={0} max={1} step={0.1}
                    onChange={event => handleEdgeChange('data-labelPlacement', event)}/>
            </Col>
        </Row>
        <Row align={'middle'} style={{marginBottom: '16px'}}>
            <Col span={4}>偏移量：</Col>
            <Col span={5}>
                <InputNumber defaultValue={compEdge.data.labelOffsetX || 0} min={0} placeholder={'X轴'}
                             onChange={event => handleEdgeChange('data-labelOffsetX', event)}/>
            </Col>
            <Col>
                <InputNumber defaultValue={compEdge.data.labelOffsetY || 0} min={0} placeholder={'Y轴'}
                             onChange={event => handleEdgeChange('data-labelOffsetY', event)}/>
            </Col>
        </Row>
    </div>
}

export default BaseDataSetting;