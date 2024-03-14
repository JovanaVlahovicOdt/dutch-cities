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
import { type CSSProperties, useMemo, useState } from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList as List } from "react-window";
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
            style={{
              height: ROW_HEIGHT * 10,
              width: "100%",
            }}
          >
            {citiesForDisplay.length > 0 ? (
              <AutoSizer>
                {({ height, width }: { height: number; width: number }) => (
                  <List
                    height={height}
                    width={width}
                    itemCount={citiesForDisplay.length}
                    itemSize={ROW_HEIGHT}
                    itemKey={(index, data) => data[index].name}
                    itemData={citiesForDisplay}
                  >
                    {CityRow}
                  </List>
                )}
              </AutoSizer>
            ) : (
              <TableRow component="div">
                <TableCell
                  component="div"
                  colSpan={3}
                  sx={{ textAlign: "center" }}
                >
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
