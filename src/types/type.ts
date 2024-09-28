export interface Catecories {
  _id: string;
  categoryName: string;
  slug?: string;
}

export interface Products {
  _id: string;
  title: string;
  description: string;
  price: number;
  photoLink: string;
  category: string;
  quantity: number;
}

export interface AddressType {
  _id: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface userOrderType{
  _id: string;
  date: Date;
  address: string;
  totalPrice: number;
  productId: string;
  status: string;
}

export interface AdminOderType{
  _id: string;
  customer: string;
  order: string;
  customerAddress: string;
  deliveryDate: string;
  totalPrice: string;
  deliveryStatus: string;
  payment: string;
} 