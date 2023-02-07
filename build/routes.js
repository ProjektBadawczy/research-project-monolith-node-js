"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.route = void 0;
require("reflect-metadata");
const express_1 = require("express");
const graph_controller_1 = __importDefault(require("./src/controllers/graph-controller"));
const typedi_1 = __importDefault(require("typedi"));
const graph_service_1 = __importDefault(require("./src/services/graph-service"));
const edmonds_karp_service_1 = __importDefault(require("./src/services/edmonds-karp-service"));
const bfs_service_1 = require("./src/services/bfs-service");
const push_relabel_service_1 = require("./src/services/push-relabel-service");
exports.route = (0, express_1.Router)();
const edmondsKarpService = new edmonds_karp_service_1.default(typedi_1.default.get(bfs_service_1.BFSService));
const graphController = new graph_controller_1.default(typedi_1.default.get(graph_service_1.default), edmondsKarpService, typedi_1.default.get(push_relabel_service_1.PushRelabelService));
exports.route.get('/graph', (req, res) => graphController.getGraph(req, res));
exports.route.get('/directedGraph', (req, res) => graphController.getDirectedGraph(req, res));
exports.route.get('/edmondsKarpMaxGraphFlow', (req, res) => graphController.getEdmondsKarpMaxGraphFlow(req, res));
exports.route.get('/pushRelabelMaxGraphFlow', (req, res) => graphController.getEdmondsKarpMaxGraphFlow(req, res));
