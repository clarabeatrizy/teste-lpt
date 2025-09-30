import { BaseEntity } from "./BaseEntity";
// Interface que define os dados necessários para criar um destino
export interface DestinationDTO {
  name: string;
  country: string;
  notes?: string;
  avgDailyCost?: number; // valor estimado por dia na moeda local
}
// Classe que representa um destino de viagem
export class Destination extends BaseEntity {
  private _name: string;
  private _country: string;
  private _notes?: string;
  private _avgDailyCost: number;

  constructor(dto: DestinationDTO, id?: string) {
    super(id);
    this._name = dto.name;
    this._country = dto.country;
    this._notes = dto.notes;
    this._avgDailyCost = dto.avgDailyCost ?? 0;
  }

  get name() { return this._name; }
  get country() { return this._country; }
  get notes() { return this._notes; }
  get avgDailyCost() { return this._avgDailyCost; }

  set notes(n: string | undefined) { this._notes = n; }
  set avgDailyCost(v: number) {
    if (v < 0) throw new Error("avgDailyCost não pode ser negativo");
    this._avgDailyCost = v;
  }
  // Retorna o objeto em formato JSON (para imprimir no console)
  toJSON() {
    return {
      id: this.id,
      name: this._name,
      country: this._country,
      notes: this._notes,
      avgDailyCost: this._avgDailyCost
    };
  }
}
