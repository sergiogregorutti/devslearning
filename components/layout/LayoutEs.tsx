import { Fragment, ReactNode } from "react";
import { Container } from "@mui/material";
import HeaderEs from "../header/HeaderEs";
import FooterEs from "../footer/FooterEs";

interface Props {
  children: ReactNode;
}

const LayoutEs = ({ children }: Props): JSX.Element => {
  return (
    <Fragment>
      <HeaderEs />
      <Container sx={{ paddingTop: { xs: "80px", sm: "94px" } }}>
        {children}
      </Container>
      <FooterEs />
    </Fragment>
  );
};

export default LayoutEs;
