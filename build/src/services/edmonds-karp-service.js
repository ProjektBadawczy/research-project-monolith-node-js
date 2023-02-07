"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const _ = __importStar(require("lodash"));
let EdmondsKarpService = class EdmondsKarpService {
    constructor(bfsService) {
        this.bfsService = bfsService;
    }
    calculateMaxFlow(graph, source, destination) {
        var u, v;
        var residualGraph = _.cloneDeep(graph);
        var maxFlow = 0;
        var bfsResult = this.bfsService.Bfs(residualGraph, source, destination);
        while (bfsResult.success) {
            var pathFlow = Number.MAX_VALUE;
            for (v = destination; v != source; v = bfsResult.parents[v]) {
                u = bfsResult.parents[v];
                pathFlow = Math.min(pathFlow, residualGraph.adjacencyMatrix[u][v]);
            }
            for (v = destination; v != source; v = bfsResult.parents[v]) {
                u = bfsResult.parents[v];
                residualGraph.adjacencyMatrix[u][v] -= pathFlow;
                residualGraph.adjacencyMatrix[v][u] += pathFlow;
            }
            maxFlow += pathFlow;
            bfsResult = this.bfsService.Bfs(residualGraph, source, destination);
        }
        return maxFlow;
    }
};
EdmondsKarpService = __decorate([
    (0, typedi_1.Service)()
], EdmondsKarpService);
exports.default = EdmondsKarpService;
