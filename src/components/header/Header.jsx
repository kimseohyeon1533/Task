import styled from "styled-components";
import logoUrl from "../../assets/images/kream_image.png";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getProducts } from "../../utils/productStore";

const HeaderContainer = styled.header`
  width: min(1280px, calc(100vw - 48px));
  margin: 0 auto;
  padding: 42px 112px 20px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const LogoImage = styled.img`
  width: 125px;
  height: auto;
  cursor: pointer;
`;

const HeaderRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 26px;
`;

const Nav = styled.nav`
  display: flex;
  gap: 28px;
  align-items: center;
`;

const NavButton = styled.button`
  border: none;
  background: transparent;
  padding: 0;
  color: ${({ $active }) => ($active ? "#111" : "#6c6c6c")};
  font-size: 13px;
  font-weight: ${({ $active }) => ($active ? 700 : 400)};
  cursor: pointer;

  &:hover {
    color: #111;
  }
`;

const HomeButton = styled.button`
  border: none;
  background: transparent;
  color: #222;
  font-size: 21px;
  font-weight: 400;
  cursor: pointer;
`;

export default function Header() {
  const { pathname } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();

  const fallbackId = getProducts()[0]?.id ?? 1;
  const currentId = id ?? fallbackId;

  return (
    <HeaderContainer>
      <LogoImage src={logoUrl} alt="KREAM" onClick={() => navigate("/")} />
      <HeaderRight>
        <Nav>
          <NavButton $active={pathname === "/add"} onClick={() => navigate("/add")}>상품등록</NavButton>
          <NavButton $active={pathname.startsWith("/delete")} onClick={() => navigate(`/delete/${currentId}`)}>상품삭제</NavButton>
          <NavButton $active={pathname.startsWith("/edit")} onClick={() => navigate(`/edit/${currentId}`)}>상품수정</NavButton>
        </Nav>
        <HomeButton onClick={() => navigate("/")}>HOME</HomeButton>
      </HeaderRight>
    </HeaderContainer>
  );
}
