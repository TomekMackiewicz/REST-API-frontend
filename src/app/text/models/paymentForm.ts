import { Buyer } from './buyer';
import { Product } from './product';
import { Settings } from './settings';

export interface PaymentForm {
    totalAmount: number;
    buyer: Buyer;
    settings: Settings;
    products: Array<Product>;
}
