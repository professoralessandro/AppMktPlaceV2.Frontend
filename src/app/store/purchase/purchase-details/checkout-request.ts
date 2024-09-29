import { TipoEntregaEnum } from "src/app/Enums/tipo-entrega.enum";

export class CheckoutRequest {
    /**
     * Total purchase value
     */
    public totalValue: number;

    /**
     * Total delivery value
     */
    public totalDeliveryValue: number;

    /**
     * Tipo de entrega
     */
    public typeOfDelivery: TipoEntregaEnum;

    /**
     * Total purchase value
     */
    public item: Array<CheckoutItem>;
}

export class CheckoutItem {
    /**
     * Product Identifier
     */
    public productId: string;

    /**
     * Quantity
     */
    public Quantity: number;

    /**
     * Product Value
     */
    public value?: number;
}