
//Clase genéríca liga
class League{

    constructor(name, teams=[], rounds=1) {
        this.name=name;
        this.teams=teams;
        this.rounds=rounds;
        //planificación
        this.matchDaySchedule=[];

    }
}

//Clase especializada para ligas basadas en puntos

class PointBasedLeague extends League {
    
    constructor (name, teams=[], rounds=1, pointsPerWin=3, poinstPerDraw=1, pointsPerLose=0){
        //Aprovechamos el constructor de la madre
        super(name, teams, rounds)
        this.poinstPerDraw=poinstPerDraw
        this.pointsPerLose=pointsPerLose
        this.pointsPerWin=pointsPerWin

    }
}

//Equipos
const premiereLeagueTeams=['Chelsea', 'Arsenal'];

const premiere =new PointBasedLeague ('Premiere League', premiereLeagueTeams);

console.log(premiere);

for (const team of premiere.teams){
    console.log(team)
}