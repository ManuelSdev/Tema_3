//Vamos a simplificar parametros de los constructores respecto del copy 1


//Clase genéríca liga....hay que simplificar constructor
/*
class League{

    constructor(name, teams=[], rounds=1) {
        this.name=name;
        this.teams=teams;
        this.rounds=rounds;
        //planificación
        this.matchDaySchedule=[];

    }
}
*/

class League{
    //Mod 1: ***Ahora recibe el parametro config (objeto vacio)***
    constructor(name, teams=[], config={}) {
        this.name=name;
        this.teams=teams;
        //planificación
        this.matchDaySchedule=[];
        //Ahora el constructor llama a un meth setup al que le va  a pasar la configuración
        //El meth setup lo definimos después, en los métodos de la clase
        this.defaultConfig= {rounds:7}//Como justo despues usamos el meth setup asignando this.defaultConfig a this.config, tenemos que declarar this.defaultConfig antes de usar this.setup
        //this.setup(config);
        this.setup(config)
    }

    //Mod 1: ****Aqí definimos el meth setup
    /*
    setup(config){
       //la configuración es la configuración por defecto
       this.config=this.defaultConfig;
       //si existe la propiedad rounds en el objeto config...
       if(config.rounds){
           this.config.rounds=config.rounds;        //Esto parece redundante porque antes has copiado el objeto entero....vamos, que ya tiene la propiedad round /
       }
    }
    */
   //MOD 2: Usando meth assign de object parcheamos la defaultconfig con la config que metamos en el constructor
   setup(config){
    //El meth assign retorna el objeto parcheado y ese lo guardamos en this.config
    this.config= Object.assign(this.defaultConfig, config)

 }

}



//Simplificamos constructor

//Clase especializada para ligas basadas en puntos
/*
class PointBasedLeague extends League { 
    constructor (name, teams=[], rounds=1, pointsPerWin=3, poinstPerDraw=1, pointsPerLose=0){
        //Aprovechamos el constructor de la madre
        super(name, teams, rounds)
        this.poinstPerDraw=poinstPerDraw
        this.pointsPerLose=pointsPerLose
        this.pointsPerWin=pointsPerWin
    }
}
*/
//Mod 1***Simplificamos usando el objeto config, igual que en la madre

class PointBasedLeague extends League { 
    constructor (name, teams=[],config={} ){
        //Aprovechamos el constructor de la madre
        super(name, teams, config)

    }
}


//Equipos
const premierLeagueTeams=['Chelsea', 'Arsenal'];
/*
//Sin pasar objeto como parámetro
const premier =new PointBasedLeague ('Premier League', premierLeagueTeams);
console.log(`Config: ${premier.config.rounds}`);
*/

//Pasando objeto como parámetro
/*
const premier =new PointBasedLeague ('Premier League', premierLeagueTeams, {rounds:2});
console.log(`Config: ${premier.config.rounds}`);
*/

//Mod 2***Teniendo el parcheo por assign, creamos la variable config con los datos que queramos meterle al constructor

const config = {rounds: 2, pointsPerWin:3};
const premier =new PointBasedLeague ('Premier League', premierLeagueTeams, config);






//Imprimir
console.log(premier);

for (const team of premier.teams){
    console.log(team)
}

console.log(`Config: ${premier.config.rounds}`);