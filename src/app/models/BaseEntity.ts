
// Classe abstrata que gera um ID único para todas as entidades
export abstract class BaseEntity {
  protected _id: string;

   // Se não passar um id, gera automaticamente
  constructor(id?: string) {
    this._id = id ?? BaseEntity.generateId();
  }
  // Getter para acessar o id de forma encapsulada
  get id(): string {
    return this._id;
  }
  // Método privado que cria um id único (timestamp + número aleatório)
  private static generateId(): string {
    // id simples: timestamp + rand
    return `${Date.now()}-${Math.floor(Math.random()*10000)}`;
  }
}
