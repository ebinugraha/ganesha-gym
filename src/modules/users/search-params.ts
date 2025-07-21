import {  parseAsString, createLoader } from "nuqs/server";

export const SearchParamsUsersFilters = {
  search: parseAsString.withDefault("").withOptions({ clearOnDefault: true }),
};

export const loadsearchParams = createLoader(SearchParamsUsersFilters);
