import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Containers() {
  const [containers, setContainers] = useState([]);
  const [name, setName] = useState("");
  const [owner, setOwner] = useState("");

  const createContainer = async () => {
    const res = await axios.post("http://localhost:8000/containers/create", null, {
      params: { name, owner },
    });
    setContainers((prev) => [...prev, res.data]);
    setName("");
    setOwner("");
  };

  useEffect(() => {
    // containers только in-memory
  }, []);

  return (
    <div className="p-6 min-h-screen bg-black text-white font-mono">
      <h2 className="text-3xl mb-4 text-cyan-400">NFT Контейнеры</h2>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          className="p-2 rounded bg-gray-800 border border-cyan-500"
          placeholder="Название"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="p-2 rounded bg-gray-800 border border-cyan-500"
          placeholder="Владелец (email)"
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
        />
        <button
          onClick={createContainer}
          className="px-4 py-2 bg-cyan-600 hover:bg-cyan-800 rounded shadow"
        >
          Создать
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {containers.map((c) => (
          <div
            key={c.id}
            className="bg-gray-900 p-4 rounded-xl border border-cyan-500"
          >
            <p className="text-sm text-gray-400">ID: {c.id}</p>
            <p className="text-lg">{c.name}</p>
            <p className="text-sm text-cyan-300">Owner: {c.owner}</p>
          </div>
        ))}
      </div>
    </div>
  );
}