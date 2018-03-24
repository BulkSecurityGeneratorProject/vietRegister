import { BaseEntity } from './../../shared';

export const enum Grade {
    'CAP0',
    'CAP1',
    'CAP2',
    'CAP3',
    'CAP4',
    'NOIR',
    'DAN1',
    'DAN2',
    'DAN3',
    'DAN4',
    'DAN5',
    'DAN6',
    'DAN7',
    'DAN8',
    'DAN9',
    'DAN10'
}

export class PratiquantMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public nom?: string,
        public prenom?: string,
        public dateNaissance?: any,
        public email?: string,
        public telephone?: string,
        public grade?: Grade,
        public salleId?: number,
    ) {
    }
}
