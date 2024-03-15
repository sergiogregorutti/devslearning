import { Fragment, ReactNode } from "react";
import { Container } from "@mui/material";
import Header from "../header/Header";
import Footer from "../footer/Footer";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props): JSX.Element => {
  return (
    <Fragment>
      <Header />
      <Container sx={{ paddingTop: { xs: "80px", sm: "94px" } }}>
        {children}
      </Container>
      <Footer />
    </Fragment>
  );
};

export default Layout;
