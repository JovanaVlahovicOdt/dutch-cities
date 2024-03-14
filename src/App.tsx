import { useMemo, useState } from "react";
import { TextField, Typography } from "@mui/material";
import citiesData from "./resources/nl.json";
import { CitiesTable } from "./components/CitiesTable";
import { useDebouncedValue } from "./utils/useDebouncedValue";
import { type City, findCitiesByName } from "./utils/city";

const cities: City[] = citiesData.map((city) => ({
  name: city.city,
  province: city.admin_name,
  population: city.population,
}));

function App() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedValue(search);

  const citiesToRender = useMemo(
    () => findCitiesByName(cities, debouncedSearch),
    [debouncedSearch]
  );

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <header
        style={{
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1rem",
        }}
      >
        <Typography variant="h4" component="h1">
          Find Dutch City
        </Typography>
        <TextField
          sx={{ width: "300px" }}
          label="City name"
          variant="outlined"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </header>

      <main
        style={{
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          overflow: "hidden",
        }}
      >
        <CitiesTable cities={citiesToRender} />
      </main>
    </div>
  );
}

export default App;
