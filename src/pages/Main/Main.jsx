import styled from "styled-components";
import imageUrl from "../../assets/images/image 2.png";

const MainContainer = styled.div`
    padding: 40px 160px;
`;

const ProductGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
`;

const ProductCard = styled.div`
    display: flex;
    flex-direction: column;
`;

const ProductImage = styled.img`
    width: 100%;
    height: 237px;
    object-fit: cover;
    border-radius: 10px;
`;

const ProductName = styled.div`
    margin-top: 10px;
    font-size: 14px;
    color: #222;
`;

const ProductPrice = styled.div`
    margin-top: 6px;
    font-size: 15px;
    font-weight: 700;
    color: #000;
`;

export default function Main() {
    const items = [
        {
            id: 1,
            name: "오프화이트 후드티",
            price: "129,000원",
            image: imageUrl
        },
        {
            id: 2,
            name: "오프화이트 후드티",
            price: "129,000원",
            image: imageUrl
        },
        {
            id: 3,
            name: "오프화이트 후드티",
            price: "129,000원",
            image: imageUrl
        }
    ];

    return (
        <MainContainer>
            <ProductGrid>
                {items.map((item) => (
                    <ProductCard key={item.id}>
                        <ProductImage src={item.image} alt={item.name} />
                        <ProductName>{item.name}</ProductName>
                        <ProductPrice>{item.price}</ProductPrice>
                    </ProductCard>
                ))}
            </ProductGrid>
        </MainContainer>
    );
}