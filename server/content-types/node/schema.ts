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
    parent: {
      type: "relation",
      relation: "manyToOne",
      target: "plugin::revalidation-scheme.node",
      inversedBy: "children"
    },
    children: {
      type: "relation",
      relation: "oneToMany",
      target: "plugin::revalidation-scheme.node",
      mappedBy: "parent"
    },
    target: {
      type: "relation",
      relation: "oneToMany",
      target: "plugin::revalidation-scheme.node",
      mappedBy: "parent"
    },
    targets: {
      type: "relation",
      relation: "oneToMany",
      target: "plugin::revalidation-scheme.node",
      inversedBy: "children"
    },
    test: {
      type: "relation",
      relation: "oneToMany",
      target: "plugin::revalidation-scheme.node",
      mappedBy: "client"
    }
  },
};
