type NodeStyleOriginType = {
    x: number,
    y: number,
    z: number,
    size: number | [number, number] | [Float32Array] | [number, number, number],
    fill: string,
    stroke: string,
    lineWidth: number,

    label: boolean,
    labelText: string,
    labelFill: string,
    labelFontSize: number,
    labelFontWeight: number | string,
    labelPlacement: 'left' | 'right' | 'top' | 'bottom' | 'left-top' | 'left-bottom' | 'right-top' | 'right-bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center'


}
type NodeType = {
    id: string,
    type?: string,
    style: Partial<NodeStyleOriginType>,
}
type EdgesType = {
    id: string,
    source: string,
    target: string,
}

export interface G6GraphType {
    data: {
        nodes: NodeType[]
        edges: EdgesType[],
    },
}
