export enum TipoBloqueioEnum
{
    BloqueioTeste = 9999999,
    BloqueioUsuario = 0,
    BloqueioEmpresa = 1,
    BloqueioProduto = 2,
    BloqueioServico = 3,
    BloqueioPagamento = 4,
    BloqueioPreventivo = 5,
    BloqueioDefinitivo = 6,
}

export const TipoBloqueioMapping = {
    [TipoBloqueioEnum.BloqueioUsuario]: "Usuário",
    [TipoBloqueioEnum.BloqueioEmpresa]: "Empresa",
    [TipoBloqueioEnum.BloqueioProduto]: "Produto",
    [TipoBloqueioEnum.BloqueioServico]: "Serviço",
    [TipoBloqueioEnum.BloqueioPagamento]: "Pagamento",
    [TipoBloqueioEnum.BloqueioPreventivo]: "Preventivo",
    [TipoBloqueioEnum.BloqueioDefinitivo]: "Definitivo"
}