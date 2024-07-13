import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

interface CustomTooltipProps {
  children: React.ReactNode;
  label: string;
}

const CustomTooltip = ({ children, label }: CustomTooltipProps) => {
  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger>
        {children}
      </TooltipTrigger>
      <TooltipContent>
        {label}
      </TooltipContent>
    </Tooltip>
  )
}

export default CustomTooltip