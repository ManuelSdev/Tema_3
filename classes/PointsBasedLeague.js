//El nombre "League" se lo pongo yo al importar, le puedes poner el que sea porque la exportación está hecha con default
//La clase PointsBasedLeague importa la clase League porque hereda de ella
import League from './League.js'


//La clase
export default class PointsBasedLeague extends League { 
    constructor (name, teams=[],config={} ){
        //Aprovechamos el constructor de clase padre
        super(name, teams, config)
    }
    setup(config){
        const defaultConfig ={      //Esta var será un objeto con la configuración (por defecto) particular de este tipo de liga
            rounds:1,
            pointsPerWin:3,
            poinstPerDraw:1,
            pointsPerLose:0
        }
        //Crea parche con la config introducida en el constructor
        this.config= Object.assign(defaultConfig, config)
    }
    customizeTeam(teamName){
            //Hacer lo siguiente:
            //Llamar al meth customizeTeam del padre
            //Devolver objeto con los datos del objeto que devuelve el padre
            //y además las propiedades goalsFor:0 y goalsAgainst:0...USANDO SPREADING
         const customizedTeam= super.customizeTeam(teamName);
         //****Forma de añadir propiedades sin usar spreading
         //customizedTeam.points=0;
         //customizedTeam.goalsFor=0;
         //customizedTeam.goalsAgainst=0;
         //return customizedTeam        
         //****Forma de añadir propiedades usando spreading
         return {
             points:0,
             goalsFor:0,
             goalsAgaints:0,
             ...customizedTeam  //Exparce propiedades del objeto con spreading...equivalente a cuando un array expande sus elementos dentro de otro 
         }
    }
}