import * as fs from "fs";

export function eseguiSet(chiave: string, valore: string) {
    
// copertura da errore dell'utente (nel caso in cui non vengano specificati chiave o valore)
    if (!chiave || !valore){
        console.log("Errore! Devi specificare sia una chiave che un valore! Esempio: set chiave valore");
        process.exit(1);
    }

// calcola la dimensione in byte del valore inserito
    const byteSize = Buffer.byteLength(valore, 'utf-8');
    console.log("Dimensione in byte:", byteSize);

// crea una "sruttura" (si chiama oggetto in js) data, da salvare nel disco, salva tutto, chiave valore e dimensione.
    const data = JSON.stringify({
        key : chiave,
        value : valore,
        bytes : byteSize,
    }) + "\n"

// "scrive" nel disco nel file "database.log".
    fs.appendFileSync("database.log", data, 'utf-8'); 

    console.log("Dato salvato con succeso nel database!");
}

export function eseguiGet(chiave: string, valore: string) {

     if (!chiave || !valore){
        console.log("Errore! Devi specificare sia una chiave che un valore! Esempio: set chiave valore");
        process.exit(1);
    }


}