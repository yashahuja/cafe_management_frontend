export class AppSettings {
  private static restApiPath: string;

  public static setAppConfig() {
    this.restApiPath = 'https://cafe-management-be-0y4f.onrender.com/';
    if (window.location.origin.includes('localhost')) {
      this.restApiPath = 'http://localhost:4000/';
    }
  }

  public static get SearchAqiData(): string {
    return this.restApiPath + 'aqi/search';
  }
  public static get GetAirQualityData(): string {
    return this.restApiPath + 'aqi/broadcast';
  }
  public static get GetLatestAirQualityReadings(): string {
    return this.restApiPath + 'aqi/latestData';
  }
  public static get SaveAirQualityData(): string {
    return this.restApiPath + 'aqi/save';
  }
  public static get GetUniqueCoordinates(): string {
    return this.restApiPath + 'aqi/uniqueCoordinates';
  }
  public static get GetChartValues(): string {
    return this.restApiPath + 'aqi/chartData';
  }
  public static get GetAllAirQualityData(): string {
    return this.restApiPath + 'aqi/allData';
  }
  public static get UpdateUser(): string {
    return this.restApiPath + 'user/update';
  }
  public static get GetUserRole(): string {
    return this.restApiPath + 'user/role';
  }
}
