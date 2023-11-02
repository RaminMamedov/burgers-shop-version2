export type CartItem = {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    type: string;
    count: number;
};

export type CartSliceState = {
    totalPrice: number;
    items: CartItem[];
}