export interface LeadResponse {
  _page: number;
  _links: SelfLink;
  _embedded: EmbeddedLeads;
}

interface SelfLink {
  self: Link;
}

interface Link {
  href: string;
}

interface EmbeddedLeads {
  leads: Lead[];
}

export interface Lead {
  id: number;
  name: string;
  price: number;
  responsible_user_id: number;
  group_id: number;
  status_id: number;
  pipeline_id: number;
  loss_reason_id: number | null;
  created_by: number;
  updated_by: number;
  created_at: number;
  updated_at: number;
  closed_at: number | null;
  closest_task_at: number | null;
  is_deleted: boolean;
  account_id: number;
  _links: SelfLink;
  _embedded: EmbeddedData;
}

interface EmbeddedData {
  companies: Company[];
  contacts: Contact[];
}

interface Company {
  id: number;
  _links: SelfLink;
}

interface Contact {
  id: number;
  is_main: boolean;
  _links: SelfLink;
}

export interface LeadsResponse {
  _embedded: {
    leads: Lead[];
  };
}

interface StatusLinks {
  self: {
    href: string;
  };
}

export interface PipelineStatus {
  id: number;
  name: string;
  sort: number;
  is_editable: boolean;
  pipeline_id: number;
  color: string;
  type: number;
  account_id: number;
  _links: StatusLinks;
}

// interfaces/pipeline.interface.ts
export interface PipelineResponse {
  _total_items: number;
  _links: SelfLink;
  _embedded: EmbeddedPipelines;
}

interface SelfLink {
  self: Link;
}

interface Link {
  href: string;
}

interface EmbeddedPipelines {
  pipelines: Pipeline[];
}

interface Pipeline {
  id: number;
  name: string;
  sort: number;
  is_main: boolean;
  is_unsorted_on: boolean;
  is_archive: boolean;
  account_id: number;
  _links: SelfLink;
  _embedded: EmbeddedStatuses;
}

interface EmbeddedStatuses {
  statuses: Status[];
}

interface Status {
  id: number;
  name: string;
  sort: number;
  is_editable: boolean;
  pipeline_id: number;
  color: string;
  type: number;
  account_id: number;
  _links: SelfLink;
}
