//El nombre "League" se lo pongo yo al importar, le puedes poner el que sea porque la exportación está hecha con default
//La clase PointsBasedLeague importa la clase League porque hereda de ella
import League from './League.js'
import {LOCAL_TEAM, AWAY_TEAM} from './League.js'

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
    
    generateGoals(){
        return Math.round(Math.random() * 10);
    }

    //Meth abstracto de padre implementado aquí
    play(match){
        const homeGoals = this.generateGoals()
        const awayGoals = this.generateGoals()
        return{
            homeTeam: match[LOCAL_TEAM],
            homeGoals: homeGoals,
            awayTeam: match[AWAY_TEAM],
            awayGoals: awayGoals

        }
    }

    getTeamForName(name){
        return this.team.find(team => team.name == name)
    }
    updateTeams(result){
        console.log('Actualizamos equipos', result)

        const homeTeam = this.getTeamForName(result.homeTeam)
        const awayTeam = this.getTeamForName(result.awayTeam)
        console.log('TEAMS', homeTeam, awayTeam)
        //Buscar al equipo por su nombre en el array de equipos
    }
}