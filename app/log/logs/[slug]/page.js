import { format, parseISO } from "date-fns";
import { allPosts } from "contentlayer/generated";
import { appleFontL, appleFontSB } from "app/components/fontZip";
import { useMDXComponent } from "next-contentlayer/hooks";
import Giscus from "app/components/giscus";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post._raw.flattenedPath,
  }));
}
const PostLayout = ({ params }) => {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug);
  if (!post) notFound();

  const MDXContent = useMDXComponent(post.body.code);
  return (
    <article
      className={`${appleFontL.className} prose lg:prose-xl mt-20 mx-auto max-w-4xl py-8`}
    >
      <div className="mb-8 text-center">
        <time dateTime={post.date} className="mb-1 text-xs text-gray-600">
          {format(parseISO(post.date), "LLLL d, yyyy")}
        </time>
        <h1 className={`${appleFontSB.className} text-4xl text-black`}>
          {post.title}
        </h1>
      </div>
      <div className="text-black p-5">
        {/* <MDXContent /> */}
        <Giscus />
      </div>
    </article>
  );
};

export default PostLayout;
