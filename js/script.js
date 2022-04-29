//variaveis
let btn_play_pause = document.getElementById('btn_play');
let audio = document.getElementById('audio1');
let the_song = document.querySelectorAll('.song');
let title_1 = document.getElementById('title1');
let title_2 = document.getElementById('title2');
let cover = document.getElementById('cover');
let srcAudio = document.getElementById('srcAudio');
let seta_img = document.getElementById('seta');
let durationSong = document.querySelector('.limit_time');
let previous_song = document.getElementById('previous');
let next_song = document.getElementById('next');
let index_song = 0;
let listMusic = [ //lista de músicas
    {
        src: './assets/music/Alan Jackson - The Older I Get.mp3',
        t1: '<h3 id="title1">The Older I Get </h3>',
        t2: '<p id="title2">Alan Jackson</p>',
        img: './assets/img/alan-jackson.jpg'
    },
    {
        src: './assets/music/Ando devagar porque já tive pressa.mp3',
        t1: '<h3 id="title1">Tocando em Frente</h3>',
        t2: '<p id="title2">Almir Sater</p>',
        img: './assets/img/almir-sater.jpg'
    },
    {
        src: './assets/music/Billy Preston - My Sweet Lord.mp3',
        t1: '<h3 id="title1">My Sweet Lord</h3>',
        t2: '<p id="title2">Billy Preston</p>',
        img: '/assets/img/BillyPreston.jpg'
    },
    {
        src: './assets/music/Bill Conti - Gonna Fly Now.mp3',
        t1: '<h3 id="title1">Gonna Fly Now</h3>',
        t2: '<p id="title2">Bill Conti</p>',
        img: './assets/img/rocky.jpg'
    },
    {
        src: './assets/music/BURN IT DOWN - Linkin Park.mp3',
        t1: '<h3 id="title1">Burn It down</h3>',
        t2: '<p id="title2">Linkin Park</p>',
        img: './assets/img/LinkPark.jpg'
    },
    {
        src: './assets/music/DragonForce - Through the Fire and Flames.mp3',
        t1: '<h3 id="title1">Through the fires and flames</h3>',
        t2: '<p id="title2">DragonForce</p>',
        img: './assets/img/transferir.jpg'
    },
    {
        src: './assets/music/Elvis Presley - Bridge Over Troubled Water.mp3',
        t1: '<h3 id="title1">Brigde Over troubled water</h3>',
        t2: '<p id="title2">Elvis Presley</p>',
        img: './assets/img/Elvis.jpg'
    },
    {
        src: './assets/music/Eminem - Guts Over Fear ft. Sia.mp3',
        t1: '<h3 id="title1">Guts Over Fear ft Sia</h3>',
        t2: '<p id="title2">Eminem</p>',
        img: './assets/img/eminem.jpg'
    },
    {
        src: './assets/music/Iron maiden - fear of the dark.mp3',
        t1: '<h3 id="title1">Fear of the dark</h3>',
        t2: '<p id="title2">Iron Maiden</p>',
        img: './assets/img/ironmaiden.jpg'
    },
]

//funções
renderMusic(index_song);

//seleção de músicas da lista
for (let i = 0; i < the_song.length; i++) {
    the_song[i].addEventListener('click', function(e){
        console.log('---', e.target.innerHTML);

        cover.setAttribute('src', listMusic[i].img);
        title_1.innerHTML = listMusic[i].t1;
        title_2.innerHTML = listMusic[i].t2;
        audio.setAttribute('src', listMusic[i].src);
        audio.play();
        btn_play_pause.setAttribute('src', './assets/img/pause.png');
    })
}
//próxima música
next_song.addEventListener('click', function(){
    index_song++;
    if(index_song > 8){
        index_song = 0;
    }
    renderMusic(index_song);
})
//música anterior
previous_song.addEventListener('click', function(){
    index_song--;
    if(index_song < 0){
        index_song = 8;
    }
    renderMusic(index_song);
})
//atualiza as passadas das músicas
function renderMusic(index){
    
    audio.setAttribute('src', listMusic[index].src);

    audio.addEventListener('loadeddata', () => {

        cover.setAttribute('src', listMusic[index].img);
        title_1.innerHTML = listMusic[index].t1;
        title_2.innerHTML = listMusic[index].t2;
        durationSong.textContent =  seg_to_min(Math.floor(audio.duration));
        btn_play_pause.setAttribute('src', './assets/img/play-buttton.png');

    })
}
//barra de tempo decorrido da música
audio.addEventListener('timeupdate', progressBar)
function progressBar(){
    let barra = document.querySelector('progress');
    barra.style.width = Math.floor((audio.currentTime / audio.duration) * 100) + '%';
    let time_inicial = document.querySelector('.current_time');
    time_inicial.textContent =  seg_to_min(Math.floor(audio.currentTime));

}
//formatar o tempo de segundos para minutos
function seg_to_min(s){
    let min = Math.floor(s / 60)
    let seg =  s % 60
    if(seg < 10){
        seg = '0' + seg;
        
    }
    return min+':'+seg;
}
//eventos de controle
function play_pause(){
    if (audio.paused == true) {
         audio.play();
         btn_play_pause.setAttribute('src', './assets/img/pause.png')
    }else{
        audio.pause();
        btn_play_pause.setAttribute('src', './assets/img/play-buttton.png')
    }
}
function backwardMin(){
    audio.currentTime -= 10;
}
function forwardMin(){
    audio.currentTime += 10;
}
function stopAudio(){
    audio.pause();
    audio.currentTime = 0;
    btn_play_pause.setAttribute('src', './assets/img/play-buttton.png')
}
//seta mostrar ou não as músicas
function showSongs(){
    var musics_column = document.querySelector('.music_column')

    if(musics_column.classList.contains('show')){
        musics_column.classList.add('hide');
        musics_column.classList.remove('show');
        seta_img.setAttribute('src', './assets/img/seta-para-baixo.png')
    }else{
        musics_column.classList.add('show');
        musics_column.classList.remove('hide');
        seta_img.setAttribute('src', './assets/img/seta-para-cima.png')
    }
}