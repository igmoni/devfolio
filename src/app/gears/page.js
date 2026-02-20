import { Link } from "next-view-transitions";

import { Puzzle } from "lucide-react";

import Container from "@/components/common/Container";
import { Separator } from "@/components/ui/separator";
import {
  devices,
  software,
  vsCodeExtensions,
  webExtensions,
} from "@/config/Gears";
import { generateMetaData as getMetadata } from "@/config/Meta";
import ArrowUpRight from "@/svgs/ArrowUpRight";
import Monitor from "@/svgs/devices/Monitor";

export const metadata = {
  ...getMetadata("/gears"),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const page = () => {
  return (
    <Container className={"px-5 py-16"}>
      <div className="mt-20 space-y-8">
        <div className="space-y-4 text-center">
          <h1 className="from-primary to-secondary bg-linear-to-t bg-clip-text pb-3 text-4xl font-semibold tracking-tight text-transparent lg:text-7xl dark:from-neutral-600 dark:to-white">
            Gears
          </h1>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            My gears and tools i use to get my work done.
          </p>
        </div>
        <Separator />
        {/* Devices */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Devices</h2>
          <div className="flex flex-col flex-wrap gap-4">
            {devices.map((device) => (
              <div key={device.name} className="flex items-center gap-4">
                <div className="bg-muted flex items-center justify-center rounded-md border border-black/10 p-2 text-[#736f70] dark:border-white/10">
                  {device.icon}
                </div>
                <div className="flex items-center gap-1">
                  <Link
                    href={device.href}
                    className="text-secondary text-sm underline-offset-2 hover:underline"
                  >
                    {device.name}
                  </Link>

                  <ArrowUpRight className="size-4" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Web Extensions */}
        <div className="space-y-4 pt-10">
          <div className="flex items-center gap-4">
            <div className="bg-muted flex items-center justify-center rounded-md border border-black/10 p-2 text-[#736F70] dark:border-white/10">
              <Puzzle className="size-4" />
            </div>
            <h2 className="text-2xl font-semibold">Web Extensions</h2>
          </div>
          <div className="mt-8 flex flex-col flex-wrap gap-4">
            {webExtensions.map((extension, index) => (
              <div key={extension.name} className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="bg-muted flex items-center justify-center rounded-md border border-black/10 px-2 py-1 text-[#736F70] dark:border-white/10">
                    <span className="text-secondary text-sm">{index + 1}</span>
                  </div>
                  <h3 className="text-secondary ml-4 flex items-center gap-1 text-sm underline-offset-2 hover:underline">
                    <Link target="_blank" href={extension.href}>
                      {extension.name}
                    </Link>
                    <ArrowUpRight className="size-4" />
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Softwares */}
        <div className="space-y-4 pt-10">
          <div className="flex items-center gap-4">
            <div className="bg-muted flex items-center justify-center rounded-md border border-black/10 p-2 text-[#736F70] dark:border-white/10">
              <Monitor className="size-4" />
            </div>
            <h2 className="text-2xl font-semibold">Software</h2>
          </div>
          <div className="mt-8 flex flex-col flex-wrap gap-4">
            {software.map((app, index) => (
              <div key={app.name} className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="bg-muted flex items-center justify-center rounded-md border border-black/10 px-2 py-1 text-[#736F70] dark:border-white/10">
                    <span className="text-secondary text-sm">
                      {(index + 1).toString()}
                    </span>
                  </div>
                  <h3 className="text-secondary ml-4 flex items-center gap-1 text-sm underline-offset-2 hover:underline">
                    <Link target="_blank" href={app.href}>
                      {app.name}
                    </Link>
                    <ArrowUpRight className="size-4" />
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4 pt-10">
          <div className="flex items-center gap-4">
            <div className="bg-muted flex items-center justify-center rounded-md border border-black/10 p-2 text-[#736F70] dark:border-white/10">
              <Puzzle className="size-4" />
            </div>
            <h2 className="text-2xl font-semibold">
              VS Code/Cursor Extensions
            </h2>
          </div>
          <div className="mt-8 flex flex-col flex-wrap gap-4">
            {vsCodeExtensions.map((extension, index) => (
              <div key={extension.name} className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="bg-muted flex items-center justify-center rounded-md border border-black/10 px-2 py-1 text-[#736F70] dark:border-white/10">
                    <span className="text-secondary text-sm">{index + 1}</span>
                  </div>
                  <h3 className="text-secondary ml-4 flex items-center gap-1 text-sm underline-offset-2 hover:underline">
                    <Link target="_blank" href={extension.href}>
                      {extension.name}
                    </Link>
                    <ArrowUpRight className="size-4" />
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default page;
