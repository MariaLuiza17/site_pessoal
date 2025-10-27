document.addEventListener('DOMContentLoaded', function () {
    let currentPage = 0; // Página atual

    const pages = document.querySelectorAll(".lyrics-page"); 
    const lyricsContainer = document.querySelector(".lyrics-container");
    const coverImage = document.getElementById("coverImage");
    const coverImageSmall = document.getElementById("coverImageSmall");
    const infoTittle = document.getElementById("songTittle");
    const coverLinkSmall = document.getElementById("coverLinkSmall");
    const audioPlayer = document.getElementById("audioPlayer");

    const covers = [
        "/static/day1.jpeg",
        "/static/day2.jpeg",
        "/static/day3.jpeg",
        "/static/day4.jpeg"
    ];

    const covers_small = [
        "/static/capa2.jpg",
        "/static/capa1.jpg",
        "/static/capa3.jpg",
        "/static/capa2.jpg"
    ];

    const song_tittle = [
        "Se...",
        "Samurai",
        "Eu te devoro",
        "Linha do equador"
    ];

    const coverLinks = [
        "https://open.spotify.com/intl-pt/track/0PgsB53yhlKs8D19LgYU4i?si=ecc747538e814632",
        "https://open.spotify.com/intl-pt/track/3BQAK2pnTpfZvLg2MUUU5i?si=64e1760e5cce41c0",
        "https://open.spotify.com/intl-pt/track/2Px3PZ2qq2uFpRBpfVx8A5?si=59ae1f1245524704",
        "https://open.spotify.com/intl-pt/track/51K301CKuavVEP7A9vsUaz?si=9f966f66248a47c3"
    ];

    const songs = [
        "/static/se.mp3",
        "/static/samurai.mp3",
        "/static/devoro.mp3",
        "/static/equador.mp3"
    ];

    // tempos das linhas em segundos
    const lyricsTimings = [
        // Música 1 - "Se..."
        [0, 6, 12, 16],
        // Música 2 - "Samurai"
        [0, 3, 7, 14],
        // Música 3 - "Eu te devoro"
        [0, 5, 11, 15],
        // Música 4 - "Linha do equador"
        [0, 4, 6, 10]
    ];


    // --- Atualiza as letras conforme o tempo do áudio ---
    function updateLyricsByTime(currentTime) {
        const activePage = pages[currentPage];
        const lines = activePage.querySelectorAll(".line");
        const timings = lyricsTimings[currentPage];

        if (!timings || timings.length === 0) return;

        // Se passou do último tempo, para ali (sem reiniciar)
        if (currentTime > timings[timings.length - 1] + 0.5) {
            lines.forEach(line => line.classList.remove("active"));
            if (lines[lines.length - 1]) {
                lines[lines.length - 1].classList.add("active");
            }
            return;
        }

        // Determina qual linha deve estar ativa
        let newIndex = 0;
        for (let i = 0; i < timings.length; i++) {
            if (currentTime >= timings[i]) {
                newIndex = i;
            }
        }

        // Atualiza visualmente
        lines.forEach(line => line.classList.remove("active"));
        if (lines[newIndex]) {
            lines[newIndex].classList.add("active");
            lyricsContainer.scrollTop = newIndex * lines[0].offsetHeight;
        }
    }

    // --- Atualiza página/música ---
    function updatePage(autoPlay = true) {
        // Remove 'active' de todas as páginas
        pages.forEach(page => page.classList.remove("active"));
        pages[currentPage].classList.add("active");

        // Atualiza capa e título
        if (coverImage && covers[currentPage]) coverImage.src = covers[currentPage];
        if (coverImageSmall && covers_small[currentPage]) coverImageSmall.src = covers_small[currentPage];
        if (infoTittle && song_tittle[currentPage]) infoTittle.textContent = song_tittle[currentPage];
        if (coverLinkSmall && coverLinks[currentPage]) coverLinkSmall.href = coverLinks[currentPage];

        // Limpa linhas antigas
        pages.forEach(page => {
            const lines = page.querySelectorAll(".line");
            lines.forEach(line => line.classList.remove("active"));
        });

        // Ativa a primeira linha da nova música
        const firstLine = pages[currentPage].querySelector(".line");
        if (firstLine) firstLine.classList.add("active");

        // Atualiza o áudio
        if (audioPlayer && songs[currentPage]) {
            audioPlayer.src = songs[currentPage];

            // Só tenta tocar se for permitido (autoplay pode ser bloqueado)
            if (autoPlay) {
                audioPlayer.play().catch(err => {
                    console.log("Autoplay bloqueado, aguardando interação:", err);
                });
            }

            // Atualiza letras conforme o tempo da música
            audioPlayer.ontimeupdate = () => {
                updateLyricsByTime(audioPlayer.currentTime);
            };

            // Quando a música terminar, passa automaticamente pra próxima
            audioPlayer.onended = () => {
                currentPage = (currentPage + 1) % pages.length;
                updatePage(true); // toca automaticamente a próxima
            };
        }
    }

    // --- Botões de navegação ---
    document.getElementById("next").addEventListener("click", function () {
        currentPage = (currentPage + 1) % pages.length;
        updatePage(true);
    });

    document.getElementById("prev").addEventListener("click", function () {
        currentPage = (currentPage - 1 + pages.length) % pages.length;
        updatePage(true);
    });

    // --- Inicia automaticamente na primeira música ---
    updatePage(true);
});
