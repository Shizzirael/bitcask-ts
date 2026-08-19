import * as fs from 'fs/promises';
export const keyDir = new Map();
export async function eseguiSet(chiave, valore) {
    // crea una "sruttura" data, da salvare nel disco, salva chiave e valore.
    const data = JSON.stringify({ key: chiave, value: valore }) + "\n";
    // calcola la dimensione in byte del dato inserito, non solo il valore
    const byteSize = Buffer.byteLength(data, 'utf-8');
    console.log("Dimensione in byte:", byteSize);
    // calcola l'offset (quindi il peso attuale del file visto che inseriamo i dati alla fine)
    let offset = 0;
    try {
        const statistiche = await fs.stat("database.log");
        offset = statistiche.size;
    }
    catch {
    }
    // "scrive" nel disco nel file "database.log".
    try {
        await fs.appendFile("database.log", data, { flag: 'a', encoding: 'utf-8' });
        // aggiorna la hash table così che la ram punti sempre alla versione più recente del dato
        keyDir.set(chiave, {
            posizione: offset,
            dimensione: byteSize
        });
        console.log(`Dato salvato su disco all'offset: ${offset}`);
        console.log("Stato attuale della RAM (keyDir):", keyDir);
    }
    catch (errore) {
        console.error("Si è verificato un errore critico durante la scrittura su disco:", errore);
    }
}
export async function eseguiGet(chiave) {
    // controllo della chiave
    if (!keyDir.has(chiave)) {
        console.log(`Errore: la chiave '${chiave}' non è presente nel database.`);
        return;
    }
    // prendo le coordinate dimensione e posizione in base alla chiave
    const metadati = keyDir.get(chiave);
    let fileHandle;
    try {
        // apro il file log e alloco la memoria necessaria (l'ho appena ricavata in base alla chiave)
        fileHandle = await fs.open("database.log", 'r');
        const buffer = Buffer.alloc(metadati.dimensione);
        await fileHandle.read(buffer, 0, metadati.dimensione, metadati.posizione);
        const stringaLetta = buffer.toString('utf-8');
        const record = JSON.parse(stringaLetta);
        console.log(`Valore trovato:`, record.value);
    }
    catch (errore) {
        console.error("Errore critico durante la lettura dal disco:", errore);
    }
    finally { // a prescindere viene eseguito
        if (fileHandle) {
            await fileHandle.close();
        }
    }
}
//# sourceMappingURL=db.js.map