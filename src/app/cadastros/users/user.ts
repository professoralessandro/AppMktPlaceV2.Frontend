import { TipoDocumentoEnum } from "src/app/Enums/tipo-documento.enum";

export class User {
    public identifier?: string;
    public userName: string;
    public nmrDocumento: string;
    public tipoDocumento: TipoDocumentoEnum | string;
    public senha: string;
    public nome: string;
    public dataNascimento?: Date | string;
    public sexo: string;
    public estadoCivil: string;
    public email: string;
    public trocaSenha: boolean;
    public bloqueado: boolean;
    public usuarioInclusaoId: string;
    public usuarioUltimaAlteracaoId?: string;
    public dataInclusao: Date;
    public dataUltimaAlteracao?: Date;
    public dataUltimaTrocaSenha?: Date;
    public dataUltimoLogin?: Date;
    public nmrTelefone: string;
    public ativo: boolean;

    public User() {
        this.identifier = '';
        this.userName = '';
        this.nmrDocumento = '';
        // this.tipoDocumento = '';
        this.senha = '';
        this.nome = '';
        this.dataNascimento = new Date();
        this.sexo = '';
        this.estadoCivil = '';
        this.email = '';
        this.trocaSenha = false;
        this.bloqueado = false;
        this.usuarioInclusaoId = '';
        this.usuarioUltimaAlteracaoId = null;
        this.dataInclusao = new Date();
        this.dataUltimaAlteracao = null;
        this.dataUltimaTrocaSenha = null;
        this.dataUltimoLogin = null;
        this.nmrTelefone = '';
        this.ativo = false;
    }
}
