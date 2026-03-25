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
    <>
      <aside id="editor" className={isEditorOpen ? "open" : ""}>
        <div id="editor-header">
          <h2>✦ Editor de Proposta</h2>
          <p>Preencha os dados e veja ao vivo</p>
        </div>

        <div className="editor-section">
          <h3>Cliente</h3>
          <div className="field">
            <label>Nome do Cliente</label>
            <input type="text" value={data.clientName} onChange={e => updateField('clientName', e.target.value)} placeholder="Ex: João Silva" />
          </div>
          <div className="field">
            <label>Empresa</label>
            <input type="text" value={data.clientCompany} onChange={e => updateField('clientCompany', e.target.value)} placeholder="Ex: Acme Ltda" />
          </div>
          <div className="field">
            <label>Responsável Multiagents</label>
            <input type="text" value={data.agentName} onChange={e => updateField('agentName', e.target.value)} placeholder="Seu nome" />
          </div>
        </div>

        <div className="editor-section">
          <h3>Proposta</h3>
          <div className="field">
            <label>Título da Proposta</label>
            <input type="text" value={data.title} onChange={e => updateField('title', e.target.value)} placeholder="Ex: Automação com IA" />
          </div>
          <div className="field">
            <label>Subtítulo / Descrição Hero</label>
            <textarea value={data.subtitle} onChange={e => updateField('subtitle', e.target.value)} placeholder="Breve apresentação..."></textarea>
          </div>
          <div className="field">
            <label>Válido até</label>
            <input type="date" value={data.validity} onChange={e => updateField('validity', e.target.value)} />
          </div>
        </div>

        <div className="editor-section">
          <h3>Conteúdo das Seções</h3>
          <div className="field">
            <label>Objeto da Proposta</label>
            <textarea value={data.scope} onChange={e => updateField('scope', e.target.value)}></textarea>
          </div>
          <div className="field">
            <label>Escopo dos Serviços</label>
            <textarea value={data.servicesDesc} onChange={e => updateField('servicesDesc', e.target.value)}></textarea>
          </div>
          <div className="field">
            <label>Condições de Pagamento</label>
            <textarea value={data.payment} onChange={e => updateField('payment', e.target.value)}></textarea>
          </div>
          <div className="field">
            <label>Vigência e Confidencialidade</label>
            <textarea value={data.validityText} onChange={e => updateField('validityText', e.target.value)}></textarea>
          </div>
          <div className="field">
            <label>Garantia</label>
            <textarea value={data.warranty} onChange={e => updateField('warranty', e.target.value)}></textarea>
          </div>
        </div>

        <div className="editor-section">
          <h3>Serviços e Valores</h3>
          <div className="service-col-labels">
            <span>Serviço</span>
            <span>Qtd</span>
            <span>Valor (R$)</span>
            <span></span>
          </div>
          <div id="services-list">
            {data.services.map((s, i) => (
              <div key={s.id} className="service-row">
                <input type="text" value={s.name} onChange={e => updateService(i, 'name', e.target.value)} placeholder="Nome" />
                <input type="number" value={s.qty} min="1" onChange={e => updateService(i, 'qty', parseInt(e.target.value) || 1)} placeholder="1" />
                <input type="number" value={s.price} min="0" onChange={e => updateService(i, 'price', parseFloat(e.target.value) || 0)} placeholder="0" />
                <button className="btn-remove" onClick={() => removeService(i)}>×</button>
              </div>
            ))}
          </div>
          <button className="btn-add" onClick={addService}>+ Adicionar serviço</button>
          
          <div className="field" style={{ marginTop: '14px' }}>
            <label>Desconto (R$)</label>
            <input type="number" value={data.discount} min="0" onChange={e => updateField('discount', parseFloat(e.target.value) || 0)} placeholder="0" />
          </div>
          <div className="field">
            <label>Descrição do desconto</label>
            <input type="text" value={data.discountLabel} onChange={e => updateField('discountLabel', e.target.value)} placeholder="Ex: Desconto especial" />
          </div>
        </div>

        <div id="editor-actions">
          <button className="btn-primary" onClick={printPdf}>⬇ Gerar PDF / Imprimir</button>
          <button className="btn-secondary" onClick={generateLink}>🔗 Copiar link da proposta</button>
        </div>
      </aside>

      <ProposalView data={data} isPreview={false} />

      <button id="toggle-editor" onClick={() => setIsEditorOpen(!isEditorOpen)}>
        {isEditorOpen ? '✕' : '✏️'}
      </button>
    </>
  );
}
