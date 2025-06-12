// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';

// const MIN_CHARS = 3;

// export default function SearchBar({ onSelect, onSeeAll }) {
//   const [query, setQuery] = useState('');
//   const [suggestions, setSuggestions] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const containerRef = useRef();

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (containerRef.current && !containerRef.current.contains(event.target)) {
//         setSuggestions([]);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   useEffect(() => {
//     if (query.length < MIN_CHARS) {
//       setSuggestions([]);
//       return;
//     }
//     const controller = new AbortController();
//     (async () => {
//       try {
//         setLoading(true);
//         const [a, b] = await Promise.all([
//           axios.get(
//             `https://conecta-transparencia.agencianew.com.br/publications`,
//             { params: { searchText: query }, signal: controller.signal }
//           ),
//           axios.get(
//             `https://conecta.agencianew.com.br/publications`,
//             { params: { searchText: query }, signal: controller.signal }
//           ),
//         ]);
//         const merged = [...a.data, ...b.data]
//           .filter(i => i && i.number && i.description_title);
//         setSuggestions(merged.slice(0, 5));
//       } catch (err) {
//         if (err.name !== 'CanceledError') console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     })();
//     return () => controller.abort();
//   }, [query]);

//   return (
//     <div ref={containerRef} className="relative w-full max-w-xl mx-auto mt-10 px-4">
//       <div className="flex items-center gap-3 bg-white border border-gray-300 rounded-lg shadow-sm px-4 py-3">
//         <input
//           type="text"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           placeholder="Busque por uma publicação..."
//           className="w-full text-sm text-gray-800 placeholder-gray-500 bg-white focus:outline-none"
//         />
//         <span className="text-xl text-indigo-500">🔍</span>
//       </div>

//       {query.length >= MIN_CHARS && (
//         <div className="absolute z-50 w-full bg-white border border-gray-200 mt-2 rounded-lg shadow-md max-h-96 overflow-y-auto">
//           {loading && (
//             <p className="p-4 text-sm text-gray-600">Carregando resultados...</p>
//           )}

//           {!loading && suggestions.length === 0 && (
//             <p className="p-4 text-sm text-gray-600">Nenhum resultado encontrado.</p>
//           )}

//           {!loading && suggestions.map((item, idx) => (
//             <button
//               key={idx}
//               onClick={() => onSelect(item)}
//               className="w-full text-left px-4 py-3 hover:bg-indigo-50 border-b border-gray-100 bg-white"
//             >
//               <p className="text-sm font-medium text-gray-800">
//                 {(item.type?.name || item.name || 'Sem Tipo')} – Nº {item.number}
//               </p>
//               <p className="text-xs text-gray-600 truncate">
//                 {item.description_title || 'Sem descrição'}
//               </p>
//             </button>
//           ))}

//           {!loading && suggestions.length === 5 && (
//             <button
//               onClick={() => onSeeAll(query)}
//               className="block w-full text-center bg-indigo-100 hover:bg-indigo-200 text-indigo-700 font-semibold py-3 text-sm border-t border-gray-200"
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
import { Search } from 'lucide-react';

const MIN_CHARS = 3;

export default function SearchBar({ onSelect, onSeeAll }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(true);
  const containerRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setSuggestions([]);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (query.length < MIN_CHARS) {
      setSuggestions([]);
      return;
    }
    const controller = new AbortController();
    (async () => {
      try {
        setLoading(true);
        const [a, b] = await Promise.all([
          axios.get(
            `https://conecta-transparencia.agencianew.com.br/publications`,
            { params: { searchText: query }, signal: controller.signal }
          ),
          axios.get(
            `https://conecta.agencianew.com.br/publications`,
            { params: { searchText: query }, signal: controller.signal }
          ),
        ]);
        const merged = [...a.data, ...b.data].filter(i => i && i.number && i.description_title);
        setSuggestions(merged.slice(0, 5));
      } catch (err) {
        if (err.name !== 'CanceledError') console.error(err);
      } finally {
        setLoading(false);
      }
    })();
    return () => controller.abort();
  }, [query]);

  const handleSeeAll = (value) => {
    onSeeAll(value);
    setSuggestions([]);
    setQuery('');
    setActive(false);
  };

  return (
    <div ref={containerRef} className={`relative w-full max-w-xl mx-auto mt-10 px-4 ${!active ? 'opacity-50 pointer-events-none' : ''}`}>
      <div className="flex items-center gap-3 bg-white border border-gray-300 rounded-lg shadow-sm px-4 py-3">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Busque por uma publicação..."
          className="w-full text-sm text-gray-800 placeholder-gray-500 bg-white focus:outline-none"
        />
        <Search className="w-5 h-5 text-indigo-500" />
      </div>

      {query.length >= MIN_CHARS && suggestions.length > 0 && (
        <div className="absolute z-50 left-4 right-4 bg-white border border-gray-200 mt-2 rounded-lg shadow-md max-h-96 overflow-y-auto">
          {loading && (
            <p className="p-4 text-sm text-gray-600">Carregando resultados...</p>
          )}

          {!loading && suggestions.map((item, idx) => (
            <button
              key={idx}
              onClick={() => onSelect(item)}
              className="w-full text-left px-4 py-3 hover:bg-indigo-50 border-b border-gray-100 bg-white"
            >
              <p className="text-sm font-medium text-gray-800">
                {(item.type?.name || item.name || 'Sem Tipo')} – Nº {item.number}
              </p>
              <p className="text-xs text-gray-600 truncate">
                {item.description_title || 'Sem descrição'}
              </p>
            </button>
          ))}

          <button
            onClick={() => handleSeeAll(query)}
            className="block w-full text-center bg-indigo-100 hover:bg-indigo-200 text-indigo-700 font-semibold py-3 text-sm border-t border-gray-200"
          >
            Ver todos os resultados
          </button>
        </div>
      )}
    </div>
  );
}
