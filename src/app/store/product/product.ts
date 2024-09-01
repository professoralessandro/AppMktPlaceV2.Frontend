import { ProductTypeEnum } from "src/app/Enums/product-type.enum";

export class Product {
    public identifier?: string;
    public productTypeEnum: ProductTypeEnum | string;
    public titulo: string;
    public resumoDetalhes: string;
    public detalhes: string;
    public codigoBarras: string;
    public marca: string;
    public precoVenda: number | string;
    public mainImage: string | null;
    public quantidade: number;
    public rating: number;
    public shoppingCartId: string;
    public usuarioInclusaoId: string;
    public usuarioUltimaAlteracaoId: string | null;
    public dataInclusao: Date | null;
    public dataUltimaAlteracao: Date | null;
    public productQuantity: number;

  public constructor() {
    this.identifier = '';
    this.productTypeEnum = '';
    this.titulo = '';
    this.resumoDetalhes = '';
    this.detalhes = '';
    this.codigoBarras = '';
    this.marca = '';
    this.mainImage = '';
    this.precoVenda = 0;
    this.quantidade = 0;
    this.rating = 0;
    this.shoppingCartId = null;
    this.usuarioInclusaoId = '';
    this.dataInclusao = null;
    this.productQuantity = 0;
  }
}
