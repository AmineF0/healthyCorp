import { Node, Edge } from 'reactflow';

export interface GraphNode extends Node {
  data: {
    label: string | JSX.Element;
    members?: string[];
  };
}

export interface GraphEdge extends Edge {
  style?: {
    stroke: string;
  };
}

export interface NodeData {
  id: string;
  label: string | JSX.Element;
  position: { x: number; y: number };
  className: string;
  members?: string[];
}