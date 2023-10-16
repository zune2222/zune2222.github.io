import { data } from "autoprefixer";
import {
  type ComputedFields,
  defineDocumentType,
  makeSource,
} from "contentlayer/source-files";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remakrGfm from "remark-gfm";

export const parseSlug = (doc) => {
  return doc._raw.flattenedPath.split("/").slice(1).join("/");
};
const rehypeOptions = {
  theme: "slack-dark",
  keepBackground: true,
};
const computedFields: ComputedFields = {
  slug: {
    type: "string",
    resolve: parseSlug,
  },
  href: {
    type: "string",
    resolve: (doc) => `/posts/${parseSlug(doc)}`,
  },
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
  computedFields,
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
  computedFields,
}));

export default makeSource({
  contentDirPath: "mdxes",
  documentTypes: [Log, Memory],
  mdx: {
    rehypePlugins: [rehypeSlug, [rehypePrettyCode, rehypeOptions]],
  },
});
