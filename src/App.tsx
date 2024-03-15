import { useMemo, useState } from "react";
import { TextField, Typography } from "@mui/material";
import citiesData from "./resources/nl.json";
import { useDebouncedValue } from "./utils/useDebouncedValue";
import { type City, findCitiesByName } from "./utils/city";
import { styled } from "@mui/material/styles";
import { CitiesTable } from "./components/citiesTable/CitiesTable";

const Page = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 1280px;
  margin: 0 auto;
`;

const Header = styled("header")(({ theme }) => ({
  display: "flex",
  flexShrink: "0",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "1rem",

  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
  },
}));

const Main = styled("main")`
  padding: 1rem;
`;

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
    <Page>
      <Header>
        <Typography variant="h4" component="h1">
          Find Dutch City
        </Typography>
        <TextField
          sx={{
            width: "300px",
            alignSelf: { xs: "flex-end", md: "center" },
            marginTop: { xs: "1.5rem", md: 0 },
          }}
          autoFocus={true}
          label="City name"
          variant="outlined"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </Header>

      <Main>
        <CitiesTable cities={citiesToRender} />
      </Main>
    </Page>
  );
}

export default App;
