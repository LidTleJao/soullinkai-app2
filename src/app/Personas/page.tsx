
'use client';
import { useEffect, useState } from 'react';
import useAuthGuard from '../hooks/useAuthGuard';
import { listPersonas, createPersona } from '../services/personaService';
import PersonaCard from '../components/PersonaCard';
import Link from 'next/link';

interface Persona {
  id: string;
  name: string;
  description?: string;
}

export default function PersonasPage() {
  useAuthGuard();
  const [items, setItems] = useState<Persona[]>([]);
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');

  const load = async () => {
    const all = await listPersonas();
    setItems(all as Persona[]);
  };

  useEffect(() => {
    load();
  }, []);

  const add = async () => {
    if (!name) return alert('Name required');
    await createPersona({ name, description: desc });
    setName('');
    setDesc('');
    load();
  };

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Your Personas</h1>
        <Link href="/create" className="bg-white text-black px-4 py-1 rounded-full">
          Create new
        </Link>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6">
        <div className="font-semibold mb-2">Quick create</div>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mr-2 px-2 py-1 bg-black/40 border border-white/20 rounded"
        />
        <input
          placeholder="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="mr-2 px-2 py-1 bg-black/40 border border-white/20 rounded"
        />
        <button onClick={add} className="bg-emerald-600 px-3 py-1 rounded">
          Create
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {items.map((p) => (
          <PersonaCard key={p.id} persona={p} onChange={load} />
        ))}
      </div>
    </>
  );
}
