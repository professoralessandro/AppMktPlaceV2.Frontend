import { ProductTypeEnum } from "src/app/Enums/product-type.enum";

export class Product {
    public identifier?: string;
    public productTypeEnum: ProductTypeEnum | string;
    public descricao: string;
    public detalhes: string;
    public codigoBarras: string;
    public marca: string;
    public precoVenda: number;
    public image: string | null;

  public constructor() {
    this.identifier = '';
    this.productTypeEnum = '';
    this.descricao = '';
    this.detalhes = '';
    this.codigoBarras = '';
    this.marca = '';
    this.image = '';
    this.precoVenda = 0;
  }
}
