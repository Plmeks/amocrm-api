export enum FieldCode {
  PHONE = 'PHONE',
  EMAIL = 'EMAIL',
}

export enum EnumCode {
  WORK = 'WORK',
}

export interface CustomFieldValue {
  value: string;
  enum_id: number;
  enum_code: EnumCode;
}

export interface CustomField {
  field_id: number;
  field_name: string;
  field_code: FieldCode;
  field_type: string;
  values: CustomFieldValue[];
}

export interface Link {
  href: string;
}

export interface Links {
  self: Link;
}

export interface EmbeddedCompany {
  id: number;
  _links: Links;
}

export interface Embedded {
  companies: EmbeddedCompany[];
}

export interface Contact {
  id: number;
  name: string;
  first_name: string;
  last_name: string;
  responsible_user_id: number;
  group_id: number;
  created_by: number;
  updated_by: number;
  created_at: number;
  updated_at: number;
  closest_task_at: number | null;
  is_deleted: boolean;
  is_unsorted: boolean;
  custom_fields_values: CustomField[];
  account_id: number;
  _links: Links;
  _embedded: Embedded;
}

export interface ContactsResponse {
  _embedded: {
    contacts: Contact[];
  };
}
