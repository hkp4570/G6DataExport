import type {G6GraphType} from '@/utils/def-type';

export const customG6GraphData: G6GraphType = {
    data: {
        nodes: [
            {
                id: 'node-1',
                type: 'rect',
                style: {
                    x: 500,
                    y: 100,
                    size: [90, 30],

                    labelText: '节点一',
                    labelPlacement: 'center',

                    ports: [
                        { placement: 'bottom' },
                    ],
                },
            },
            {
                id: 'node-2',
                type: 'rect',
                style: {
                    x: 300,
                    y: 300,
                    size: [90,30],

                    labelText: '节点二',
                    labelPlacement: 'center',

                    ports: [
                        {placement: 'top'},
                        {placement: 'bottom'},
                    ],
                },
            },
            {
                id: 'node-3',
                type: 'rect',
                style: {
                    x: 700,
                    y: 300,
                    size: [90,30],

                    labelText: '节点三',
                    labelPlacement: 'center',

                    ports: [
                        {placement: 'top'},
                        {placement: 'bottom'},
                    ],
                },
            },
            {
                id: 'node-4',
                type: 'rect',
                style: {
                    x: 500,
                    y: 500,
                    size: [90,30],

                    labelText: '节点四',
                    labelPlacement: 'center',

                    ports: [
                        {placement: 'top'},
                    ],
                },
            },
        ],
        edges: [
            {
                id: 'edge-1',
                source: 'node-1',
                target: 'node-2',
            },
            {
                id: 'edge-2',
                source: 'node-1',
                target: 'node-3'
            },
            {
                id: 'edge-3',
                source: 'node-2',
                target: 'node-4'
            },
            {
                id: 'edge-4',
                source: 'node-3',
                target: 'node-4'
            }
        ],
    },
}

export const nodeTypeOptions: {value: string, label:string}[] = [
    { value: 'circle', label: '圆形' },
    { value: 'diamond', label: '菱形' },
    { value: 'donut', label: '甜甜圈' },
    { value: 'ellipse', label: '椭圆形' },
    { value: 'hexagon', label: '六边形' },
    { value: 'rect', label: '矩形' },
    { value: 'star', label: '五角形' },
    { value: 'triangle', label: '三角形' },
]

export const fontWeightOptions = [
    { value: 100, label: '100 - Thin' },
    { value: 200, label: '200 - Extra Light (Ultra Light)' },
    { value: 300, label: '300 - Light' },
    { value: 400, label: '400 - Normal (Regular)' },
    { value: 500, label: '500 - Medium' },
    { value: 600, label: '600 - Semi Bold (Demi Bold)' },
    { value: 700, label: '700 - Bold' },
    { value: 800, label: '800 - Extra Bold (Ultra Bold)' },
    { value: 900, label: '900 - Black (Heavy)' },
]

export const labelPlacementOptions = [
    { value: 'left', label: '左' },
    { value: 'right', label: '右' },
    { value: 'top', label: '上' },
    { value: 'bottom', label: '下' },
    { value: 'center', label: '居中' },
    { value: 'left-top', label: '左上' },
    { value: 'right-top', label: '右上' },
    { value: 'left-bottom', label: '左下' },
    { value: 'right-bottom', label: '右下' },
]
