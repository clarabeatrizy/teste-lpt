# Travel Planner (Aplicativo de Planejamento de Viagens)

Projeto de exemplo em TypeScript para o trabalho bimestral: permite criar destinos, itinerários, atividades e estimar custos.

## Como usar (resumido)
1. Instale Node.js (LTS) e abra o projeto no VS Code.
2. No terminal: `npm install`
3. Rodar: `npm start` (usa ts-node) ou compilar `npm run build` e `npm run run`

## Estrutura principal
- src/app/models: entidades (Destination, Activity, Itinerary, BaseEntity)
- src/app/repositories: repositório genérico em memória
- src/app/types: enums
- src/app/TravelApp.ts: fachada que orquestra operações
- src/index.ts: exemplo de uso (ponto de entrada)

## Observações
- Arquitetura pensada para ser simples e didática.
- Pode-se adicionar persistência (arquivo JSON) ou transformar em API com Express.
