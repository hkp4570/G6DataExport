import {G6GraphType} from '@/utils/def-type';

export const customG6GraphData: G6GraphType = {
    data: {
        nodes: [
            {
                id: 'node-1',
                style: { x: 50, y: 100 },
            },
            {
                id: 'node-2',
                style: { x: 150, y: 100 },
            },
        ],
        edges: [{ id: 'edge-1', source: 'node-1', target: 'node-2' }],
    },
}