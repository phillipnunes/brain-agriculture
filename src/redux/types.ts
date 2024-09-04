// src/redux/types.ts

export interface Producer {
  id?: number;
  cpfCnpj: string;
  producerName: string;
  farmName: string;
  city: string;
  state: string;
  totalArea: number;
  arableArea: number;
  vegetationArea: number;
  cultures: string[];
}

export interface DashboardState {
  loading: boolean;
  totalFarms: number;
  totalArea: number;
  farmsByState: { state: string; value: number; color: string }[];
  farmsByCulture: { culture: string; value: number; color: string }[];
  landUseDistribution: { type: string; value: number; color: string }[];
  error: string;
}

export interface ProducerState {
  producers: Producer[];
}

export interface AppState {
  producer: ProducerState;
  dashboard: DashboardState;
}
