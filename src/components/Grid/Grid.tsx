import styled from "@emotion/styled";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "name",
    headerName: "Name",
    width: 150,
  },
  {
    field: "tagline",
    headerName: "Description",
    width: 300,
  },
  {
    field: "firstBrewed",
    headerName: "First Brewed",
    type: "date",
    width: 110,
  },
];

const rows = [] as GridRowsProp[];

export const Grid = () => {
  return (
    <GridWrapper>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
      />
    </GridWrapper>
  );
};

const GridWrapper = styled("div")`
  height: 400px;
  width: 100%;
  margin: 10px 0;
`;
