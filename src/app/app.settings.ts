export class AppSettings {
  private static restApiPath: string;

  public static setAppConfig() {
    this.restApiPath = 'https://iem-app.netlify.app/';
    if(window.location.origin.includes('localhost')){
        this.restApiPath = 'http://localhost:4000/';
    }
  }

  public static get SearchAqiData(): string {
    return this.restApiPath + 'searchAQIdata';
  }
  public static get GetAirQualityData(): string {
    return this.restApiPath + 'airqualitydata';
  }
  public static get GetLatestAirQualityReadings(): string {
    return this.restApiPath + 'getLatestAirQualityReadings';
  }
  public static get SaveAirQualityData(): string {
    return this.restApiPath + 'saveAirQualityData';
  }
  public static get GetUniqueCoordinates(): string {
    return this.restApiPath + 'getUniqueCoordinates';
  }
  public static get GetChartValues(): string {
    return this.restApiPath + 'getChartValues';
  }
  public static get GetAllAirQualityData(): string {
    return this.restApiPath + 'getAllAirQualityData';
  }
  public static get UpdateUser(): string {
    return this.restApiPath + 'updateUser';
  }
  public static get GetUserRole(): string {
    return this.restApiPath + 'getUserRole';
  }
}
