import styled from "styled-components";
import imageUrl1 from "../../assets/images/image 2.png";
import imageUrl2 from "../../assets/images/image 4.png";
import imageUrl3 from "../../assets/images/image 5.png";
import imageUrl4 from "../../assets/images/image 6.png";
import imageUrl5 from "../../assets/images/image 7.png";
import sortIcon from "../../assets/icons/icon_2.png";
import vectorIcon from "../../assets/icons/Vector.png"; // 🔥 추가

const MainContainer = styled.div`
    padding: 40px 160px;
`;

/* 🔹 필터 + 정렬 */
const FilterRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;
`;

const FilterLeft = styled.div`
    display: flex;
    gap: 12px;
`;

/* 🔥 버튼 안에 아이콘까지 포함 */
const FilterButton = styled.button`
    display: flex;
    align-items: center;
    gap: 6px;

    padding: 8px 14px;
    border: 1px solid #ddd;
    border-radius: 20px;
    background: #fff;
    font-size: 13px;
    color: #333;
    cursor: pointer;

    &:hover {
        background: #f5f5f5;
    }
`;

/* 🔹 버튼 안 아이콘 */
const VectorIcon = styled.img`
    width: 10px;
    height: 5px;
`;

/* 🔹 정렬 */
const SortWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 6px;
    cursor: pointer;
`;

const SortText = styled.div`
    font-size: 13px;
    color: #666;
`;

const SortIcon = styled.img`
    width: 18px;
    height: 18px;
`;

/* 🔹 상품 */
const ProductGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 60px 32px;
`;

const ProductCard = styled.div`
    display: flex;
    flex-direction: column;
`;

const ProductImage = styled.img`
    width: 100%;
    height: auto;
    border-radius: 10px;
`;

const ProductName = styled.div`
    margin-top: 12px;
    font-size: 14px;
    color: #222;
`;

const ProductPrice = styled.div`
    margin-top: 6px;
    font-size: 15px;
    font-weight: 700;
    color: #000;
`;

const ProductSub = styled.div`
    margin-top: 4px;
    font-size: 12px;
    color: #999;
`;

export default function Main() {
    const items = [
        { id: 1, name: "상품1", price: "145,000원", sub: "리뷰 1,561", image: imageUrl1 },
        { id: 2, name: "상품2", price: "145,000원", sub: "리뷰 1,732", image: imageUrl2 },
        { id: 3, name: "상품3", price: "255,000원", sub: "리뷰 781", image: imageUrl3 },
        { id: 4, name: "상품4", price: "458,000원", sub: "리뷰 2,567", image: imageUrl4 },
        { id: 5, name: "상품5", price: "235,000원", sub: "리뷰 231", image: imageUrl5 },
        { id: 6, name: "상품6", price: "199,000원", sub: "리뷰 980", image: imageUrl1 },
        { id: 7, name: "상품7", price: "210,000원", sub: "리뷰 640", image: imageUrl2 },
        { id: 8, name: "상품8", price: "175,000원", sub: "리뷰 312", image: imageUrl3 },
        { id: 9, name: "상품9", price: "480,000원", sub: "리뷰 1,102", image: imageUrl4 },
        { id: 10, name: "상품10", price: "260,000원", sub: "리뷰 540", image: imageUrl5 }
    ];

    return (
        <MainContainer>

            {/* 🔹 필터 + 정렬 */}
            <FilterRow>
                <FilterLeft>
                    <FilterButton>
                        성별 <VectorIcon src={vectorIcon} />
                    </FilterButton>
                    <FilterButton>
                        색상 <VectorIcon src={vectorIcon} />
                    </FilterButton>
                    <FilterButton>
                        사이즈 <VectorIcon src={vectorIcon} />
                    </FilterButton>
                    <FilterButton>
                        가격대 <VectorIcon src={vectorIcon} />
                    </FilterButton>
                    <FilterButton>
                        종류 <VectorIcon src={vectorIcon} />
                    </FilterButton>
                </FilterLeft>

                <SortWrapper>
                    <SortText>정렬순</SortText>
                    <SortIcon src={sortIcon} />
                </SortWrapper>
            </FilterRow>

            {/* 🔹 상품 */}
            <ProductGrid>
                {items.map((item) => (
                    <ProductCard key={item.id}>
                        <ProductImage src={item.image} alt={item.name} />
                        <ProductName>{item.name}</ProductName>
                        <ProductPrice>{item.price}</ProductPrice>
                        <ProductSub>{item.sub}</ProductSub>
                    </ProductCard>
                ))}
            </ProductGrid>

        </MainContainer>
    );
}