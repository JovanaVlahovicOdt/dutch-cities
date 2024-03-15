export interface City {
  name: string;
  province: string;
  population: string;
}

export function findCitiesByName(cities: City[], name: string) {
  return cities.filter((city) => {
    return city.name.toLowerCase().includes(name.toLowerCase());
  });
}

export function getPaginatedCities(
  cities: City[],
  page: number,
  perPage: number
) {
  const startIndexOfCitiesForDisplay = page * perPage;
  const endIndexOfCitiesForDisplay = startIndexOfCitiesForDisplay + perPage;

  return cities?.slice(
    startIndexOfCitiesForDisplay,
    endIndexOfCitiesForDisplay
  );
}
