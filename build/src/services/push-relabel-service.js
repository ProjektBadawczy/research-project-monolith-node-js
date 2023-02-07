"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PushRelabelService = void 0;
const directed_graph_1 = require("../models/directed-graph");
const typedi_1 = require("typedi");
let PushRelabelService = class PushRelabelService {
    initResidualGraph(graph) {
        var residualGraph = new directed_graph_1.DirectedGraph(graph.id, graph.numberOfVertices);
        for (var u = 0; u < graph.numberOfVertices; u++) {
            for (let v of graph.adjacencyList[u]) {
                if (residualGraph.hasEdge(u, v.i)) {
                    residualGraph.getEdge(u, v.i).w += v.w;
                }
                else {
                    residualGraph.addEdge(u, v.i, v.w);
                }
                if (!residualGraph.hasEdge(v.i, u)) {
                    residualGraph.addEdge(v.i, u, 0);
                }
            }
        }
        return residualGraph;
    }
    calculateMaxFlow(graph, source, destination) {
        var residualGraph = this.initResidualGraph(graph);
        var queue = new Array();
        var e = [];
        var h = [];
        var inQueue = [];
        for (let i = 0; i < graph.numberOfVertices; i++) {
            e[i] = 0;
            h[i] = 0;
            inQueue[i] = false;
        }
        h[source] = graph.numberOfVertices;
        for (var v of graph.adjacencyList[source]) {
            residualGraph.getEdge(source, v.i).w = 0;
            residualGraph.getEdge(v.i, source).w = v.w;
            e[v.i] = v.w;
            if (v.i != destination) {
                queue.push(v.i);
                inQueue[v.i] = true;
            }
        }
        while (queue.length != 0) {
            var u = queue[0];
            queue.shift();
            inQueue[u] = false;
            this.relabel(u, h, residualGraph);
            this.push(u, e, h, queue, inQueue, residualGraph, source, destination);
        }
        return e[destination];
    }
    relabel(u, h, residualGraph) {
        var minHeight = Number.MAX_VALUE;
        for (let v of residualGraph.adjacencyList[u]) {
            if (v.w > 0) {
                minHeight = Math.min(h[v.i], minHeight);
            }
        }
        h[u] = minHeight + 1;
    }
    push(u, e, h, queue, inQueue, residualGraph, source, destination) {
        for (let v of residualGraph.adjacencyList[u]) {
            if (e[u] == 0)
                return;
            if (v.w > 0 && h[v.i] < h[u]) {
                var f = Math.min(e[u], v.w);
                v.w -= f;
                residualGraph.getEdge(v.i, u).w += f;
                e[u] -= f;
                e[v.i] += f;
                if (!inQueue[v.i] && v.i != source && v.i != destination) {
                    queue.push(v.i);
                    inQueue[v.i] = true;
                }
            }
        }
        if (e[u] != 0) {
            queue.push(u);
            inQueue[u] = true;
        }
    }
};
PushRelabelService = __decorate([
    (0, typedi_1.Service)()
], PushRelabelService);
exports.PushRelabelService = PushRelabelService;
