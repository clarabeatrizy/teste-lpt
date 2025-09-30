import { BaseEntity } from "./BaseEntity";
import { ActivityType } from "../types/enums";
// Interface para tipar os dados da atividade
export interface ActivityDTO {
  title: string;
  type: ActivityType;
  date: string; // ISO date
  estimatedCost?: number;
  notes?: string;
}

export class Activity extends BaseEntity {
  private _title: string;
  private _type: ActivityType;
  private _date: string;
  private _estimatedCost: number;
  private _notes?: string;

  constructor(dto: ActivityDTO, id?: string) {
    super(id);
    this._title = dto.title;
    this._type = dto.type;
    this._date = dto.date;
    this._estimatedCost = dto.estimatedCost ?? 0;
    this._notes = dto.notes;
    this.validate();
  }

  private validate() {
    if (!this._title) throw new Error("Atividade precisa de um título");
    if (isNaN(Date.parse(this._date))) throw new Error("Data da atividade inválida");
    if (this._estimatedCost < 0) throw new Error("Custo estimado não pode ser negativo");
  }

  get title() { return this._title; }
  get type() { return this._type; }
  get date() { return this._date; }
  get estimatedCost() { return this._estimatedCost; }
  get notes() { return this._notes; }

  set estimatedCost(v: number) {
    if (v < 0) throw new Error("Custo estimado não pode ser negativo");
    this._estimatedCost = v;
  }

  toJSON() {
    return {
      id: this.id,
      title: this._title,
      type: this._type,
      date: this._date,
      estimatedCost: this._estimatedCost,
      notes: this._notes
    };
  }
}
