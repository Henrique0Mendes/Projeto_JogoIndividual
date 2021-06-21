export class Arma {

    name;
    atk;
    durabilidade;
    TipoDeArma;
    idPersonagem;

    constructor(objectRecebido: any){
        this.name           =   objectRecebido.nome;
        this.atk            =   objectRecebido.Atk;
        this.TipoDeArma     =   objectRecebido.TipoDeArma;
        this.durabilidade   =   objectRecebido.Durabilidade;
        this.idPersonagem   =   objectRecebido.IDPersonagem;
      }
}
