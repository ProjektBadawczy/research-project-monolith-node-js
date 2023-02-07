import 'reflect-metadata';
import { Router } from 'express';
import GraphController from "./src/controllers/graph-controller";
import Container from "typedi";
import GraphService from "./src/services/graph-service";
import EdmondsKarpService from "./src/services/edmonds-karp-service";
import {BFSService} from "./src/services/bfs-service";
import {PushRelabelService} from "./src/services/push-relabel-service";

export const route = Router();

const edmondsKarpService = new EdmondsKarpService(Container.get(BFSService))
const graphController = new GraphController(Container.get(GraphService),edmondsKarpService, Container.get(PushRelabelService));


route.get('/graph', 
    (req, res) => graphController.getGraph(req, res));
route.get('/directedGraph', 
    (req, res) => graphController.getDirectedGraph(req, res));
route.get('/edmondsKarpMaxGraphFlow',
    (req, res) => graphController.getEdmondsKarpMaxGraphFlow(req, res));
route.get('/pushRelabelMaxGraphFlow',
    (req, res) => graphController.getPushRelabelMaxGraphFlow(req, res));