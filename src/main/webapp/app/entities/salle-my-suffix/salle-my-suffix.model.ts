import { BaseEntity } from './../../shared';

export class SalleMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public nom?: string,
        public adresse?: string,
        public telephone?: string,
        public villeId?: number,
        public pratiquants?: BaseEntity[],
    ) {
    }
}
