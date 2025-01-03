import {G6GraphType} from '@/utils/def-type';

export const customG6GraphData: G6GraphType = {
    data: {
        nodes: [
            {
                id: 'node-1',
                type: 'rect',
                style: {
                    x: 50,
                    y: 100,
                    size: [60, 30],

                    labelText: '节点一',
                    labelPlacement: 'center'
                },
            },
            {
                id: 'node-2',
                type: 'rect',
                style: { x: 150, y: 100 },
            },
        ],
        edges: [{ id: 'edge-1', source: 'node-1', target: 'node-2' }],
    },
}