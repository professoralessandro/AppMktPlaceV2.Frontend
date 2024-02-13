import { ProductTypeEnum } from "src/app/Enums/product-type.enum";

export class Produto {
    public produtoId?: string;
    public tipoProduto: ProductTypeEnum | string;
    public descricao: string;
    public codigoBarras: string;
    public marca: string;
    public quantidade: number;
    public isIlimitado: boolean;
    public quantidadeCritica: number | null;
    public precoCusto: number;
    public precoVenda: number;
    public margemLucro: number;
    public bloqueado: boolean;
    public usuarioInclusaoId: string;
    public usuarioUltimaAlteracaoId: string | null;
    public dataInclusao: string;
    public dataUltimaAlteracao: string | null;
    public ativo: boolean;
    public peso: number | null;
    public image: string | null;

  public Produto() {
    this.produtoId = '';
    this.tipoProduto = '';
    this.descricao = '';
    this.codigoBarras = '';
    this.marca = '';
    this.quantidade = 0;
    this.isIlimitado = false;
    this.quantidadeCritica = 0;
    this.precoCusto = 0;
    this.precoVenda = 0;
    this.margemLucro = 0;
    this.bloqueado = false;
    this.usuarioInclusaoId = '';
    this.dataInclusao = '';
    this.ativo = false;
    this.peso = 0;
    this.image = '';
  }
}
