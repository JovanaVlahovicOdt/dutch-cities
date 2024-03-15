import { TableCell, TableRow } from "@mui/material";
import { CSSProperties } from "react";
import { City } from "../../utils/city";

export function CityRow({
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
