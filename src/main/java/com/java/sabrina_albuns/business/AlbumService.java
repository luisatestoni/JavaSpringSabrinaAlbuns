package com.java.sabrina_albuns.business;

import com.java.sabrina_albuns.infrastructure.entitys.Album;
import com.java.sabrina_albuns.infrastructure.repository.AlbumRepository;
import org.springframework.stereotype.Service;

@Service
public class AlbumService {

    private final AlbumRepository repository;

    public AlbumService(AlbumRepository repository) {
        this.repository = repository;
    }

    public void salvarAlbum(Album album) {
        repository.saveAndFlush(album);
    }

    public Album buscarAlbumPorNomeAlbum(String nomeAlbum) {
        return repository.findByNomeAlbum(nomeAlbum).orElseThrow(
                () -> new RuntimeException("Nome do álbum não encontrado")
        );
    }

    public void deletarAlbumPorNome(String nomeAlbum) {
        repository.deleteByNomeAlbum(nomeAlbum);
    }

    public void atualizarAlbumPorId(Integer id, Album album) {
        Album albumEntity = repository.findById(id).orElseThrow(() ->
                new RuntimeException("Álbum não encontrado"));

        Album albumAtualizado = Album.builder()
                .nomeAlbum(album.getNomeAlbum() != null ? album.getNomeAlbum() :
                        albumEntity.getNomeAlbum())
                .anoLancamento(album.getAnoLancamento() != null ? album.getAnoLancamento() :
                        albumEntity.getAnoLancamento())
                .gravadora(album.getGravadora() != null ? album.getGravadora() :
                        albumEntity.getGravadora())
                .genero(album.getGenero() != null ? album.getGenero() :
                        albumEntity.getGenero())
                .numeroFaixas(album.getNumeroFaixas() != null ? album.getNumeroFaixas() :
                        albumEntity.getNumeroFaixas())
                .id(albumEntity.getId())
                .build();

        repository.saveAndFlush(albumAtualizado);
    }
}