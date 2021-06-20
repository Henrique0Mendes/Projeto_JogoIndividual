export class Arma {

    name;
    atk;
    durabilidade;
    vida;
    idPersonagem;

    constructor(objectRecebido: any){
        this.name           =   objectRecebido.Nome;
        this.atk            =   objectRecebido.Atk;
        this.durabilidade   =   objectRecebido.durabilidade;
        this.vida           =   objectRecebido.Vida;
        this.idPersonagem   =   objectRecebido.ID_Player;
      }
}
