export enum TipoEntregaEnum
{
    EmMaos = 0,
    Correios = 1,
    Terceiro = 2,
    EntregaTeste = 9999999,
}

export const DeliveryTypeMapping = {
    [TipoEntregaEnum.EmMaos]: "Retirada em mãos",
    [TipoEntregaEnum.Correios]: "Correios",
    [TipoEntregaEnum.Terceiro]: "Terceiros",
}