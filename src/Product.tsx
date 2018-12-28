import * as React from "react";

import { IProduct } from "./ProductsData";
import Tabs from "./Tabs";

interface IProps {
  product: IProduct;
  inBasket: boolean;
  onAddToBasket: () => void;
}

const Product: React.SFC<IProps> = props => {
  const product = props.product;
  return (
    <React.Fragment>
      <h1>{product.name}</h1>
      <Tabs>
        <Tabs.Tab
          name="Description"
          initialActive={true}
          heading={() => <b>Description</b>}
        >
          <p>{product.description}</p>
        </Tabs.Tab>
        <Tabs.Tab name="Reviews" heading={() => <b>Reviews</b>}>
          <ul className="product-reviews">
            {product.reviews.map(review => (
              <li key={review.reviewer} className="product-reviews-item">
                <i>"{review.comment}"</i> - {review.reviewer}
              </li>
            ))}
          </ul>
        </Tabs.Tab>
      </Tabs>
      <p className="product-price">
        {new Intl.NumberFormat("en-US", {
          currency: "USD",
          style: "currency"
        }).format(product.price)}
      </p>
      {!props.inBasket && (
        <button onClick={props.onAddToBasket}>Add to basket</button>
      )}
    </React.Fragment>
  );
};

export default Product;
