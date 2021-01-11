//Meth de mezcla de elementos del array sacado de github
Array.prototype.shuffle = function()
{
	var i = this.length;
	while (i)
	{
		var j = Math.floor(Math.random() * i);
		var t = this[--i];
		this[i] = this[j];
		this[j] = t;
	}
	return this;
}

const LOCAL_TEAM=0;
const AWAY_TEAM=1;
export default class League{
   
    constructor(name, teams=[], config={}) {
        this.name=name;
        //this.teams=teams; Lo quitamos para crear un meth setupTeams
        this.setupTeams(teams);
        this.matchDaySchedule=[]; //Calendario/planificación día de partido
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
       //Uso el meth shuffle añadido al prototipo array
       this.teams.shuffle()
   }

   customizeTeam(teamName){
       return{
        name: teamName,
        matchesWon:0,
        matchesDrawn:0,
        matchesLost:0

       }
   }
//Creación de la tabla del algoritmo todos vs todos

   initSchedule(round){
       const numberOfMatchDays = this.teams.length-1
       const numberOfMatchesPerMatchDay = this.teams.length /2
       for (let i=0; i< numberOfMatchDays; i++){
           const matchDay=[] //Jornada vacía
           for(let j=0; j< numberOfMatchesPerMatchDay; j++){
               const match =['Equipo local', 'Equipo visitante'] //Partido
               matchDay.push(match)
           }
           //Una vez añadidos todos lo partidos a la jornada
           //this.matchDaySchedule.push(matchDay) //Añadimos la jornada a la planificación
           round.push(matchDay)
       }

   }

   getTeamNames(){
       return this.teams.map(teams=>teams.name)
   }

   //Crea método que devuelve nombres de equipos en función de que el número de equipos sea par o impar
   getTeamNamesForSchedule(){
       const teamNames = this.getTeamNames()
       //console.log(teamNames)
       if(teamNames.length % 2 == 0){//Si son pares
           return teamNames
       }else{
           //Si son imares devuelve un array con los nombres + null
           //Tener null es mejor que tener un equipo llamado "descansa": null no es nada
           return [...teamNames, null]

       }
   }


   setLocalTeams(round){
       /*
        const teamNames=this.getTeamNames()
        ahora usamos el meth getTeamNamesForSchedule que tiene en cuenta si el nº de equipos es impar
        */
       const teamNames=this.getTeamNamesForSchedule()


        //Tenemos 4 equipos: el array de equipos tiene longitud 4
        //El máximo de equipos que juegan en casa es 2: restamos 2 a la longitud del array teams
        /*
        const maxHomeTeams =this.teams.length-2 ******
        Para tener equipos impares, usamos un equipo fake llamado "descansa" que hace que todo funcione como con equipos pares
        Como "descansa" no es un equipo real, no lo queremos dentro del array "teams", entonces no podemos 
        Usar la longitud de teams para establecer const maxHomeTeams.....
        ....Ahora contamos el max número de equipos contando los nombress de los equipos porque aquí si está el nombre "descansa"
        */
        const maxHomeTeams =teamNames.length-2 
        let teamIndex=0
        //this.matchDaySchedule.forEach(matchDay => {//Por cada jornada
        round.forEach(matchDay => {//Por cada jornada
            matchDay.forEach(match =>{ //Por cada partido de la jornada
                //Establecer el equipo local
                //Accedemos al nombre del equipo por el array
                //matchDay es el array que contiene varios arrays, y estos últimos tienen dos elementos:
                //equipo local y visitante...accedemos al primero con índice 0 y al segundo con 1
                //Para ello, definimos LOCAL_TEAM=0  y AWAY_TEAM=1
                match[LOCAL_TEAM]=teamNames[teamIndex]
                teamIndex++
                //Esto hace la primera tabla que sale en "elaboración del fixture", que hace
                // 1 2 3 4 5 6 7 y vuelve a 1...nosotros hacemos 0 1 2 (tres equipos porque el total es cuatro
                // y el algoritmo dice total-1) y volvemos al 0
                if(teamIndex > maxHomeTeams){
                    teamIndex=0;
                }
            })
        })
   }

   setAwayTeams(round){
      const teamNames=this.getTeamNamesForSchedule()
       const maxAwayTeams = teamNames.length-2
       let teamIndex= maxAwayTeams
       round.forEach(matchDay =>{//Aquí recorro las jornadas
           //Condición para que no establezca visitante en el primer partido...porque esa columna
           //es la primera, que en wiki se rellena directamente con el 8!!
           let isFirstMatch=true;
           matchDay.forEach(match => {//Aquí recorro los partidos de la jornada
               if(isFirstMatch){
                   isFirstMatch=false;
               }else{
                   match[AWAY_TEAM]=teamNames[teamIndex]
                   teamIndex--//en lugar de incrementar, baja...así empieza por el final del array y no repite equipos
                   if (teamIndex <0){
                       teamIndex= maxAwayTeams
                   }
               }
           })
       })
   }
    //establecer último equipo de la lista como visitante o local alternativamente
   fixLastTeamSchedule(round){
       let matchDayNumber=1 //Número de jornada: la primera es impar

       const teamNames= this.getTeamNamesForSchedule()

       const lastTeamName= teamNames[teamNames.length - 1]
       round.forEach(matchDay =>{
           const firstMatch =matchDay[0]
           if(matchDayNumber % 2 == 0) { //Si la jornada es par -> juega en casa
            firstMatch[AWAY_TEAM]= firstMatch[LOCAL_TEAM]
            firstMatch[LOCAL_TEAM]=lastTeamName
           }else{ 
            firstMatch[AWAY_TEAM]= lastTeamName
           }
           matchDayNumber++ //Aumenta la jornada
          

       })
   }
   
   scheduleMatchDays(){
       for(let i=0; i< this.config.rounds; i++){
            const newRound = this.createRound()
            //Si la jornada es par, invierte partidos
            if (i % 2 !=0){
                for (const matchDay of newRound){
                    for(const match of matchDay){
                        const localTeam= match[LOCAL_TEAM]
                        match[LOCAL_TEAM]= match[AWAY_TEAM]
                        match[AWAY_TEAM] =  localTeam
                    }
                }
            }
            this.matchDaySchedule = this.matchDaySchedule.concat(newRound)
       }
   }
    
   //Nuevo meth para crear rondas
   createRound(){
       const newRound =[]
       //Creo el array vacío y lo paso a los meth que tengo...y tengo que cambiar los meth para esta nueva manera
       //Aqui para genere las filas y columnas
       this.initSchedule(newRound)
       //Aquí para que me ponga los equipos locales
       this.setLocalTeams(newRound)
       //Aqui para poner los visitantes
       this.setAwayTeams(newRound)
       //Aquí para ajustar el primer equipo
       this.fixLastTeamSchedule(newRound)  //Ajusta el último equipo que es el 8 del algoritmo wiki
       return newRound
   }


}