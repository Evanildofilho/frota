package com.example.frotaapibackend.dtos;

import java.sql.Date;

public record NotaFiscalAlterarRecordDTO(
    Long id,
    Long numeroNotaFiscal,
    String nomeRazaoSocial, 
    Long cnpj,
    Date dataDeEmissao,
    Date dataDeEntradaSaida,
    String descricaoProdutoServico,
    Float valorNotaFiscal
) {}
