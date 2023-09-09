import { TipoBloqueioEnum } from "src/app/Enums/tipo-bloqueio.enum";

export class Block {
  public identifier?: string;
  public tipoDocumento: TipoBloqueioEnum | string;
  public ItemBloqueadoId: string;
  public nomeBloqueio: string;
  public isBloqueiaAcesso: boolean;
  public dataInicio?: Date;
  public DataFim?: Date;
  public usuarioInclusaoId: string;
  public usuarioUltimaAlteracaoId?: string;
  public dataInclusao: Date;
  public dataUltimaAlteracao?: Date;
  public ativo: boolean;

  public Block() {
    this.identifier = '';
    this.ItemBloqueadoId = '';
    this.nomeBloqueio = '';
    this.isBloqueiaAcesso = false;
    this.dataInicio = null;
    this.DataFim = null;
    this.usuarioInclusaoId = '';
    this.usuarioUltimaAlteracaoId = '';
    this.dataInclusao = new Date();
    this.dataUltimaAlteracao = null;
    this.ativo = false;
  }
}
