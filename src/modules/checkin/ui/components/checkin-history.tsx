import { DataTable } from "@/components/data-table";
import { GetAllCheckInHistory } from "../../types";
import { columns } from "./checkin-checkout-column";

interface Props {
  values: GetAllCheckInHistory[];
}

export const CheckInHistory = ({ values }: Props) => {
  return (
    <div>
      <DataTable columns={columns} data={values} />
    </div>
  );
};
