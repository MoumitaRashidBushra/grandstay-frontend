import api from "./api";

export type StaffRole = "ADMIN" | "RECEPTIONIST";
export type AccountRole = StaffRole | "CUSTOMER";

export interface StaffAccount {
  id: string;
  fullName: string;
  email: string;
  mobile: string | null;
  role: AccountRole;
  isActive: boolean;
  mustResetPw: boolean;
  createdAt: string;
}

export interface StaffList {
  staff: StaffAccount[];
  summary: {
    total: number;
    admins: number;
    receptionists: number;
    active: number;
  };
}

export interface CreateStaffInput {
  fullName: string;
  email: string;
  mobile: string;
  password: string;
}

export interface UpdateStaffInput {
  fullName?: string;
  email?: string;
  mobile?: string;
  isActive?: boolean;
}

export interface CustomerList {
  customers: StaffAccount[];
  summary: {
    total: number;
    active: number;
  };
}

export const listStaff = async (query: {
  search?: string;
  role?: StaffRole | "";
}): Promise<StaffList> => {
  const response = await api.get<StaffList>("/admin/staff", {
    params: {
      search: query.search || undefined,
      role: query.role || undefined,
    },
  });

  return response.data;
};

export const createStaff = async (
  input: CreateStaffInput,
): Promise<StaffAccount> => {
  const response = await api.post<StaffAccount>("/admin/staff", input);

  return response.data;
};

export const updateStaff = async (
  id: string,
  input: UpdateStaffInput,
): Promise<StaffAccount> => {
  const response = await api.patch<StaffAccount>(`/admin/staff/${id}`, input);

  return response.data;
};

export const listCustomers = async (query: {
  search?: string;
}): Promise<CustomerList> => {
  const response = await api.get<CustomerList>("/admin/customers", {
    params: { search: query.search || undefined },
  });

  return response.data;
};

export const updateCustomer = async (
  id: string,
  input: UpdateStaffInput,
): Promise<StaffAccount> => {
  const response = await api.patch<StaffAccount>(
    `/admin/customers/${id}`,
    input,
  );

  return response.data;
};

export const resetAccountPassword = async (
  accountKind: "staff" | "customers",
  id: string,
  password: string,
): Promise<StaffAccount> => {
  const response = await api.post<StaffAccount>(
    `/admin/${accountKind}/${id}/reset-password`,
    { password },
  );

  return response.data;
};
