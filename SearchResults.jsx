// import React, { useState, useEffect } from 'react';
// import { File } from 'lucide-react';

// const ITEMS_PER_PAGE = 10;
// const MAX_VISIBLE_PAGES = 5;

// const SearchResults = ({ results }) => {
//   const [page, setPage] = useState(1);

//   const totalItems = results.length;
//   const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

//   const paginatedItems = results.slice(
//     (page - 1) * ITEMS_PER_PAGE,
//     page * ITEMS_PER_PAGE
//   );

//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   }, []);

//   const renderPagination = () => {
//     const pages = [];
//     let start = Math.max(1, page - Math.floor(MAX_VISIBLE_PAGES / 2));
//     let end = Math.min(totalPages, start + MAX_VISIBLE_PAGES - 1);

//     if (end - start < MAX_VISIBLE_PAGES - 1) {
//       start = Math.max(1, end - MAX_VISIBLE_PAGES + 1);
//     }

//     for (let i = start; i <= end; i++) {
//       pages.push(
//         <button
//           key={i}
//           onClick={() => setPage(i)}
//           className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors duration-200 ${
//             page === i
//               ? 'bg-indigo-600 text-white'
//               : 'bg-white text-gray-700 border-gray-300 hover:bg-indigo-100'
//           }`}
//         >
//           {i}
//         </button>
//       );
//     }

//     return (
//       <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">
//         <button
//           onClick={() => setPage(prev => Math.max(prev - 1, 1))}
//           disabled={page === 1}
//           className="px-3 py-2 text-sm rounded-full border bg-white text-gray-700 hover:bg-indigo-100 disabled:opacity-40"
//         >
//           Anterior
//         </button>
//         {pages}
//         <button
//           onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
//           disabled={page === totalPages}
//           className="px-3 py-2 text-sm rounded-full border bg-white text-gray-700 hover:bg-indigo-100 disabled:opacity-40"
//         >
//           Próxima
//         </button>
//       </div>
//     );
//   };

//   return (
//     <div className="w-full max-w-6xl mx-auto px-4 py-10">
//       <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Resultados encontrados: {totalItems}</h2>

//       <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-md bg-gray-50">
//         <table className="w-full table-auto">
//           <thead className="bg-gray-100 text-gray-700">
//             <tr>
//               <th className="w-20 p-4 text-left font-medium">ARQUIVO</th>
//               <th className="w-20 p-4 text-left font-medium">Nº</th>
//               <th className="p-4 text-left font-medium">DESCRIÇÃO</th>
//             </tr>
//           </thead>
//           <tbody className="text-sm text-gray-700">
//             {paginatedItems.map((item, index) => (
//               <tr key={index} className="border-t border-gray-200">
//                 <td className="p-4">
//                   {item.attachments?.[0]?.attachment ? (
//                     <a
//                       href={item.attachments[0].attachment}
//                       target="_blank"
//                       rel="noreferrer"
//                       className="flex items-center gap-2 text-red-500 hover:underline"
//                     >
//                       <File className="w-5 h-5" />
//                     </a>
//                   ) : (
//                     '—')}
//                 </td>
//                 <td className="p-4 font-medium">{item.number}</td>
//                 <td className="p-4">
//                   <p className="text-sm leading-snug whitespace-pre-line">
//                     {item.description || item.description_title || 'Sem descrição'}
//                   </p>
//                   <p className="text-xs text-gray-500 mt-1">Data: {item.date || '—'}</p>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {totalPages > 1 && renderPagination()}
//     </div>
//   );
// };

// export default SearchResults;

// src/SearchResults.jsx
import React, { useState, useEffect } from 'react';
import { File } from 'lucide-react';

const ITEMS_PER_PAGE = 10;
const MAX_VISIBLE_PAGES = 5;

const SearchResults = ({ results }) => {
  const groupedResults = results.reduce((acc, item) => {
    const type = item.type?.name || item.name || 'Outros';
    if (!acc[type]) acc[type] = [];
    acc[type].push(item);
    return acc;
  }, {});

  const [pages, setPages] = useState({});

  useEffect(() => {
    const initialPages = {};
    for (const type in groupedResults) {
      initialPages[type] = 1;
    }
    setPages(initialPages);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [results]);

  const handlePageChange = (type, newPage) => {
    setPages(prev => ({ ...prev, [type]: newPage }));
  };

  const renderPagination = (type, totalPages, currentPage) => {
    const buttons = [];
    let start = Math.max(1, currentPage - Math.floor(MAX_VISIBLE_PAGES / 2));
    let end = Math.min(totalPages, start + MAX_VISIBLE_PAGES - 1);

    if (end - start < MAX_VISIBLE_PAGES - 1) {
      start = Math.max(1, end - MAX_VISIBLE_PAGES + 1);
    }

    for (let i = start; i <= end; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(type, i)}
          className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors duration-200 ${
            currentPage === i
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
          onClick={() => handlePageChange(type, Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-2 text-sm rounded-full border bg-white text-gray-700 hover:bg-indigo-100 disabled:opacity-40"
        >
          Anterior
        </button>
        {buttons}
        <button
          onClick={() => handlePageChange(type, Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-2 text-sm rounded-full border bg-white text-gray-700 hover:bg-indigo-100 disabled:opacity-40"
        >
          Próxima
        </button>
      </div>
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-10">
      {Object.entries(groupedResults).map(([type, items]) => {
        const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);
        const currentPage = pages[type] || 1;
        const paginatedItems = items.slice(
          (currentPage - 1) * ITEMS_PER_PAGE,
          currentPage * ITEMS_PER_PAGE
        );

        return (
          <div key={type} className="mb-16">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-left">{type}</h2>
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
                  {paginatedItems.map((item, index) => (
                    <tr key={index} className="border-t border-gray-200">
                      <td className="p-4">
                        {item.attachments?.[0]?.attachment ? (
                          <a
                            href={item.attachments[0].attachment}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-2 text-red-500 hover:underline"
                          >
                            <File className="w-5 h-5" />
                          </a>
                        ) : (
                          '—')}
                      </td>
                      <td className="p-4 font-medium">{item.number}</td>
                      <td className="p-4">
                        <p className="text-sm leading-snug whitespace-pre-line">
                          {item.description || item.description_title || 'Sem descrição'}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">Data: {item.date || '—'}</p>
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
};

export default SearchResults;
