import styled from "@emotion/styled";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import { Grid } from "./components/Grid";
import { Title } from "./components/Title";

const client = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={client}>
      <AppWrapper>
        <header>
          <Title />
        </header>
        <MainWrapper>
          <Grid />
        </MainWrapper>
      </AppWrapper>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

const AppWrapper = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
  background-color: #fffafa;
`;

const MainWrapper = styled("main")`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50%;
  margin: 20px 0;
`;

export default App;
