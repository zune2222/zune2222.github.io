import { format, parseISO } from "date-fns";
import { allPosts } from "contentlayer/generated";
import { appleFontL, appleFontSB } from "app/components/fontZip";
export const generateStaticParams = async () =>
  allPosts.map((post) => ({ slug: post._raw.flattenedPath }));

export const generateMetadata = ({ params }) => {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug);
  if (!post) throw new Error(`Post not found for slug: ${params.slug}`);
  return { title: post.title };
};

const PostLayout = ({ params }) => {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug);
  if (!post) throw new Error(`Post not found for slug: ${params.slug}`);

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
      <div
        className="[&>*]:mb-3 [&>*:last-child]:mb-0 text-black p-5"
        dangerouslySetInnerHTML={{ __html: post.body.html }}
      />
    </article>
  );
};

export default PostLayout;
