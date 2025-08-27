export interface PaginationMeta {
  total: number;
  total_pages: number;
  current_page: number;
  page_size: number;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from "react";

export interface TableColumn<T = any> {
  key: string;
  title: string;
  dataIndex?: string;
  width?: number | string;
  align?: "left" | "center" | "right";
  render?: (value: any, record: T, index: number) => ReactNode;
  sortable?: boolean;
  searchable?: boolean;
  filterable?: boolean;
  filterType?: "text" | "select" | "date" | "dateRange" | "number";
  filterOptions?: { label: string; value: any }[];
  className?: string;
}

export interface TableFilter {
  field: string;
  operator:
    | "eq"
    | "ne"
    | "gt"
    | "gte"
    | "lt"
    | "lte"
    | "like"
    | "in"
    | "between";
  value: any;
}

export interface TableSort {
  field: string;
  direction: "asc" | "desc";
}

export interface TableParams {
  page: number;
  pageSize: number;
  search?: string;
  filters?: TableFilter[];
  sorts?: TableSort[];
}

export interface TableResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}

export interface DataTableProps<T = any> {
  // Data (controlled by parent)
  data?: T[];
  loading?: boolean;
  error?: any;
  total?: number;

  // Table configuration
  columns: TableColumn<T>[];
  rowKey: string | ((record: T) => string);

  // UI Options
  size?: "sm" | "md" | "lg";
  striped?: boolean;
  bordered?: boolean;
  compact?: boolean;

  // Custom Actions
  customActions?: ReactNode;

  // Features
  searchable?: boolean;
  searchPlaceholder?: string;
  pagination?: boolean;
  showSizeChanger?: boolean;
  showQuickJumper?: boolean;
  showTotal?: boolean;

  // Expandable
  expandable?: {
    expandedRowRender: (record: T) => ReactNode;
    rowExpandable?: (record: T) => boolean;
  };

  // Row numbering
  showNumbering?: boolean;

  // Selection
  rowSelection?: {
    type?: "checkbox" | "radio";
    onChange?: (selectedRowKeys: React.Key[], selectedRows: T[]) => void;
    getCheckboxProps?: (record: T) => any;
  };

  // Actions
  actions?: {
    render: (record: T) => ReactNode;
    width?: number;
  };

  // Styling
  className?: string;
  rowClassName?: string | ((record: T, index: number) => string);

  // Event handlers (controlled by parent)
  onSearch?: (searchValue: string) => void;
  onPaginationChange?: (page: number, pageSize: number) => void;
  onSortChange?: (sorts: TableSort[]) => void;
  onReset?: () => void;

  // Current state values
  currentPage?: number;
  pageSize?: number;
  searchValue?: string;
  sortState?: TableSort[];
  maxSorts?: number;
}
