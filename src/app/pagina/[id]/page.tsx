import Link from "next/link";
import { ArrowLeft, ExternalLink, Globe, LayoutDashboard } from "lucide-react";

export default async function PaginaDinamica({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col font-sans">
      <header className="w-full p-6 sm:px-10 border-b border-slate-800 bg-slate-950/50 backdrop-blur-md sticky top-0 z-50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-500/20 rounded-xl flex items-center justify-center">
            <Globe className="w-5 h-5 text-indigo-400" />
          </div>
          <h1 className="font-bold text-xl tracking-tight hidden sm:block">
            Página <span className="text-indigo-400">#{id}</span>
          </h1>
        </div>
        
        <Link 
          href="/"
          className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-700 hover:border-slate-500 rounded-lg text-sm font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar ao Gerador</span>
        </Link>
      </header>

      <main className="flex-1 flex flex-col p-6 sm:p-10 max-w-5xl mx-auto w-full">
        {/* Banner Section */}
        <div className="w-full relative rounded-3xl overflow-hidden bg-gradient-to-r from-indigo-900 to-purple-900 p-8 sm:p-16 mb-10 shadow-2xl border border-indigo-500/30">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
          <div className="relative z-10 flex flex-col items-start gap-6 max-w-2xl">
            <span className="px-3 py-1 bg-white/10 text-white border border-white/20 rounded-full text-xs font-semibold uppercase tracking-wider">
              Página Gerada
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
              Bem-vindo à sua nova página exclusiva!
            </h2>
            <p className="text-indigo-100 text-lg">
              Esta página foi gerada dinamicamente pelo Next.js com o ID "{id}".
              Cada link criado gera uma interface única.
            </p>
          </div>
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-indigo-500/50 transition-colors flex flex-col gap-4">
            <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center mb-2">
              <LayoutDashboard className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold text-white">Pronto para uso</h3>
            <p className="text-slate-400 leading-relaxed flex-1">
              Esta é uma rota dinâmica válida. Você pode adicionar qualquer componente, realizar fetching de dados ou expandir essa estrutura livremente.
            </p>
          </div>

          <div className="md:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-purple-500/50 transition-colors flex flex-col gap-4">
            <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center mb-2">
              <ExternalLink className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-bold text-white">Compatível com Vercel</h3>
            <p className="text-slate-400 leading-relaxed font-sans mb-4">
              A arquitetura está otimizada para ser publicada na Vercel com apenas um clique. Funcional completo com App Router Next.js 15 e TailwindCSS.
            </p>
            
            <div className="mt-auto bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-sm text-slate-300">
              <span className="text-slate-500">// O ID capturado pela rota dinâmica:</span>
              <br />
              <span className="text-purple-400">const</span> id = <span className="text-emerald-400">"{id}"</span>;
            </div>
          </div>
        </div>
      </main>
      
      <footer className="w-full p-6 text-center border-t border-slate-800/60 text-slate-500 text-sm">
        Criado com Next.js & Tailwind CSS
      </footer>
    </div>
  );
}
