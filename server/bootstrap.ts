import { Strapi } from "@strapi/strapi";


export default async ({ strapi }: { strapi: Strapi }) => {
  await strapi.service('plugin::revalidation-scheme.createInitialFields').createInitialFields();
};
