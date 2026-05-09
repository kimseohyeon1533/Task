import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { getProductById } from "../../utils/productStore";

const Page = styled.div`
  width: min(1280px, calc(100vw - 48px));
  margin: 0 auto;
  padding: 18px 110px 58px;
`;

const DetailLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1px 360px;
  gap: 58px;
  align-items: start;
  min-height: 655px;
`;

const ImageArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 620px;
`;

const ProductImage = styled.img`
  width: 430px;
  max-height: 520px;
  object-fit: contain;
`;

const Divider = styled.div`
  width: 1px;
  height: 685px;
  background: #e9e9e9;
`;

const InfoArea = styled.section`
  padding-top: 130px;
`;

const Price = styled.h1`
  margin-bottom: 26px;
  color: #111;
  font-size: 32px;
  font-weight: 800;
`;

const Name = styled.div`
  margin-bottom: 12px;
  color: #5e5e5e;
  font-size: 15px;
`;

const Meta = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
  color: #8a8a8a;
  font-size: 14px;
`;

const Star = styled.span`
  color: #111;
`;

const Empty = styled.div`
  padding: 120px 0;
  text-align: center;
  color: #777;
`;

const BackButton = styled.button`
  margin-top: 20px;
  border: none;
  border-radius: 8px;
  background: #111;
  color: #fff;
  padding: 10px 18px;
  cursor: pointer;
`;

export function ProductDetailView({ product }) {
  if (!product) return null;

  return (
    <DetailLayout>
      <ImageArea>
        <ProductImage src={product.image} alt={product.name} />
      </ImageArea>
      <Divider />
      <InfoArea>
        <Price>{product.price}</Price>
        <Name>{product.name}</Name>
        <Meta>
          <Star>★</Star>
          <span>{product.rating}</span>
          <span>리뷰 {product.review}</span>
        </Meta>
      </InfoArea>
    </DetailLayout>
  );
}

export default function ItemDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    setProduct(getProductById(id));
  }, [id]);

  if (!product) {
    return (
      <Page>
        <Empty>
          <p>상품을 찾을 수 없습니다.</p>
          <BackButton onClick={() => navigate("/")}>홈으로 이동</BackButton>
        </Empty>
      </Page>
    );
  }

  return (
    <Page>
      <ProductDetailView product={product} />
    </Page>
  );
}
