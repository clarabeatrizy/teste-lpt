import { TravelApp } from "./app/TravelApp";
import { ActivityType } from "./app/types/enums";

async function main() {
  const app = new TravelApp();

  try {
    // criar destino
    const dest = app.createDestination({
      name: "Rio de Janeiro",
      country: "Brasil",
      notes: "Cidade maravilhosa",
      avgDailyCost: 150
    });
    console.log("Destino criado:", dest.toJSON());

    // criar itinerário
    const it = app.createItinerary({
      title: "Férias no RJ",
      destination: dest,
      startDate: "2025-12-20",
      endDate: "2025-12-25",
      notes: "Visitar praias e pão de açúcar"
    });
    console.log("Itinerário criado:", it.toJSON());

    // adicionar atividade válida
    const act = app.addActivityToItinerary(it.id, {
      title: "Praia de Copacabana",
      type: ActivityType.SIGHTSEEING,
      date: "2025-12-21",
      estimatedCost: 0,
      notes: "Dia de praia"
    });
    console.log("Atividade adicionada:", act.toJSON());

    // estimativa de custo
    const total = app.estimateItineraryCost(it.id);
    console.log("Custo estimado do itinerário:", total);

    // listar itinerários
    console.log("Itinerários:", app.listItineraries().map(i => i.toJSON()));
  } catch (err) {
    console.error("Erro:", (err as Error).message);
  }
}

main();
