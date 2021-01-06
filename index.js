//Vamos a simplificar parametros de los constructores respecto del copy 1


//Clase genéríca liga....hay que simplificar constructor


class League{
   
    constructor(name, teams=[], config={}) {
        this.name=name;
        this.teams=teams;
        this.matchDaySchedule=[];
        //Ahora el constructor llama a un meth setup al que le va  a pasar la configuración
        //El meth setup lo definimos después, en los métodos de la clase
        //Quitamos esto y lo pasamos al meth setup...ya no irá con this, sino con const
        //this.defaultConfig= {rounds:1}//Como justo despues usamos el meth setup asignando this.defaultConfig a this.config, tenemos que declarar this.defaultConfig antes de usar this.setup
        //this.setup(config);
        this.setup(config)
    }

   setup(config){
     const defaultConfig= {rounds:1}
    //El meth assign retorna el objeto parcheado y ese lo guardamos en this.config
    this.config= Object.assign(defaultConfig, config)

 }

}

//Ahora metemos el meth setup en la hija
class PointBasedLeague extends League { 
    constructor (name, teams=[],config={} ){
        //Aprovechamos el constructor de la madre
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
}


//Equipos
const premierLeagueTeams=['Chelsea', 'Arsenal'];
const config = {rounds: 2, pointsPerWin:3};
const premier =new PointBasedLeague ('Premier League', premierLeagueTeams, config);

//Imprimir
//console.log(premier);

for (const team of premier.teams){
    console.log(team)
}

//console.log(`Config: ${premier.config}`);  Así no funca: imrpime object Object
console.log('CONFIG', premier.config);      //Así si anda...