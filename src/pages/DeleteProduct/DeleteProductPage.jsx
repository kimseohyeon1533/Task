import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { ProductDetailView } from "../ItemDetail/ItemDetail";
import { deleteProduct, getProductById } from "../../utils/productStore";

const Page = styled.div`
  width: min(1280px, calc(100vw - 48px));
  margin: 0 auto;
  padding: 18px 110px 58px;
  position: relative;
`;

const Dim = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 50;
`;

const Modal = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 258px;
  padding: 28px 38px 23px;
  border-radius: 20px;
  background: #fff;
  z-index: 60;
  text-align: center;
`;

const ModalTitle = styled.h2`
  margin-bottom: 28px;
  color: #111;
  font-size: 15px;
  font-weight: 700;
`;

const ButtonRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 9px;
`;

const ModalButton = styled.button`
  height: 29px;
  border: none;
  border-radius: 4px;
  background: #efefef;
  color: #555;
  font-size: 11px;
  cursor: pointer;

  &:hover {
    background: #e2e2e2;
  }
`;

const Empty = styled.div`
  padding: 120px 0;
  text-align: center;
  color: #777;
`;

export default function DeleteProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    setProduct(getProductById(id));
  }, [id]);

  const handleDelete = () => {
    deleteProduct(id);
    navigate("/");
  };

  if (!product) {
    return <Page><Empty>삭제할 상품을 찾을 수 없습니다.</Empty></Page>;
  }

  return (
    <>
      <Page>
        <ProductDetailView product={product} />
      </Page>
      <Dim />
      <Modal>
        <ModalTitle>상품을 삭제하시겠습니까?</ModalTitle>
        <ButtonRow>
          <ModalButton onClick={handleDelete}>확인</ModalButton>
          <ModalButton onClick={() => navigate(`/item/${id}`)}>취소</ModalButton>
        </ButtonRow>
      </Modal>
    </>
  );
}
