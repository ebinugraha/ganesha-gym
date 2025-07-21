import {  parseAsString, createLoader } from "nuqs/server";

export const SearchParamsReportFilters = {
  search: parseAsString.withDefault("").withOptions({ clearOnDefault: true }),
};

export const loadsearchParams = createLoader(SearchParamsReportFilters);
