export type Page = {
  id: number;
  title: string;
  views: number;
  createdAt: Date;
  updatedAt: Date;
  version: number;
};

export type CreateOrUpdatePage = {
  title: string;
  views?: number;
  updatedAt?: Date;
};
