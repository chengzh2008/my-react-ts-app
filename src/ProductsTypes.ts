import {IProduct} from "./ProductsData";

export enum ProductsActionTypes {
  GETALL = "PRODUCTS/GETALL",
  LOADING = "PRODUCTS/LOADING",
  GETSINGLE = "PRODUCTS/GETSINGLE"
}

export interface IProductsGetAllAction {
  type: ProductsActionTypes.GETALL,
  products: IProduct[]
}

export interface IProductsLoadingAction {
  type: ProductsActionTypes.LOADING
}

export interface IProductsGetSingleAction {
  type: ProductsActionTypes.GETSINGLE;
  product: IProduct;
}

export type ProductsActions = 
  | IProductsGetAllAction
  | IProductsGetSingleAction
  | IProductsLoadingAction

export interface IProductsState {
  readonly products: IProduct[];
  readonly productsLoading: boolean;
  readonly currentProduct: IProduct | null;
}