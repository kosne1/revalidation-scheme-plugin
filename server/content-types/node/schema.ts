export default {
  kind: "collectionType",
  collectionName: "nodes",
  info: {
    singularName: "node",
    pluralName: "nodes",
    displayName: "Node",
    description: "",
  },
  options: {
    draftAndPublish: false,
  },
  pluginOptions: {
    i18n: {
      localized: false,
    },
  },
  attributes: {
    uid: {
      type: "string",
      required: true,
      unique: true,
    },
    x: {
      type: "integer",
      required: true,
    },
    y: {
      type: "integer",
      required: true,
    },
    target: {
      type: "relation",
      relation: "oneToMany",
      target: "plugin::revalidation-scheme.node",
    },
  },
};
