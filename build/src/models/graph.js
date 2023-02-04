"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Graph = void 0;
class Graph {
    constructor(id, numberOfVertices, adjacencyMatrix) {
        this.id = id;
        this.numberOfVertices = numberOfVertices;
        this.adjacencyMatrix = adjacencyMatrix;
    }
}
exports.Graph = Graph;
