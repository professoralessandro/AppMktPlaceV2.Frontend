export enum TipoBloqueioEnum
{
    BloqueioTeste = 9999999,
    BloqueioUsuario = 0,
    BloqueioProduto = 1,
    BloqueioServico = 2,
    BloqueioPagamento = 3,
    BloqueioPreventivo = 4,
    BloqueioDefinitivo = 5,
}

export const TipoDocumentoMapping = {
    [TipoBloqueioEnum.BloqueioUsuario]: "Usuario",
    [TipoBloqueioEnum.BloqueioProduto]: "Produto",
    [TipoBloqueioEnum.BloqueioServico]: "Serviço",
    [TipoBloqueioEnum.BloqueioPagamento]: "Pagamento",
    [TipoBloqueioEnum.BloqueioPreventivo]: "Preventivo",
    [TipoBloqueioEnum.BloqueioDefinitivo]: "Definitivo",
}