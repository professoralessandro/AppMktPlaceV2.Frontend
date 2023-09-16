export enum AddressTypeEnum
{
    Residencial = 0,
    Comercial = 1,
    TipoEnderecoTest = 9999999,
}

export const AddressTypeMapping = {
    [AddressTypeEnum.Residencial]: "Residencial",
    [AddressTypeEnum.Comercial]: "Comercial",
}