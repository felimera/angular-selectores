import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountriesService } from '../../services/countries.service';
import { Region } from '../../interfaces/country.interface';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: ``
})
export class SelectorPageComponent implements OnInit {

  public myForm: FormGroup = this.formBuilder.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    borders: ['', Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    private countriesService: CountriesService,
  ) { }

  ngOnInit(): void {
    this.onRegionChanged();
  }

  get regions(): Region[] {
    return this.countriesService.regions;
  }

  private onRegionChanged(): void {
    this.myForm.get('region')!
      .valueChanges
      .pipe(
        switchMap(region => this.countriesService.getCountriesByRegion(region)),
      )
      .subscribe(country => {
        console.log({ country })
      });
  }
}
