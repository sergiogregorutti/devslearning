import * as S from "./styled";

export default function Header() {
  return (
    <S.Container>
      <a href="https://www.okta.com/" aria-label="Okta Homepage">
        <S.Logo />
      </a>
    </S.Container>
  );
}
