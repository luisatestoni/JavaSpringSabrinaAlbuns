package com.java.sabrina_albuns.infrastructure.repository;

import com.java.sabrina_albuns.infrastructure.entitys.Album;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface AlbumRepository extends JpaRepository<Album, Integer> {

    Optional<Album> findByNomeAlbum(String nomeAlbum);

    Optional<Album> findByNomeAlbumIgnoreCase(String nomeAlbum);

    List<Album> findByNomeAlbumContainingIgnoreCase(String nomeAlbum);

    @Transactional
    void deleteByNomeAlbumIgnoreCase(String nomeAlbum);

    @Transactional
    void deleteByNomeAlbum(String nomeAlbum);
}
