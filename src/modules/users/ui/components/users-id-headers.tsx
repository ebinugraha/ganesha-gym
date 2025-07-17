
import { ChangeRoleForm } from "./change-role-form";

interface Props {
  role: string;
  id: string;
}

export const UsersIdHeaders = ({ role, id }: Props) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col gap-y-1">
        <h1 className="text-xl font-semibold text-white">Manajemen Member</h1>
        <p className="text-sm text-muted-foreground">
          Kelola dan pantau aktivitas member gym
        </p>
      </div>
      <ChangeRoleForm role={role} id={id}/>
    </div>
  );
};
