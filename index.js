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

const config = {rounds: 2, pointsPerWin:3};
const premier =new FootballLeague ('Premier League', premierLeagueTeams, config);

//Imprimir
//console.log(premier);
for (const team of premier.teams){
    console.log(team)
}

//console.log(`Config: ${premier.config}`);  Así no funca: imrpime object Object
console.log('CONFIG', premier.config);      //Así si anda...