import * as fs from "fs";
import { eseguiGet, eseguiSet } from "./db.js";
const azione = process.argv[2];
const chiave = process.argv[3];
const valore = process.argv[4];
console.log("Comando completo:", process.argv);
if (azione === "set") {
    if (!chiave || !valore) {
        console.log("Errore! Per 'set' devi specificare chiave e valore. Es: set gioco zelda");
        process.exit(1);
    }
    eseguiSet(chiave, valore);
}
else if (azione === "get") {
    if (!chiave) {
        console.log("Errore! Per 'get' devi specificare la chiave da cercare. Es: get gioco");
        process.exit(1);
    }
    eseguiGet(chiave);
}
else {
    console.log("Errore! Comando non riconosciuto.");
    process.exit(1);
}
//# sourceMappingURL=index.js.map