/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMemo, useState } from 'react';
import { Card, CardContent } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/components/ui/table';
import { Skeleton } from '@/shared/components/ui/skeleton';
import { Badge } from '@/shared/components/ui/badge';
import { RotateCcw, ChevronDown, ChevronRight, ArrowUp, ArrowDown, ArrowUpDown, FileQuestionIcon } from 'lucide-react';
import { TableSearch } from './search';
import { TablePagination } from './pagination';
import { useMediaQuery } from '@/shared/hooks/use-media-query';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/shared/components/ui/collapsible';
import { DataTableProps, TableColumn, TableSort } from '@/shared/types/tables';
import { cn } from '@/lib/cn';

const DataTable = <T extends Record<string, any>>({
  // Data and loading state (controlled by parent)
  data,
  loading,
  error,
  total,

  // Table configuration
  columns,
  rowKey,

  // UI Options
  striped = true,
  bordered = false,
  compact = false,
  showNumbering = true,

  // Features
  searchable = true,
  searchPlaceholder = "Search...",
  pagination = true,

  // Multi-sorting
  onSortChange,
  sortState,
  maxSorts = 3,

  // Styling
  className,
  rowClassName,

  // Event handlers (controlled by parent)
  onSearch,
  onPaginationChange,
  onReset,

  // Current state values
  currentPage = 1,
  pageSize = 10,
  searchValue = '',

}: DataTableProps<T>) => {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");

  const finalColumns = useMemo(() => {
    if (!showNumbering) {
      return columns;
    }

    const numberingColumn: TableColumn<T> = {
      key: '__numbering__',
      title: 'No',
      width: 60,
      align: 'center',
      render: (_, __, index) => {
        const number = (currentPage - 1) * pageSize + index + 1;
        return (
          <Badge variant="secondary" className="w-8 h-8 rounded-full p-0 flex items-center justify-center text-xs">
            {number}
          </Badge>
        );
      },
    };

    return [numberingColumn, ...columns];
  }, [columns, showNumbering, currentPage, pageSize]);

  // Determine which columns to show based on screen size
  const visibleColumns = useMemo(() => {
    if (!isMobile) return finalColumns;
    return finalColumns.slice(0, 3);
  }, [finalColumns, isMobile]);

  // Get value from record using dataIndex
  const getCellValue = (record: T, column: TableColumn<T>) => {
    if (column.dataIndex) {
      return record[column.dataIndex];
    }
    return record[column.key];
  };

  // Toggle row expansion on mobile
  const toggleRowExpansion = (key: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(key)) {
      newExpanded.delete(key);
    } else {
      newExpanded.add(key);
    }
    setExpandedRows(newExpanded);
  };

  // Multi-sort handlers
  const handleSort = (column: TableColumn<T>) => {
    if (!column.sortable || !onSortChange) return;

    const currentSorts = sortState || [];

    // Find existing sort for this column
    const existingSortIndex = currentSorts.findIndex(sort => sort.field === column.key);
    let newSorts: TableSort[] = [];

    if (existingSortIndex >= 0) {
      // Column already has a sort - cycle through asc -> desc -> remove
      const existingSort = currentSorts[existingSortIndex];

      if (existingSort.direction === 'asc') {
        // Change from asc to desc
        newSorts = currentSorts.map((sort, index) =>
          index === existingSortIndex
            ? { ...sort, direction: 'desc' }
            : sort
        );
      } else {
        // Remove this sort (was desc, now remove)
        newSorts = currentSorts.filter((_, index) => index !== existingSortIndex);
      }
    } else {
      // Column doesn't have a sort - add new sort as ascending
      if (currentSorts.length < maxSorts) {
        // Add new sort while keeping existing sorts
        newSorts = [...currentSorts, { field: column.key, direction: 'asc' }];
      } else {
        // Max sorts reached: replace the oldest sort
        newSorts = [
          ...currentSorts.slice(1), // Remove first (oldest) sort
          { field: column.key, direction: 'asc' } // Add new sort
        ];
      }
    }

    onSortChange(newSorts);
  };
  // Get sort info for a column
  const getSortInfo = (column: TableColumn<T>) => {
    if (!sortState) return null;

    const sortIndex = sortState.findIndex(sort => sort.field === column.key);
    if (sortIndex === -1) return null;

    return {
      direction: sortState[sortIndex].direction,
      order: sortIndex + 1,
      isMultiple: sortState.length > 1
    };
  };

  // Render sort indicator with order number for multi-sort
  const renderSortIndicator = (column: TableColumn<T>) => {
    if (!column.sortable) return null;

    const sortInfo = getSortInfo(column);

    if (!sortInfo) {
      // Show neutral arrow up-down icon for sortable columns without active sort
      return (
        <ArrowUpDown className="w-3 h-3 ml-1 text-muted-foreground/60" />
      );
    }

    return (
      <div className="inline-flex items-center ml-1">
        {sortInfo.direction === 'asc' ? (
          <ArrowUp className="w-3 h-3" />
        ) : (
          <ArrowDown className="w-3 h-3" />
        )}
        {sortInfo.isMultiple && (
          <span className="text-xs ml-0.5 bg-primary text-primary-foreground rounded-full w-4 h-4 flex items-center justify-center">
            {sortInfo.order}
          </span>
        )}
      </div>
    );
  };

  // Mobile Card View Component
  const MobileCardView = ({ record, index }: { record: T; index: number }) => {
    const key = typeof rowKey === 'function'
      ? rowKey(record)
      : (record[rowKey] as string) || index.toString();

    const isExpanded = expandedRows.has(key);
    const mainColumns = finalColumns.slice(0, 3);
    const hiddenColumns = finalColumns.slice(3);

    return (
      <Card className={cn(
        "mb-3",
        striped && index % 2 === 1 && "bg-muted/20"
      )}>
        <CardContent className="p-4">
          <div className="space-y-2">
            {/* Show main columns */}
            {mainColumns.map((column) => {
              const value = getCellValue(record, column);
              return (
                <div key={column.key} className="flex justify-between items-start">
                  <span className="text-sm font-medium text-muted-foreground min-w-0 flex-1">
                    {column.title}:
                  </span>
                  <div className="text-sm text-right ml-2 flex-1">
                    {column.render
                      ? column.render(value, record, index)
                      : value?.toString() || '-'
                    }
                  </div>
                </div>
              );
            })}

            {/* Show expandable content if there are hidden columns */}
            {hiddenColumns.length > 0 && (
              <Collapsible open={isExpanded} onOpenChange={() => toggleRowExpansion(key)}>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm" className="w-full mt-2 h-8">
                    {isExpanded ? (
                      <>
                        <ChevronDown className="h-4 w-4 mr-2" />
                        Sembunyikan Detail
                      </>
                    ) : (
                      <>
                        <ChevronRight className="h-4 w-4 mr-2" />
                        Lihat Detail
                      </>
                    )}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-2 mt-2 pt-2 border-t">
                  {hiddenColumns.map((column) => {
                    const value = getCellValue(record, column);
                    return (
                      <div key={column.key} className="flex justify-between items-start">
                        <span className="text-sm font-medium text-muted-foreground min-w-0 flex-1">
                          {column.title}:
                        </span>
                        <div className="text-sm text-right ml-2 flex-1">
                          {column.render
                            ? column.render(value, record, index)
                            : value?.toString() || '-'
                          }
                        </div>
                      </div>
                    );
                  })}
                </CollapsibleContent>
              </Collapsible>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  // Row class name for striping
  const getRowClassName = (record: T, index: number) => {
    let classes = '';

    if (striped && index % 2 === 1) {
      classes += 'bg-muted/20';
    }

    classes += ' hover:bg-muted/50 transition-colors duration-200';

    if (compact) {
      classes += ' h-10';
    }

    if (typeof rowClassName === 'function') {
      classes += ' ' + rowClassName(record, index);
    } else if (rowClassName) {
      classes += ' ' + rowClassName;
    }

    return classes;
  };

  // Empty state
  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-8">
      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
        <FileQuestionIcon className="w-8 h-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-medium text-muted-foreground mb-2">
        {error ? 'Gagal memuat data' : 'Tidak ada data yang ditemukan'}
      </h3>
      <p className="text-sm text-muted-foreground mb-4">
        {error ? 'Terjadi kesalahan saat memuat data' : 'Belum ada data untuk ditampilkan'}
      </p>
      {error && onReset && (
        <Button onClick={onReset} size="sm">
          <RotateCcw className="w-4 h-4 mr-2" />
          Coba Lagi
        </Button>
      )}
    </div>
  );

  // Loading rows for table
  const LoadingRows = () => (
    <>
      {Array.from({ length: pageSize }).map((_, index) => (
        <TableRow key={`loading-${index}`}>
          {visibleColumns.map((column) => (
            <TableCell key={column.key}>
              <Skeleton className="h-4 w-full" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );

  // Loading cards for mobile
  const LoadingCards = () => (
    <>
      {Array.from({ length: Math.min(pageSize, 5) }).map((_, index) => (
        <Card key={`loading-card-${index}`} className="mb-3">
          <CardContent className="p-4 space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </CardContent>
        </Card>
      ))}
    </>
  );

  // Show empty state when no data and not loading
  const shouldShowEmptyState = !loading && (!data || data.length === 0);

  return (
    <div className={cn("w-full", className)}>
      <Card className="shadow-sm py-0">
        <CardContent className="p-0">
          {/* Controls Section */}
          {searchable && (
            <div className="bg-muted/30 p-3 lg:p-4 border-b">
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Left side - Search */}
                <div className="flex flex-1 items-center gap-2">
                  {searchable && onSearch && (
                    <div className="flex-1 min-w-0">
                      <TableSearch
                        value={searchValue}
                        placeholder={searchPlaceholder}
                        onChange={onSearch}
                        className="w-full max-w-none sm:max-w-sm"
                      />
                    </div>
                  )}
                </div>

                {/* Right side - Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  {onReset && (
                    <Button
                      variant="ghost"
                      size="sm"
                      disabled={loading}
                      onClick={onReset}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Reset
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Content Section */}
          <div className="p-0">
            {shouldShowEmptyState ? (
              <EmptyState />
            ) : (
              <>
                {/* Mobile View - Card Layout */}
                {isMobile ? (
                  <div className="p-4 space-y-3">
                    {loading ? (
                      <LoadingCards />
                    ) : (
                      data?.map((record, index) => (
                        <MobileCardView
                          key={typeof rowKey === 'function'
                            ? rowKey(record)
                            : (record[rowKey] as string) || index.toString()
                          }
                          record={record}
                          index={index}
                        />
                      ))
                    )}
                  </div>
                ) : (
                  /* Desktop/Tablet View - Table Layout */
                  <div className="w-full overflow-auto">
                    <Table className="min-w-[700px]">
                      <TableHeader>
                        <TableRow className={cn(
                          "hover:bg-transparent",
                          bordered && "border-b"
                        )}>
                          {visibleColumns.map((column) => (
                            <TableHead
                              key={column.key}
                              className={cn(
                                "font-semibold text-foreground whitespace-nowrap select-none",
                                column.align === 'center' && "text-center",
                                column.align === 'right' && "text-right",
                                compact && "h-10 py-2",
                                isTablet && "text-sm px-2",
                                column.className,
                                column.sortable && "cursor-pointer hover:bg-muted/80 transition-colors"
                              )}
                              style={{
                                width: column.width,
                                minWidth: isTablet ? 100 : column.width,
                              }}
                              onClick={() => handleSort(column)}
                            >
                              <div className="flex items-center justify-between">
                                <span className="flex items-center">
                                  {column.title}
                                  {column.sortable && renderSortIndicator(column)}
                                </span>
                              </div>
                            </TableHead>
                          ))}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {loading ? (
                          <LoadingRows />
                        ) : (
                          data?.map((record, index) => {
                            const key = typeof rowKey === 'function'
                              ? rowKey(record)
                              : (record[rowKey] as string) || index.toString();

                            return (
                              <TableRow
                                key={key}
                                className={getRowClassName(record, index)}
                              >
                                {visibleColumns.map((column) => {
                                  const value = getCellValue(record, column);
                                  return (
                                    <TableCell
                                      key={column.key}
                                      className={cn(
                                        "whitespace-nowrap",
                                        column.align === 'center' && "text-center",
                                        column.align === 'right' && "text-right",
                                        compact && "py-2",
                                        isTablet && "text-sm px-2",
                                        column.className
                                      )}
                                    >
                                      <div className="max-w-[200px] lg:max-w-none">
                                        {column.render
                                          ? column.render(value, record, index)
                                          : (
                                            <span className="truncate block" title={value?.toString()}>
                                              {value?.toString() || '-'}
                                            </span>
                                          )
                                        }
                                      </div>
                                    </TableCell>
                                  );
                                })}
                              </TableRow>
                            );
                          })
                        )}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </>
            )}

            {/* Custom Pagination - only show when there's data */}
            {pagination && !shouldShowEmptyState && (
              <TablePagination
                current={currentPage}
                pageSize={pageSize}
                total={total || 0}
                onChange={onPaginationChange ?? (() => { })}
              />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataTable;
