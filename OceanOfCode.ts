/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

enum Charge {
    Silence = "SILENCE",
    Torpedo = "TORPEDO",
    Sonar = "SONAR",
    None = ""
}

enum Action {
    Move = "MOVE",
    Surface = "SURFACE",
    Silence = "SILENCE",
    Torpedo = "TORPEDO",
    Sonar = "SONAR"
}

class Cell {
    constructor (
        private visited :Boolean,
        private isLand : Boolean,
        private x : number, 
        private y : number) {}
        

 
    getIsLand()  : Boolean  {
        return this.isLand;
    }
    
    hasVisited() : Boolean {
        return this.visited;
    }
    
    setVisited(visited: Boolean){
        this.visited = visited
    }
    
    getX() :number{
        return this.x;
    }
    
    getY() : number {
        return this.y;
    }
        
}

function toBoardNumber(x :number, y:number ) : number{
    return y*15 +x ;
}


function isSpaceFree(x: number, y: number, board : Array<Cell>) : Boolean {
    console.error(toBoardNumber(x,y))
    const c = board[toBoardNumber(x,y)]
    console.error(c)
    if (c.getIsLand() ||   c.hasVisited()){
        console.error('is not free')
        return false;
    }
    return true;        
}


function up (y : number ) : number {
    return y-1;
}


function down (y : number ) : number {
    return y+1;
}

function left (x : number ) : number {
    return x-1;
}


function right (x : number ) : number {
    return x+1;
}


function isUpFree(x: number, y: number, board : Array<Cell>) : Boolean{
    let newy = up(y)
    if (newy < 0){
        return false;
    }
    
    return isSpaceFree(x, newy, board)
}

function isDownFree(x: number, y: number, board : Array<Cell>) : Boolean{
    let newy = y +1;
    if (newy > 14){
        return false;
    }
    
   return  isSpaceFree(x, newy, board)
}

function isLeftFree(x: number, y: number, board : Array<Cell>) : Boolean{
    let newX =  x -1;
    if (newX < 0){
        return false;
    }
    
   return  isSpaceFree(newX, y, board)
}

function isRigthFree(x: number, y: number, board : Array<Cell>) : Boolean{
    let newX =  x + 1;
    if (newX > 14){
        return false;
    }
    
   return  isSpaceFree(newX, y, board)
}



function getRandomInt(max: number) :number {
  return Math.floor(Math.random() * Math.floor(max));
}


var inputs: string[] = readline().split(' ');
const width: number = parseInt(inputs[0]);
const height: number = parseInt(inputs[1]);
const myId: number = parseInt(inputs[2]);
let board : Array<Cell> = new Array<Cell>()
for (let i = 0; i < height; i++) {
    const line: string = readline();
    for (let j = 0; j < width; j++){
        if(line.charAt(j) == 'x'){
            board.push(new Cell(false, true, j, i));
        } else  {
             board.push(new Cell(false, false, j ,i ));
        }
    }
}

// Write an action using console.log()
// To debug: console.error('Debug messages...');
let c : Cell = board.filter(cell => cell.getIsLand() == false).reduce (
    (first , second) => getRandomInt(50) > 3 ? first:second); 
console.log(c.getX() + ' ' + c.getY());
let silence : number = 0;
let torpedo : number = 0;
let sonar : number = 0;
// game loop
while (true) {
    var inputs: string[] = readline().split(' ');
    const x: number = parseInt(inputs[0]);
    const y: number = parseInt(inputs[1]);
    const myLife: number = parseInt(inputs[2]);
    const oppLife: number = parseInt(inputs[3]);
    const torpedoCooldown: number = parseInt(inputs[4]);
    const sonarCooldown: number = parseInt(inputs[5]);
    const silenceCooldown: number = parseInt(inputs[6]);
    const mineCooldown: number = parseInt(inputs[7]);
    const sonarResult: string = readline();
    const opponentOrders: string = readline();
    
    let cell:Cell = board[toBoardNumber(x,y)];
    cell.setVisited(true)


    let charge : Charge = Charge.Silence
    let action : Action = Action.Move
    let direction : string = "N"
    let extraString : string = '' 
    if (silence >= 6){
        action = Action.Silence 
        silence = 0
        charge = Charge.None
        extraString = '1'
    }

 
    if (isUpFree(x,y, board)){
        console.error('move up')
        direction = "N"
        let cell:Cell = board[toBoardNumber(x,up(y))];
        
    
    } else if(isDownFree(x, y, board)){
        direction = "S"
        let cell:Cell = board[toBoardNumber(x,down(y))];
    } else if(isLeftFree(x, y, board)){
        direction = "W"
        
        let cell:Cell = board[toBoardNumber(left(x),y)];
    } else if(isRigthFree(x, y, board)){
        direction = "E"
        
        let cell:Cell = board[toBoardNumber(right(x),y)];
       
    }
    else {
        console.error('going to surface')
        action = Action.Surface
        board.forEach( function(c :Cell) {c.setVisited(false)})
        charge = Charge.None
    }
    if (charge == Charge.Silence){
        silence ++;
    }
   /* Cannot check this becouse typescript complain that i never assinged it
   if (charge == Charge.Sonar){
        sonar ++;
    }
     if (charge == Charge.Torpedo){
        torpedo ++;
    }
    */
    
    console.error(action)
    console.error(direction)
    console.error(charge)
    console.error(silence)
    var logValue :string = action;
    if (direction != ''){
        logValue += ' '+ direction 
    }
    if (charge != Charge.None){
        logValue += ' '+ charge 
    }
    if (extraString != ''){
        logValue += ' '+ extraString 
    }
    
    console.error(logValue);
    console.log(logValue);
    
    
    
}
