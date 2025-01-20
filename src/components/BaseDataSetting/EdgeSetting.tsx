import React from 'react';
import { useDispatch} from 'dva';
import {Col, ColorPicker, Input, InputNumber, Row, Select, Switch} from "antd";
import {edgeArrowTypeOptions, edgeTypeOptions, fontWeightOptions} from "@/assets/static";
import {useGetReduxData} from "@/hooks";

const EdgeSetting = () => {
    const dispatch = useDispatch();
    const {firstEdge: compEdge} = useGetReduxData();
    const handleEdgeChange = (type: string, event: any) => {
        dispatch({
            type: 'project/setEdgeData',
            payload: {
                type,
                value: event,
            }
        })
    }
    return (
        <div>
            <h3>边设置</h3>
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
    );
};

export default EdgeSetting;