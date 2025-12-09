import { Strapi } from "@strapi/strapi";

export default ({ strapi }: { strapi: Strapi }) => ({
  async get() {
    return await strapi.entityService.findMany(
      "plugin::revalidation-scheme.node",
      {
        populate: ["target"],
      }
    );
  },
  async update(ctx) {
    const newNodes = ctx?.request?.body?.data;

    await Promise.all(
      newNodes
        .filter((item) => item?.id)
        .map((item) =>
          strapi.entityService.update(
            "plugin::revalidation-scheme.node",
            item.id,
            { data: item }
          )
        )
    );

    return {
      data: "ok",
    };
  },
});
