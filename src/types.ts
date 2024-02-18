export interface Developer {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface Version {
  id: string;
  name: string;
  description: string;
  developer?: Developer;
  updated_at: string;
}

export interface Metrics {
  latency: number;
  uptime: number;
  requests: number;
  errors: number;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  type: 'REST' | 'HTTP';
  published: boolean;
  configured: boolean;
  versions: Array<Version>;
  metrics?: Metrics;
}

export interface NetworkError {
  message: string;
  status?: number;
  code?: string;
}

export enum ServiceStatus {
  Published,
  Unpublished,
  InProgress,
}
