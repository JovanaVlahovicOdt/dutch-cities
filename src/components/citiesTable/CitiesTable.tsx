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
import { useMemo, useState } from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList as List } from "react-window";
import { City, getPaginatedCities } from "../../utils/city";
import { blue } from "@mui/material/colors";
import { CityRow } from "./CityRow";

const StyledTableCell = styled(TableCell)`
  color: rgba(255, 255, 255, 0.87);
  background-color: ${blue[800]};
  font-weight: 600;
`;

const ROW_HEIGHT = 53;

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
      <TableContainer component="div">
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
        page={paginatedCities?.length > 0 ? page : 0}
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
