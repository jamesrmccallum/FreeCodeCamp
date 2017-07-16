declare namespace Types {

    export interface Node extends d3.SimulationNodeDatum {
        country: string;
        code: string;
    }

    export interface Link {
        target: number;
        source: number;
    }

    export interface RootObject {
        nodes: Node[];
        links: Link[];
    }

}