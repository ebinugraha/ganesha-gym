import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface InfoCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
}

export const InfoCard = ({ title, value,description, icon }: InfoCardProps) => {
  return (
    <Card className="flex flex-col items-center p-4 glass-card text-white  hover:border-gray-500 transition-colors duration-300">
      <CardHeader className="flex items-center justify-between w-full p-0">
        <CardTitle className="text-sm font-normal">{title}</CardTitle>
        {icon && <div className="h-6 w-6 text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent className="flex items-center justify-between w-full p-0 text-xl font-semibold">
        <div>{value}</div>
      </CardContent>
      <CardFooter className="flex text-muted-foreground items-center p-0 justify-between w-full">
        <div className="text-sm font-normal">{description}</div>
      </CardFooter>
    </Card>
  );
};
