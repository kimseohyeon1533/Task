import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { addProduct, getProductById, updateProduct } from "../../utils/productStore";

const Page = styled.div`
  width: min(1280px, calc(100vw - 48px));
  margin: 0 auto;
  padding: 22px 110px 58px;
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 1px 360px;
  gap: 88px;
  align-items: center;
  min-height: 665px;
`;

const Divider = styled.div`
  width: 1px;
  height: 680px;
  background: #e9e9e9;
`;

const UploadBox = styled.label`
  width: 410px;
  height: 535px;
  margin: 0 auto;
  border-radius: 12px;
  border: ${({ $hasImage }) => ($hasImage ? "1px solid #d9d9d9" : "none")};
  background: ${({ $hasImage }) => ($hasImage ? "#fff" : "#f0f0f0")};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  cursor: pointer;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 34px;
`;

const UploadGuide = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;
  color: ${({ $hasImage }) => ($hasImage ? "#ff3333" : "#ff3333")};
  font-size: 13px;
  font-weight: 500;
  background: ${({ $hasImage }) => ($hasImage ? "rgba(255, 255, 255, 0.08)" : "transparent")};
`;

const UploadIcon = styled.div`
  color: ${({ $hasImage }) => ($hasImage ? "#555" : "#bcbcbc")};
  font-size: 62px;
  line-height: 1;
`;

const HiddenInput = styled.input`
  display: none;
`;

const FormCard = styled.form`
  width: 258px;
  padding: 30px 30px 28px;
  border-radius: 20px;
  background: #fff;
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.18);
`;

const Title = styled.h1`
  margin-bottom: 26px;
  color: #111;
  font-size: 24px;
  font-weight: 700;
`;

const Field = styled.label`
  display: block;
  margin-bottom: 13px;
  color: #888;
  font-size: 12px;
`;

const Input = styled.input`
  width: 100%;
  height: 27px;
  margin-top: 7px;
  padding: 0 9px;
  border: 1px solid #777;
  border-radius: 4px;
  color: #333;
  font-size: 12px;
  outline: none;

  &:focus {
    border-color: #111;
  }
`;

const GroupTitle = styled.div`
  margin: 13px 0 8px;
  color: #888;
  font-size: 12px;
`;

const ChipGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 7px;
  margin-bottom: 12px;
`;

const ChipRow = styled.div`
  display: grid;
  grid-template-columns: repeat(${({ $count }) => $count}, 1fr);
  gap: 7px;
  margin-bottom: 12px;
`;

const Chip = styled.button`
  height: 28px;
  border: ${({ $selected }) => ($selected ? "2px solid #ffd400" : "1px solid transparent")};
  border-radius: 5px;
  background: ${({ $selected }) => ($selected ? "#f3f3f3" : "#f0f0f0")};
  color: #555;
  font-size: 11px;
  cursor: pointer;
`;

const SubmitButton = styled.button`
  width: 100%;
  height: 30px;
  margin-top: 4px;
  border: none;
  border-radius: 5px;
  background: #eeeeee;
  color: #555;
  font-size: 12px;
  cursor: pointer;

  &:hover {
    background: #e0e0e0;
  }
`;

const typeOptions = ["의류", "신발"];
const genderOptions = ["남성", "여성", "남녀공용"];
const colorOptions = ["red", "pink", "blue", "gray", "black", "denim", "multi", "rainbow", "holographic"];

const emptyForm = {
  name: "",
  rating: "",
  review: "",
  price: "",
  size: "",
  type: "의류",
  gender: "여성",
  color: "gray",
  image: "",
};

export default function ProductFormPage({ mode }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileRef = useRef(null);
  const isEdit = mode === "edit";
  const [form, setForm] = useState(emptyForm);

  const title = useMemo(() => (isEdit ? "상품 정보 수정" : "상품 정보 등록"), [isEdit]);
  const submitText = useMemo(() => (isEdit ? "상품 수정 완료" : "상품 등록 완료"), [isEdit]);
  const uploadText = isEdit ? "클릭 시 사진 파일 재업로드 가능" : "클릭 시 사진 파일 업로드 가능";

  useEffect(() => {
    if (!isEdit) {
      setForm(emptyForm);
      return;
    }

    const product = getProductById(id);
    if (!product) {
      alert("수정할 상품을 찾을 수 없습니다.");
      navigate("/");
      return;
    }
    setForm(product);
  }, [id, isEdit, navigate]);

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      handleChange("image", reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.name.trim()) {
      alert("상품명을 입력해주세요.");
      return;
    }
    if (!form.image) {
      alert("상품 사진을 등록해주세요.");
      return;
    }

    const saved = isEdit ? updateProduct(id, form) : addProduct(form);
    navigate(`/item/${saved.id}`);
  };

  return (
    <Page>
      <Content>
        <UploadBox $hasImage={Boolean(form.image)}>
          {form.image && <ProductImage src={form.image} alt="상품 이미지 미리보기" />}
          <UploadGuide $hasImage={Boolean(form.image)}>
            <UploadIcon $hasImage={Boolean(form.image)}>⇧</UploadIcon>
            <span>{uploadText}</span>
          </UploadGuide>
          <HiddenInput ref={fileRef} type="file" accept="image/*" onChange={handleFileChange} />
        </UploadBox>

        <Divider />

        <FormCard onSubmit={handleSubmit}>
          <Title>{title}</Title>

          <Field>
            상품명
            <Input value={form.name} onChange={(e) => handleChange("name", e.target.value)} placeholder="나이키 에어 그레이하운드 25" />
          </Field>
          <Field>
            평점
            <Input value={form.rating} onChange={(e) => handleChange("rating", e.target.value)} placeholder="4.7" />
          </Field>
          <Field>
            리뷰수
            <Input value={form.review} onChange={(e) => handleChange("review", e.target.value)} placeholder="1,235" />
          </Field>
          <Field>
            가격
            <Input value={form.price} onChange={(e) => handleChange("price", e.target.value)} placeholder="39" />
          </Field>
          <Field>
            사이즈
            <Input value={form.size} onChange={(e) => handleChange("size", e.target.value)} placeholder="9" />
          </Field>

          <GroupTitle>종류</GroupTitle>
          <ChipRow $count={2}>
            {typeOptions.map((option) => (
              <Chip type="button" key={option} $selected={form.type === option} onClick={() => handleChange("type", option)}>{option}</Chip>
            ))}
          </ChipRow>

          <GroupTitle>성별</GroupTitle>
          <ChipRow $count={3}>
            {genderOptions.map((option) => (
              <Chip type="button" key={option} $selected={form.gender === option} onClick={() => handleChange("gender", option)}>{option}</Chip>
            ))}
          </ChipRow>

          <GroupTitle>색상</GroupTitle>
          <ChipGrid>
            {colorOptions.map((option) => (
              <Chip type="button" key={option} $selected={form.color === option} onClick={() => handleChange("color", option)}>{option}</Chip>
            ))}
          </ChipGrid>

          <SubmitButton type="submit">{submitText}</SubmitButton>
        </FormCard>
      </Content>
    </Page>
  );
}
