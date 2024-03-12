import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { filter, switchMap, tap } from 'rxjs';

import { CountriesService } from '../../services/countries.service';
import { Region, SmallCountry } from '../../interfaces/country.interface';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: ``
})
export class SelectorPageComponent implements OnInit {

  public countriesByRegion: SmallCountry[] = [];
  public borders: string[] = [];

  public myForm: FormGroup = this.formBuilder.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    border: ['', Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    private countriesService: CountriesService,
  ) { }

  ngOnInit(): void {
    this.onRegionChanged();
    this.onCountryChanged();
  }

  get regions(): Region[] {
    return this.countriesService.regions;
  }

  private onRegionChanged(): void {
    this.myForm.get('region')!
      .valueChanges
      .pipe(
        tap(() => this.myForm.get('country')?.setValue('')),
        tap(() => this.borders = []),
        switchMap(region => this.countriesService.getCountriesByRegion(region)),
      )
      .subscribe(countries => {
        this.countriesByRegion = countries;
      });
  }

  private onCountryChanged(): void {
    this.myForm.get('country')!
      .valueChanges
      .pipe(
        tap(() => this.myForm.get('border')?.setValue('')),
        filter((value: string) => value.length > 0),
        switchMap(alphaCode => this.countriesService.getCountryByAlphaCode(alphaCode)),
      )
      .subscribe(country => {
        this.borders = country.borders;
      });
  }
}
