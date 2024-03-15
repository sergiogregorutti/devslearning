"use client";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import {
  Container,
  AppBar,
  Toolbar,
  Button,
  // IconButton,
  // Drawer,
  // Accordion,
  // AccordionSummary,
  // AccordionDetails,
  MenuItem,
  Select,
  useMediaQuery,
} from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
// import MenuIcon from "@mui/icons-material/Menu";
// import CloseIcon from "@mui/icons-material/Close";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { setCookie, getCookie } from "../../lib/helpers";

interface IMenuItem {
  label: string;
  href: string;
  variant: "text" | "contained" | "outlined" | undefined;
  callback?: Function;
}

export default function HeaderEs() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const [state, setState] = useState({
    mobileView: false,
    drawerOpen: false,
  });
  const [headersData, setHeadersData] = useState<IMenuItem[]>([]);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [language, setLanguage] = useState(getCookie("language") || "en");

  // const { mobileView, drawerOpen } = state;
  const { mobileView } = state;

  useEffect(() => {
    // setHeadersData(generateHeadersData(history));

    const setResponsiveness = () => {
      return window.innerWidth < 900
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };

    setResponsiveness();

    window.addEventListener("resize", () => setResponsiveness());

    return () => {
      window.removeEventListener("resize", () => setResponsiveness());
    };
  }, []);

  /*
  const generateHeadersData = (history: RouteComponentProps["history"]) => {
    const headersData: IMenuItem[] = [];
    if (!isAuth()) {
      headersData.push({
        label: "Sign In",
        href: "/signin",
        variant: "text",
      });
      headersData.push({
        label: "Create Account",
        href: "/signup",
        variant: "contained",
      });
    }
    if (isAuth()) {
      headersData.push({
        label: "My Account",
        href: "/my-account",
        variant: "text",
      });
    }
    if (isAuth()) {
      headersData.push({
        label: "Log Out",
        href: "",
        variant: "text",
        callback: () => {
          signout(() => {
            setHeadersData(generateHeadersData(history));
            history.push("/");
          });
        },
      });
    }
    return headersData;
  };
  */

  const displayDesktop = () => {
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
      <Toolbar
        disableGutters={true}
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {devsLearningLogo}
        <div style={{ display: "flex" }}>
          {/*
          {isAuth() && isAuth().role === "admin" && (
            <>
              <Button
                id="basic-button"
                aria-controls="basic-menu"
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                Admin
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <div>
                  <Button
                    component={RouterLink}
                    to={"/admin/categories"}
                    sx={{ textTransform: "none" }}
                  >
                    Categories
                  </Button>
                </div>
                <div>
                  <Button
                    component={RouterLink}
                    to={"/admin/courses"}
                    sx={{ textTransform: "none" }}
                  >
                    Courses
                  </Button>
                </div>
                <div>
                  <Button
                    component={RouterLink}
                    to={"/admin/es/categories"}
                    sx={{ textTransform: "none" }}
                  >
                    Categories (ES)
                  </Button>
                </div>
                <div>
                  <Button
                    component={RouterLink}
                    to={"/admin/es/courses"}
                    sx={{ textTransform: "none" }}
                  >
                    Courses (ES)
                  </Button>
                </div>
              </Menu>
            </>
          )}
          {isAuth() && isAuth().role === "admin" && getMenuButtons()}
              */}

          <LanguageIcon
            sx={{
              fill: "#000",
              position: "relative",
              top: "9px",
              right: "-12px",
            }}
          />
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={language}
            onChange={handleLanguageChange}
            sx={{
              height: "42px",
              marginLeft: "10px",
              backgroundColor: "transparent",
              ".MuiSelect-select": {
                padding: "9px 32px 9px 9px",
                img: {
                  position: "relative",
                  top: "3px",
                },
              },
              fieldset: {
                border: "none",
              },
            }}
          >
            <MenuItem value="en">EN</MenuItem>
            <MenuItem value="es">ES</MenuItem>
          </Select>
        </div>
      </Toolbar>
    );
  };

  const displayMobile = () => {
    /*
    const handleDrawerOpen = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: true }));
    const handleDrawerClose = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: false }));
    */

    return (
      <Toolbar
        disableGutters={true}
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>{devsLearningLogo}</div>

        <div>
          <LanguageIcon
            sx={{
              fill: "#000",
              position: "relative",
              top: "6px",
              right: "-25px",
            }}
          />
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={language}
            onChange={handleLanguageChange}
            sx={{
              height: { xs: "36px", sm: "42px" },
              marginLeft: "10px",
              backgroundColor: "transparent",
              right: "-10px",
              ".MuiSelect-select": {
                padding: { xs: "9px 24px 9px 9px", sm: "9px 32px 9px 9px" },
                paddingRight: { xs: "30px", sm: "32px" },
                img: {
                  position: "relative",
                  top: "3px",
                },
              },
              "MuiSvgIcon-root": {
                right: { xs: "1px", sm: "7px" },
              },
              fieldset: {
                border: "none",
              },
            }}
          >
            <MenuItem value="en">{matches ? "EN" : "EN"}</MenuItem>
            <MenuItem value="es">{matches ? "ES" : "ES"}</MenuItem>
          </Select>
        </div>

        {/*
        <IconButton
          {...{
            edge: "start",
            color: "inherit",
            "aria-label": "menu",
            "aria-haspopup": "true",
            onClick: handleDrawerOpen,
          }}
        >
          <MenuIcon sx={{ color: "#1c1c1a" }} />
        </IconButton>

        <Drawer
          {...{
            anchor: "right",
            open: drawerOpen,
            onClose: handleDrawerClose,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              minWidth: "250px",
              padding: "20px",
            }}
          >
            <div style={{ textAlign: "right" }}>
              <CloseIcon onClick={handleDrawerClose} />
            </div>
            {isAuth() && isAuth().role === "admin" && (
              <>
                <Accordion
                  sx={{
                    boxShadow: "none",
                    ":before": {
                      display: "none",
                    },
                  }}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Button sx={{ textTransform: "none" }}>Admin</Button>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div>
                      <Button
                        component={RouterLink}
                        to={"/admin/categories"}
                        sx={{ textTransform: "none" }}
                      >
                        Categories
                      </Button>
                    </div>
                    <div>
                      <Button
                        component={RouterLink}
                        to={"/admin/courses"}
                        sx={{ textTransform: "none" }}
                      >
                        Courses
                      </Button>
                    </div>
                  </AccordionDetails>
                </Accordion>
              </>
            )}
            {getDrawerChoices()}
          </div>
        </Drawer>
        */}
      </Toolbar>
    );
  };

  const devsLearningLogo = (
    <Link href="/">
      {matches ? (
        <Image
          height="30"
          width="234"
          src="../assets/logo-isologo.svg"
          style={{ marginTop: "12px" }}
          alt="DevsLearning"
        />
      ) : (
        <Image
          height="22"
          width="172"
          src="../assets/logo-isologo.svg"
          style={{ marginTop: "12px" }}
          alt="DevsLearning"
        />
      )}
    </Link>
  );

  const getMenuButtons = () => {
    return headersData.map(({ label, href, variant, callback }: IMenuItem) => {
      if (callback !== undefined) {
        return (
          <Button
            variant={variant}
            key={label}
            onClick={() => {
              callback();
            }}
            sx={{ textTransform: "none" }}
          >
            {label}
          </Button>
        );
      } else {
        return (
          <Button
            variant={variant}
            key={label}
            {...{
              color: "inherit",
              href: href,
              component: Link,
            }}
            sx={{ textTransform: "none" }}
          >
            {label}
          </Button>
        );
      }
    });
  };

  /*
  const getDrawerChoices = () => {
    if (headersData) {
      return headersData.map(({ label, href, variant, callback }) => {
        if (callback !== undefined) {
          return (
            <Button
              variant={variant}
              key={label}
              onClick={() => {
                callback();
              }}
              sx={{ textTransform: "none" }}
            >
              {label}
            </Button>
          );
        }

        return (
          <Button
            variant={variant}
            key={label}
            component={RouterLink}
            to={href}
            sx={{ textTransform: "none" }}
          >
            {label}
          </Button>
        );
      });
    }
  };
  */

  const handleLanguageChange = (event: any) => {
    setCookie("language", event.target.value);
    setLanguage(event.target.value);
  };

  if (language === "es") {
    return redirect("/es/");
  }

  return (
    <AppBar
      sx={{
        backgroundColor: "#fff",
        boxShadow: "none",
      }}
    >
      <Container sx={{ borderBottom: "1px solid #ccc" }}>
        {mobileView ? displayMobile() : displayDesktop()}
      </Container>
    </AppBar>
  );
}
