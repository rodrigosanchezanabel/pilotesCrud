import { menu1 } from './vistas/menu1'
import { leerTeclado } from './vistas/entradaTeclado'
import {Pilote, Pilotes, tPilote} from './model/pilote'
import { db } from './database/database'

const main = async () => {
    let n: number
    
    let query: any

    let identif: string, diametro: number, profundidad: number
    let pilote: Pilote = new Pilote("",0,0)

    await setBD(false) // true BD local; false BD Atlas

    do {
        n = await menu1()

        switch(n){
            case 1:
                identif = await leerTeclado('Introduzca el identificador del pilote')
                diametro =  parseInt( await leerTeclado('Introduzca el diametro del pilote en cm'))
                profundidad =  parseInt( await leerTeclado('Introduzca profundidad del pilote en cm'))
                
                pilote = new Pilote(identif, diametro, profundidad)
                try {
                    pilote.diametro = diametro
                }catch(error){
                    console.log(error)
                    pilote = new Pilote("",0,0)
                }
                break
            case 2:
                try{
                    let tierra=pilote.tierra()
                     console.log(`El volúmen excavado de tierra ha sido: ${tierra} m3`)
                }catch (e){
                    console.log("No ha entrado en la opción 1: " + e)
                }
                break
            case 3:
                try{
                    let hormigon = pilote.hormigon()
                    console.log(`El volumen necesario de hormigón es: ${hormigon} m3`)
                }catch (e){
                    console.log("No ha entrado en la opción 1: " + e)
                }
                break
            case 4:
                try{
                    let hierro = pilote.hierro()
                    console.log(`La cantidad necesaria de hierro para el pilote es = ${hierro} kg`)
                }catch (e){
                    console.log("No ha entrado en la opción 1: " + e)
                }
                break

            case 5:
                    identif=await leerTeclado("Introduzca el identificador del pilote")
                    diametro=parseInt(await leerTeclado('Introduzca el nuevo diametro del pilote'))
                    pilote.diametro=diametro
                    break
            case 6:
                    profundidad=parseInt(await leerTeclado('Introduzca la nueva profundidad del pilote'))
                    pilote.profundidad=profundidad
                    break       
            case 7:
                await db.conectarBD()
                const dSchema = {
                    _identif: pilote.identif,
                    _diametro: pilote.diametro,
                    _profundidad: pilote.profundidad,
                }
                const oSchema = new Pilotes(dSchema)
                // Controlamos el error de validación
                // Hay que hacer el control con then y catch 
                // Con el callback de save salta a la siguiente instrucción 
                // mientras se resuelve el callback y se desconecta y sigue el switch
                await oSchema.save()
                .then( (doc) => console.log('Salvado Correctamente: '+ doc) )
                .catch( (err: any) => console.log('Error: '+ err)) 
                // concatenando con cadena muestra sólo el mensaje

                await db.desconectarBD()
                break
            case 8:
                await db.conectarBD()
                // Controlamos el error de validación
                // Recordar que hay que poner la opción useFindAndModify: false
                identif=await leerTeclado("Introduzca el identificador del pilote")
                await Pilotes.findOneAndUpdate( 
                    { _identif: pilote.identif }, 
                    {
                        _identif: pilote.identif,
                        _diametro: pilote.diametro,
                        _profundidad: pilote.profundidad,
                    },
                    {
                        runValidators: true // para que se ejecuten las validaciones del Schema
                    }  
                )                
                .then(() => console.log('Se ha modificado Correctamente') )
                .catch( (err) => console.log('Error: '+err)) // +err para enlazar la cadena y mostrar mismo mensaje de error
                await db.desconectarBD()
                break
            case 9:
                await db.conectarBD()
                identif=await leerTeclado("Introduzca el identificador del pilote")
                await Pilotes.findOneAndDelete(
                    { _identif: pilote.identif }, 
                    (err: any, doc) => {
                        if(err) console.log(err)
                        else{
                            if (doc == null) console.log(`No se ha encontrado el Pilote`)
                            else console.log('Se ha borrado correctamente: '+ doc)
                        }
                    })
                await db.desconectarBD()
                break
            case 10:
                console.log(`Identificador: ${pilote.identif}`)
                console.log(`Diametro: ${pilote.diametro}`)
                console.log(`Profundidad: ${pilote.profundidad}`)
       
                break
            case 11:
                await db.conectarBD()
                let tmpPilote: Pilote
                let dPilote: tPilote
                query =  await Pilotes.find( {} )
                for (dPilote of query){
                    tmpPilote = 
                        new Pilote(dPilote._identif, dPilote._diametro, 
                                dPilote._profundidad)
                    tmpPilote.diametro = dPilote._diametro 
                    console.log(`Pilote ${tmpPilote.identif} Nº camiones: ${tmpPilote.nCamiones()}`)
                }
                await db.desconectarBD()                          
                break
            case 0:
                console.log('\n--ADIÓS--')
                break
            default:
                console.log("Opción incorrecta")
                break
        }
    }while (n != 0)
}

const setBD = async (local: boolean) => {
    
    const bdLocal = 'pilotes'

    const conexionLocal = `mongodb://localhost/${bdLocal}`
    if (local) {
        db.cadenaConexion = conexionLocal
    }else{
        const userAtlas = await leerTeclado('Introduce tu Usuario BD Atlas')
        const passAtlas = await leerTeclado('Introduce tu Password BD Atlas')
        const conexionAtlas =  
        'mongodb+srv://user:12345@cluster0.evhvg.mongodb.net/pilotes?retryWrites=true&w=majority'
        db.cadenaConexion = conexionAtlas
    }
}

main()