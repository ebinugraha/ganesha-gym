"use client"

import { parseAsString, useQueryStates } from "nuqs";

export const useUsersFilters = () => {
  return useQueryStates({
    search: parseAsString.withDefault("").withOptions({ clearOnDefault: true }),
  });
};
