import { FormaPagamentoEnum } from "../Enums/forma-pagamento.enum";
import { StatusCompraEnum } from "../Enums/status-compra.enum";

export class Purchase {
    public identifier?: string;
    public paymentFormType: FormaPagamentoEnum;
    public purchaseStatus: StatusCompraEnum;
    public purchaseCode: string;
    public purchaseImage: string;
    public externalPurchaseCode?: string;
    public externalPaymentLink?: string;
    public contador?: number;
    public entregaId?: string;
    public lancamentoPaiId: string;
    public garantiaId: string;
    public purchaserId: string;
    public usuarioInclusaoId: string;
    public usuarioUltimaAlteracaoId?: string;
    public dataInclusao: Date;
    public dataUltimaAlteracao?: Date;
    public Ativo: boolean;
    public product: ProductDetails[];

    public constructor() {
        this.purchaseImage = null;
        this.identifier = '';
        this.paymentFormType = FormaPagamentoEnum.NaoDefinida;
        this.purchaseStatus = StatusCompraEnum.StatusCompraTest;
        this.purchaseCode = '';
        this.externalPurchaseCode = '';
        this.externalPaymentLink = '';
        this.contador = 0;
        this.entregaId = '';
        this.lancamentoPaiId = '';
        this.garantiaId = '';
        this.purchaserId = '';
        this.usuarioInclusaoId = '';
        this.usuarioUltimaAlteracaoId = null
        this.dataInclusao = new Date()
        this.dataUltimaAlteracao = null;
        this.Ativo = false;
        this.product = [];
    }
}

export class ProductDetails {
    public productId: string;
    public sellerId: string;
    public trackingcode: string;
    public status: number;
    public image: string;
    public quantity: Number;
    public value: Number;
    public description?: string;

    public constructor() {
        this.productId = '';
        this.sellerId = '';
        this.quantity = 0
        this.value = 0
        this.description = '';
        this.trackingcode = '';
        this.status = 0;
        this.image = '';
    }
}