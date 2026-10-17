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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "nome_album", length = 100, nullable = false)
    private String nomeAlbum;

    @Column(name = "ano_lancamento")
    private Integer anoLancamento;

    @Column(name = "gravadora", length = 100)
    private String gravadora;

    @Column(name = "genero", length = 50)
    private String genero;

    @Column(name = "numero_faixas")
    private Integer numeroFaixas;
}
