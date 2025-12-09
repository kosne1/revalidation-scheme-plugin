import { Strapi } from "@strapi/strapi";

export default ({ strapi }: { strapi: Strapi }) => ({
  async findMaxYNode() {
    const nodes = await strapi.entityService.findMany(
      "plugin::revalidation-scheme.node",
      {
        sort: {
          y: "desc"
        }
      }
    );
    if (nodes.length === 0) return null;
    return nodes[0];
  },
});
