export class Personagem {

    name;
    idPersonagem;
    ataque;
    isMonset;
    Inteligencia;
    vida;
    idPlayer;

    constructor(objectRecebido: any){
        this.name           = objectRecebido.Nome;
        this.idPersonagem   = objectRecebido.ID;
        this.ataque         = objectRecebido.Atk;
        this.isMonset      = objectRecebido.IsMonset;
        this.Inteligencia   = objectRecebido.Int;
        this.vida           = objectRecebido.Vida;
        this.idPlayer       = objectRecebido.ID_Player;
      }
      
}
