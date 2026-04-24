import { useState } from "react";
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

const SortText = styled.div`
    font-size: 13px;
    color: #666;
`;

const SortIcon = styled.img`
    width: 18px;
    height: 18px;
`;

/* 🔥 정렬 드롭다운 추가 스타일 */
const SortDropdown = styled.div`
    position: absolute;
    top: calc(100% + 8px);
    right: 0;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
    min-width: 140px;
    z-index: 200;
    padding: 8px 0;
`;

const SortOption = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;
    font-size: 13px;
    color: ${({ $active }) => ($active ? "#111" : "#666")};
    font-weight: ${({ $active }) => ($active ? "600" : "400")};
    cursor: pointer;

    &:hover {
        background: #f5f5f5;
    }
`;

/* 🔥 정렬 우측 래퍼 */
const SortRight = styled.div`
    display: flex;
    align-items: center;
    gap: 6px;
    cursor: pointer;
    position: relative;
`;

/* 🔹 상품 */
const ProductGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 5px;
`;

const ProductCard = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid #eee;
    border-radius: 12px;
    overflow: hidden;
    background: #fff;
`;

const ProductImage = styled.img`
    width: 100%;
    height: 237px;
    object-fit: cover;
`;

const ProductInfo = styled.div`
    padding: 10px 12px 14px;
`;

const ProductName = styled.div`
    font-size: 11px;
    color: #222;
`;

const ProductPrice = styled.div`
    margin-top: 4px;
    font-size: 11px;
    font-weight: 700;
    color: #000;
`;

const ProductSub = styled.div`
    margin-top: 2px;
    font-size: 11px;
    color: #999;
`;

/* 🔥 모달 추가 스타일 */
const Overlay = styled.div`
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.3);
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Modal = styled.div`
    background: #fff;
    border-radius: 16px;
    padding: 28px 32px;
    min-width: 260px;
    position: relative;
    z-index: 101;
`;

const ModalTitle = styled.div`
    font-size: 18px;
    font-weight: 600;
    color: #111;
    margin-bottom: 20px;
`;

const CloseButton = styled.button`
    position: absolute;
    top: 20px;
    right: 20px;
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
    color: #555;
    line-height: 1;
`;

const OptionRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
`;

const OptionChip = styled.button`
    padding: 8px 18px;
    border-radius: 20px;
    border: 1px solid #ddd;
    background: #fff;
    font-size: 14px;
    color: #333;
    cursor: pointer;

    &:hover {
        background: #f5f5f5;
    }
`;

/* 🔥 모달 컨텐츠 정의 */
const filterOptions = {
    성별: ["female", "male", "unisex"],
    색상: ["red", "pink", "blue", "black", "gray", "denim", "rainbow", "multi", "holographic"],
    사이즈: ["9", "10", "S", "M", "L", "XL"],
    가격대: ["0~30$", "31~60$", "61~90$"],
    종류: ["clothes", "shoes"],
};

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

    // 🔥 모달 상태
    const [activeFilter, setActiveFilter] = useState(null);
    // 🔥 정렬 드롭다운 상태
    const [sortOpen, setSortOpen] = useState(false);
    const [selectedSort, setSelectedSort] = useState("기본 정렬순");

    const openModal = (filterName) => setActiveFilter(filterName);
    const closeModal = () => setActiveFilter(null);

    const sortOptions = ["기본 정렬순", "평점 높은순", "리뷰 많은순"];

    const handleSortSelect = (option) => {
        setSelectedSort(option);
        setSortOpen(false);
    };

    return (
        <MainContainer onClick={() => setSortOpen(false)}>

            {/* 🔹 필터 + 정렬 */}
            <FilterRow>
                <FilterLeft>
                    <FilterButton onClick={() => openModal("성별")}>
                        성별 <VectorIcon src={vectorIcon} />
                    </FilterButton>
                    <FilterButton onClick={() => openModal("색상")}>
                        색상 <VectorIcon src={vectorIcon} />
                    </FilterButton>
                    <FilterButton onClick={() => openModal("사이즈")}>
                        사이즈 <VectorIcon src={vectorIcon} />
                    </FilterButton>
                    <FilterButton onClick={() => openModal("가격대")}>
                        가격대 <VectorIcon src={vectorIcon} />
                    </FilterButton>
                    <FilterButton onClick={() => openModal("종류")}>
                        종류 <VectorIcon src={vectorIcon} />
                    </FilterButton>
                </FilterLeft>

                {/* 🔥 정렬 드롭다운 */}
                <SortRight onClick={(e) => { e.stopPropagation(); setSortOpen((prev) => !prev); }}>
                    <SortText>{selectedSort}</SortText>
                    <SortIcon src={sortIcon} />
                    {sortOpen && (
                        <SortDropdown onClick={(e) => e.stopPropagation()}>
                            {sortOptions.map((option) => (
                                <SortOption
                                    key={option}
                                    $active={option === selectedSort}
                                    onClick={() => handleSortSelect(option)}
                                >
                                    {option}
                                    {option === selectedSort && <span>✓</span>}
                                </SortOption>
                            ))}
                        </SortDropdown>
                    )}
                </SortRight>
            </FilterRow>


            <ProductGrid>
                {items.map((item) => (
                    <ProductCard key={item.id}>
                        <ProductImage src={item.image} alt={item.name} />
                        <ProductInfo>
                            <ProductName>{item.name}</ProductName>
                            <ProductPrice>{item.price}</ProductPrice>
                            <ProductSub>{item.sub}</ProductSub>
                        </ProductInfo>
                    </ProductCard>
                ))}
            </ProductGrid>

            {/* 🔥 필터 모달 */}
            {activeFilter && (
                <Overlay onClick={closeModal}>
                    <Modal onClick={(e) => e.stopPropagation()}>
                        <ModalTitle>{activeFilter}</ModalTitle>
                        <CloseButton onClick={closeModal}>✕</CloseButton>
                        <OptionRow>
                            {filterOptions[activeFilter].map((option) => (
                                <OptionChip key={option}>{option}</OptionChip>
                            ))}
                        </OptionRow>
                    </Modal>
                </Overlay>
            )}

        </MainContainer>
    );
}