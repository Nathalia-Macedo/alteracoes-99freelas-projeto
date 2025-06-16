import { useLocation,useParams } from "react-router-dom";
import { useState,useEffect } from "react";
export default function PublicationPage() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        // tenta nas duas bases — assume que endpoint /publications/:id existe
        const endpoints = [
          `https://conecta-transparencia.agencianew.com.br/publications/${id}`,
          `https://conecta.agencianew.com.br/publications/${id}`,
        ];
        for (const url of endpoints) {
          const res = await fetch(url);
          if (res.ok) {
            const data = await res.json();
            setItem(data);
            break;
          }
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <p className="p-4">Carregando…</p>;
  if (!item) return <p className="p-4">Publicação não encontrada.</p>;

  return (
    <div className="p-4">
      <Link to="/" className="text-indigo-600 underline">
        ← Nova busca
      </Link>
      <h2 className="text-2xl font-semibold mt-2 mb-4">
        {(item.type?.name || item.name || 'Sem Tipo')} – Nº {item.number}
      </h2>

      <p className="whitespace-pre-wrap mb-4">{item.description}</p>

      {item.attachments?.length > 0 && (
        <a
          href={item.attachments[0].attachment}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-lg"
        >
          Baixar anexo
        </a>
      )}
    </div>
  );
}