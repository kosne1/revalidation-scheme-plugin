import { request } from "@strapi/helper-plugin";

export const getNodes = async () => {
  return await request("/revalidation-scheme/nodes", {
    method: "GET",
  });
};
