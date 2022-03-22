import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import { useQueries } from "react-query";

interface BrewerySummaryProps {
  breweryIDs: number[];
}

type Brewery = {
  id: number;
  name: string;
  city: string;
  country: string;
  created_at: string;
};

export const BrewerySummary = ({ breweryIDs }: BrewerySummaryProps) => {
  const queries = useQueries(
    breweryIDs.map((id: number) => ({
      queryKey: ["beer-summary", id],
      queryFn: async (): Promise<Brewery[]> => {
        const response = await fetch(
          `https://api.openbrewerydb.org/breweries/${id}`
        );
        const data = await response.json();
        return data;
      },
    }))
  );

  const data = queries.flatMap((query) => query.data);
  const isLoading = queries.some(({ isLoading }) => isLoading);
  const isError = queries.some(({ isError }) => isError);

  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError) return <Typography>Error to load.</Typography>;

  return (
    <ContentWrapper>
      <b>Top 3 oldest breweries in the United States:</b>
      {[
        ...new Set(
          data
            .filter((e) => e?.country === "United States")
            .sort((a, b) =>
              (b?.created_at ?? Date.UTC.toString()).localeCompare(
                a?.created_at ?? Date.UTC.toString()
              )
            )
            .map((e) => e?.name)
        ),
      ]
        .slice(0, 3)
        .map(
          (brewery: string | undefined, index: number) =>
            brewery && (
              <div key={brewery}>
                <p>
                  {index + 1} - {brewery}
                </p>
              </div>
            )
        )}
    </ContentWrapper>
  );
};

const ContentWrapper = styled("div")`
  width: 100%;
  margin: 10px 0;
`;
