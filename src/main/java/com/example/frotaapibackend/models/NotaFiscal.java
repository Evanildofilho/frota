package com.example.frotaapibackend.models;

import java.sql.Date;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity(name = "nota_fiscal")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class NotaFiscal {
    
    @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "numero_nota_fiscal", unique = true)
    private Long numeroNotaFiscal;

    @Column(name = "nome_razao_social")
    private String nomeRazaoSocial;

    @Column(name = "cnpj")
    private Long cnpj;

    @Column(name = "data_de_emissao")
    private Date dataDeEmissao;

    @Column(name = "data_de_entrada_saida")
    private Date dataDeEntradaSaida;

    @Column(name = "descricao_produto_servico")
    private String descricaoProdutoServico;

    @Column(name = "valor_nota_fiscal")
    private Float valorNotaFiscal;

    @Column(name = "ativo")
    private boolean activated;

    @Column(name = "updated_at")
    private LocalDateTime updated_at;

    @Column(name = "created_at")
    private LocalDateTime created_at;
}
