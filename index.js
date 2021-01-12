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

import { premierLeagueTeams} from './teams.js'

const config = {rounds:2};
//const premier =new FootballLeague ('Premier League', premierLeagueTeams, config); //Comentada para reducir equipos más abajo
//Ejemplo impar metiendo 'A' y esparciendo el resto de equipos de premierLeagueTeams
const premier =new FootballLeague ('Premier League', premierLeagueTeams, config);


/*Comento esto para hacer la misma función con la de abajo que usamos para el ejemplo de maps
for (const team of premier.teams){
    console.log(team)
}
*/
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