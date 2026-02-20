import { Link } from "next-view-transitions";
import { Instrument_Serif } from "next/font/google";
import Image from "next/image";

import ArrowRight from "@/svgs/ArrowRight";
import Calendar from "@/svgs/Calendar";

import { Badge } from "../ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
});

const BlogCard = ({ post }) => {
  const { slug, frontmatter } = post;
  const { title, desc, image, tags, date } = frontmatter;

  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Card
      className={
        "flex h-full w-full flex-col overflow-hidden border-gray-100 p-0 shadow-[inset_0_1px_5px_rgba(0,0,0,0.2)] transition-all dark:border-gray-800"
      }
    >
      <CardHeader className={"p-0"}>
        <div className="relative aspect-video overflow-hidden">
          <Link href={`/blog/${slug}`}>
            <Image
              src={image}
              alt={title}
              fill
              className="rounded-t-xl object-cover"
            />
          </Link>
        </div>
      </CardHeader>
      <CardContent className={"flex-1"}>
        <div className="space-y-3">
          <Link href={`/blog/${slug}`}>
            <h3
              className={`line-clamp-2 text-3xl leading-tight italic ${instrumentSerif.className} `}
            >
              {title}
            </h3>
          </Link>
          <p className="text-secondary mt-4 line-clamp-3">{desc}</p>
        </div>
      </CardContent>
      <CardFooter className={"mt-auto p-6 pt-0"}>
        <div className="flex w-full flex-col space-y-3">
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="primary" className="rounded-sm text-xs">
                {tag}
              </Badge>
            ))}
            {tags.length > 3 && (
              <Badge variant={"outline"} className={"text-xs"}>
                +{tags.length - 3} more
              </Badge>
            )}
          </div>
          <div className="mt-4 flex items-center justify-between gap-2">
            <time
              className="text-secondary flex items-center gap-2 text-sm"
              dateTime={date}
            >
              <Calendar className={"size-4"} />
              {formattedDate}
            </time>

            <Link
              href={`/blog/${slug}`}
              className="group hover:text-primary text-muted-foreground relative inline-flex items-center gap-1 dark:hover:text-white"
            >
              Read More
              <span className="absolute -bottom-1 left-0 h-0.5 w-[85px] origin-right scale-x-0 rounded-full bg-current transition-all duration-200 ease-out group-hover:origin-left group-hover:scale-x-100" />
              <ArrowRight
                className={
                  "size-4 transition-all duration-200 group-hover:translate-x-1"
                }
              />
            </Link>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default BlogCard;
