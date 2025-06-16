// import React, { useState, useEffect } from 'react';
// import { File } from 'lucide-react';

// const ITEMS_PER_PAGE = 5;
// const MAX_VISIBLE_PAGES = 5;

// const SearchResults = ({ results }) => {
//   const groupedResults = results.reduce((acc, item) => {
//     const type = item.type?.name || item.name || 'Outros';
//     if (!acc[type]) acc[type] = [];
//     acc[type].push(item);
//     return acc;
//   }, {});

//   const [pages, setPages] = useState({});

//   useEffect(() => {
//     const initialPages = {};
//     for (const type in groupedResults) {
//       initialPages[type] = 1;
//     }
//     setPages(initialPages);
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   }, [results]);

//   const handlePageChange = (type, newPage) => {
//     setPages(prev => ({ ...prev, [type]: newPage }));
//   };

//   const renderPagination = (type, totalPages, currentPage) => {
//     const buttons = [];
//     let start = Math.max(1, currentPage - Math.floor(MAX_VISIBLE_PAGES / 2));
//     let end = Math.min(totalPages, start + MAX_VISIBLE_PAGES - 1);

//     if (end - start < MAX_VISIBLE_PAGES - 1) {
//       start = Math.max(1, end - MAX_VISIBLE_PAGES + 1);
//     }

//     for (let i = start; i <= end; i++) {
//       buttons.push(
//         <button
//           key={i}
//           onClick={() => handlePageChange(type, i)}
//           className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors duration-200 ${
//             currentPage === i
//               ? 'bg-indigo-600 text-white'
//               : 'bg-white text-gray-700 border-gray-300 hover:bg-indigo-100'
//           }`}
//         >
//           {i}
//         </button>
//       );
//     }

//     return (
//       <div className="flex justify-center items-center gap-2 mt-4 flex-wrap">
//         <button
//           onClick={() => handlePageChange(type, Math.max(currentPage - 1, 1))}
//           disabled={currentPage === 1}
//           className="px-3 py-2 text-sm rounded-full border bg-white text-gray-700 hover:bg-indigo-100 disabled:opacity-40"
//         >
//           Anterior
//         </button>
//         {buttons}
//         <button
//           onClick={() => handlePageChange(type, Math.min(currentPage + 1, totalPages))}
//           disabled={currentPage === totalPages}
//           className="px-3 py-2 text-sm rounded-full border bg-white text-gray-700 hover:bg-indigo-100 disabled:opacity-40"
//         >
//           Próxima
//         </button>
//       </div>
//     );
//   };

//   return (
//     <div className="w-full max-w-6xl mx-auto px-4 py-10">
//       {Object.entries(groupedResults).map(([type, items]) => {
//         const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);
//         const currentPage = pages[type] || 1;
//         const paginatedItems = items.slice(
//           (currentPage - 1) * ITEMS_PER_PAGE,
//           currentPage * ITEMS_PER_PAGE
//         );

//         return (
//           <div key={type} className="mb-16">
//             <h2 className="text-2xl font-bold text-gray-800 mb-4 text-left">{type}</h2>
//             <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-md bg-gray-50">
//               <table className="w-full table-auto">
//                 <thead className="bg-gray-100 text-gray-700">
//                   <tr>
//                     <th className="w-20 p-4 text-left font-medium">ARQUIVO</th>
//                     <th className="w-20 p-4 text-left font-medium">Nº</th>
//                     <th className="p-4 text-left font-medium">DESCRIÇÃO</th>
//                   </tr>
//                 </thead>
//                 <tbody className="text-sm text-gray-700">
//                   {paginatedItems.map((item, index) => (
//                     <tr key={index} className="border-t border-gray-200">
//                       <td className="p-4">
//                         {item.attachments?.[0]?.attachment ? (
//                           <a
//                             href={item.attachments[0].attachment}
//                             target="_blank"
//                             rel="noreferrer"
//                             className="flex items-center gap-2 text-red-500 hover:underline"
//                           >
//                             <File className="w-5 h-5" />
//                           </a>
//                         ) : (
//                           '—')}
//                       </td>
//                       <td className="p-4 font-medium">{item.number}</td>
//                       <td className="p-4">
//                         <p className="text-sm leading-snug whitespace-pre-line">
//                           {item.description || item.description_title || 'Sem descrição'}
//                         </p>
//                         <p className="text-xs text-gray-500 mt-1">Data: {item.date || '—'}</p>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//             {totalPages > 1 && renderPagination(type, totalPages, currentPage)}
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default SearchResults;












// import React, { useState, useEffect } from 'react';
// import { useLocation, Link } from 'react-router-dom';

// function SearchResults() {
//   const location = useLocation();
//   const searchText =
//     new URLSearchParams(location.search).get('searchText') || '';
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!searchText) return;
//     (async () => {
//       try {
//         setLoading(true);
//         const [a, b] = await Promise.all([
//           fetch(
//             `https://conecta-transparencia.agencianew.com.br/publications?searchText=${encodeURIComponent(
//               searchText
//             )}`
//           ).then((r) => r.json()),
//           fetch(
//             `https://conecta.agencianew.com.br/publications?searchText=${encodeURIComponent(
//               searchText
//             )}`
//           ).then((r) => r.json()),
//         ]);
//         setResults([...a, ...b]);
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, [searchText]);

//   // agrupa por tipo
//   const grouped = results.reduce((acc, item) => {
//     const key = item.type?.name || item.name || 'Sem Tipo';
//     acc[key] = acc[key] || [];
//     acc[key].push(item);
//     return acc;
//   }, {});

//   if (!searchText) return <p className="p-4">Informe um termo de busca.</p>;
//   if (loading) return <p className="p-4">Carregando…</p>;
//   if (results.length === 0)
//     return (
//       <div className="p-4">
//         <Link to="/" className="text-indigo-600 underline">
//           ← Nova busca
//         </Link>
//         <p>Nenhum resultado para “{searchText}”.</p>
//       </div>
//     );

//   return (
//     <div className="p-4">
//       <Link to="/" className="text-indigo-600 underline">
//         ← Nova busca
//       </Link>
//       <h2 className="text-xl font-semibold my-4">
//         Resultados para “{searchText}”
//       </h2>

//       {Object.entries(grouped).map(([typeName, items]) => (
//         <div key={typeName} className="mb-8">
//           <h3 className="text-lg font-semibold mb-2">{typeName}</h3>
//           <div className="overflow-x-auto">
//             <table className="min-w-full text-sm border border-gray-300">
//               <thead className="bg-gray-100">
//                 <tr>
//                   <th className="px-2 py-1 border">Anexo</th>
//                   <th className="px-2 py-1 border">Nº</th>
//                   <th className="px-2 py-1 border">Descrição</th>
//                   <th className="px-2 py-1 border">Data</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {items.map((it) => (
//                   <tr
//                     key={it.id}
//                     className="hover:bg-indigo-50 cursor-pointer"
//                     onClick={() => (window.location.href = `/publicacao/${it.id}`)}
//                   >
//                     <td className="px-2 py-1 border text-center">
//                       {it.attachments?.length ? (
//                         <a
//                           href={it.attachments[0].attachment}
//                           onClick={(e) => e.stopPropagation()}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="text-indigo-600 underline"
//                         >
//                           PDF
//                         </a>
//                       ) : (
//                         '-'
//                       )}
//                     </td>
//                     <td className="px-2 py-1 border text-center">{it.number}</td>
//                     <td className="px-2 py-1 border">{it.description}</td>
//                     <td className="px-2 py-1 border text-center">
//                       {it.date?.slice(0, 10) || '-'}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }
// export default SearchResults;


/* ─────────────────────────────────────────────────────────
   SearchResults.jsx
   - mantém TODO o layout + paginação da sua 1ª versão
   - acrescenta lógica p/ montar a URL do anexo   (/files/…)
   - ícone abre sempre em nova aba (target="_blank")
────────────────────────────────────────────────────────── */
import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { File } from 'lucide-react';

const ITEMS_PER_PAGE = 5;
const MAX_VISIBLE_PAGES = 5;

/* baseURLs das duas APIs — só ajustar se mudarem */
const BASE_T = 'https://conecta-transparencia.agencianew.com.br';
const BASE_C = 'https://conecta.agencianew.com.br';

/* normaliza campos + monta fileUrl */
function normaliza(pub, origemBaseUrl) {
  const attachmentPath = pub.attachments?.[0]?.attachment || '';
  return {
    id: pub.publication_id ?? pub.id ?? pub.uuid,
    number: pub.number,
    description: pub.description || pub.description_title || 'Sem descrição',
    date: pub.date ?? pub.updated_at ?? '',
    typeName: pub.name || pub.type?.name || 'Outros',
    fileUrl: attachmentPath ? `${origemBaseUrl}/files/${attachmentPath}` : null,
  };
}

export default function SearchResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchText = new URLSearchParams(location.search).get('searchText') || '';

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pages, setPages] = useState({});

  /* ───── BUSCA NAS DUAS APIs ───── */
  useEffect(() => {
    if (!searchText) return;
    (async () => {
      try {
        setLoading(true);
        const [a, b] = await Promise.all([
          fetch(`${BASE_T}/publications?searchText=${encodeURIComponent(searchText)}`).then(
            (r) => r.json()
          ),
          fetch(`${BASE_C}/publications?searchText=${encodeURIComponent(searchText)}`).then(
            (r) => r.json()
          ),
        ]);

        const all = [
          ...a.map((p) => normaliza(p, BASE_T)),
          ...b.map((p) => normaliza(p, BASE_C)),
        ].filter((p) => p.id);

        setResults(all);
      } finally {
        setLoading(false);
      }
    })();
  }, [searchText]);

  /* ───── AGRUPA POR TIPO ───── */
  const grouped = results.reduce((acc, item) => {
    if (!acc[item.typeName]) acc[item.typeName] = [];
    acc[item.typeName].push(item);
    return acc;
  }, {});

  /* reinicia paginação quando chegam novos resultados */
  useEffect(() => {
    const first = {};
    for (const t in grouped) first[t] = 1;
    setPages(first);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [results]);

  /* ───── helpers paginação ───── */
  const changePage = (type, pg) => setPages((p) => ({ ...p, [type]: pg }));

  const renderPagination = (type, total, current) => {
    const btns = [];
    let start = Math.max(1, current - Math.floor(MAX_VISIBLE_PAGES / 2));
    let end = Math.min(total, start + MAX_VISIBLE_PAGES - 1);
    if (end - start < MAX_VISIBLE_PAGES - 1) start = Math.max(1, end - MAX_VISIBLE_PAGES + 1);

    for (let i = start; i <= end; i++) {
      btns.push(
        <button
          key={i}
          onClick={() => changePage(type, i)}
          className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
            current === i
              ? 'bg-indigo-600 text-white'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-indigo-100'
          }`}
        >
          {i}
        </button>
      );
    }

    return (
      <div className="flex justify-center items-center gap-2 mt-4 flex-wrap">
        <button
          onClick={() => changePage(type, Math.max(current - 1, 1))}
          disabled={current === 1}
          className="px-3 py-2 text-sm rounded-full border bg-white text-gray-700 hover:bg-indigo-100 disabled:opacity-40"
        >
          Anterior
        </button>
        {btns}
        <button
          onClick={() => changePage(type, Math.min(current + 1, total))}
          disabled={current === total}
          className="px-3 py-2 text-sm rounded-full border bg-white text-gray-700 hover:bg-indigo-100 disabled:opacity-40"
        >
          Próxima
        </button>
      </div>
    );
  };

  /* ───── estados iniciais ───── */
  if (!searchText) return <p className="p-4">Informe um termo de busca.</p>;
  if (loading) return <p className="p-4">Carregando…</p>;
  if (results.length === 0)
    return (
      <div className="p-4">
        <Link to="/" className="text-indigo-600 underline">
          ← Nova busca
        </Link>
        <p>Nenhum resultado para “{searchText}”.</p>
      </div>
    );

  /* ───── RENDER ───── */
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-10">
      <Link to="/" className="text-indigo-600 underline">
        ← Nova busca
      </Link>
      <h2 className="text-xl font-semibold my-4">Resultados para “{searchText}”</h2>

      {Object.entries(grouped).map(([type, items]) => {
        const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);
        const currentPage = pages[type] || 1;
        const sliceStart = (currentPage - 1) * ITEMS_PER_PAGE;
        const paginated = items.slice(sliceStart, sliceStart + ITEMS_PER_PAGE);

        return (
          <div key={type} className="mb-16">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">{type}</h3>

            <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-md bg-gray-50">
              <table className="w-full table-auto">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="w-20 p-4 text-left font-medium">ARQUIVO</th>
                    <th className="w-20 p-4 text-left font-medium">Nº</th>
                    <th className="p-4 text-left font-medium">DESCRIÇÃO</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-gray-700">
                  {paginated.map((it) => (
                    <tr
                      key={it.id}
                      className="border-t border-gray-200 hover:bg-indigo-50 cursor-pointer"
                      onClick={() => navigate(`/publicacao/${it.id}`)}
                    >
                      <td className="p-4">
                        {it.fileUrl ? (
                          <a
                            href={it.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center gap-2 text-red-500 hover:underline"
                          >
                            <File className="w-5 h-5" />
                          </a>
                        ) : (
                          '—'
                        )}
                      </td>
                      <td className="p-4 font-medium">{it.number}</td>
                      <td className="p-4">
                        <p className="leading-snug whitespace-pre-line">{it.description}</p>
                        {it.date && (
                          <p className="text-xs text-gray-500 mt-1">
                            Data: {it.date.slice(0, 10)}
                          </p>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && renderPagination(type, totalPages, currentPage)}
          </div>
        );
      })}
    </div>
  );
}
