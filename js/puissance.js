
function createBoard(ligne,colonne){

    contenuElt.innerHTML="";
    let tableElt=document.createElement('table');
    for (let i=0; i<ligne;i++){
        board[i]=new Array();
        let ligneElt=document.createElement('tr');
        ligneElt.id="L"+i;
        for (let j=0; j<colonne; j++){
            board[i][j]=0;
            let colonneElt=document.createElement('td');
            colonneElt.id="L"+i+"C"+j;
            ligneElt.appendChild(colonneElt);
        };
        tableElt.appendChild(ligneElt);
    };
    contenuElt.appendChild(tableElt);
}
function newGame(){
    createBoard(ligne,colonne);
    createEvent(ligne,colonne);
}
function createEvent(ligne,colonne){
    for (let i=0; i<ligne;i++){
        for (let j=0; j<colonne; j++){
            let caseElt=document.getElementById("L"+i+"C"+j);
            caseElt.addEventListener('click',clickEvent);
        };
    };
}
function clickEvent(){
    let l=Number(this.id.charAt(3));
    let k=ligne-1;
        while (k>-1){
            if (board[k][l]==0){
                let caseMinElt=document.getElementById("L"+k+"C"+l);
                let divElt=document.createElement('div');
                divElt.className="player";
                caseMinElt.appendChild(divElt);
                divElt.style.backgroundColor=player==1?"red":"yellow";
                board[k][l]=player;
                verifVictoire(k,l);
                player*=-1;
                k=-1;
            }
            else {
            k--
            };
        };
}
function verifVictoire(i,j){
    let countLigne=0;
    let h=0;
    while (h<colonne){
        if (board[i][h]==player){
            countLigne++;
            h++;
        }
        else if (board[i][h]!==player&&countLigne==4){
            h++;
        }
        else {
            countLigne=0;
            h++;
        };
    };
    let countColonne=0;
    let v=0;
    while (v<ligne){
        if (board[v][j]==player){
            countColonne++;
            v++;
        }
        else if (board[v][j]!==player&&countColonne==4){
            v++;
        }
        else {
            countColonne=0;
            v++;
        };
    };
    let countDiag=0;
    let d=-Math.min(i,j);
    
    while(i+d<ligne&&j+d<colonne&&i+d>=0&&j+d>=0){
        
        if (board[i+d][j+d]==player){
            countDiag++;
            d++;
        }
        else if (board[i+d][j+d]!==player&&countDiag==4){
            d++;
        }
        else {
            countDiag=0;
            d++;
        };
    };
    let countAntiDiag=0;
    let a=-Math.min(i,colonne-1-j);
    while(i+a<ligne&&j-a<colonne&&i+a>=0&&j-a>=0){
        if (board[i+a][j-a]==player){
            countAntiDiag++;
            a++;
        }
        else if (board[i+a][j-a]!==player&&countAntiDiag==4){
            a++;
        }
        else {
            countAntiDiag=0;
            a++;
        };
    } ;
    if (countLigne>=3||countColonne>=3||countDiag>=3||countAntiDiag>=3){
        
        victoire=true;
        let gagnant=(player==1)?"Mena":"Mavo";
        let victoireElt=document.createElement('div');
        victoireElt.innerHTML="<h2>Ny mpandresy dia ny "+gagnant+" </h2>";
        contenuElt.appendChild(victoireElt);
        for (let i=0; i<ligne;i++){
            for (let j=0; j<colonne; j++){
               let caseElt=document.getElementById("L"+i+"C"+j);
                caseElt.style.backgroundColor="blue";
                caseElt.removeEventListener('click',clickEvent);
              
            };
        };
       
    }
    else {
        console.log("tour suivant");
    };
}
let colonne=4;
let ligne=4;
let board=new Array();
let contenuElt=document.getElementById('contenu');
contenuElt.innerHTML="Puissance 3";
let player=1;
let boutonElt = document.getElementById('newGame');
boutonElt.addEventListener("click", function(){
    player=1;
    newGame();
});