type Ports = {
    key?: string,
    placement: string | number[],
    fill?: string,
}
type NodeStyleOriginType = {
    type?: 'rect' | 'circle' | 'diamond' | 'ellipse' | 'hexagon' | 'triangle',
    x: number,
    y: number,
    z?: number,
    size: [number, number] | number,
    fill?: string,
    stroke?: string,
    lineWidth?: number,

    label?: boolean,
    labelText?: string,
    labelFill?: string,
    labelFontSize?: number,
    labelFontWeight?: number | string,
    labelPlacement?: 'left' | 'right' | 'top' | 'bottom' | 'left-top' | 'left-bottom' | 'right-top' | 'right-bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center'

    port?: boolean,
    ports?: Ports[],
    portR?: number,
    portLineWidth?: number,
    portStroke?: string

}
export type NodeType = {
    id: string,
    data: NodeStyleOriginType,
}
type EdgeStyleOriginType = {
    type?: string,
    startArrow: boolean,
    endArrow: boolean,
    startArrowOffset: number,
    startArrowSize: number,
    startArrowType: string,
    endArrowOffset: number,
    endArrowSize: number,
    endArrowType: string,
    stroke: string,
    lineWidth: number,
    lineDash: number,

    label: boolean,
    labelText: string,
    labelFontSize: number,
    labelFontWeight: number,
    labelAutoRotate: boolean,
    labelFill: string,
    labelPlacement: number,
    labelOffsetX: number,
    labelOffsetY: number,
}
export type EdgeType = {
    id: string,
    source: string,
    target: string,
    data?:Partial<EdgeStyleOriginType>
}

export interface G6GraphType {
    defaultNode?: NodeType,
    defaultEdge?: EdgeType | unknown,
    data: {
        nodes: NodeType[]
        edges: EdgeType[],
    },
}
