import React from "react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from "./ToolTip"
import { Button } from "./Button";
import { InfoIcon } from "lucide-react";

const InfoTip = () => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="ghost" className="rounded-full p-3"><InfoIcon size={18} /></Button>
                </TooltipTrigger>
                <TooltipContent className="w-[200px]">
                    <p>
                    Ensure that both peers are on the same shared network to enable seamless file transfers.
                    </p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}


export default InfoTip