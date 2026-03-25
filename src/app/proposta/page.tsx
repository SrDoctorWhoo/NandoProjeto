"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ProposalData } from "@/lib/types";
import { ProposalView } from "@/components/ProposalView";

function ProposalContent() {
  const searchParams = useSearchParams();
  const [data, setData] = useState<ProposalData | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const d = searchParams.get('d');
    if (d) {
      try {
        const decodedStr = decodeURIComponent(atob(decodeURIComponent(d)));
        const parsed = JSON.parse(decodedStr) as ProposalData;
        setData(parsed);
      } catch (e) {
        console.error("Erro ao ler proposta:", e);
        setError(true);
      }
    } else {
      setError(true);
    }
  }, [searchParams]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-800 font-sans p-6 text-center">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Proposta Inválida</h1>
          <p className="text-slate-600">
            Não foi possível carregar esta proposta. O link pode estar quebrado ou incompleto.
          </p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return <ProposalView data={data} isPreview={true} />;
}

export default function PropostaPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    }>
      <ProposalContent />
    </Suspense>
  );
}
