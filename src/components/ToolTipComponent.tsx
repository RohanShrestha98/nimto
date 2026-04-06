import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function ToolTipComponent({ trigger, context }) {
  return (
    <TooltipProvider delayDuration={80}>
      <div>
        <Tooltip>
          <TooltipTrigger>{trigger}</TooltipTrigger>
          <TooltipContent>
            <p className="bg-white">{context}</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
