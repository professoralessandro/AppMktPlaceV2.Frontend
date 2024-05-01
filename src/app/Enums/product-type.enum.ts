export enum ProductTypeEnum
{
    Produto = 0,
    Servico = 1,
    Outros = 9999999,
}

export const ProductTypeMapping = {
    [ProductTypeEnum.Produto]: "Produto",
    [ProductTypeEnum.Servico]: "Serviço",
    [ProductTypeEnum.Outros]: "Outros",
}