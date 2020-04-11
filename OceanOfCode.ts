/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/


function readline() : string{
    return "hello"
}/**
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
    private parent :Cell = null
    private parentMovedDirection : string = null
    constructor (
        private visited :Boolean,
        private isLand : Boolean,
        private discovered : Boolean = false,
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
    
    
    isDiscovered() : Boolean {
        return this.discovered;
    }
    
    setDiscovered(discovered: Boolean){
        this.discovered = discovered
    }

    setParent(parent: Cell){
        this.parent = parent
    }

    getParent(){
        return this.parent;
    }

    clearParent(){
        this.parent = null
    }

    setParentMoveDirection(direction : string) {
        this.parentMovedDirection= direction
    }
    getParentMoveDirection ():string{
        return this.parentMovedDirection
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



function getUpCell(x: number, y: number, board : Array<Cell>) : Cell{
    let newy = up(y)
    if (newy < 0){
        return null;
    }
    return board[toBoardNumber(x,newy)] 
}


function getDownCell(x: number, y: number, board : Array<Cell>) : Cell{
    let newy = y +1;
    if (newy > 14){
        return null;
    }
    
    return board[toBoardNumber(x,newy)] 
   
}

function getLeftCell(x: number, y: number, board : Array<Cell>) : Cell{
    let newX =  x -1;
    if (newX < 0){
        return null;
    }
    return board[toBoardNumber(newX,y)] 
}

function getRigthCell(x: number, y: number, board : Array<Cell>) : Cell{
    let newX =  x + 1;
    if (newX > 14){
        return null;
    }
   return board[toBoardNumber(newX,y)] 
   
}



function getRandomInt(max: number) :number {
  return Math.floor(Math.random() * Math.floor(max));
}

function checkAndEnqueu(cell : Cell, direction : string,  prevCell:Cell, nextCells:Array<Cell>) : Boolean{
    if (cell != null && cell.isDiscovered() == false && !cell.hasVisited() && !cell.getIsLand()){
        cell.setDiscovered(true);
        cell.setParent(prevCell);
        cell.setParentMoveDirection(direction)
        nextCells.push(cell)
        return true;
    }
    return false;
}


//Breth first search for a way that is within 5 spaces. Then select one at random
function findPath(x : number, y : number ,  board : Array<Cell>) :Cell{
    let nextCells : Array<Cell> = new Array<Cell>();
    let allVisitedCelsls :Array<Cell> = new Array<Cell>();
    let c: Cell = board[toBoardNumber(x,y)]    
    c.setDiscovered(true);
    nextCells.push(c);
    let depth : number = 0;
    while (nextCells.length > 0 && depth<50 ){
        let v : Cell = nextCells.pop()// pop == depth first? shift = breth first?
        allVisitedCelsls.push(v)
        let up :Cell = getUpCell(v.getX(), v.getY(), board)
        let down :Cell = getDownCell(v.getX(), v.getY(), board)
        let left :Cell = getLeftCell(v.getX(), v.getY(), board)
        let rigth :Cell = getRigthCell(v.getX(), v.getY(), board)
        
        checkAndEnqueu(left,"W", v, nextCells);
        checkAndEnqueu(up, "N", v, nextCells);
        checkAndEnqueu(down,"S", v, nextCells);
        checkAndEnqueu(rigth,"E", v, nextCells);
   
        depth++
    }
    console.error("Searched to depth : " + depth)
    
    console.error("allVisitedCelsls lenght : " + allVisitedCelsls.length)
    if (depth == 1){
        return null
    }
    
    let finalCell: Cell = allVisitedCelsls.pop();
    
   
    while(finalCell.getParent()!= null && finalCell.getParent() != c){ // C is the start cell,we want to find the one we should move to.
        finalCell = finalCell.getParent();
        
    }
    return finalCell;
       
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
            board.push(new Cell(false, true,false,  j, i));
        } else  {
             board.push(new Cell(false, false, false, j ,i ));
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

    board.forEach( function(c :Cell) {
            c.setDiscovered(false)
            c.setParent(null)})

    let nextCell : Cell = findPath(x,y,board);
    if (nextCell != null){
        direction = nextCell.getParentMoveDirection()

    }
    else {
        console.error('going to surface')
        action = Action.Surface
        board.forEach( function(c :Cell) {
            c.setVisited(false)
            c.setDiscovered(false)
            c.setParent(null)})
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
