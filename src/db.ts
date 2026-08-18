import * as fs from 'fs/promises';

// la "struct" per i metadati
type Metadati = {
    posizione: number;   
    dimensione: number;  
};

export const keyDir = new Map<string, Metadati>();

export async function eseguiSet(chiave: string, valore: string) {

    // calcola la dimensione in byte del valore inserito
        const byteSize = Buffer.byteLength(valore, 'utf-8');
        console.log("Dimensione in byte:", byteSize);

    // crea una "sruttura" (si chiama oggetto in js) data, da salvare nel disco, salva tutto, chiave valore e dimensione.
       const data = JSON.stringify({
            key : chiave,
          value : valore,
          bytes : byteSize,
      }) + "\n"

    // calcola l'offset (quindi il peso attuale del file visto che inseriamo i dati alla fine)
      let offset = 0;
    try {
        const statistiche = await fs.stat("database.log");
        offset = statistiche.size;
    } catch {
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

    } catch (errore) {
        console.error("Si è verificato un errore critico durante la scrittura su disco:", errore);
    }

    }

export async function eseguiGet(chiave: string) {


}