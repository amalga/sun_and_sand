import { Injectable } from '@angular/core';

@Injectable()
export class CachingService {

    storePersistant(key: string, value: any) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    readPersistant(key: string): any {
        const value = localStorage.getItem(key);

        if (!value)
            return '';

        return JSON.parse(value);
    }
}