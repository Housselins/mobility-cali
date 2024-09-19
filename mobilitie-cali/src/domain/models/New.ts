export interface NewInterface {
  id: number;
  title: string;
  content?: string;
  image?: string;
  attached?: boolean;
  isEnabled: boolean;
  createdAt: string;
  updateddAt: string;
}

export interface NewContentInterface extends Record<string, any> {
  content: string;
}
export interface CreateNewInterface {
  id?: number;
  title: string;
  content?: string;
  image?: string;
  attached?: boolean,
  isEnabled?: boolean;
}
