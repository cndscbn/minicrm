// src/components/WorkflowDesigner.js
import React, { useCallback, useState } from 'react';
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  ReactFlowProvider,
} from 'react-flow-renderer';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Lead Created' },
    position: { x: 250, y: 5 },
    style: { background: '#D1FAE5', padding: 10 },
  },
];

const actionNodeTypes = ['Send Email', 'Update Status'];

const WorkflowDesigner = () => {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState([]);
  const [nodeCount, setNodeCount] = useState(2);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const addActionNode = (action) => {
    if (nodes.length >= 4) {
      toast.warn('Max 3 action nodes allowed');
      return;
    }
    const newNode = {
      id: `${nodeCount}`,
      data: { label: action },
      position: { x: 100 * nodeCount, y: 100 },
      style: {
        background: '#DBEAFE',
        padding: 10,
      },
    };
    setNodes((nds) => [...nds, newNode]);
    setNodeCount(nodeCount + 1);
  };

  const runFlow = () => {
    edges.forEach((edge) => {
      const targetNode = nodes.find((node) => node.id === edge.target);
      if (targetNode) {
        toast.success(`Action triggered: ${targetNode.data.label}`);
        console.log(`Triggered: ${targetNode.data.label}`);
      }
    });
  };

  return (
    <ReactFlowProvider>
      <div className="border p-4 mt-4">
        <h2 className="text-xl font-bold mb-2">Workflow Designer</h2>
        <div className="flex space-x-4 mb-2">
          {actionNodeTypes.map((action) => (
            <button
              key={action}
              className="bg-blue-500 text-white px-3 py-1 rounded"
              onClick={() => addActionNode(action)}
            >
              Add {action}
            </button>
          ))}
          <button
            onClick={runFlow}
            className="bg-green-500 text-white px-3 py-1 rounded"
          >
            Run Flow
          </button>
        </div>
        <div style={{ width: '100%', height: 300 }}>
          <ReactFlow nodes={nodes} edges={edges} onConnect={onConnect}>
            <MiniMap />
            <Controls />
            <Background />
          </ReactFlow>
        </div>
      </div>
    </ReactFlowProvider>
  );
};

export default WorkflowDesigner;
