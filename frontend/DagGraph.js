import React, { useEffect, useState } from "react";
import ReactFlow, { Background, Controls } from "react-flow-renderer";
import axios from "axios";

export default function DagGraph() {
  const [elements, setElements] = useState([]);

  const buildGraph = (nodes) => {
    const els = [];
    const posY = 80;
    nodes.forEach((node, idx) => {
      els.push({
        id: node.id,
        type: "default",
        data: { label: node.data },
        position: { x: 100 + idx * 200, y: posY + idx * 80 },
        style: {
          background: "#1e1b4b",
          color: "#e0e0ff",
          border: "2px solid #7c3aed",
          fontSize: 12,
          borderRadius: 8,
          width: 160,
        },
      });
      node.parents.forEach((parentId) => {
        els.push({
          id: `${parentId}-${node.id}`,
          source: parentId,
          target: node.id,
          animated: true,
          style: { stroke: "#8b5cf6" },
        });
      });
    });
    return els;
  };

  useEffect(() => {
    axios.get("http://localhost:8000/dag/all").then((res) => {
      setElements(buildGraph(res.data));
    });
  }, []);

  return (
    <div className="h-screen bg-black text-white">
      <h2 className="text-3xl text-center pt-4 text-purple-400 font-mono">DAG Graph</h2>
      <div className="h-[90%] p-4">
        <ReactFlow elements={elements} fitView>
          <Background color="#4c1d95" gap={16} />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
}