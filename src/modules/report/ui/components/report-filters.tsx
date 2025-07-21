
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CircleX, SearchIcon } from "lucide-react";
import { useReportFilters } from "../../hooks/user-report-filters";

export const ReportFilters = () => {

  const [filters, setFilters] = useReportFilters()



  return (
    <div className="flex gap-x-2 items-center w-full justify-between">
      <div className="flex items-center gap-x-4">
        <div className="relative">
          <Input
            placeholder="Cari"
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="glass border-white/20 text-white placeholder:text-gray-400 h-9 pl-8"
          />
          <SearchIcon className="size-4 absolute left-2 top-1/2 text-muted-foreground -translate-y-1/2" />
        </div>
      </div>
      <Button variant="glass">
        <CircleX />
        Clear
      </Button>
    </div>
  );
};
