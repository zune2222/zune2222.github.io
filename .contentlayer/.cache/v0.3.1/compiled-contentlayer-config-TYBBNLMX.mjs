// contentlayer.config.js
import { makeSource, defineDatabase } from "contentlayer-source-notion";
import * as notion from "@notionhq/client";
var client = new notion.Client({ auth: process.env.NOTION_TOKEN });
var Post = defineDatabase(() => ({
  name: "Post",
  databaseId: "ebb75e98746c4b00942380cd8e6c51e3",
  query: {
    filter: {
      property: "Status",
      status: {
        equals: "Published"
      }
    }
  },
  properties: {
    date: {
      name: "Created time"
    }
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (post) => `/log/${post._id}`
    }
  }
}));
var contentlayer_config_default = makeSource({
  client,
  databaseTypes: [Post]
});
export {
  Post,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-TYBBNLMX.mjs.map
