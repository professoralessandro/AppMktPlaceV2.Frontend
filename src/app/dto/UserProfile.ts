export class UserProfile {
    public identifier?: string;
    public userName: string;
    public userGroup: string;
    public userProfileImage: string;
    public nome: string;
    public dataNascimento?: Date | string;
    public sexo: string;
    public estadoCivil: string;
    public email: string;
    public bloqueado: boolean;

    public constructor() {
        this.identifier = '';
        this.userName = '';
        this.userGroup = '';
        this.userProfileImage = null;
        this.nome = '';
        this.sexo = '';
        this.estadoCivil = '';
        this.email = '';
        this.bloqueado = false;
    }
}