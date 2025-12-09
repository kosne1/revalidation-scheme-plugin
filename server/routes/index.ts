export default [
  {
    type: "admin",
    method: 'GET',
    path: '/nodes',
    handler: 'nodes.get',
    config: {
      policies: [],
    },
  },
  {
    type: "admin",
    method: 'POST',
    path: '/nodes',
    handler: 'nodes.update',
    config: {
      policies: [],
    },
  },
];
