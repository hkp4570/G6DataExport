type NodeType = {
    id: string,
    style: object,
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