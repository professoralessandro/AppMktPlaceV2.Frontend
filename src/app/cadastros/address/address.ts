import { AddressTypeEnum } from "src/app/Enums/address-type.enum";

export class Address {
    public identifier?: string;
    public usuarioId: string;
    public usuario: string;
    public addressTypeEnum: AddressTypeEnum | string;
    public logradouro: string;
    public numero: string;
    public complemento?: string;
    public bairro?: string;
    public cidade: string;
    public estado: string;
    public cep?: string;
    public pontoReferencia?: string;
    public isPrincipal: boolean;
    public usuarioInclusaoId: string;
    public usuarioUltimaAlteracaoId?: string;
    public dataInclusao: Date | string;
    public dataUltimaAlteracao?: Date | string;
    public ativo: boolean;
}