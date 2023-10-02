import { data } from "autoprefixer";
import { defineDocumentType, makeSource } from "contentlayer/source-files";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remakrGfm from "remark-gfm";
const rehypeOptions = {
  theme: "slack-dark",
  keepBackground: true,
};
export const Log = defineDocumentType(() => ({
  name: "Log",
  filePathPattern: `log/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    date: { type: "date", required: true },
    description: { type: "string", required: true },
  },
  computedFields: {
    href: {
      type: "string",
      resolve: (post) =>
        `/posts/${post._raw.flattenedPath.split("/").slice(1)}`,
    },
  },
}));

export const Memory = defineDocumentType(() => ({
  name: "Memory",
  filePathPattern: `memory/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    date: { type: "date", required: true },
    description: { type: "string", required: true },
  },
  computedFields: {
    href: {
      type: "string",
      resolve: (post) =>
        `/posts/${post._raw.flattenedPath.split("/").slice(1)}`,
    },
  },
}));

export default makeSource({
  contentDirPath: "mdxes",
  documentTypes: [Log, Memory],
  mdx: {
    rehypePlugins: [rehypeSlug, [rehypePrettyCode, rehypeOptions]],
  },
});
