import { BaseEntity } from './../../shared';

export class VilleMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public nom?: string,
        public salles?: BaseEntity[],
    ) {
    }
}
