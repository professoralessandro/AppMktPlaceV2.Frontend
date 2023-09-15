import { TipoBloqueioEnum } from "src/app/Enums/tipo-bloqueio.enum";

export class Block {
  public identifier?: string;
  public blockTypeEnum: TipoBloqueioEnum | string;
  public itemBloqueadoId: string;
  public nomeBloqueio: string;
  public isBloqueiaAcesso: boolean;
  public dataInicio?: string | Date ;
  public dataFim?: string | Date;
  public usuarioInclusaoId: string;
  public usuarioUltimaAlteracaoId?: string;
  public dataInclusao: Date;
  public dataUltimaAlteracao?: Date;
  public ativo: boolean;
  public blockdItemDescription: string;

  public Block() {
    this.identifier = '';
    this.itemBloqueadoId = '';
    this.nomeBloqueio = '';
    this.isBloqueiaAcesso = false;
    this.dataInicio = null;
    this.dataFim = null;
    this.usuarioInclusaoId = '';
    this.usuarioUltimaAlteracaoId = '';
    this.dataInclusao = new Date();
    this.dataUltimaAlteracao = null;
    this.ativo = false;
    this.blockdItemDescription = '';
  }
}
