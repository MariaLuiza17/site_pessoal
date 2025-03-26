document.addEventListener('DOMContentLoaded', function () {
    let currentIndex = 0; // Índice atual da linha dentro da página
    let currentPage = 0; // Página atual
    let lyricInterval; // Intervalo das letras

    const pages = document.querySelectorAll(".lyrics-page"); // Todas as páginas de letras
    const lyricsContainer = document.querySelector(".lyrics-container");
    const coverImage = document.getElementById("coverImage"); // Imagem da capa
    const coverImageSmall = document.getElementById("coverImageSmall"); // Imagem da capa
    const infoTittle = document.getElementById("songTittle"); // Imagem da capa
    const coverLinkSmall = document.getElementById("coverLinkSmall");

    const covers = [
        "/static/foto1.jpeg",
        "/static/foto2.jpeg",
        "/static/foto3.jpeg",
        "/static/foto4.jpeg"
    ];

    const covers_small = [
        "/static/capa1.jpg",
        "/static/capa2.jpg",
        "/static/capa3.jpeg",
        "/static/capa4.jpeg"
    ];

    const song_tittle = [
        "Cumplicidade",
        "Vida Vazia",
        "Só Pra Você",
        "Amor Imortal"
    ];

    const coverLinks = [
        "https://open.spotify.com/intl-pt/track/4oIRYmC4rhBUbF2HSduX4C?si=d6682067d3c44e31",
        "https://open.spotify.com/intl-pt/track/7kA3xa1iqOLTjPpWiX0sw7?si=3641289196b14efc",
        "https://open.spotify.com/intl-pt/track/45FsR7a0Oh7CFqfrETEYtp?si=7b2e7a77a60049f6",
        "https://open.spotify.com/intl-pt/track/193VzJnCr49pQnNJsSSlB8?si=b335deaaf15a4455"
    ];

    function updateLyrics() {
        const activePage = pages[currentPage];
        const lines = activePage.querySelectorAll(".line"); // Apenas linhas da página ativa

        // Remove 'active' de todas as linhas na página
        lines.forEach(line => line.classList.remove("active"));

        // Marca a linha atual como ativa
        if (lines[currentIndex]) {
            lines[currentIndex].classList.add("active");

            // Faz a rolagem dentro da página ativa
            lyricsContainer.scrollTop = currentIndex * lines[0].offsetHeight;
        }

        // Avança para a próxima linha, reiniciando quando necessário
        currentIndex = (currentIndex + 1) % lines.length;
    }

    function updatePage() {
        // Remove 'active' de todas as páginas
        pages.forEach(page => page.classList.remove("active"));

        // Ativa apenas a página atual
        pages[currentPage].classList.add("active");

        // Atualiza a imagem da capa
        if (coverImage && covers[currentPage]) {
            coverImage.src = covers[currentPage]; 
        }

        if (coverImageSmall && covers_small[currentPage]) {
            coverImageSmall.src = covers_small[currentPage]; 
        }
        
        if (infoTittle && song_tittle[currentPage]) {
            infoTittle.textContent = song_tittle[currentPage]; 
        }

        if (coverLinkSmall && coverLinks[currentPage]) {
            coverLinkSmall.href = coverLinks[currentPage];
        }

        // Resetar índice das letras para começar do início
        currentIndex = 0;

        // Reiniciar o efeito das letras na nova página
        clearInterval(lyricInterval); // Para o intervalo atual
        lyricInterval = setInterval(updateLyrics, 1000); // Reinicia o efeito das letras
    }

    // Inicia a primeira página corretamente
    updatePage();

    // Botão de próxima página
    document.getElementById("next").addEventListener("click", function () {
        currentPage = (currentPage + 1) % pages.length; // Muda a página
        updatePage();
    });

    // Botão de página anterior
    document.getElementById("prev").addEventListener("click", function () {
        currentPage = (currentPage - 1 + pages.length) % pages.length;
        updatePage();
    });
});
