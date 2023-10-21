export enum ProductTypeEnum
{
    Produto = 0,
    Servico = 1,
    TipoProduto = 9999999,
}

export const ProductTypeMapping = {
    [ProductTypeEnum.Produto]: "Produto",
    [ProductTypeEnum.Servico]: "Serviço",
}