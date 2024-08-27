import { Status } from ".";

interface Form {
  campaign: string;
  document: string;
  fullname: string;
  cellphone: string;
  documentType: string;
}

export interface Request {
  userCellphone?: string;
  userDocument?: string;
  userFullName?: string;
  userTypeDocument?: string;
  createdAt: string;
  form?: Form;
  id: string;
  radicate: string;
  requestsAudit?: [];
  status?: Status;
  statusId?: number;
  updatedAt?: string;
  workflowId?: string;
}

export interface RequestBasic {
  requests: Request[];
  trerecords: number;
}

export interface CreateRequest {
  userCellphone?: string;
  userDocument?: string;
  userFullName?: string;
  userTypeDocument?: string;
  campaignId: string;
  companyId: string;
  form?: FormDTO;
  radicate?: string;
  statusId: number;
  workflowId: string;
  referenceAcronym: string;
}

export interface FormDTO {
  header: HeaderDTO;
  content: Record<string, any>;
}

export interface HeaderDTO {
  version: string;
  template: string;
}

export interface UpdateRequest {
  statusId: number;
}
