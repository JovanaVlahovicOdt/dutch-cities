import styled from "@emotion/styled";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { useMemo, useState } from "react";
import { City } from "../utils/city";

const StyledTableCell = styled(TableCell)`
  color: white;
  background-color: #333;
  font-weight: 600;
  opacity: 0.9;
`;

interface CitiesTableProps {
  cities: City[];
}

// TODO: getPaginatedCities(cities, page, perPage): cities

export function CitiesTable({ cities }: CitiesTableProps) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  function handleChangeRowsPerPage(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setRowsPerPage(Number(event.target.value));
    setPage(0);
  }

  const citiesForDisplay = useMemo(() => {
    const startIndexOfCitiesForDisplay = page * rowsPerPage;
    const endIndexOfCitiesForDisplay =
      startIndexOfCitiesForDisplay + rowsPerPage;

    return cities?.slice(
      startIndexOfCitiesForDisplay,
      endIndexOfCitiesForDisplay
    );
  }, [cities, page, rowsPerPage]);

  return (
    <div
      style={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <TableContainer component={Paper} style={{ overflow: "auto" }}>
        <Table aria-label="cities" sx={{ tableLayout: "fixed" }} stickyHeader>
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">Name</StyledTableCell>
              <StyledTableCell align="left">Province</StyledTableCell>
              <StyledTableCell align="right">Population</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {citiesForDisplay.length > 0 ? (
              citiesForDisplay.map((city: City) => (
                <TableRow
                  key={city.name}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell component="th" scope="row">
                    {city.name}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {city.province}
                  </TableCell>
                  <TableCell align="right">{city.population}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} sx={{ textAlign: "center" }}>
                  There are no results for the search input
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        sx={{ flexShrink: 0 }}
        component="div"
        count={cities?.length}
        page={page}
        onPageChange={(_, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}
