// src/PublicationPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { File } from 'lucide-react';

const BASE_T = 'https://conecta-transparencia.agencianew.com.br';
const BASE_C = 'https://conecta.agencianew.com.br';
const ITEMS_PER_PAGE = 1; // só 1 linha, mas mantém estilo

function buildFileUrl(base, att) {
  return att ? `${base}/files/${att}` : null;
}

export default function PublicationPage() {
  const { id } = useParams();
  const { state } = useLocation();            // ← vindo do navigate(..., {state})
  const [pub, setPub] = useState(state || null);
  const [loading, setLoading] = useState(!state);

  /* Fallback: se entrou pela URL direta, tenta achar pelo id */
  useEffect(() => {
    if (pub || !id) return;

    (async () => {
      try {
        setLoading(true);
        const endpoints = [
          { api: `${BASE_T}/publications?searchText=${id}`, base: BASE_T },
          { api: `${BASE_C}/publications?searchText=${id}`, base: BASE_C },
        ];

        for (const { api, base } of endpoints) {
          const res = await fetch(api).then((r) => r.json());
          const found = res.find((p) => String(p.publication_id ?? p.id ?? p.uuid) === id);
          if (found) {
            setPub({
              id,
              number: found.number,
              description: found.description || found.description_title || 'Sem descrição',
              date: found.date ?? found.updated_at ?? '',
              typeName: found.name || found.type?.name || 'Sem Tipo',
              fileUrl: buildFileUrl(base, found.attachments?.[0]?.attachment),
            });
            break;
          }
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [id, pub]);

  if (loading) return <p className="p-4">Carregando…</p>;
  if (!pub)
    return (
      <div className="p-4">
        <p>Publicação não encontrada.</p>
        <Link to="/" className="text-indigo-600 underline">
          ← Nova busca
        </Link>
      </div>
    );

  /* ───── TABELA (mesmo layout da página de resultados) ───── */
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-10">
      <Link to="/" className="text-indigo-600 underline">
        ← Nova busca
      </Link>

      <h2 className="text-2xl font-bold text-gray-800 my-6">
        {pub.typeName} – Nº {pub.number}
      </h2>

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
            <tr className="border-t border-gray-200">
              <td className="p-4">
                {pub.fileUrl ? (
                  <a
                    href={pub.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-red-500 hover:underline"
                  >
                    <File className="w-5 h-5" />
                  </a>
                ) : (
                  '—'
                )}
              </td>
              <td className="p-4 font-medium">{pub.number}</td>
              <td className="p-4">
                <p className="leading-snug whitespace-pre-line">{pub.description}</p>
                {pub.date && (
                  <p className="text-xs text-gray-500 mt-1">
                    Data: {pub.date.slice(0, 10)}
                  </p>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
