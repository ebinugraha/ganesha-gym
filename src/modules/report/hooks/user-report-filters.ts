"use client"

import { parseAsString, useQueryStates } from "nuqs";

export const useReportFilters = () => {
  return useQueryStates({
    search: parseAsString.withDefault("").withOptions({ clearOnDefault: true }),
  });
};
