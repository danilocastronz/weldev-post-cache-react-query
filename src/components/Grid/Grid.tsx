import styled from "@emotion/styled";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import { useQuery } from "react-query";

import { BrewerySummary } from "../BrewerySummary";

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

const fetchRecipeData = async () => {
  const response = await fetch("https://api.punkapi.com/v2/beers");
  const data = await response.json();
  return data;
};

const fetchBreweryData = async () => {
  const response = await fetch("https://api.openbrewerydb.org/breweries");
  const data = await response.json();
  return data;
};

type BeerRecipe = {
  id: number;
  name: string;
  tagline: string;
  first_brewed: string;
  food_pairing: string[];
};

type Brewery = {
  id: number;
  name: string;
  brewery_type: string;
  country: string;
  created_at: string;
};

export const Grid = () => {
  const [selectedRowID, setSelectedRowID] = useState<number | null>(null);

  // beer recipe API
  const recipeQuery = useQuery<BeerRecipe[]>("beer-recipes", fetchRecipeData);
  // brewery API
  const breweryQuery = useQuery<Brewery[]>("breweries", fetchBreweryData);
  // food pairing query
  const foodQuery = useQuery<BeerRecipe[]>(
    ["food-pairing", selectedRowID],
    async () => {
      if (selectedRowID) {
        const response = await fetch(
          `https://api.punkapi.com/v2/beers/${selectedRowID}`
        );
        const data = await response.json();
        return data;
      }
      return [];
    },
    {
      enabled: !!selectedRowID,
    }
  );

  return (
    <>
      <GridWrapper>
        <DataGrid
          rows={
            recipeQuery.data?.map((beer: BeerRecipe) => ({
              id: beer.id.toString(),
              name: beer.name,
              tagline: beer.tagline,
              firstBrewed: beer.first_brewed,
            })) || []
          }
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          onRowClick={(row) => setSelectedRowID(row["id"] as number)}
        />
      </GridWrapper>
      <ContentWrapper>
        {!foodQuery.isLoading && !foodQuery.isError && foodQuery.data && (
          <p>Food Pairing: {foodQuery.data[0].food_pairing.join(", ")}.</p>
        )}
      </ContentWrapper>
      {breweryQuery.data && (
        <ContentWrapper>
          <BrewerySummary breweryIDs={breweryQuery.data.map((e) => e.id)} />
        </ContentWrapper>
      )}
      <ContentWrapper>
        <b>Top 3 breweries in the United States:</b>
        {[...new Set(breweryQuery.data?.map((e) => `${e.name}-${e.country}`))]
          ?.sort((a, b) => (a < b ? -1 : 1))
          .slice(0, 3)
          .map((brewery: string, index: number) => (
            <div key={brewery}>
              <p>
                {index + 1} - {brewery}
              </p>
            </div>
          ))}
      </ContentWrapper>
    </>
  );
};

const GridWrapper = styled("div")`
  height: 400px;
  width: 100%;
  margin: 10px 0;
`;

const ContentWrapper = styled("div")`
  width: 100%;
  margin: 10px 0;
`;
