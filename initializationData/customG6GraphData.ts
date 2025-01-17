import type {G6GraphType} from '@/utils/def-type';
export const customG6GraphData: G6GraphType = {
  "data": {
    "nodes": [
      {
        "id": "node-1",
        "data": {
          "type": "rect",
          "x": 500,
          "y": 100,
          "size": [
            90,
            30
          ],
          "labelText": "节点一",
          "labelPlacement": "center",
          "ports": [
            {
              "placement": "bottom",
            },
          ],
          "lineWidth": 1,
          "labelFontWeight": 500
        }
      },
      {
        "id": "node-2",
        "data": {
          "type": "rect",
          "x": 300,
          "y": 300,
          "size": [
            90,
            30
          ],
          "labelText": "节点二",
          "labelPlacement": "center",
          "ports": [
            {
              "placement": "top"
            },
            {
              "placement": "bottom"
            }
          ],
          "lineWidth": 1,
          "labelFontWeight": 500
        }
      },
      {
        "id": "node-3",
        "data": {
          "type": "rect",
          "x": 700,
          "y": 300,
          "size": [
            90,
            30
          ],
          "labelText": "节点三",
          "labelPlacement": "center",
          "ports": [
            {
              "placement": "top"
            },
            {
              "placement": "bottom"
            }
          ],
          "lineWidth": 1,
          "labelFontWeight": 500
        }
      },
      {
        "id": "node-4",
        "data": {
          "type": "rect",
          "x": 500,
          "y": 500,
          "size": [
            90,
            30
          ],
          "labelText": "节点四",
          "labelPlacement": "center",
          "ports": [
            {
              "placement": "top"
            }
          ],
          "lineWidth": 1,
          "labelFontWeight": 500
        }
      }
    ],
    "edges": [
      {
        "id": "edge-1",
        "source": "node-1",
        "target": "node-2",
        "data":{
          type:'line',
          endArrow: true,
        }
      },
      {
        "id": "edge-2",
        "source": "node-1",
        "target": "node-3",
        "data":{
          type:'line',
          endArrow: true,
        }
      },
      {
        "id": "edge-3",
        "source": "node-2",
        "target": "node-4",
        "data":{
          type:'line',
          endArrow: true,
        }
      },
      {
        "id": "edge-4",
        "source": "node-3",
        "target": "node-4",
        "data":{
          type:'line',
          endArrow: true,
        }
      }
    ]
  }
};