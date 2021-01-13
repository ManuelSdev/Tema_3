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
            poinstPerDrawn:1,
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
             goalsAgainst:0,
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
        return this.teams.find(team => team.name == name)
    }
    updateTeams(result){
        //Buscar al equipo por su nombre en el array de equipos
        const homeTeam = this.getTeamForName(result.homeTeam)
        const awayTeam = this.getTeamForName(result.awayTeam)
        //Añadir 3 puntos al equipo que gana
        if(homeTeam && awayTeam){       // Solo si tengo home y away...por el tema del equipo fake 'descansa'...los undefined se consideran falsos en las booleanas
            homeTeam.goalsFor+= result.homeGoals
            homeTeam.goalsAgainst+=result.awayGoals
            awayTeam.goalsFor+= result.awayGoals
            awayTeam.goalsAgainst+= result.homeGoals
            if(result.homeGoals > result.awayGoals){
                homeTeam.points += this.config.pointsPerWin;//Suma 3....lo mismo que = homeTeam.point+this.config.pointsPerWin
                homeTeam.matchesWon+=1;
                awayTeam.points += this.config.pointsPerLose
                awayTeam.matchesLost+=1;
            }else if (result.homeGoals > result.awayGoals){
                homeTeam.points += this.config.pointsPerLose
                homeTeam.matchesLost+=1;
                awayTeam.points += this.config.pointsPerWin
                awayTeam.matchesWon+=1;    
            }else{//empate
                homeTeam.points += this.config.poinstPerDrawn
                homeTeam.matchesDrawn+=1;
                awayTeam.points += this.config.poinstPerDrawn
                awayTeam.matchesDrawn+=1;
            }
        }
    }

    getStandings(){ //meth (abstracto implementado) que devuelve clasificación (que es un listado de equipos)
        this.teams.sort(function(teamA, teamB){
            if(teamA.points > teamB.points){
                return -1
            }else if(teamA.points < teamB.points){
                return 1
            }else{ //Si empatan a puntos nos fijamos en la diferencia de goles
                const goalSDiffA = teamA.goalsFor - teamA.goalsAgainst
                const goalSDiffB = teamB.goalsFor - teamB.goalsAgainst
                if(goalSDiffA > goalSDiffB){
                    return -1
                }else if(goalSDiffA < goalSDiffB){
                    return 1
                } else{
                    return 0
                }

            }
        })
        console.log('standings')
        //CLAVEEEEEEEEEEEEEEEEEEE TABLAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA*************************************************************************************************
        console.table(this.teams)
    }
}