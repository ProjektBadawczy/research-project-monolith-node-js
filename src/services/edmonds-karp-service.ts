import { Graph } from '../models/graph';
import {BFSService} from "./bfs-service";
import {BfsResult} from "../models/bfs-result";
import {Service} from "typedi";
import * as _ from "lodash"

@Service()
export default class EdmondsKarpService {
    constructor(private readonly bfsService: BFSService) {}

    calculateMaxFlow(graph: Graph, source: number, destination: number): number {
        var u, v;
        var residualGraph = _.cloneDeep(graph)
        var maxFlow = 0;
        var bfsResult: BfsResult = this.bfsService.Bfs(residualGraph, source, destination);

        while (bfsResult.success)
        {
            var pathFlow: number = Number.MAX_VALUE;
            for (v = destination; v != source; v = bfsResult.parents[v])
            {
                u = bfsResult.parents[v];
                pathFlow = Math.min(pathFlow, residualGraph.adjacencyMatrix[u][v]);
            }

            for (v = destination; v != source; v = bfsResult.parents[v])
            {
                u = bfsResult.parents[v];
                residualGraph.adjacencyMatrix[u][v] -= pathFlow;
                residualGraph.adjacencyMatrix[v][u] += pathFlow;
            }

            maxFlow += pathFlow;
            bfsResult = this.bfsService.Bfs(residualGraph, source, destination);
        }

        return maxFlow;
    }
}