import api from "./api";

export type StaffRole = "ADMIN" | "RECEPTIONIST";

export interface StaffAccount {
  id: string;
  fullName: string;
  email: string;
  mobile: string | null;
  role: StaffRole;
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
  role: StaffRole;
  password: string;
}

export interface UpdateStaffInput {
  fullName?: string;
  email?: string;
  mobile?: string;
  role?: StaffRole;
  isActive?: boolean;
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
