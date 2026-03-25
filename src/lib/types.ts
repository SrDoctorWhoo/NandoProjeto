export interface ServiceData {
  id: string;
  name: string;
  qty: number;
  price: number;
}

export interface ProposalData {
  clientName: string;
  clientCompany: string;
  agentName: string;
  title: string;
  subtitle: string;
  validity: string;
  scope: string;
  servicesDesc: string;
  payment: string;
  validityText: string;
  warranty: string;
  discount: number;
  discountLabel: string;
  services: ServiceData[];
}
