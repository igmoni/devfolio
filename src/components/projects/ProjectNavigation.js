import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import Link from "next/link";
import ArrowLeft from "@/svgs/ArrowLeft";
import ArrowUUpRight from "@/svgs/ArrowUUpRight";

const ProjectNavigation = ({ previous, next }) => {
  if (!previous && !next) return null;

  return (
    <div className="space-y-6">
      <Separator />
      <div className="grid gap-4 md:grid-cols-2">
        <div className={`${next ? "" : "md:col-span-2"}`}>
          {previous ? (
            <Button
              variant={"outline"}
              asChild
              className={"group h-auto w-full justify-start p-4 text-left"}
            >
              <Link href={`/projects/${previous.slug}`}>
                <div className="flex items-center gap-3">
                  <ArrowLeft
                    className={
                      "size-4 transition-transform group-hover:-translate-x-1"
                    }
                  />
                  <div>
                    <div className="text-xs text-muted-foreground">
                      Previous Project
                    </div>
                    <div className="font-medium">{previous.title}</div>
                  </div>
                </div>
              </Link>
            </Button>
          ) : (
            <div className="h-16" />
          )}
        </div>

        <div className={`${previous ? "" : "md:col-span-2"}`}>
          {next ? (
            <Button
              variant={"outline"}
              asChild
              className={"group h-auto w-full  justify-end text-right"}
            >
              <Link href={`/projects/${next.slug}`}>
                <div className="flex items-center gap-3">
                  <div>
                    <div className="text-xs text-muted-foreground">
                      Next Project
                    </div>
                    <div className="font-medium">{next.title}</div>
                  </div>
                  <ArrowUUpRight
                    className={
                      "size-4 transition-transform group-hover:translate-x-1"
                    }
                  />
                </div>
              </Link>
            </Button>
          ) : (
            <div className="h-16" />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectNavigation;
