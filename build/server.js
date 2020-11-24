"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const menu1_1 = require("./vistas/menu1");
const entradaTeclado_1 = require("./vistas/entradaTeclado");
const pilote_1 = require("./model/pilote");
const database_1 = require("./database/database");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    let n;
    let query;
    let identif, diametro, profundidad;
    let pilote = new pilote_1.Pilote("", 0, 0);
    yield setBD(false); // true BD local; false BD Atlas
    do {
        n = yield menu1_1.menu1();
        switch (n) {
            case 1:
                identif = yield entradaTeclado_1.leerTeclado('Introduzca el identificador del pilote');
                diametro = parseInt(yield entradaTeclado_1.leerTeclado('Introduzca el diametro del pilote en cm'));
                profundidad = parseInt(yield entradaTeclado_1.leerTeclado('Introduzca profundidad del pilote en cm'));
                pilote = new pilote_1.Pilote(identif, diametro, profundidad);
                try {
                    pilote.diametro = diametro;
                }
                catch (error) {
                    console.log(error);
                    pilote = new pilote_1.Pilote("", 0, 0);
                }
                break;
            case 2:
                try {
                    let tierra = pilote.tierra();
                    console.log(`El volúmen excavado de tierra ha sido: ${tierra} m3`);
                }
                catch (e) {
                    console.log("No ha entrado en la opción 1: " + e);
                }
                break;
            case 3:
                try {
                    let hormigon = pilote.hormigon();
                    console.log(`El volumen necesario de hormigón es: ${hormigon} m3`);
                }
                catch (e) {
                    console.log("No ha entrado en la opción 1: " + e);
                }
                break;
            case 4:
                try {
                    let hierro = pilote.hierro();
                    console.log(`La cantidad necesaria de hierro para el pilote es = ${hierro} kg`);
                }
                catch (e) {
                    console.log("No ha entrado en la opción 1: " + e);
                }
                break;
            case 5:
                identif = yield entradaTeclado_1.leerTeclado("Introduzca el identificador del pilote");
                diametro = parseInt(yield entradaTeclado_1.leerTeclado('Introduzca el nuevo diametro del pilote'));
                pilote.diametro = diametro;
                break;
            case 6:
                profundidad = parseInt(yield entradaTeclado_1.leerTeclado('Introduzca la nueva profundidad del pilote'));
                pilote.profundidad = profundidad;
                break;
            case 7:
                yield database_1.db.conectarBD();
                const dSchema = {
                    _identif: pilote.identif,
                    _diametro: pilote.diametro,
                    _profundidad: pilote.profundidad,
                };
                const oSchema = new pilote_1.Pilotes(dSchema);
                // Controlamos el error de validación
                // Hay que hacer el control con then y catch 
                // Con el callback de save salta a la siguiente instrucción 
                // mientras se resuelve el callback y se desconecta y sigue el switch
                yield oSchema.save()
                    .then((doc) => console.log('Salvado Correctamente: ' + doc))
                    .catch((err) => console.log('Error: ' + err));
                // concatenando con cadena muestra sólo el mensaje
                yield database_1.db.desconectarBD();
                break;
            case 8:
                yield database_1.db.conectarBD();
                // Controlamos el error de validación
                // Recordar que hay que poner la opción useFindAndModify: false
                identif = yield entradaTeclado_1.leerTeclado("Introduzca el identificador del pilote");
                yield pilote_1.Pilotes.findOneAndUpdate({ _identif: pilote.identif }, {
                    _identif: pilote.identif,
                    _diametro: pilote.diametro,
                    _profundidad: pilote.profundidad,
                }, {
                    runValidators: true // para que se ejecuten las validaciones del Schema
                })
                    .then(() => console.log('Se ha modificado Correctamente'))
                    .catch((err) => console.log('Error: ' + err)); // +err para enlazar la cadena y mostrar mismo mensaje de error
                yield database_1.db.desconectarBD();
                break;
            case 9:
                yield database_1.db.conectarBD();
                identif = yield entradaTeclado_1.leerTeclado("Introduzca el identificador del pilote");
                yield pilote_1.Pilotes.findOneAndDelete({ _identif: pilote.identif }, (err, doc) => {
                    if (err)
                        console.log(err);
                    else {
                        if (doc == null)
                            console.log(`No se ha encontrado el Pilote`);
                        else
                            console.log('Se ha borrado correctamente: ' + doc);
                    }
                });
                yield database_1.db.desconectarBD();
                break;
            case 10:
                console.log(`Identificador: ${pilote.identif}`);
                console.log(`Diametro: ${pilote.diametro}`);
                console.log(`Profundidad: ${pilote.profundidad}`);
                break;
            case 11:
                yield database_1.db.conectarBD();
                let tmpPilote;
                let dPilote;
                query = yield pilote_1.Pilotes.find({});
                for (dPilote of query) {
                    tmpPilote =
                        new pilote_1.Pilote(dPilote._identif, dPilote._diametro, dPilote._profundidad);
                    tmpPilote.diametro = dPilote._diametro;
                    console.log(`Pilote ${tmpPilote.identif} Nº camiones: ${tmpPilote.nCamiones()}`);
                }
                yield database_1.db.desconectarBD();
                break;
            case 0:
                console.log('\n--ADIÓS--');
                break;
            default:
                console.log("Opción incorrecta");
                break;
        }
    } while (n != 0);
});
const setBD = (local) => __awaiter(void 0, void 0, void 0, function* () {
    const bdLocal = 'pilotes';
    const conexionLocal = `mongodb://localhost/${bdLocal}`;
    if (local) {
        database_1.db.cadenaConexion = conexionLocal;
    }
    else {
        const userAtlas = yield entradaTeclado_1.leerTeclado('Introduce tu Usuario BD Atlas');
        const passAtlas = yield entradaTeclado_1.leerTeclado('Introduce tu Password BD Atlas');
        const conexionAtlas = 'mongodb+srv://user:12345@cluster0.evhvg.mongodb.net/pilotes?retryWrites=true&w=majority';
        database_1.db.cadenaConexion = conexionAtlas;
    }
});
main();
