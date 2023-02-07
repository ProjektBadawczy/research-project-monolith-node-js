"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
class GraphController {
    constructor(graphService, edmondsKarpService, pushRelabelService) {
        this.graphService = graphService;
        this.edmondsKarpService = edmondsKarpService;
        this.pushRelabelService = pushRelabelService;
    }
    getGraph(_req, res) {
        const id = Number(_req.query.id);
        const graph = this.graphService.getGraph(id);
        if (graph == null) {
            res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json([]);
        }
        return res.json(graph);
    }
    getDirectedGraph(_req, res) {
        const id = Number(_req.query.id);
        const graph = this.graphService.getDirectedGraph(id);
        if (graph == null) {
            res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json([]);
        }
        return res.json(graph);
    }
    getEdmondsKarpMaxGraphFlow(_req, res) {
        const id = Number(_req.query.id);
        const source = Number(_req.query.source);
        const destination = Number(_req.query.destination);
        const graph = this.graphService.getGraph(id);
        if (graph == null) {
            res.status(http_status_codes_1.StatusCodes.NOT_FOUND);
            return;
        }
        var maxFlow = this.edmondsKarpService.calculateMaxFlow(graph, source, destination);
        return res.json(maxFlow);
    }
    getPushRelabelMaxGraphFlow(_req, res) {
        const id = Number(_req.query.id);
        const source = Number(_req.query.source);
        const destination = Number(_req.query.destination);
        const graph = this.graphService.getDirectedGraph(id);
        if (graph == null) {
            res.status(http_status_codes_1.StatusCodes.NOT_FOUND);
            return;
        }
        var maxFlow = this.pushRelabelService.calculateMaxFlow(graph, source, destination);
        return res.json(maxFlow);
    }
}
exports.default = GraphController;
