import {G6GraphType} from '@/utils/def-type';

export const customG6GraphData: G6GraphType = {
    defaultNode: {
        type: 'rect',
        style:{
            labelPlacement: 'center',
        }
    },
    defaultEdge: {
        type: 'line',
     
        style:{
            endArrow: true,
        }
    },
    data: {
        nodes: [
            {
                id: 'node-1',
                style: {
                    x: 500,
                    y: 100,
                    size: [90, 30],

                    labelText: '节点一',
    
                    ports: [
                        { placement: 'bottom' },
                    ],
                },
            },
            {
                id: 'node-2',
                style: {
                    x: 300,
                    y: 300,
                    size: [90,30],

                    labelText: '节点二',

                    ports: [
                        {placement: 'top'},
                        {placement: 'bottom'},
                    ],
                },
            },
            {
                id: 'node-3',
                style: {
                    x: 700,
                    y: 300,
                    size: [90,30],

                    labelText: '节点三',

                    ports: [
                        {placement: 'top'},
                        {placement: 'bottom'},
                    ],
                },
            },
            {
                id: 'node-4',
                style: {
                    x: 500,
                    y: 500,
                    size: [90,30],

                    labelText: '节点四',

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
