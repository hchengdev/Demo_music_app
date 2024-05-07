const $ = document.querySelector.bind(document);
const $$ = document.querySelector.bind(document)

const PLAYER_STORAGE_KEY = 'MUSIC_PLAYER'

const heading = $('header h2')
const cdThump = $('.cd-thumb')
const audio = $('#audio')
const playBtn = $('.btn-toggle-play')
const player = $('.player')
const progress = $('#progress')
const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')
const randomBtn = $('.btn-random')
const repeatBtn = $('.btn-repeat')
const playlist = $('.playlist')

const app = {
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    currenIndex: 0,
    playedSongs: [],
    settings: {},
    songs: [
        {
          name: "你啊你啊",
          singer: "魏如萱",
          path: "./Music/Y2meta.app - 【你啊你啊 ni a ni a】Only you _ 魏如萱 waa wei [lyrics pinyin] แปลไทย (128 kbps).mp3",
          image: "https://yt3.googleusercontent.com/UupJOe608869Ffv0itIkIKkjirEWplDfpZ2h3SGw-QuqR2KEHoS25VYdOsY0O99rKVUg5QeThA=s160-c-k-c0x00ffffff-no-rj"
        },
        {
          name: "Tu Phir Se Aana",
          singer: "Raftaar x Salim Merchant x Karma",
          path: "./Music/Y2meta.app - 王睿卓_Damn５z - 重生之我在異鄉為異客「那遠山呼喚我 曾千百次路過 山腰摘幾朵 便飄向歌頌者」【動態歌詞_PinyinLyrics】♪ (128 kbps).mp3",
          image:
            "https://1.bp.blogspot.com/-kX21dGUuTdM/X85ij1SBeEI/AAAAAAAAKK4/feboCtDKkls19cZw3glZWRdJ6J8alCm-gCNcBGAsYHQ/s16000/Tu%2BAana%2BPhir%2BSe%2BRap%2BSong%2BLyrics%2BBy%2BRaftaar.jpg"
        },
        {
          name: "Tu Phir Se Aana",
          singer: "Raftaar x Salim Merchant x Karma",
          path: "./Music/Y2meta.app - LIPMARK - M NAIVE x LIUGRACE (prod. bySmokele) _ SPEED UP (128 kbps).mp3",
          image:
            "https://i.ytimg.com/vi/lyhxSy6rZQw/mqdefault.jpg"
        },
        {
          name: "Tu Phir Se Aana",
          singer: "Raftaar x Salim Merchant x Karma",
          path: "./Music/Y2meta.app - VÀI LẦN ĐÓN ĐƯA (ORINN X GUANG) - SOOBIN _ NHẠC TRẺ REMIX HOUSE LAK 2023 (128 kbps).mp3",
          image:
            "https://yt3.ggpht.com/DQstrCrz4q6G-zquwTvGRHrsedm9G1TvoPHup_P7QnB1FIbMb4JSpK1fAcHcqrrf8CfGQ4DSkmQ=s88-c-k-c0x00ffffff-no-rj"
        },
        {
          name: "你啊你啊",
          singer: "魏如萱",
          path: "./Music/Y2meta.app - Gunna - TOP FLOOR (feat. Travis Scott) [Official Audio] (128 kbps).mp3",
          image: "https://yt3.googleusercontent.com/UupJOe608869Ffv0itIkIKkjirEWplDfpZ2h3SGw-QuqR2KEHoS25VYdOsY0O99rKVUg5QeThA=s160-c-k-c0x00ffffff-no-rj"
        },
        {
          name: "你啊你啊",
          singer: "魏如萱",
          path: "./Music/Y2meta.app - Travis Scott - HIGHEST IN THE ROOM (Official Music Video) (128 kbps).mp3",
          image: "https://yt3.googleusercontent.com/UupJOe608869Ffv0itIkIKkjirEWplDfpZ2h3SGw-QuqR2KEHoS25VYdOsY0O99rKVUg5QeThA=s160-c-k-c0x00ffffff-no-rj"
        },
        {
          name: "你啊你啊",
          singer: "魏如萱",
          path: "./Music/Y2meta.app - Gunna - Who You Foolin [Official Audio] (128 kbps).mp3",
          image: "https://yt3.googleusercontent.com/UupJOe608869Ffv0itIkIKkjirEWplDfpZ2h3SGw-QuqR2KEHoS25VYdOsY0O99rKVUg5QeThA=s160-c-k-c0x00ffffff-no-rj"
        },
        {
          name: "你啊你啊",
          singer: "魏如萱",
          path: "./Music/Y2meta.app - tevomxntana - Heaven Sent (Prod.Sønata) _OFFICIAL AUDIO_ (128 kbps).mp3",
          image: "https://yt3.googleusercontent.com/UupJOe608869Ffv0itIkIKkjirEWplDfpZ2h3SGw-QuqR2KEHoS25VYdOsY0O99rKVUg5QeThA=s160-c-k-c0x00ffffff-no-rj"
        },
      ],
    render: function(){
      const htmls = this.songs.map((song, index) => {
        return `
        <div class="song ${index === this.currenIndex ? ('active') : ''}" data-index="${index}">
            <div class="thumb" style="background-image: url(${song.image})">
            </div>
            <div class="body">
              <h3 class="title">${song.name}</h3>
              <p class="author">${song.singer}</p>
            </div>
            <div class="option">
              <i class="fas fa-ellipsis-h"></i>
            </div>
          </div>
        `
      })
      playlist.innerHTML = htmls.join('');
    },
    defineProperties: function() {
      Object.defineProperty(this,'currentSong', {
        get: function() {
          return this.songs[this.currenIndex]
        }
      })
    },
    handleEvent: function() {
      const _this = this;
      const cd = $('.cd');
      const cdWidth = cd.offsetWidth

      const cdThumpAnimate =  cdThump.animate([
        { transform: 'rotate(360deg)' },
      ], {
        duration: 10000,
        iterations: Infinity
      })

      cdThumpAnimate.pause()

      document.onscroll = function() {
        const scrollTop = document.documentElement.scrollTop || window.scrollY
        const newCdWidth = cdWidth - scrollTop
        cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : '0' 
        cd.style.opacity = newCdWidth / cdWidth
      }

      playBtn.onclick =  function() {
        if (_this.isPlaying) {
          audio.pause()
        } else {
          audio.play();
        }
      };
      audio.onplay =  function() {
        _this.isPlaying = true
        player.classList.add('playing')
        cdThumpAnimate.play()
      }

      audio.onpause =  function() {
        _this.isPlaying = false
        player.classList.remove('playing')
        cdThumpAnimate.pause()
      }

      audio.ontimeupdate = function() {
        if(audio.duration) {
          const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
          progress.value = progressPercent
        }
      }

      progress.oninput = function (e) {
        let seekTime = e.target.value * audio.duration / 100;
        audio.currentTime = seekTime;
    };

      nextBtn.onclick = function() {
         if(_this.isRandom) {
           _this.playRandomSong()
          } else {
            _this.nextSong()
          }
        audio.play()
        _this.render()
        _this.scrollToActiveSong()
      }
      prevBtn.onclick = function() {
        if(_this.isRandom) {
          _this.playRandomSong()
        } else {
            _this.prevSong()
          }
        audio.play()
        _this.render()
        _this.scrollToActiveSong()
      }
      randomBtn.onclick = function(e) {
        _this.isRandom =!_this.isRandom
        randomBtn.classList.toggle('active', _this.isRandom)
      }
      audio.onended = function() {
        if(_this.isRepeat) {
          audio.play()
        } else {
          nextBtn.click()
        }
      }
      playlist.onclick = function (e) {
        const songNode = e.target.closest(".song:not(.active)");
  
        if (songNode || e.target.closest(".option")) {
          if (songNode) {
            _this.currenIndex = Number(songNode.dataset.index)
            _this.loadCurrentSong()
            _this.render()
            audio.play()
          }
          if (e.target.closest(".option")) {

          }
        }
      };
      repeatBtn.onclick = function(e) {
        _this.isRepeat =!_this.isRepeat
        repeatBtn.classList.toggle('active', _this.isRepeat)
      }
    },
    loadCurrentSong: function() {

      heading.innerText = this.currentSong.name
      cdThump.style.backgroundImage = `url('${this.currentSong.image}')`
      audio.src = this.currentSong.path
    },
    nextSong: function() {
      this.currenIndex++
        if (this.currenIndex >= this.songs.length) {
          this.currenIndex = 0
        }
        this.loadCurrentSong()
    },
    prevSong: function() {
      this.currenIndex--
        if (this.currenIndex < 0) {
          this.currenIndex = this.songs.length - 1
        }
        this.loadCurrentSong()
    },
    
    playRandomSong: function() {
      if (this.playedSongs.length === this.songs.length) {
        this.playedSongs = [];
      }
      let newIndex
      do {
        newIndex = Math.floor(Math.random() * this.songs.length)
      } while (this.playedSongs.includes(newIndex))
      this.currenIndex = newIndex
      this.loadCurrentSong()
      this.playedSongs.push(newIndex)
    },
    scrollToActiveSong: function() {
      if(this.currenIndex === 0) {

        setTimeout(() => {
          $('.song.active').scrollIntoView({
            behavior:'smooth',
            block: 'end',
          })
        }, 300)
      } else {
        setTimeout(() => {
          $('.song.active').scrollIntoView({
            behavior:'smooth',
            block: 'nearest',
          })
        }, 300)
      }
    },
    start: function() {
      this.defineProperties()
      this.handleEvent();
      this.loadCurrentSong(); 
      this.render();
      this.playedSongs = [];
    },
}

app.start()

