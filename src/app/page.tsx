"use client";

import { useState, useEffect } from "react";
import { ProposalData, ServiceData } from "@/lib/types";
import { ProposalView } from "@/components/ProposalView";

export default function Home() {
  const [data, setData] = useState<ProposalData>({
    clientName: "Leonardo",
    clientCompany: "Multiplicai Estratégia & Tecnologia",
    agentName: "Dayane",
    title: "Automação Inteligente\ncom Agentes de IA",
    subtitle: "Uma proposta personalizada para transformar seus processos com inteligência artificial, automação e agentes autônomos de alta performance.",
    validity: "2026-04-30",
    scope: "Esta proposta contempla a implementação de agentes de inteligência artificial para automação de processos, integração de sistemas e otimização operacional da sua empresa.",
    servicesDesc: "Diagnóstico de processos, desenvolvimento de agentes de IA, integrações via API, treinamento da equipe e suporte contínuo pós-implantação.",
    payment: "Pagamento via PIX, boleto bancário ou cartão de crédito em até 3x sem juros. Entrada de 50% no início do projeto.",
    validityText: "Esta proposta é válida conforme a data indicada. Ambas as partes comprometem-se a manter sigilo absoluto sobre os dados estratégicos compartilhados durante a negociação.",
    warranty: "Garantia de 30 dias após entrega. Caso o projeto não atinja os objetivos acordados, realizaremos os ajustes necessários sem custo adicional.",
    discount: 0,
    discountLabel: "Desconto especial",
    services: [
      { id: "1", name: 'Agente de Atendimento IA', qty: 1, price: 2500 },
      { id: "2", name: 'Automação de Processos', qty: 1, price: 3500 },
    ]
  });

  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const updateField = (field: keyof ProposalData, value: any) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const updateService = (index: number, field: keyof ServiceData, value: any) => {
    const newServices = [...data.services];
    newServices[index] = { ...newServices[index], [field]: value };
    setData(prev => ({ ...prev, services: newServices }));
  };

  const addService = () => {
    setData(prev => ({
      ...prev,
      services: [...prev.services, { id: Math.random().toString(), name: '', qty: 1, price: 0 }]
    }));
  };

  const removeService = (index: number) => {
    const newServices = [...data.services];
    newServices.splice(index, 1);
    setData(prev => ({ ...prev, services: newServices }));
  };

  const generateLink = () => {
    try {
      // Safe base64 encoding for unicode
      const jsonStr = JSON.stringify(data);
      const encoded = btoa(encodeURIComponent(jsonStr));
      const link = `${window.location.origin}/proposta?d=${encodeURIComponent(encoded)}`;
      navigator.clipboard.writeText(link).then(() => {
        alert('Link da proposta copiado para a área de transferência! Envie para o seu cliente.');
      });
    } catch (err) {
      alert("Erro ao gerar link. Os dados inseridos podem ser muito grandes.");
      console.error(err);
    }
  };

  const printPdf = () => {
    window.print();
  };

  return (
    <div className="flex bg-slate-50 min-h-screen">
      {/* Sidebar Editor */}
      <aside 
        id="editor" 
        className={`fixed inset-y-0 left-0 z-50 w-[420px] bg-white border-r border-slate-200 flex flex-col shadow-2xl lg:shadow-none transition-transform duration-300 ${isEditorOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        <div className="p-6 border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-20 flex justify-between items-center">
          <div>
            <h2 className="font-display font-bold text-slate-900 flex items-center gap-2 text-lg">
              <span className="w-2 h-2 rounded-full bg-brand-500"></span>
              Editor de Proposta
            </h2>
            <p className="text-xs text-slate-500 mt-1 font-medium tracking-wide uppercase">Preencha os dados e veja ao vivo</p>
          </div>
          <button className="lg:hidden p-2 text-slate-400 hover:text-slate-600 rounded-lg bg-slate-50" onClick={() => setIsEditorOpen(false)}>
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-10 custom-scrollbar">
          
          {/* Section: Cliente */}
          <section className="space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">Cliente</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5 ml-1">Nome do Cliente</label>
                <input className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all font-medium" type="text" value={data.clientName} onChange={e => updateField('clientName', e.target.value)} />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5 ml-1">Empresa</label>
                <input className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all font-medium" type="text" value={data.clientCompany} onChange={e => updateField('clientCompany', e.target.value)} />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5 ml-1">Responsável Multiagents</label>
                <input className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all font-medium" type="text" value={data.agentName} onChange={e => updateField('agentName', e.target.value)} />
              </div>
            </div>
          </section>

          {/* Section: Proposta */}
          <section className="space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">Detalhes Principais</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5 ml-1">Título</label>
                <input className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all font-medium" type="text" value={data.title} onChange={e => updateField('title', e.target.value)} />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5 ml-1">Subtítulo (Hero)</label>
                <textarea className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all font-medium resize-y min-h-[80px]" value={data.subtitle} onChange={e => updateField('subtitle', e.target.value)}></textarea>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5 ml-1">Válido até</label>
                <input className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all font-medium" type="date" value={data.validity} onChange={e => updateField('validity', e.target.value)} />
              </div>
            </div>
          </section>

          {/* Section: Conteúdo */}
          <section className="space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">Conteúdo das Seções</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5 ml-1">Objeto da Proposta</label>
                <textarea className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all min-h-[100px]" value={data.scope} onChange={e => updateField('scope', e.target.value)}></textarea>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5 ml-1">Escopo dos Serviços</label>
                <textarea className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all min-h-[100px]" value={data.servicesDesc} onChange={e => updateField('servicesDesc', e.target.value)}></textarea>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5 ml-1">Condições de Pagamento</label>
                <textarea className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all min-h-[80px]" value={data.payment} onChange={e => updateField('payment', e.target.value)}></textarea>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5 ml-1">Vigência e Confidencialidade</label>
                <textarea className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all min-h-[80px]" value={data.validityText} onChange={e => updateField('validityText', e.target.value)}></textarea>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5 ml-1">Garantia</label>
                <textarea className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all min-h-[80px]" value={data.warranty} onChange={e => updateField('warranty', e.target.value)}></textarea>
              </div>
            </div>
          </section>

          {/* Section: Valores */}
          <section className="space-y-4 pb-12">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">Serviços e Valores</h3>
            
            <div className="grid grid-cols-[1fr_60px_80px_32px] gap-2 px-1 mb-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Serviço</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center">Qtd</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider text-right">R$</span>
              <span></span>
            </div>

            <div className="space-y-3">
              {data.services.map((s, i) => (
                <div key={s.id} className="grid grid-cols-[1fr_60px_80px_32px] gap-2 items-center">
                  <input className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-brand-500 transition-all" type="text" value={s.name} onChange={e => updateService(i, 'name', e.target.value)} placeholder="Nome" />
                  <input className="w-full px-2 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-center focus:outline-none focus:border-brand-500 transition-all" type="number" value={s.qty} min="1" onChange={e => updateService(i, 'qty', parseInt(e.target.value) || 1)} />
                  <input className="w-full px-2 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-right focus:outline-none focus:border-brand-500 transition-all" type="number" value={s.price} min="0" onChange={e => updateService(i, 'price', parseFloat(e.target.value) || 0)} />
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600 transition-colors" onClick={() => removeService(i)}>✕</button>
                </div>
              ))}
            </div>
            
            <button className="w-full py-3 mt-4 border-2 border-dashed border-slate-200 rounded-xl text-sm font-bold text-slate-500 hover:bg-slate-50 hover:text-brand-600 hover:border-brand-200 transition-all" onClick={addService}>
              + Adicionar Novo Serviço
            </button>
            
            <div className="pt-6 mt-6 border-t border-slate-100 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5 ml-1">Desconto (R$)</label>
                <input className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all" type="number" value={data.discount} min="0" onChange={e => updateField('discount', parseFloat(e.target.value) || 0)} />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5 ml-1">Descrição do desconto</label>
                <input className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all" type="text" value={data.discountLabel} onChange={e => updateField('discountLabel', e.target.value)} />
              </div>
            </div>
          </section>
        </div>

        <div className="p-5 border-t border-slate-200 bg-white shadow-[0_-5px_15px_rgba(0,0,0,0.03)] flex flex-col gap-3">
          <button className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-sm font-bold tracking-wide transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2" onClick={printPdf}>
            ⬇ Baixar PDF
          </button>
          <button className="w-full py-3.5 bg-brand-50 hover:bg-brand-100 text-brand-700 border border-brand-200 rounded-xl text-sm font-bold tracking-wide transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2" onClick={generateLink}>
            🔗 Gerar Link Exclusivo
          </button>
        </div>
      </aside>

      {/* Main View Area */}
      <ProposalView data={data} isPreview={false} />

      {/* Mobile Toggle Button */}
      <button 
        className="lg:hidden fixed bottom-6 right-6 w-14 h-14 bg-brand-600 text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-brand-500 transition-colors z-[60] no-print text-2xl"
        onClick={() => setIsEditorOpen(!isEditorOpen)}
      >
        ✏️
      </button>

      {/* Mobile Overlay */}
      {isEditorOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40"
          onClick={() => setIsEditorOpen(false)}
        />
      )}
    </div>
  );
}
