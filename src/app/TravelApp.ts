import { Repository } from "./repositories/Repository";
import { Destination, DestinationDTO } from "./models/Destination";
import { Itinerary, ItineraryDTO } from "./models/Itinerary";
import { Activity, ActivityDTO } from "./models/Activity";

export class TravelApp {
  private destinationRepo = new Repository<Destination>();
  private itineraryRepo = new Repository<Itinerary>();


  // Criar destino
  createDestination(dto: DestinationDTO): Destination {
    try {
      const d = new Destination(dto);
      return this.destinationRepo.create(d);
    } catch (err) {
      throw new Error(`Falha ao criar destino: ${(err as Error).message}`);
    }
  }
 // Listar destinos
  listDestinations(): Destination[] {
    return this.destinationRepo.list();
  }

  updateDestination(dest: Destination): Destination {
    return this.destinationRepo.update(dest);
  }

  deleteDestination(id: string): boolean {
    // opcional: validar se destino vinculado a itinerário
    const hasItin = this.itineraryRepo.list().some(i => i.destination.id === id);
    if (hasItin) throw new Error("Não é possível apagar destino vinculado a um itinerário");
    return this.destinationRepo.delete(id);
  }

  // Itinerários
  createItinerary(dto: ItineraryDTO): Itinerary {
    try {
      const it = new Itinerary(dto);
      return this.itineraryRepo.create(it);
    } catch (err) {
      throw new Error(`Falha ao criar itinerário: ${(err as Error).message}`);
    }
  }

  listItineraries(): Itinerary[] {
    return this.itineraryRepo.list();
  }

  addActivityToItinerary(itineraryId: string, activityDto: ActivityDTO) {
    const it = this.itineraryRepo.getById(itineraryId);
    if (!it) throw new Error("Itinerário não encontrado");
    const act = new Activity(activityDto);
    it.addActivity(act);
    this.itineraryRepo.update(it);
    return act;
  }
 
  removeActivityFromItinerary(itineraryId: string, activityId: string) {
    const it = this.itineraryRepo.getById(itineraryId);
    if (!it) throw new Error("Itinerário não encontrado");
    it.removeActivity(activityId);
    this.itineraryRepo.update(it);
  }
  // Calcular custo do itinerário
  estimateItineraryCost(itineraryId: string): number {
    const it = this.itineraryRepo.getById(itineraryId);
    if (!it) throw new Error("Itinerário não encontrado");
    return it.estimateTotalCost();
  }
}
