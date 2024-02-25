"use client";

/* eslint-disable import/prefer-default-export */
/* stylelint-disable */
import styled from "styled-components";
import { media } from "lib/media";
import OktaLogo from "assets/OktaLogo.svg";

export const Container = styled.div`
  margin-right: auto;
  margin-left: auto;
  max-width: 1280px;
  width: calc(100% - (48px * 2));
  padding: 0 15px;
  position: absolute;
  left: 0;
  right: 0;

  ${media.tablet`
    width: calc(100% - (20px * 2));
  `}
`;

export const Logo = styled(OktaLogo)`
  width: 110px;
  padding-top: 64px;

  ${media.tablet`
    padding-top: 40px;
  `}

  ${media.phone`
    padding-top: 22px;
  `}
`;
