import { defineDocumentType, makeSource } from "contentlayer/source-files";
import rehypePrettyCode from "rehype-pretty-code";
import { parseSlug } from "./libs/mdx";
import remarkGfm from "remark-gfm";
const rehypeOptions = {
  theme: "slack-dark",
  keepBackground: true,
};

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    date: { type: "date", required: true },
    description: { type: "string", required: true },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: parseSlug,
    },
    href: {
      type: "string",
      resolve: (post) => `/log/logs/${post._raw.flattenedPath}`,
    },
  },
}));

export default makeSource({
  contentDirPath: "app/mdxes/",
  documentTypes: [Post],
  mdx: {
    rehypePlugins: [[rehypePrettyCode, rehypeOptions]],
  },
});
