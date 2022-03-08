import styled from "@emotion/styled";
import { Button } from "@mui/material";

export const Menu = () => (
  <MenuWrapper>
    <Button variant="contained" color="success">
      Fetch
    </Button>
    <Button variant="contained" color="info">
      Clear
    </Button>
  </MenuWrapper>
);

const MenuWrapper = styled("div")`
  margin: 10px 0;
  > * {
    margin: 0 10px;
  }
`;
