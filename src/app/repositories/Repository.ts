export class Repository<T extends { id: string }> {
  private items: Map<string, T> = new Map();
 // Cria um novo registro
  create(item: T): T {
    if (this.items.has(item.id)) throw new Error("Item já existe");
    this.items.set(item.id, item);
    return item;
  }
 // Atualiza um registro existente
  update(item: T): T {
    if (!this.items.has(item.id)) throw new Error("Item não encontrado");
    this.items.set(item.id, item);
    return item;
  }
 // Remove pelo id
  delete(id: string): boolean {
    return this.items.delete(id);
  }
 // Busca por id
  getById(id: string): T | undefined {
    return this.items.get(id);
  }
 // Lista todos
  list(): T[] {
    return Array.from(this.items.values());
  }
}
