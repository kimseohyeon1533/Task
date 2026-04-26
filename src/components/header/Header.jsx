import styled from "styled-components";
import logUrl from "../../assets/images/kream_image.png"
import homeUrl from "../../assets/icons/home_icon.png"
import {useLocation, useNavigate} from "react-router-dom";

const LogoImage = styled.img`
    width: 166px;
    height: 141px;
`;

const HomeIcon = styled.img`
    width: 61px;
    height: 24px;
`;

const HeaderContainer = styled.div`
    padding-right: 160px;
    padding-left: 160px;
    display: flex;
    justify-content: space-between;
`;

const HeaderRight = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 36px;
    padding-top: 9px;
    padding-bottom: 58px;
`;

const Button = styled.div`
    color: #6c6c6c;
    font-size: 13px;
    font-family: Pretendard;
    font-weight: 400;
`;

export default function Header(){

    const {pathname} = useLocation(); //현재 페이지 경로 불러오기
    const navigate = useNavigate();
    const buttonName = "상품등록";

    return(
        <div>
            <HeaderContainer>
            <LogoImage src={logUrl}/>
            <HeaderRight>
            {pathname === "/" && (
                <Button onClick={()=>navigate("/add")}>{buttonName}</Button>
            )}
            <HomeIcon src={homeUrl}/>
            </HeaderRight>
            </HeaderContainer>

        </div>
    );
}