export interface NewInterface {
  id: number;
  title: string;
  content?: Record<string, any>;
  image?: string;
  isEnabled: boolean;
  createdAt: string;
  updateddAt: string;
}

export interface CreateNewInterface {
  title: string;
  content?: Record<string, any>;
  image?: string;
}
