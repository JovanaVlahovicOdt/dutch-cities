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
  Typography,
} from "@mui/material";
import { type CSSProperties, useMemo, useState } from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList as List } from "react-window";
import { City } from "../utils/city";
import { blue } from "@mui/material/colors";

const StyledTableCell = styled(TableCell)`
  color: rgba(255, 255, 255, 0.87);
  background-color: ${blue[800]};
  font-weight: 600;
`;

function CityRow({
  index,
  data,
  style,
}: {
  index: number;
  data: City[];
  style: CSSProperties;
}) {
  const city = data[index];
  return (
    <TableRow
      component="div"
      style={{ ...style }}
      sx={{
        display: "flex",
        "&:last-child div, &:last-child div": { border: 0 },
      }}
    >
      <TableCell sx={{ flex: 1 }} component="div" scope="row">
        {city.name}
      </TableCell>
      <TableCell sx={{ flex: 1 }} component="div" scope="row">
        {city.province}
      </TableCell>
      <TableCell sx={{ flex: 1 }} component="div" align="right">
        {city.population}
      </TableCell>
    </TableRow>
  );
}

const ROW_HEIGHT = 53;

function getPaginatedCities(cities: City[], page: number, perPage: number) {
  const startIndexOfCitiesForDisplay = page * perPage;
  const endIndexOfCitiesForDisplay = startIndexOfCitiesForDisplay + perPage;

  return cities?.slice(
    startIndexOfCitiesForDisplay,
    endIndexOfCitiesForDisplay
  );
}

export function CitiesTable({ cities }: { cities: City[] }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  function handleChangeRowsPerPage(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setRowsPerPage(Number(event.target.value));
    setPage(0);
  }

  const paginatedCities = useMemo(
    () => getPaginatedCities(cities, page, rowsPerPage),
    [cities, page, rowsPerPage]
  );

  return (
    <Paper elevation={4}>
      <TableContainer component={Paper}>
        <Table
          component="div"
          aria-label="cities"
          sx={{ tableLayout: "fixed" }}
          stickyHeader
        >
          <TableHead component="div">
            <TableRow component="div">
              <StyledTableCell component="div" align="left">
                Name
              </StyledTableCell>
              <StyledTableCell component="div" align="left">
                Province
              </StyledTableCell>
              <StyledTableCell component="div" align="right">
                Population
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody
            component="div"
            sx={{
              position: "relative",
              height: ROW_HEIGHT * 10,
              width: "100%",
            }}
          >
            {paginatedCities.length > 0 ? (
              <AutoSizer>
                {({ height, width }: { height: number; width: number }) => (
                  <List
                    height={height}
                    width={width}
                    itemCount={paginatedCities.length}
                    itemSize={ROW_HEIGHT}
                    itemKey={(index, data) => data[index].name}
                    itemData={paginatedCities}
                  >
                    {CityRow}
                  </List>
                )}
              </AutoSizer>
            ) : (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <NoResultsFallback />
              </div>
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
    </Paper>
  );
}

function NoResultsFallback() {
  return (
    <Typography variant="body1">
      There are no results for the search input.
    </Typography>
  );
}
