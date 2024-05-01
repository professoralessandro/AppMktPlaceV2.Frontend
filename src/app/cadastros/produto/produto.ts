import { ProductTypeEnum } from "src/app/Enums/product-type.enum";

export class Produto {
    public identifier?: string;
    public productTypeEnum: ProductTypeEnum | string;
    public descricao: string;
    public detalhes: string;
    public codigoBarras: string;
    public marca: string;
    public quantidade: number;
    public isIlimitado: boolean;
    public quantidadeCritica: number | null;
    public precoCusto: number;
    public precoVenda: number;
    public bloqueado: boolean;
    public usuarioInclusaoId: string;
    public usuarioUltimaAlteracaoId: string | null;
    public dataInclusao: Date | null;
    public dataUltimaAlteracao: Date | null;
    public ativo: boolean;
    public weight: number | null;
    public height: number | null;
    public width: number | null;
    public length: number | null;
    public image: string | null;

  public Produto() {
    this.identifier = '';
    this.productTypeEnum = '';
    this.descricao = '';
    this.detalhes = '';
    this.codigoBarras = '';
    this.marca = '';
    this.quantidade = 0;
    this.isIlimitado = false;
    this.quantidadeCritica = 0;
    this.precoCusto = 0;
    this.precoVenda = 0;
    this.bloqueado = false;
    this.usuarioInclusaoId = '';
    this.dataInclusao = null;
    this.ativo = false;
    this.weight = null;
    this.height = null;
    this.width = null;
    this.length = null;
    this.image = '';
  }
}
