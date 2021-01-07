//He cortado y pegado las variables con los equipos que estaban en index.js
//Para exportarlas le meto export a cada variable que qui

export const liverPoolTeams =['Liverpool', 'Everton'];
export const manchesterTeams =['Manchester City'];
export const londonTeams = ['Arsenal', 'Chelsea', 'Fulham', 'West Ham', 'Tottenham', 'Crystal Palace']
//Ahora exparcimos todos los equipos en el array premierLeagueTeams
export const premierLeagueTeams=[
    ...liverPoolTeams,
    ...manchesterTeams,
    ...londonTeams

];