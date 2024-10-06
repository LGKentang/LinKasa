import React from 'react';
import { CreateBranch } from './CreateBranch';

export enum LinkasaObject {
    BoardingPass = 'BoardingPass'
}

export class CRUDFactory {
    constructor() {}

    createCRUDFragment(entity: LinkasaObject): JSX.Element {
        const create = () => CreateBranch(entity)
        const read = () => {};
        const update = () => {};
        const remove = () => {};
        

        return (
            <>
                {
                
                }
            </>
        );
    }
}
