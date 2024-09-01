import { TipoDocumentoEnum } from "src/app/Enums/tipo-documento.enum";

export class RegisterUserRequest {
    public identifier?: string;
    public userName: string;
    public groupName: string;
    public nmrDocumento: string;
    public tipoDocumento: TipoDocumentoEnum | string;
    public password: string;
    public nome: string;
    public dataNascimento?: string;
    public sexo: string;
    public estadoCivil: string;
    public email: string;
    public nmrTelefone: string;

    public constructor() {
        this.identifier = '';
        this.userName = '';
        this.nmrDocumento = '';
        this.password = '';
        this.nome = '';
        this.email = '';
        this.nmrTelefone = '';
        this.groupName = '';
    }
}