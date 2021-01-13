
   //Vamos a simplificar parametros de los constructores respecto del copy 1
    //Clase genéríca liga....hay que simplificar constructor
    //Ahora paso las clases a  módulos que guardo en carpeta  clases

    //Luego importo las clases
    //No importo League porque a esa la importa cada clase que hereda de ella en su archivo
    //Importo PointsBasedLeague porque es una clase de uso final
    //Le puedo cambiar el nombre porque está exportada como default: la llamo FootballLeague

import FootballLeague from './classes/PointsBasedLeague.js'
    //Equipos...se han llevado al archivo teams.js y desde ahí se han exportado todos
    //Ahora importo los que necesite

    //Este import ya no sirve porque ahora importamos desde un JSON
    //import { premierLeagueTeams} from './teams.js'

import request from 'request'
//petición request
const url='https://raw.githubusercontent.com/openfootball/football.json/master/2020-21/en.1.clubs.json'
request.get(url)
request.get(url, function(error, response, body){
    const teamsData = JSON.parse(body)
   // console.log('TEAMS', teamsData)
    //Vamos a extraer los nombres de los equipos del JSON
    //la clave "clubs" es un array de objetos
    //Map pasará por todos los elementos/objetos del array: nos interesa la propiedad/clave "name"
    //Cada valor de cada clave "name" de cada objeto pasará como elemento del array premierLeagueTeams
    const premierLeagueTeams = teamsData.clubs.map(club => club.name)
    console.log(premierLeagueTeams)


    //TODO ESTO ES EL GÓDIGO ORIGINAL QUE METEMOS EN LA PETICIÓN AHORA*********************
 

    const config = {rounds:2};
    //const premier =new FootballLeague ('Premier League', premierLeagueTeams, config); //Comentada para reducir equipos más abajo
    //Ejemplo impar metiendo 'A' y esparciendo el resto de equipos de premierLeagueTeams
    const premier =new FootballLeague ('Premier League', premierLeagueTeams, config);


    //Comento esto para hacer la misma función con la de abajo que usamos para el ejemplo de maps
    //for (const team of premier.teams){//
    //    console.log(team)
    //}

    //Ejemplo de uso de meth map de array
    function getTeamName(team){
        return team.name
    }
    const teamNames = premier.teams.map(getTeamName) //esto cambia cada elemento del array premier.teams (array de objetos literales) por lo que retorna la funcion getTeamName al recibir como parametro un objeto literal team...es decir, retorna solo el valor de la propiedad nombre de cada objeto literal team
    for (const teamName of teamNames){
        console.log(teamName)
    }
    //Fin del ejemplo 

    //Imprimir
    //console.log(premier);
    //console.log(`Config: ${premier.config}`);  Así no funca: imrpime object Object
    console.log('CONFIG', premier.config);      //Así si anda...


    //Prueba de la creacion de tabla del algoritmo todos vs todos en League
    premier.scheduleMatchDays()
    console.log(premier.matchDaySchedule)

    //Pintar las jornadas y sus partidos
    let i=1;
    premier.matchDaySchedule.forEach(matchDay =>{
        console.log(`JORNADA ${i}`)
        matchDay.forEach(match =>{
            const home  = match[0] != null ? match[0] : 'DESCANSA' //Ternario: si match[0] es distinto de null, match[0] será = match[0]...si no será = 'DESCANSA'
            const away = match[1] != null ? match[1] : 'DESCANSA'
            console.log(`${home} vs ${away}`)
        })
        i++
    })

    //Comenzar liga
    premier.start()
    //Mostrar por pantalla los resultados de cada jornada
    i=1
    premier.summaries.forEach(summary =>{
        console.log(`RESUMEN JORNADA ${i}`)
        summary.results.forEach(result => {
            console.log(`${result.homeTeam} ${result.homeGoals} - ${result.awayGoals} ${result.awayTeam}`)
        })
        //quiero cambiar lo siguiente para que el array que pinta el console.table tenga algunos cambios
        //console.table(summary.standings)
        console.table(summary.standings.map(team =>{
            //Por cada equipo de la clasificación, devuelvo un objeto con las mismas propiedades del equipo
            //Pero con dos campos nuevos: GoalsDiff y PlayedMatches
            //También pongo los campos en may

            return{
                Team: team.name,
                Points: team.points,
                PlayedMatches: team.matchesWon + team.matchesDrawn + team.matchesLost,
                Won: team.matchesWon,
                Drawn: team.matchesDrawn,
                Lost: team.matchesLost,
                GoalsFor: team.goalsFor,
                GoalsAgainst: team.goalsAgainst,
                GoalsDiff: team.goalsFor - team.goalsAgainst

            }
        }))
        i++
    })

    //Mostramos total de goles y puntos 
    //Hacerlo mediante for 

    //let goalsAccumulated = 0
    //for(const team of teams){
    //    goalsAccumulated += teams.goalsFor
    //    //goalsAccumulated = goalsAccumulated + teams.goalsFor
    //}


    //
    //Hacerlo mediante reduce
    const totalGoals = premier.teams.reduce(function (goalsAccumulated, team) {
        return goalsAccumulated  + team.goalsFor

    },0)

})