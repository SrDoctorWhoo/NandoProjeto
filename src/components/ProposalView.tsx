"use client";

import { ProposalData } from "@/lib/types";

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

  return (
    <main id="proposal" className={!isPreview ? "hide-proposal" : ""}>
      <div className="proposal-inner">

        <div className="prop-top">
          <div className="prop-logo">multi<span>agents</span></div>
          <div className="prop-validity">
            <div className="validity-dot"></div>
            <span>Válido até <strong>{fmtDate(data.validity)}</strong></span>
          </div>
        </div>

        <div className="prop-hero">
          <div className="prop-hero-label">Proposta Comercial</div>
          <h1 className="whitespace-pre-line">{data.title || 'Título'}</h1>
          <p className="whitespace-pre-wrap">{data.subtitle}</p>
        </div>

        <div className="prop-parties">
          <div className="party-col">
            <div className="party-role">Cliente</div>
            <div className="party-name">{data.clientName || 'Cliente'}</div>
            <div className="party-sub">{data.clientCompany}</div>
          </div>
          <div className="party-divider"></div>
          <div className="party-col">
            <div className="party-role">Responsável Multiagents</div>
            <div className="party-name">{data.agentName || 'Agent'}</div>
            <div className="party-sub">Multiagents</div>
          </div>
        </div>

        <div className="prop-grid">
          <div className="prop-card">
            <div className="card-title">
              <div className="card-title-icon">
                <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="2" width="12" height="12" rx="2" stroke="#0F4FF4" strokeWidth="1.5" />
                  <path d="M5 8h6M5 5.5h6M5 10.5h4" stroke="#0F4FF4" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              </div>
              Detalhes da Proposta
            </div>
            <div className="section-item">
              <div className="section-num">01</div>
              <div className="section-title">Objeto da Proposta</div>
              <div className="section-body whitespace-pre-wrap">{data.scope}</div>
            </div>
            <div className="section-item">
              <div className="section-num">02</div>
              <div className="section-title">Escopo dos Serviços</div>
              <div className="section-body whitespace-pre-wrap">{data.servicesDesc}</div>
            </div>
          </div>

          <div className="prop-card">
            <div className="card-title">
              <div className="card-title-icon">
                <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="8" cy="8" r="6" stroke="#0F4FF4" strokeWidth="1.5" />
                  <path d="M8 5v3l2 2" stroke="#0F4FF4" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              </div>
              Termos e Garantias
            </div>
            <div className="section-item">
              <div className="section-num">03</div>
              <div className="section-title">Condições de Pagamento</div>
              <div className="section-body whitespace-pre-wrap">{data.payment}</div>
            </div>
            <div className="section-item">
              <div className="section-num">04</div>
              <div className="section-title">Vigência e Confidencialidade</div>
              <div className="section-body whitespace-pre-wrap">{data.validityText}</div>
            </div>
            <div className="section-item">
              <div className="section-num">05</div>
              <div className="section-title">Garantia</div>
              <div className="section-body whitespace-pre-wrap">{data.warranty}</div>
            </div>
          </div>
        </div>

        <div className="services-card">
          <div className="services-header">
            <div className="card-title" style={{ margin: 0 }}>
              <div className="card-title-icon">
                <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="3" width="12" height="10" rx="2" stroke="#0F4FF4" strokeWidth="1.5" />
                  <path d="M5 7h6M5 9.5h4" stroke="#0F4FF4" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              </div>
              Serviços Contratados
            </div>
          </div>
          <table className="services-table">
            <thead>
              <tr>
                <th>Serviço</th>
                <th>Quantidade</th>
                <th>Valor Unit.</th>
                <th>Status</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {data.services?.map((s) => {
                const sub = (s.qty || 0) * (s.price || 0);
                return (
                  <tr key={s.id}>
                    <td><strong>{s.name || '—'}</strong></td>
                    <td>x{s.qty || 1}</td>
                    <td>{fmt(s.price || 0)}</td>
                    <td><span className="service-badge">Incluído</span></td>
                    <td className="service-price">{fmt(sub)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="totals-card">
          <div className="totals-row">
            <span className="label">Subtotal</span>
            <span className="value">{fmt(subtotal)}</span>
          </div>
          {discountAmount > 0 && (
            <div className="totals-row discount">
              <span className="label">{data.discountLabel || 'Desconto especial'}</span>
              <span className="value">− {fmt(discountAmount)}</span>
            </div>
          )}
          <div className="totals-row total">
            <span className="label">Total</span>
            <span className="value">{fmt(total)}</span>
          </div>
        </div>

        <div className="prop-cta">
          <h3>Pronto para começar?</h3>
          <p>Aceite os termos e dê o primeiro passo para transformar seus processos com IA.</p>
          <button className="cta-btn">Aceitar Proposta</button>
        </div>

      </div>
    </main>
  );
}
