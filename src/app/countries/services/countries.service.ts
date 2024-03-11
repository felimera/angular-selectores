import { Injectable } from '@angular/core';

import { Region, SmallCountry } from '../interfaces/country.interface';

@Injectable({ providedIn: 'root' })
export class CountriesService {

  private _regions: Region[] = [Region.Africa, Region.Americas, Region.Asia, Region.Europe, Region.Oceania];

  get regions(): Region[] {
    return [...this._regions];
  }

  getCountriesByRegion(region: Region): SmallCountry[] {
    return [];
  }
}
