"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BFSService = void 0;
const typedi_1 = require("typedi");
const bfs_result_1 = require("../models/bfs-result");
let BFSService = class BFSService {
    Bfs(graph, source, t) {
        var numberOfVertices = graph.numberOfVertices;
        var parent = [];
        var visited = [];
        for (var i = 0; i < numberOfVertices; i++) {
            visited[i] = false;
        }
        var queue = Array();
        queue.push(source);
        visited[source] = true;
        parent[source] = -1;
        while (queue.length != 0) {
            var u = queue[0];
            queue.shift();
            for (var v = 0; v < numberOfVertices; v++) {
                if (!visited[v] && graph.adjacencyMatrix[u][v] > 0) {
                    queue.push(v);
                    parent[v] = u;
                    visited[v] = true;
                }
            }
        }
        return new bfs_result_1.BfsResult(parent, visited[t]);
    }
};
BFSService = __decorate([
    (0, typedi_1.Service)()
], BFSService);
exports.BFSService = BFSService;
