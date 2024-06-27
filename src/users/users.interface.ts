export interface Rights {
  leads: Permission;
  contacts: Permission;
  companies: Permission;
  tasks: TaskPermission;
  mail_access: boolean;
  catalog_access: boolean;
  files_access: boolean;
  status_rights: StatusRight[];
  oper_day_reports_view_access: boolean;
  oper_day_user_tracking: boolean;
  is_admin: boolean;
  is_free: boolean;
  is_active: boolean;
}

export interface Permission {
  view: string;
  edit: string;
  add: string;
  delete: string;
  export: string;
}

export interface TaskPermission {
  edit: string;
  delete: string;
}

export interface StatusRight {
  entity_type: string;
  pipeline_id: number;
  status_id: number;
  rights: {
    view: string;
    edit: string;
    delete: string;
  };
}

export interface Link {
  href: string;
}

export interface Links {
  self: Link;
}

export interface User {
  id: number;
  name: string;
  email: string;
  lang: string;
  rights: Rights;
  _links: Links;
}

export interface UsersResponse {
  _embedded: {
    users: User[];
  };
}
