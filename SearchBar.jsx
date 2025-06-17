// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { Search } from 'lucide-react';

// const MIN_CHARS = 3;
// const ENDPOINTS = [
//   'https://conecta-transparencia.agencianew.com.br/publications',
//   'https://conecta.agencianew.com.br/publications',
// ];

// /* devolve um trecho da descrição com o termo em destaque ----------------- */
// function snippet(text = '', query, radius = 40) {
//   const i = text.toLowerCase().indexOf(query.toLowerCase());
//   if (i === -1) return text.slice(0, radius * 2) + (text.length > radius * 2 ? '…' : '');
//   const s = Math.max(0, i - radius);
//   const e = Math.min(text.length, i + query.length + radius);
//   return (s ? '…' : '') + text.slice(s, e) + (e < text.length ? '…' : '');
// }

// export default function SearchBar() {
//   const [q, setQ] = useState('');
//   const [sug, setSug] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const nav = useNavigate();
//   const ref = useRef();

//   /* fecha dropdown ao clicar fora --------------------------------------- */
//   useEffect(() => {
//     const h = (e) => !ref.current?.contains(e.target) && setSug([]);
//     document.addEventListener('mousedown', h);
//     return () => document.removeEventListener('mousedown', h);
//   }, []);

//   /* busca nas duas APIs sempre que q muda -------------------------------- */
//   useEffect(() => {
//     if (q.length < MIN_CHARS) { setSug([]); return; }

//     const ctrl = new AbortController();
//     (async () => {
//       try {
//         setLoading(true);

//         const responses = await Promise.all(
//           ENDPOINTS.map((url) =>
//             axios.get(url, { params: { searchText: q }, signal: ctrl.signal })
//           )
//         );
//         const merged = responses.flatMap((r) => r.data);

//         /* normaliza => { id, number, description, typeName, attachments } */
//         const norm = merged.map((pub) => ({
//           id:          pub.publication_id,
//           number:      pub.number,
//           description: pub.description || pub.description_title,
//           typeName:    pub.name,                // o campo “name” veio cheio
//           attachments: pub.attachments ?? [],
//         }));

//         /* mantém só quem tem id + descrição ----------------------------- */
//         const filtrados = norm.filter((p) => p.id && p.description);

//         setSug(filtrados.slice(0, 5));
//       } catch (err) {
//         if (err.name !== 'CanceledError') console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     })();

//     return () => ctrl.abort();
//   }, [q]);

//   /* navegação ----------------------------------------------------------- */
//   const openItem = (it) => {
//     nav(`/publicacao/${it.id}`);
//     setSug([]);
//   };

//   const openAll = () => {
//     nav(`/search?searchText=${encodeURIComponent(q)}`);
//     setSug([]);
//   };

//   /* render -------------------------------------------------------------- */
//   return (
//     <div ref={ref} className="relative max-w-xl mx-auto">
//       {/* input */}
//       <div className="flex items-center gap-2 border rounded px-3 py-2 bg-white">
//         <input
//           value={q}
//           onChange={(e) => setQ(e.target.value)}
//           placeholder="Busque por uma publicação…"
//           className="flex-1 outline-none text-sm bg-white"
//         />
//         <Search size={18} className="text-gray-600" />
//       </div>

//       {/* dropdown */}
//       {q.length >= MIN_CHARS && (
//         <div className="absolute left-0 right-0 bg-white border mt-1 rounded shadow max-h-80 overflow-y-auto z-50">
//           {loading && <p className="p-3 text-sm">Carregando…</p>}

//           {!loading && sug.map((it) => (
//             <button
//               key={it.id}
//               onClick={() => openItem(it)}
//               className="block w-full text-left px-4 py-2 hover:bg-indigo-50 border-b last:border-0"
//             >
//               <p className="text-sm font-medium">
//                 {(it.typeName || 'Sem Tipo')} – Nº {it.number || '–'}
//               </p>
//               <p className="text-xs text-gray-600">
//                 {snippet(it.description, q)}
//               </p>
//             </button>
//           ))}

//           {!loading && (
//             <button
//               onClick={openAll}
//               className="block w-full text-center bg-indigo-100 hover:bg-indigo-200 text-indigo-700 font-semibold py-2 text-sm"
//             >
//               Ver todos os resultados
//             </button>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }
// src/SearchBar.jsx
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

const MIN_CHARS = 3;
const ENDPOINTS = [
  { url: 'https://conecta-transparencia.agencianew.com.br/publications', base: 'https://conecta-transparencia.agencianew.com.br/files/' },
  { url: 'https://conecta.agencianew.com.br/publications',               base: 'https://conecta.agencianew.com.br/files/' },
];

/* gera trecho da descrição com termo destacado */
function snippet(text = '', query, radius = 40) {
  const i = text.toLowerCase().indexOf(query.toLowerCase());
  if (i === -1) return text.slice(0, radius * 2) + (text.length > radius * 2 ? '…' : '');
  const s = Math.max(0, i - radius);
  const e = Math.min(text.length, i + query.length + radius);
  return (s ? '…' : '') + text.slice(s, e) + (e < text.length ? '…' : '');
}

export default function SearchBar() {
  const [q, setQ] = useState('');
  const [sug, setSug] = useState([]);
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const ref = useRef();

  /* fecha dropdown ao clicar fora */
  useEffect(() => {
    const h = (e) => !ref.current?.contains(e.target) && setSug([]);
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  /* busca nas duas APIs */
  useEffect(() => {
    if (q.length < MIN_CHARS) { setSug([]); return; }

    const ctrl = new AbortController();
    (async () => {
      try {
        setLoading(true);
        const responses = await Promise.all(
  ENDPOINTS.map(({ url }) => axios.get(url, { params: { searchText: q }, signal: ctrl.signal }))
);

const norm = responses.flatMap((resp, idx) =>
  resp.data.map((raw) => ({
    id: raw.publication_id ?? raw.id ?? raw.uuid,
    number: raw.number,
    description: raw.description || raw.description_title || 'Sem descrição',
    typeName: raw.type?.name || raw.name || 'Sem Tipo',
    attachments: raw.attachments ?? [],
    /* gera fileUrl (ou null) */
    fileUrl: raw.attachments?.[0]?.attachment
      ? ENDPOINTS[idx].base + raw.attachments[0].attachment
      : null,
  }))
);

        const filtrados = norm.filter((i) => i.id && i.description);
        setSug(filtrados.slice(0, 5));
      } catch (err) {
        if (err.name !== 'CanceledError') console.error(err);
      } finally {
        setLoading(false);
      }
    })();

    return () => ctrl.abort();
  }, [q]);

  /* navegação */
  const openItem = (it) => {
+   nav(`/publicacao/${it.id}`, { state: it });
    setSug([]);
  };
  const openAll = () => {
    nav(`/search?searchText=${encodeURIComponent(q)}`);
    setSug([]);
  };

  /* render */
  return (
    <div ref={ref} className="relative max-w-xl mx-auto">
      {/* input */}
      <div className="flex items-center gap-2 border rounded px-3 py-2 bg-white">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Busque por uma publicação…"
          className="flex-1 outline-none text-sm bg-white"
        />
        <Search size={18} className="text-gray-600" />
      </div>

      {/* dropdown */}
      {q.length >= MIN_CHARS && (
        <div className="absolute left-0 right-0 bg-white border mt-1 rounded shadow max-h-80 overflow-y-auto z-50">
          {loading && <p className="p-3 text-sm">Carregando…</p>}

          {!loading &&
            sug.map((it) => (
              <button
                key={it.id}
                onClick={() => openItem(it)}
                className="block w-full text-left px-4 py-2 hover:bg-indigo-50 border-b last:border-0"
              >
                <p className="text-sm font-medium">
                  {it.typeName} – Nº {it.number || '–'}
                </p>
                <p className="text-xs text-gray-600">{snippet(it.description, q)}</p>
              </button>
            ))}

          {!loading && (
            <button
              onClick={openAll}
              className="block w-full text-center bg-indigo-100 hover:bg-indigo-200 text-indigo-700 font-semibold py-2 text-sm"
            >
              Ver todos os resultados
            </button>
          )}
        </div>
      )}
    </div>
  );
}
