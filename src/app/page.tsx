"use client";

import { useState } from "react";
import { Share2, Plus, ArrowRight, Sparkles, Copy, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function Home() {
  const [generatedLink, setGeneratedLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateNewLink = () => {
    setIsGenerating(true);
    setCopied(false);
    
    // Simulate generation delay for effect
    setTimeout(() => {
      const newId = Math.random().toString(36).substring(2, 10);
      setGeneratedLink(`/pagina/${newId}`);
      setIsGenerating(false);
    }, 800);
  };

  const copyToClipboard = () => {
    if (generatedLink) {
      navigator.clipboard.writeText(window.location.origin + generatedLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col items-center justify-center p-6 sm:p-10 font-sans relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-500/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-500/20 blur-[120px] pointer-events-none" />
      
      <main className="w-full max-w-2xl bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl relative z-10 flex flex-col items-center">
        
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-indigo-500/30"
        >
          <Sparkles className="w-8 h-8 text-white" />
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 text-center mb-4"
        >
          Gerador de Páginas Dinâmicas
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-slate-400 text-center mb-10 text-lg max-w-md"
        >
          Crie um link exclusivo agora. Ao acessar o link, uma página totalmente nova e única será gerada automaticamente.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          onClick={generateNewLink}
          disabled={isGenerating}
          className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 font-semibold text-white transition-all duration-200 bg-indigo-600 border border-transparent rounded-full hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 w-full sm:w-auto disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isGenerating ? (
            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
              <span>Gerar Novo Link</span>
            </>
          )}
        </motion.button>

        <AnimatePresence>
          {generatedLink && !isGenerating && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: "auto", marginTop: 40 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              className="w-full flex flex-col gap-4 overflow-hidden"
            >
              <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
              
              <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row items-center gap-4 mt-2">
                <div className="flex-1 w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-slate-300 font-mono text-sm break-all flex items-center justify-between group">
                  <span className="truncate mr-2">{typeof window !== 'undefined' ? window.location.origin : ''}{generatedLink}</span>
                  <button 
                    onClick={copyToClipboard}
                    className="p-2 hover:bg-slate-800 rounded-md transition-colors text-slate-400 hover:text-white"
                    title="Copiar link"
                  >
                    {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                
                <Link 
                  href={generatedLink}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-white text-slate-900 font-bold rounded-lg hover:bg-slate-200 transition-colors whitespace-nowrap"
                >
                  <span>Acessar</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </main>
      
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-12 text-slate-500 text-sm flex items-center gap-2"
      >
        <Share2 className="w-4 h-4" /> Suba este projeto no Vercel
      </motion.p>
    </div>
  );
}
