import * as db from "@razomy/db";

export function createGraphTopology(core: db.core.CoreDB): db.topology.GraphTopology {
    return {
    core,
    nodesAst: [],

    // Регистрируем колонки в Ядре. Узлы получают stride = Layer._COUNT!
    nodeFirstOut: core.registerField(core.nodeStore, "nFirstOut", Uint32Array, db.topology.NULL_EDGE, db.LAYER._COUNT),
    nodeFirstIn:  core.registerField(core.nodeStore, "nFirstIn",  Uint32Array, db.topology.NULL_EDGE, db.LAYER._COUNT),

    // Грани получают stride = 1
    edgeFrom:    core.registerField(core.edgeStore, "eFrom", Uint32Array, 0, 1),
    edgeTo:      core.registerField(core.edgeStore, "eTo",   Uint32Array, 0, 1),
    edgeLayer:   core.registerField(core.edgeStore, "eLayer", Uint8Array, 0, 1),
    edgeNextOut: core.registerField(core.edgeStore, "eNextOut", Uint32Array, db.topology.NULL_EDGE, 1),
    edgeNextIn:  core.registerField(core.edgeStore, "eNextIn",  Uint32Array, db.topology.NULL_EDGE, 1),

    addNode(astData) { return db.topology.addGraphNode(this, astData); },
    connect(from, to, layer) { return db.topology.connectGraph(this, from, to, layer); },
    commit() { db.topology.commitGraph(this); }
    };
}
