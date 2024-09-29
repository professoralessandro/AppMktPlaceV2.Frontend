export enum TipoEntregaEnum
{
    HandDelivery = 0,
    CorreiosPac = 1,
    CorreiosSedex = 2,
    CorreiosSedex10 = 3,
    MercadoPago = 4,
    ThirdPartyDelivery = 5,
    MktPlaceDelivery = 6,
    Refund = 7,
    DeliveryTest = 9999999,
}

export const TipoEntregaMapping = {
    [TipoEntregaEnum.HandDelivery]: "Retirada em Mãos",
    [TipoEntregaEnum.CorreiosPac]: "Correios PAC",
    [TipoEntregaEnum.CorreiosSedex]: "Corrios SEDEX",
    [TipoEntregaEnum.CorreiosSedex10]: "Corrios SEDEX 10",
    [TipoEntregaEnum.MercadoPago]: "Mercado Pago",
    [TipoEntregaEnum.ThirdPartyDelivery]: "Terceiro",
    [TipoEntregaEnum.MktPlaceDelivery]: "App MKT Place",
    [TipoEntregaEnum.Refund]: "Não Encontrado",
    [TipoEntregaEnum.DeliveryTest]: "Test",
}