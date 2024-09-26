export interface NewInterface {
  id: number;
  title: string;
  contenido_noticia?: string;
  image?: string;
  attached?: boolean;
  file?: string;
  fileName?: string;
  fileDescription?: string;
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
  contenido_noticia?: string;
  image?: string;
  attached?: boolean;
  file?: string;
  fileName?: string;
  fileDescription?: string;
  isEnabled?: boolean;
}
