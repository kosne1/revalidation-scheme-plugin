import "@xyflow/react/dist/style.css";
import React, { useCallback, useEffect, useState } from "react";
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  MarkerType,
  ReactFlow,
} from "@xyflow/react";
import { getNodes } from "../../api/getNodes";
import { Button } from "@strapi/design-system";
import { useFetchClient, useNotification } from "@strapi/helper-plugin";

export interface INode {
  id: string;
  position: { x: number; y: number };
  data: { label: string };
  deletable: boolean;
}

const defaultEdgeOptions = {
  markerEnd: {
    type: MarkerType.ArrowClosed,
    width: 20,
    height: 20,
  },
};

const HomePage = () => {
  const { post } = useFetchClient();
  const toggleNotification = useNotification();

  const [isLoading, setIsLoading] = useState(false);
  const [nodes, setNodes] = useState<INode[]>([]);
  const [edges, setEdges] = useState<any[]>([]);

  useEffect(() => {
    getNodes().then((response) => {
      setNodes(
        response.map((item: any) => {
          return {
            id: item.id.toString(),
            data: { label: item.uid },
            position: { x: item.x, y: item.y },
            deletable: false,
          };
        })
      );
      let bufferEdges: any[] = [];
      response.forEach((item: any) => {
        bufferEdges.push(
          ...item.target.map((item1: any) => {
            return {
              id: `xy-edge__${item.id}-${item1.id}`,
              source: item.id.toString(),
              target: item1.id.toString(),
            };
          })
        );
      });
      setEdges(bufferEdges);
    });
  }, []);

  const onNodesChange = useCallback(
    (changes) =>
      setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    []
  );
  const onEdgesChange = useCallback(
    (changes) =>
      setEdges((edgesSnapshot: any) =>
        applyEdgeChanges(changes, edgesSnapshot)
      ),
    []
  );
  const onConnect = useCallback(
    (params) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    []
  );

  async function save(newNodes: any, newEdges: any) {
    setIsLoading(true);
    const bufferNodes = newNodes.map((item: any) => {
      let bufferNode = {
        id: +item.id,
        uid: item.data.label,
        x: Math.round(item.position.x),
        y: Math.round(item.position.y),
        target: [] as any[],
      };
      if (
        (newEdges as any[]).filter((item1) => +item1?.source === +item?.id)
          ?.length > 0
      )
        bufferNode.target = (newEdges as any[])
          .filter((item1) => +item1.source === +item.id)
          .map((item1) => +item1.target);
      return bufferNode;
    });
    try {
      await post("/revalidation-scheme/nodes", {
        data: bufferNodes,
      });
      const successMessage = "Связи успешно обновлены!";
      toggleNotification({
        type: "success",
        message: successMessage,
        timeout: 3000
      });
    } catch (error) {
      toggleNotification({
        type: "warning",
        message: "Ошибка при обновлении связей",
        timeout: 5000
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Button
        onClick={() => {
          save(nodes, edges);
        }}
        disabled={isLoading}
      >
        Сохранить
      </Button>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        defaultEdgeOptions={defaultEdgeOptions}
      />
    </div>
  );
};

export default HomePage;
