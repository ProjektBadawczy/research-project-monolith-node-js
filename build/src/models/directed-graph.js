"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DirectedGraph = void 0;
const vertex_1 = require("./vertex");
class DirectedGraph {
    constructor(id, numberOfVertices) {
        this.id = id;
        this.numberOfVertices = numberOfVertices;
        this.adjacencyList = new Array();
        for (var i = 0; i < numberOfVertices; i++) {
            this.adjacencyList.push(new Array());
        }
    }
    addEdge(u, v, weight) {
        this.adjacencyList[u].push(new vertex_1.Vertex(v, weight));
    }
    hasEdge(u, v) {
        if (u >= this.numberOfVertices) {
            return false;
        }
        for (let vertex of this.adjacencyList[u]) {
            if (vertex.i == v) {
                return true;
            }
        }
        return false;
    }
    getEdge(u, v) {
        for (let vertex of this.adjacencyList[u]) {
            if (vertex.i == v) {
                return vertex;
            }
        }
        return null;
    }
}
exports.DirectedGraph = DirectedGraph;
