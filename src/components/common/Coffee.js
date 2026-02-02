import { cn } from "@/lib/utils";
import { Link } from "next-view-transitions";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Coffee({ className }) {
  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            href="https://www.buymeacoffee.com/igmoni"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            <Image
              src="/assets/coffee.png"
              alt="Buy Me A Coffee"
              width={100}
              height={100}
              className={cn(
                "size-10 rounded-md dark:shadow-acternity-white",
                className,
              )}
            />
          </Link>
        </TooltipTrigger>

        <TooltipContent className="px-3 py-2 text-sm">
          Buy me a coffee ☕
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
