import { Strapi } from "@strapi/strapi";

export default ({ strapi }: { strapi: Strapi }) => ({
  async createInitialFields() {
    const contentTypes = Object.values(strapi.contentTypes);
    const contentTypeUIDs = contentTypes
      .map((item) => item.uid)
      .filter((item) => item.startsWith("api::"));

    const existingRows = await strapi.entityService.findMany(
      "plugin::revalidation-scheme.node"
    );

    const notFound = contentTypeUIDs.filter((item) => {
      return !existingRows.some((row) => {
        return row.uid === item;
      });
    });

    if (notFound.length === 0) return;

    const maxYNode = await strapi
      .service("plugin::revalidation-scheme.findMaxYNode")
      .findMaxYNode();

    const newEntities = notFound.map((item: any, index: number) => {
      return {
        name: item,
        uid: item,
        x: 0,
        y: (maxYNode?.y || 0) + (1 + index) * 100,
      };
    });

    await Promise.all(
      newEntities.map(item =>
        strapi.entityService.create('plugin::revalidation-scheme.node', { data: item })
      )
    );

    strapi.log.info("Добавили новые content types");

    return;
  },
});
