"use client";

import { ProposalData } from "@/lib/types";
import { motion, Variants } from "framer-motion";
import { ShieldCheck, Sparkles, Building2, User, FileText, LayoutList, CreditCard, Clock, CheckCircle, ChevronRight } from "lucide-react";

export function ProposalView({ data, isPreview = false }: { data: ProposalData, isPreview?: boolean }) {
  const fmt = (n: number) => {
    return 'R$ ' + Number(n).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const fmtDate = (str: string) => {
    if (!str) return '';
    const parts = str.split('-');
    if (parts.length !== 3) return str;
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  };

  const subtotal = data.services?.reduce((acc, s) => acc + (s.qty || 0) * (s.price || 0), 0) || 0;
  const discountAmount = data.discount || 0;
  const total = Math.max(0, subtotal - discountAmount);

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } }
  };

  return (
    <div id="proposal-container" className={`flex-1 transition-all duration-300 shadow-2xl relative ${!isPreview ? "lg:ml-[420px] bg-slate-50 min-h-screen p-4 sm:p-8 lg:p-12 overflow-y-auto" : "bg-slate-50 min-h-screen p-4 sm:p-8 md:p-12 lg:p-20 flex justify-center w-full"}`}>
      
      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="max-w-4xl mx-auto bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-100 overflow-hidden relative"
      >
        {/* Background Decorative */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-blue-500/10 blur-[80px] pointer-events-none no-print"></div>

        {/* Top Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-8 sm:p-12 gap-6 bg-white border-b border-slate-100/60 z-10 relative">
          <motion.div variants={fadeUp} className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-lg shadow-blue-500/20 text-white font-bold text-xl">
              M
            </div>
            <div className="font-display text-2xl font-extrabold text-slate-900 tracking-tight">
              multi<span className="text-blue-600">agents</span>
            </div>
          </motion.div>
          <motion.div variants={fadeUp} className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full ring-1 ring-emerald-200/50">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-sm font-semibold">Válido até {fmtDate(data.validity)}</span>
          </motion.div>
        </div>

        <div className="p-8 sm:p-12">
          {/* Hero Section */}
          <motion.div variants={fadeUp} className="relative overflow-hidden rounded-[2rem] bg-slate-950 p-8 sm:p-14 mb-12 shadow-2xl z-10">
            {/* Glow effects */}
            <div className="absolute -top-32 -left-32 w-64 h-64 bg-blue-500 rounded-full mix-blend-screen filter blur-[100px] opacity-40"></div>
            <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-purple-500 rounded-full mix-blend-screen filter blur-[100px] opacity-30"></div>
            
            <div className="relative z-10 flex flex-col gap-6">
              <div className="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full bg-slate-800/50 border border-slate-700/50 text-blue-300 text-xs font-semibold uppercase tracking-widest backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5" />
                Proposta Comercial
              </div>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] tracking-tight whitespace-pre-line">
                {data.title || 'Nova Proposta'}
              </h1>
              <p className="text-lg text-slate-300 max-w-2xl leading-relaxed whitespace-pre-wrap font-medium">
                {data.subtitle}
              </p>
            </div>
          </motion.div>

          {/* Parties Grid */}
          <motion.div variants={fadeUp} className="grid sm:grid-cols-2 gap-6 sm:gap-12 mb-16 p-8 rounded-[2rem] bg-slate-50/80 border border-slate-100">
            <div className="flex gap-4">
              <div className="mt-1 w-12 h-12 shrink-0 rounded-full bg-blue-100 flex items-center justify-center">
                <Building2 className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Cliente</div>
                <div className="font-display text-xl font-bold text-slate-900 leading-tight">{data.clientName || 'Nome'}</div>
                <div className="text-slate-500 font-medium">{data.clientCompany}</div>
              </div>
            </div>
            <div className="hidden sm:block w-px bg-slate-200"></div>
            <div className="flex gap-4">
              <div className="mt-1 w-12 h-12 shrink-0 rounded-full bg-purple-100 flex items-center justify-center">
                <User className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Responsável</div>
                <div className="font-display text-xl font-bold text-slate-900 leading-tight">{data.agentName || 'Agent'}</div>
                <div className="text-slate-500 font-medium">Multiagents Team</div>
              </div>
            </div>
          </motion.div>

          {/* Details & Scope */}
          <motion.div variants={fadeUp} className="flex flex-col gap-12 mb-16">
            <div className="grid lg:grid-cols-[1fr_2px_1fr] gap-10">
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-100/50">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-slate-900">O que faremos</h3>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100/80 relative">
                  <div className="absolute top-0 right-0 -mt-2 -mr-2 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-10">OBJETO</div>
                  <p className="text-slate-600 leading-relaxed whitespace-pre-wrap relative z-0">{data.scope}</p>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100/80 relative">
                   <div className="absolute top-0 right-0 -mt-2 -mr-2 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-10">ESCOPO</div>
                  <p className="text-slate-600 leading-relaxed whitespace-pre-wrap relative z-0">{data.servicesDesc}</p>
                </div>
              </div>
              
              <div className="hidden lg:block bg-slate-100/50 rounded-full"></div>

              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-100/50">
                    <ShieldCheck className="w-5 h-5 text-amber-600" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-slate-900">Termos & Garantias</h3>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100/80 flex gap-4">
                  <CreditCard className="w-5 h-5 text-slate-300 shrink-0 mt-0.5" />
                  <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap">{data.payment}</p>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100/80 flex gap-4">
                  <Clock className="w-5 h-5 text-slate-300 shrink-0 mt-0.5" />
                  <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap">{data.validityText}</p>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100/80 flex gap-4 relative overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-400"></div>
                  <ShieldCheck className="w-5 h-5 text-amber-500 shrink-0 mt-0.5 ml-2" />
                  <p className="text-slate-800 font-medium text-sm leading-relaxed whitespace-pre-wrap">{data.warranty}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Pricing Table */}
          <motion.div variants={fadeUp} className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-slate-900">
                <LayoutList className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-display text-2xl font-bold text-slate-900">Investimento</h3>
            </div>
            
            <div className="bg-white rounded-[2rem] border border-slate-200 overflow-hidden shadow-sm page-break-inside-avoid">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/80 border-b border-slate-200">
                      <th className="py-4 px-6 text-xs font-bold uppercase tracking-widest text-slate-500 w-full min-w-[200px]">Serviço</th>
                      <th className="py-4 px-6 text-xs font-bold uppercase tracking-widest text-slate-500 text-center whitespace-nowrap">Qtd</th>
                      <th className="py-4 px-6 text-xs font-bold uppercase tracking-widest text-slate-500 text-right whitespace-nowrap">Valor Unit.</th>
                      <th className="py-4 px-6 text-xs font-bold uppercase tracking-widest text-slate-500 text-center whitespace-nowrap">Status</th>
                      <th className="py-4 px-6 text-xs font-bold uppercase tracking-widest text-slate-500 text-right whitespace-nowrap">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {data.services?.map((s) => {
                      const sub = (s.qty || 0) * (s.price || 0);
                      return (
                        <tr key={s.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="py-5 px-6">
                            <span className="font-bold text-slate-900">{s.name || 'Serviço sem nome'}</span>
                          </td>
                          <td className="py-5 px-6 text-center font-medium text-slate-600">x{s.qty || 1}</td>
                          <td className="py-5 px-6 text-right text-slate-600 whitespace-nowrap">{fmt(s.price || 0)}</td>
                          <td className="py-5 px-6 text-center">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold ring-1 ring-emerald-200">
                              <CheckCircle className="w-3 h-3" />
                              INCLUSO
                            </span>
                          </td>
                          <td className="py-5 px-6 text-right font-bold text-slate-900 whitespace-nowrap">{fmt(sub)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>

          {/* Totals */}
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-8 justify-end items-end page-break-inside-avoid">
            <div className="w-full sm:w-[380px] bg-slate-950 rounded-[2rem] p-8 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-500 rounded-full mix-blend-screen filter blur-[50px] opacity-20 pointer-events-none"></div>
              
              <div className="flex justify-between items-center py-2 text-slate-400 font-medium">
                <span>Subtotal</span>
                <span className="text-white">{fmt(subtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between items-center py-2 text-slate-400 font-medium border-t border-slate-800/50">
                  <span>{data.discountLabel || 'Desconto'}</span>
                  <span className="text-emerald-400 font-bold">− {fmt(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between items-center pt-6 mt-4 border-t border-slate-700/80">
                <span className="font-display text-lg font-bold">Total Final</span>
                <span className="font-display text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-400">
                  {fmt(total)}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Call to action (Preview mostly) */}
          <motion.div variants={fadeUp} className={`mt-16 text-center bg-slate-50 border border-slate-200 rounded-3xl p-10 no-print`}>
            <h3 className="font-display text-2xl font-bold text-slate-900 mb-3">Pronto para começarmos?</h3>
            <p className="text-slate-500 max-w-md mx-auto mb-8">Aceite os termos e dê o primeiro passo para transformar de vez os seus processos com Inteligência Artificial.</p>
            <button className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-700 text-white font-bold py-4 px-10 rounded-full shadow-xl shadow-blue-500/20 transition-all hover:scale-105 active:scale-95 group">
              Aceitar Proposta Agora
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

        </div>
      </motion.div>
      
      {/* Print Footer */}
      <div className="hidden print:block fixed bottom-0 left-0 w-full text-center text-[10px] text-slate-400 font-medium uppercase tracking-widest pt-4 border-t border-slate-200">
        Gerado via Multiagents — {new Date().toLocaleDateString('pt-BR')}
      </div>
    </div>
  );
}
