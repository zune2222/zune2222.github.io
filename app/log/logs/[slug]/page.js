"use client";
import { format, parseISO } from "date-fns";
import { allDocuments } from "contentlayer/generated";
import { appleFontL, appleFontSB } from "app/components/fontZip";
import { useMDXComponent } from "next-contentlayer/hooks";
import Giscus from "app/components/giscus";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return allDocuments.map(({ slug }) => ({ slug: slug.split("/") }));
}
function getDocFromParams({ params }) {
  const slug = params.slug;
  const post = allDocuments.find((doc) => {
    console.log(doc.slug);
    doc.slug === slug;
  });

  if (post) {
    post.date = format(new Date(post.date), "MMMM dd. yyyy");
  }

  return post;
}

const PostLayout = ({ params }) => {
  const post = getDocFromParams({ params });
  if (!post) {
    notFound();
  }

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
        <MDXContent />
        <Giscus />
      </div>
    </article>
  );
};

export default PostLayout;
