package com.java.sabrina_albuns.infrastructure.entitys;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "album")
@Entity
public class Album {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(name = "nome_album")
    private String nomeAlbum;

    @Column(name = "ano_lancamento")
    private Integer anoLancamento;

    @Column(name = "gravadora")
    private String gravadora;

    @Column(name = "genero")
    private String genero;

    @Column(name = "numero_faixas")
    private Integer numeroFaixas;
}
