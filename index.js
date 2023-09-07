/**
 * 1. Render songs -> ok
 * 2. Scroll top -> not
 * 3. Play / pause / seek -> ok
 * 4. CD rotate -> not
 * 5. Next / prev -> ok
 * 6. Repeat -> ok
 * 7. Next / Repeat when ended -> ok
 * 8. Active song -> ok
 * 9. Scroll active song into view -> ok
 * 10. Play song when click -> ok
 * 11. Search -> ok
 */

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const list = $('.list');
const audio = $('#audio');
const play = $('.play');
const seek = $('.seek-tab');
const seekFill = $('.seek-fill');
const next = $('.next');
const prev = $('.prev');
const repeat = $('.repeat');
const random = $('.random');
const background = $('.background-img > img');

const mediaImage = $('.top-container > img');
const mediaSongName = $('.meadia-player-song-name');
const mediaSingerName = $('.meadia-player-singer-name');

var listRandom;
var countListRandom = 0;

const app = {
    isRepeat: false,
    isRandom: false,
    isPlaying: false,
    songData: [
        {
            name: 'NVMD',
            singer: 'Denise Julia',
            path: './Item/SongItem/song1.mp3',
            image: './Item/ImageItem/song1.jpg',
            album: 'NVMD',
            id: 0,
        },
        {
            name: 'What you know about love',
            singer: 'Pop Smoke',
            path: './Item/SongItem/song2.mp3',
            image: './Item/ImageItem/song2.jpg',
            album: 'Shoot For The Stars Aim For The Moon',
            id: 1,
        },
        {
            name: 'Love language',
            singer: 'SZA',
            path: './Item/SongItem/song3.mp3',
            image: './Item/ImageItem/song3.jpg',
            album: 'SOS',
            id: 2,
        },
        {
            name: 'LOVE. FEAT. ZACARI.',
            singer: 'Kendrick Lamar, Zacari',
            path: './Item/SongItem/song4.mp3',
            image: './Item/ImageItem/song4.jpg',
            album: 'NVMD',
            id: 3,
        },
        {
            name: 'She Knows',
            singer: 'Ne-Yo, Juicy J',
            path: './Item/SongItem/song5.mp3',
            image: './Item/ImageItem/song5.jpg',
            album: 'Non-Fiction (Deluxe)',
            id: 4,
        },
        {
            name: 'Trip',
            singer: 'Ella Mai',
            path: './Item/SongItem/song6.mp3',
            image: './Item/ImageItem/song6.jpg',
            album: 'Ella Mai',
            id: 5,
        },
        {
            name: "Boo'd Up",
            singer: 'Ella Mai',
            path: './Item/SongItem/song7.mp3',
            image: './Item/ImageItem/song7.jpg',
            album: 'READY',
            id: 6,
        },
        {
            name: 'Dilemma',
            singer: 'Nelly, Kelly Rowland',
            path: './Item/SongItem/song8.mp3',
            image: './Item/ImageItem/song8.jpg',
            album: 'Nellyville',
            id: 7,
        },
        {
            name: 'Finesse - Remix ft. Cardi B',
            singer: 'Bruno Mars, Cardi B',
            path: './Item/SongItem/song9.mp3',
            image: './Item/ImageItem/song9.jpg',
            album: 'Finesse (Remix) [feat. Cardi B]',
            id: 8,
        },
        {
            name: 'ghosts',
            singer: 'Highvyn',
            path: './Item/SongItem/song10.mp3',
            image: './Item/ImageItem/song10.jpg',
            album: 'ghosts',
            id: 9,
        },
        {
            name: '50 Feat',
            singer: 'SoMo',
            path: './Item/SongItem/song11.mp3',
            image: './Item/ImageItem/song11.jpg',
            album: 'A Beautiful November',
            id: 10,
        },
        {
            name: 'Come Through (feat. Chris Brown)',
            singer: 'H.E.R., Chris Brown',
            path: './Item/SongItem/song12.mp3',
            image: './Item/ImageItem/song12.jpg',
            album: 'Come Through (feat. Chris Brown)',
            id: 11,
        },
        {
            name: 'Perceive',
            singer: 'Doma Cyno',
            path: './Item/SongItem/song13.mp3',
            image: './Item/ImageItem/song13.jpg',
            album: 'Perceive',
            id: 12,
        },
    ],
    currentIndex: 0,
    loadCurrentSong() {
        let itemActive = $(`.item-${this.currentIndex}`);
        background.src = `${this.songData[this.currentIndex].image}`;
        itemActive.querySelector(`.pause-unpause-${this.currentIndex}`).style.visibility = 'visible';

        itemActive.classList.add('active');

        audio.src = this.songData[this.currentIndex].path;
        mediaImage.src = this.songData[this.currentIndex].image;
        mediaSongName.innerText = this.songData[this.currentIndex].name;
        mediaSingerName.innerText = this.songData[this.currentIndex].singer;
        // audio.play();
    },
    renderSong(songData) {
        let html = songData
            .map(
                (song, index) => `
                <li class="song-item item-${index}">
                    <img src="${song.image}" alt="" class="song-img" />
                    <div class="info">
                        <div class="song-name">${song.name}</div>
                        <div class="song-singer">${song.singer}</div>
                    </div>
                    <div class="song-album"><i>${song.album}</i></div>
                    <i class="fa-solid fa-play pause-unpause pause-unpause-${index}"></i>
                </li>`
            )
            .join('');
        list.innerHTML = html;
    },
    handleEvent() {
        //Play - Pause
        const pauseUnpauses = $$('.pause-unpause');
        const currentTime = $('.current-time');
        const duration = $('.duration');
        let _this = this;

        play.onclick = () => {
            _this.isPlaying = !_this.isPlaying;
            if (_this.isPlaying) {
                audio.play();
                play.innerHTML = '<i class="fa-solid fa-pause"></i>';
                $(`.item-${_this.currentIndex}`).querySelector('.pause-unpause').classList.remove('fa-play');
                $(`.item-${_this.currentIndex}`).querySelector('.pause-unpause').classList.add('fa-pause');
            } else {
                audio.pause();
                play.innerHTML = '<i class="fa-solid fa-play"></i>';
                $(`.item-${_this.currentIndex}`).querySelector('.pause-unpause').classList.remove('fa-pause');
                $(`.item-${_this.currentIndex}`).querySelector('.pause-unpause').classList.add('fa-play');
            }
        };

        for (pauseUnpause of pauseUnpauses) {
            pauseUnpause.onclick = () => {
                _this.isPlaying = !_this.isPlaying;
                if (_this.isPlaying) {
                    audio.play();
                    play.innerHTML = '<i class="fa-solid fa-pause"></i>';
                    $(`.item-${_this.currentIndex}`).querySelector('.pause-unpause').classList.remove('fa-play');
                    $(`.item-${_this.currentIndex}`).querySelector('.pause-unpause').classList.add('fa-pause');
                } else {
                    audio.pause();
                    play.innerHTML = '<i class="fa-solid fa-play"></i>';
                    $(`.item-${_this.currentIndex}`).querySelector('.pause-unpause').classList.remove('fa-pause');
                    $(`.item-${_this.currentIndex}`).querySelector('.pause-unpause').classList.add('fa-play');
                }
            };
        }

        //Time and duration

        audio.onloadedmetadata = () => {
            let timesDuration = Math.floor(audio.duration);
            let minutesDuration = Math.floor(timesDuration / 60);
            let secondsDuration = timesDuration - 60 * minutesDuration;

            duration.innerText = `${minutesDuration}:${secondsDuration >= 10 ? secondsDuration : `0${secondsDuration}`}`;
        };

        audio.ontimeupdate = () => {
            let timesCurrent = Math.floor(audio.currentTime);
            let minutesCurrent = Math.floor(timesCurrent / 60);
            let secondsCurrent = timesCurrent - 60 * minutesCurrent;

            currentTime.innerText = `${minutesCurrent}:${secondsCurrent >= 10 ? secondsCurrent : `0${secondsCurrent}`}`;

            seek.value = Math.floor((timesCurrent / audio.duration) * 100);
            seekFill.style.width = `${Math.floor((timesCurrent / audio.duration) * 100)}%`;
        };

        //Seek
        seek.onchange = () => {
            let timeWannaSeek = (Number(seek.value) / 100) * audio.duration;
            audio.currentTime = timeWannaSeek;

            seekFill.style.width = `${seek.value}%`;
        };

        //Next - Previous
        next.onclick = () => {
            seekFill.style.width = 0;
            _this.isPlaying = false;
            let removePauseUnpauseElement = $(`.pause-unpause.pause-unpause-${_this.currentIndex}`);
            removePauseUnpauseElement.style.visibility = 'hidden';

            let removeActiveElement = $(`.song-item.item-${_this.currentIndex}`);
            removeActiveElement.classList.remove('active');

            if (_this.isRandom) {
                if (countListRandom === listRandom.length - 1) {
                    listRandom = _this.creatRandomList();
                    countListRandom = 0;
                } else {
                    countListRandom++;
                    _this.currentIndex = listRandom[countListRandom];
                }
            } else {
                _this.currentIndex++;
                if (_this.currentIndex > _this.songData.length - 1) {
                    _this.currentIndex = 0;
                }
            }

            _this.loadCurrentSong();
            play.innerHTML = '<i class="fa-solid fa-play"></i>';
        };

        prev.onclick = () => {
            seekFill.style.width = 0;
            _this.isPlaying = false;
            let removePauseUnpauseElement = $(`.pause-unpause.pause-unpause-${_this.currentIndex}`);
            removePauseUnpauseElement.style.visibility = 'hidden';

            let removeActiveElement = $(`.song-item.item-${_this.currentIndex}`);
            removeActiveElement.classList.remove('active');

            if (_this.isRandom) {
                if (countListRandom === listRandom.length - 1) {
                    listRandom = _this.creatRandomList();
                    countListRandom = 0;
                } else {
                    countListRandom++;
                    _this.currentIndex = listRandom[countListRandom];
                }
            } else {
                _this.currentIndex--;
                if (_this.currentIndex < 0) {
                    _this.currentIndex = _this.songData.length - 1;
                }
            }

            _this.loadCurrentSong();
            play.innerHTML = '<i class="fa-solid fa-play"></i>';
        };

        //Repeat
        repeat.onclick = () => {
            _this.isRepeat = !_this.isRepeat;
            if (_this.isRepeat) {
                repeat.classList.add('active');
            } else {
                repeat.classList.remove('active');
            }
        };

        random.onclick = () => {
            _this.isRandom = !_this.isRandom;
            if (_this.isRandom) {
                random.classList.add('active');
            } else {
                random.classList.remove('active');
            }
            listRandom = _this.creatRandomList();
        };

        audio.onended = () => {
            if (_this.isRepeat) {
                _this.loadCurrentSong();
                audio.play();
                _this.isPlaying = true;
            } else {
                next.click();
                audio.play();
                _this.isPlaying = true;
                play.innerHTML = '<i class="fa-solid fa-pause"></i>';
                $(`.item-${_this.currentIndex}`).querySelector('.pause-unpause').classList.remove('fa-play');
                $(`.item-${_this.currentIndex}`).querySelector('.pause-unpause').classList.add('fa-pause');
            }
        };

        //play when click
        const listItem = $$('.song-item');

        Array.from(listItem).forEach((item, index) => {
            item.onclick = (e) => {
                if (e.target !== $('.song-item.active').querySelector('.pause-unpause')) {
                    $('.song-item.active').querySelector('.pause-unpause').style.visibility = 'hidden';
                    $('.song-item.active').classList.remove('active');

                    item.classList.add('active');
                    item.querySelector('.pause-unpause').style.visibility = 'visible';

                    _this.currentIndex = index;
                    _this.loadCurrentSong();
                    audio.play();
                    _this.isPlaying = true;

                    play.innerHTML = '<i class="fa-solid fa-pause"></i>';
                    $(`.item-${_this.currentIndex}`).querySelector('.pause-unpause').classList.remove('fa-play');
                    $(`.item-${_this.currentIndex}`).querySelector('.pause-unpause').classList.add('fa-pause');
                }
            };
        });
    },
    handleSearch() {
        //Search
        const search = $('#search');
        const _this = this;
        const songItems = $$('.song-item');

        search.oninput = () => {
            if (search.value.trim() !== '') {
                let listName = [];

                let newListData = _this.songData.filter((song) => {
                    return song.name.toUpperCase().indexOf(search.value.toUpperCase()) > -1;
                });

                console.log(newListData);
                newListData.forEach((item) => {
                    listName.push(item.name);
                });

                console.log(listName);
                songItems.forEach((songItem) => {
                    let nameSong = songItem.querySelector('.song-item .info > .song-name').innerText;
                    if (listName.includes(nameSong) !== true) {
                        songItem.style.position = 'absolute';
                        songItem.style.left = '-100%';
                    } else {
                        songItem.style.position = 'relative';
                        songItem.style.left = '';
                    }
                });
            } else {
                songItems.forEach((songItem) => {
                    songItem.style.position = 'relative';
                    songItem.style.left = '';
                });
            }
        };
    },
    creatRandomList() {
        let listRandom = [this.currentIndex];
        while (listRandom.length < 8) {
            let appendChild = Math.floor(Math.random() * 13);
            if (!listRandom.includes(appendChild)) {
                listRandom.push(appendChild);
            }
        }
        return listRandom;
    },
    start() {
        this.renderSong(this.songData);
        this.loadCurrentSong();
        this.handleEvent();
        this.handleSearch();
        this.creatRandomList();
    },
};

app.start();
