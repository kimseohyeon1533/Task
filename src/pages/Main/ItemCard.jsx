export default function 
<ProductGrid>
                    <ProductCard key={item.id} onClick={()=>navigate(`/item/${item.id}`)}>
                        <ProductImage src={item.image} alt={item.name} />
                        <ProductInfo>
                            <ProductName>{item.name}</ProductName>
                            <ProductPrice>{item.price}</ProductPrice>
                            <ProductSub>{item.sub}</ProductSub>
                        </ProductInfo>
                    </ProductCard>
            </ProductGrid>