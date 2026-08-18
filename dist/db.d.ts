type Metadati = {
    posizione: number;
    dimensione: number;
};
export declare const keyDir: Map<string, Metadati>;
export declare function eseguiSet(chiave: string, valore: string): Promise<void>;
export declare function eseguiGet(chiave: string): Promise<void>;
export {};
//# sourceMappingURL=db.d.ts.map