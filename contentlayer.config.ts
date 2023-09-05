import { defineDocumentType, makeSource } from "contentlayer/source-files";

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `**/*.md`,
  fields: {
    title: { type: "string", required: true },
    date: { type: "date", required: true },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (post) => `/log/logs/${post._raw.flattenedPath}`,
    },
  },
}));

export default makeSource({
  contentDirPath: "app/log/logs",
  documentTypes: [Post],
});
