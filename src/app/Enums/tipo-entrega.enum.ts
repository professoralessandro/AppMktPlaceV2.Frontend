export enum TipoEntregaEnum
{
    EmMaos = 0,
    Correios = 1,
    Terceiro = 2,
    EntregaTeste = 9999999,
}

export const TipoEntregaMapping = {
    [TipoEntregaEnum.EmMaos]: "Retirada em Mãos",
    [TipoEntregaEnum.Correios]: "Correios",
    [TipoEntregaEnum.Terceiro]: "Terceiros",
}