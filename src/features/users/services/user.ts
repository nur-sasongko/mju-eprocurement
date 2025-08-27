import { supabase } from "@/lib/supabase/client";
import { User } from "../types";

export interface PaginatedUsers {
  data: User[];
  count: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface GetUsersParams {
  page?: number;
  limit?: number;
  search?: string;
  isActive?: boolean;
  includeDeleted?: boolean;
}

export interface CreateUserParams {
  fullname: string;
  email: string;
  password: string;
  nickname?: string;
  birth_place?: string;
  birth_date?: string;
  phone_number?: string;
  gender?: "Male" | "Female";
  profile_photo_url?: string;
  address?: string;
}

export class UserService {
  /**
   * Get paginated users using RPC
   */
  static async getUsers(params: GetUsersParams = {}): Promise<PaginatedUsers> {
    const {
      page = 1,
      limit = 10,
      search = "",
      isActive,
      includeDeleted = false,
    } = params;

    const { data, error } = await supabase.rpc("get_users_paginated", {
      page_number: page,
      page_size: limit,
      search_term: search,
      filter_active: isActive,
      include_deleted: includeDeleted,
    });

    if (error) {
      throw new Error(`Gagal mengambil data pengguna: ${error.message}`);
    }

    return data;
  }

  /**
   * Get single user by ID using RPC
   */
  static async getUser(id: string, includeDeleted = false): Promise<User> {
    const { data, error } = await supabase.rpc("get_user_by_id", {
      user_id: id,
      include_deleted: includeDeleted,
    });

    if (error) {
      throw new Error(`Gagal mengambil data pengguna: ${error.message}`);
    }

    if (!data) {
      throw new Error("Pengguna tidak ditemukan.");
    }

    return data;
  }

  /**
   * Get user by auth_id using RPC
   */
  static async getUserByAuthId(
    authId: string,
    includeDeleted = false
  ): Promise<User> {
    const { data, error } = await supabase.rpc("get_user_by_auth_id", {
      auth_user_id: authId,
      include_deleted: includeDeleted,
    });

    if (error) {
      throw new Error(`Gagal mengambil data pengguna: ${error.message}`);
    }

    if (!data) {
      throw new Error("Pengguna tidak ditemukan.");
    }

    return data;
  }

  /**
   * Insert user using RPC
   */
  static async insertUser(userData: CreateUserParams): Promise<User> {
    const { data, error } = await supabase.rpc("insert_user", {
      user_data: userData,
    });

    if (error) {
      if (error.message.includes("duplicate key")) {
        throw new Error("Email sudah terdaftar.");
      }
      throw new Error(`Gagal membuat pengguna: ${error.message}`);
    }

    return data;
  }

  /**
   * Update user using RPC
   */
  static async updateUser(
    id: string,
    userData: Partial<CreateUserParams>
  ): Promise<User> {
    const { data, error } = await supabase.rpc("update_user", {
      user_id: id,
      user_data: userData,
    });

    if (error) {
      throw new Error(`Gagal memperbarui pengguna: ${error.message}`);
    }

    if (!data) {
      throw new Error("Pengguna tidak ditemukan.");
    }

    return data;
  }

  /**
   * Soft delete user using RPC
   */
  static async deleteUser(id: string): Promise<void> {
    const { error } = await supabase.rpc("delete_user", {
      user_id: id,
    });

    if (error) {
      throw new Error(`Gagal menghapus pengguna: ${error.message}`);
    }
  }

  /**
   * Restore soft deleted user using RPC
   */
  static async restoreUser(id: string): Promise<User> {
    const { data, error } = await supabase.rpc("restore_user", {
      user_id: id,
    });

    if (error) {
      throw new Error(`Gagal memulihkan pengguna: ${error.message}`);
    }

    if (!data) {
      throw new Error("Pengguna tidak ditemukan.");
    }

    return data;
  }

  /**
   * Get user count using RPC
   */
  static async getUserCount(includeDeleted = false): Promise<number> {
    const { data, error } = await supabase.rpc("get_user_count", {
      include_deleted: includeDeleted,
    });

    if (error) {
      throw new Error(`Gagal mengambil jumlah pengguna: ${error.message}`);
    }

    return data || 0;
  }
}
