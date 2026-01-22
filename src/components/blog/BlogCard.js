import { Badge } from "../ui/badge";
import {
  Card, CardContent, CardFooter, CardHeader,

} from "../ui/card";
import { Link } from "next-view-transitions";
import Image from "next/image";
import ArrowRight from "@/svgs/ArrowRight";
import Calendar from "@/svgs/Calendar";
import { Instrument_Serif } from "next/font/google";

 const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
});

const BlogCard = ({ post }) => {
  const { slug, frontmatter } = post
  const { title, desc, image, tags, date } = frontmatter

  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });


  return (
    <Card className={' h-full w-full overflow-hidden transition-all p-0 border-gray-100 dark:border-gray-800 shadow-[inset_0_1px_5px_rgba(0,0,0,0.2)] flex flex-col'}>
      <CardHeader className={'p-0'}>
        <div className="relative aspect-video overflow-hidden">
          <Link href={`/blog/${slug}`}>
            <Image src={image} alt={title} fill className="object-cover rounded-t-xl" />
          </Link>
        </div>
      </CardHeader>
      <CardContent className={'flex-1'}>
        <div className="space-y-3">
          <Link href={`/blog/${slug}`}>
          <h3
  className={`
    italic
    line-clamp-2
    text-3xl
    leading-tight
      ${instrumentSerif.className}
  `}
>
  {title}
</h3>

          </Link>
          <p className="line-clamp-3 text-secondary mt-4">{desc}</p>
        </div>
      </CardContent>
      <CardFooter className={'p-6 pt-0 mt-auto'}>
        <div className="flex w-full flex-col space-y-3">
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="primary" className="text-xs rounded-sm">

                {tag}
              </Badge>
            ))}
            {tags.length > 3 && (
              <Badge variant={'outline'} className={'text-xs'}>
                +{tags.length - 3} more
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2 justify-between mt-4">
            <time className="text-sm text-secondary flex items-center gap-2" dateTime={date}>
              <Calendar className={'size-4'} />{formattedDate}
            </time>

            <Link href={`/blog/${slug}`} className="relative group text-muted-foreground inline-flex items-center gap-1">

              Read More
              <span
                className="absolute left-0 rounded-full -bottom-1 h-0.5 w-[85px] bg-current scale-x-0 origin-right transition-all duration-200 ease-out group-hover:scale-x-100 group-hover:origin-left"
              />
              <ArrowRight className={'size-4 group-hover:translate-x-1 transition-all duration-200'} />
            </Link>
          </div>
        </div>
      </CardFooter>

    </Card>
  )
}

export default BlogCard
