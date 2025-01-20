import React from 'react';
import {Col, ColorPicker, Input, InputNumber, Row, Select, Switch} from "antd";
import {fontWeightOptions, labelPlacementOptions, nodeTypeOptions} from "@/assets/static";
import { useDispatch} from 'dva';
import {debounce} from "@/utils";
import {useGetReduxData} from "@/hooks";

const NodeSetting = () => {
    const dispatch = useDispatch();
    const {firstNode:compNode} = useGetReduxData();
    const handleNodeChange = (type: string, event: any) => {
        dispatch({
            type: 'project/setNodeData',
            payload: {
                type,
                value: event,
            }
        })
    }
    // TODO: 修改文本时可使用防抖
    const debounceHandleEdgeChange = debounce(handleNodeChange, 1000);
    return (
        <div>
            <h3>节点设置</h3>
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
        </div>
    );
};

export default NodeSetting;