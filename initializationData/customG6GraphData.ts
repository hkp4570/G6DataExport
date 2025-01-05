import {G6GraphType} from '@/utils/def-type';

export const customG6GraphData: G6GraphType = {
    defaultNode: {},
    defaultEdge: {},
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
                    y: 200,
                    size: [90,30],

                    labelText: '节点二',
                    labelPlacement: 'center',

                    ports: [
                        {placement: 'top', },
                    ],
                },
            },
            {
                id: 'node-3',
                type: 'rect',
                style: {
                    x: 700,
                    y: 200,
                    size: [90,30],

                    labelText: '节点三',
                    labelPlacement: 'center'
                },
            },
            {
                id: 'node-4',
                type: 'rect',
                style: {
                    x: 500,
                    y: 300,
                    size: [90,30],

                    labelText: '节点四',
                    labelPlacement: 'center',
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
