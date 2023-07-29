import { Component, OnInit } from '@angular/core';
import { MyApiService } from './my-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  storedValue: string = 'bangalore';
  isLoading: boolean = false;
  error: boolean = false;
  temperature: number = 0;
  desc: string = "";
  name: string = "";
  humidity: string = "";
  visibility: number = 0;
  windSpeed: string = "";
  wIcon: string = "";

  constructor(private myApiService: MyApiService) { }

  ngOnInit() {
    this.getWeatherData(this.storedValue);
  }

  getWeatherData = (city: string) => {
    this.isLoading = true;
    this.myApiService.getData(city).subscribe(
      (response) => {
        this.isLoading = false;
        this.temperature = Math.round(response.main.temp - 273.15);
        this.desc = response.weather[0].description;
        this.name = response.name;
        this.humidity = response.main.humidity;
        this.visibility = response.visibility / 1000;
        this.windSpeed = response.wind.speed;
        this.wIcon = response.weather[0].icon;
        setTimeout(() => {
          this.isLoading = false;
        }, 2000);
      },
      (error) => {
        console.error('Error fetching data:', error);
        this.isLoading = false;
        this.error = true;
      }
    );
  };

  onInputChange(e: any) {
    this.storedValue = e.target.value;
  }
}
