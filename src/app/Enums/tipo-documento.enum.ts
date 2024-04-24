export enum TipoDocumentoEnum
{
    RG = 0,
    CPF = 1,
    CNPJ = 2,
}

export const TipoDocumentoMapping = {
    [TipoDocumentoEnum.RG]: "RG",
    [TipoDocumentoEnum.CPF]: "CPF",
    [TipoDocumentoEnum.CNPJ]: "CNPJ",
}