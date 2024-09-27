export interface Catecories {
  _id: string;
  categoryName: string;
  slug?:string;
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