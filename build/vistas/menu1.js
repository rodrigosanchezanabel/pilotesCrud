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
exports.menu1 = void 0;
const entradaTeclado_1 = require("./entradaTeclado");
exports.menu1 = () => __awaiter(void 0, void 0, void 0, function* () {
    let n;
    console.log('\n');
    console.log('1.- Crear pilote');
    console.log('2.- Calculo volumen tierra');
    console.log('3.- Cálculo volumen Hormigón');
    console.log('4.- Cálculo Hierro');
    console.log('5.- Cambiar diámetro');
    console.log('6.- Cambiar profundidad');
    console.log('7.- Salvar pilote en BD');
    console.log('8.- Modificar pilote');
    console.log('9- Borrar pilote');
    console.log('10.- Mostrar pilote');
    console.log('11.- Listar numero de camiones');
    console.log('0.- Salir');
    n = parseInt(yield entradaTeclado_1.leerTeclado('opción: '));
    return n;
});
