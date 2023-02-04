import {Service} from "typedi";
import { Graph } from '../models/graph';
import {BfsResult} from "../models/bfs-result";

@Service()
export class BFSService {

    Bfs(graph: Graph, source: number, t: number): BfsResult {
        var numberOfVertices: number = graph.numberOfVertices
        var parent: number[] = []
        var visited: boolean[] = []

        for (var i = 0; i < numberOfVertices; i++)
        {
            visited[i] = false
        }

        var queue: Array<number> = Array<number>();
        queue.push(source)
        visited[source] = true
        parent[source] = -1

        while (queue.length != 0)
        {
            var u = queue[0]
            queue.shift()
            for (var v = 0; v < numberOfVertices; v++)
            {
                if (!visited[v] && graph.adjacencyMatrix[u][v] > 0)
                {
                    queue.push(v);
                    parent[v] = u;
                    visited[v] = true;
                }
            }
        }

        return new BfsResult(parent, visited[t]);
    }
}