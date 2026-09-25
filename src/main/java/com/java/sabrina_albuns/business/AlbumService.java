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

    public void salvarAlbum(Album album){
        repository.saveAndFlush(album);

    }

    public Album buscarAlbumPorNomeAlbum(String nomeAlbum){

        return repository.findByNomeAlbum(nomeAlbum).orElseThrow(
                () -> new RuntimeException("Nome do álbum não encontrado")
        );

    }
}
