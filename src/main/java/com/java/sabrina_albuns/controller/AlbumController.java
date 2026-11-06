package com.java.sabrina_albuns.controller;

import com.java.sabrina_albuns.business.AlbumService;
import com.java.sabrina_albuns.infrastructure.entitys.Album;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/album")
@RequiredArgsConstructor
public class AlbumController {

    private final AlbumService albumService;

    @GetMapping("/todos")
    public ResponseEntity<List<Album>> listarTodos() {
        return ResponseEntity.ok(albumService.listarTodos());
    }

    @PostMapping
    public ResponseEntity<Void> salvarAlbum(@RequestBody Album album) {
        albumService.salvarAlbum(album);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<Album> buscarAlbumPorNome(@RequestParam String nome) {
        return ResponseEntity.ok(albumService.buscarAlbumPorNomeAlbum(nome));
    }

    @DeleteMapping
    public ResponseEntity<Void> deletarAlbumPorNome(@RequestParam String nome) {
        albumService.deletarAlbumPorNome(nome);
        return ResponseEntity.ok().build();
    }

    @PutMapping
    public ResponseEntity<Void> atualizarAlbumPorId(@RequestBody Album album, @RequestParam(required = false) Integer id) {
        Integer targetId = (id != null) ? id : album.getId();
        if (targetId == null) {
            return ResponseEntity.badRequest().build();
        }
        albumService.atualizarAlbumPorId(targetId, album);
        return ResponseEntity.ok().build();
    }
}
