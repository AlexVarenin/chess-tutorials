import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'selectedFilter'
})
export class SelectedFilterPipe implements PipeTransform {

  transform<T extends { id: string }>(entities: T[] | null, selectedEntities: T[] = []): T[] | null {
    const selectedIds = selectedEntities.map((entity: T) => entity.id);
    if (!entities) {
      return entities;
    }
    return entities.filter((entity: T) => !selectedIds.includes(entity.id))
  }
}
