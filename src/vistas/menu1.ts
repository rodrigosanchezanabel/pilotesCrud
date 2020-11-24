import { leerTeclado } from './entradaTeclado'

export const menu1 = async () => {
    let n: number
    console.log('\n')
    console.log('1.- Crear pilote')
    console.log('2.- Calculo volumen tierra')
    console.log('3.- Cálculo volumen Hormigón')
    console.log('4.- Cálculo Hierro')
    console.log('5.- Cambiar diámetro')
    console.log('6.- Cambiar profundidad')
    console.log('7.- Salvar pilote en BD')
    console.log('8.- Modificar pilote')
    console.log('9- Borrar pilote')
    console.log('10.- Mostrar pilote')
    console.log('11.- Listar numero de camiones')
    console.log('0.- Salir')
    n = parseInt( await leerTeclado('opción: ') )
    return n
}