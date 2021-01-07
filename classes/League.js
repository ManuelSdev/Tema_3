
export default class League{
   
    constructor(name, teams=[], config={}) {
        this.name=name;
        //this.teams=teams; Lo quitamos para crear un meth setupTeams
        this.setupTeams(teams);
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

   setupTeams(teamNames){
       //Array vacío para ir metiendo los equipos
       this.teams=[];
       for(const teamName of teamNames){
           //Cada equipo es un objeto literal
           const team =this.customizeTeam(teamName);
           this.teams.push(team);
       }
   }

   customizeTeam(teamName){
       return{
        name: teamName,
        matchesWon:0,
        matchesDrawn:0,
        matchesLost:0

       }
   }
}