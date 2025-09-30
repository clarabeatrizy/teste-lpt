import { BaseEntity } from "./BaseEntity";
import { Destination } from "./Destination";
import { Activity } from "./Activity";

export interface ItineraryDTO {
  title: string;
  destination: Destination;
  startDate: string; // ISO
  endDate: string;   // ISO
  notes?: string;
}

// Classe que representa o itinerário (roteiro da viagem)
export class Itinerary extends BaseEntity {
  private _title: string;
  private _destination: Destination;
  private _startDate: string;
  private _endDate: string;
  private _notes?: string;
  private _activities: Activity[] = [];

  constructor(dto: ItineraryDTO, id?: string) {
    super(id);
    this._title = dto.title;
    this._destination = dto.destination;
    this._startDate = dto.startDate;
    this._endDate = dto.endDate;
    this._notes = dto.notes;
    this.validateDates();
  }
  // Verifica se as datas são válidas
  private validateDates() {
    const s = Date.parse(this._startDate);
    const e = Date.parse(this._endDate);
    if (isNaN(s) || isNaN(e)) throw new Error("Datas inválidas");
    if (s > e) throw new Error("startDate não pode ser depois de endDate");
  }

  get title() { return this._title; }
  get destination() { return this._destination; }
  get startDate() { return this._startDate; }
  get endDate() { return this._endDate; }
  get notes() { return this._notes; }
  get activities() { return [...this._activities]; } // retorna cópia

  addActivity(act: Activity) {
    // valida se atividade dentro do período
    const d = Date.parse(act.date);
    if (d < Date.parse(this._startDate) || d > Date.parse(this._endDate)) {
      throw new Error("Atividade fora do período do itinerário");
    }
    this._activities.push(act);
  }

  removeActivity(activityId: string) {
    this._activities = this._activities.filter(a => a.id !== activityId);
  }

  estimateTotalCost(): number {
// Calcula o custo total: dias * custo do destino + atividades
    const days = Math.ceil((Date.parse(this._endDate) - Date.parse(this._startDate)) / (1000*60*60*24)) + 1;
    const destCost = days * this._destination.avgDailyCost;
    const activitiesCost = this._activities.reduce((s, a) => s + (a.estimatedCost ?? 0), 0);
    return destCost + activitiesCost;
  }

  toJSON() {
    return {
      id: this.id,
      title: this._title,
      destination: this._destination.toJSON(),
      startDate: this._startDate,
      endDate: this._endDate,
      notes: this._notes,
      activities: this._activities.map(a => a.toJSON()),
      estimatedTotalCost: this.estimateTotalCost()
    };
  }
}
