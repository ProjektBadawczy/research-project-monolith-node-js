import { Request, Response } from "express";
import GraphService from "../services/graph-service";
import EdmondsKarpService from "../services/edmonds-karp-service";
import {StatusCodes} from "http-status-codes";
import {PushRelabelService} from "../services/push-relabel-service";

class GraphController {

    constructor(private readonly graphService: GraphService, 
                private readonly edmondsKarpService: EdmondsKarpService,
                private readonly pushRelabelService: PushRelabelService) { 
    }

    getGraph(_req: Request, res: Response) {
        const id = Number(_req.query.id);
        const graph = this.graphService.getGraph(id);
        if (graph == null) {
            res.status(StatusCodes.NOT_FOUND).json([]);
        }
        return res.json(graph)
    }

    getDirectedGraph(_req: Request, res: Response) {
        const id = Number(_req.query.id);
        const graph = this.graphService.getDirectedGraph(id);
        if (graph == null) {
            res.status(StatusCodes.NOT_FOUND).json([]);
        }
        return res.json(graph)
    }

    getEdmondsKarpMaxGraphFlow(_req: Request, res: Response){
        const id = Number(_req.query.id);
        const source = Number(_req.query.source);
        const destination = Number(_req.query.destination);
        const graph = this.graphService.getGraph(id);
        if (graph == null) {
            res.status(StatusCodes.NOT_FOUND);
            return
        }
        var maxFlow = this.edmondsKarpService.calculateMaxFlow(graph, source, destination)
        return res.json(maxFlow)
    }

    getPushRelabelMaxGraphFlow(_req: Request, res: Response){
        const id = Number(_req.query.id);
        const source = Number(_req.query.source);
        const destination = Number(_req.query.destination);
        const graph = this.graphService.getDirectedGraph(id);
        if (graph == null) {
            res.status(StatusCodes.NOT_FOUND);
            return
        }
        var maxFlow = this.pushRelabelService.calculateMaxFlow(graph, source, destination)
        return res.json(maxFlow)
    }
}

export default GraphController
