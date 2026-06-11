const card = document.getElementById('main-card');
const heartsContainer = document.getElementById('hearts-container');

// Create floating hearts
function createHearts() {
    setInterval(() => {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = (Math.random() * 3 + 4) + 's';
        heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
        heartsContainer.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 7000);
    }, 300);
}

createHearts();

// Game State
const screens = {
    LOGIN: 'login',
    FACE_VERIFY: 'face_verify',
    Q1: 'q1',
    Q2: 'q2',
    Q3: 'q3',
    GAME: 'game',
    SUCCESS: 'success'
};

function renderScreen(screen) {
    card.style.animation = 'none';
    card.offsetHeight; /* trigger reflow */
    card.style.animation = 'popIn 0.5s ease-out';

    switch(screen) {
        case screens.LOGIN:
            card.innerHTML = `
                <img src="public/IMG_8198.JPG" class="login-photo" alt="Foto Login" />
                <h1>Security Check! 🔒</h1>
                <p>Masukkan nama kamu untuk membuktikan kalau kamu beneran pacarku!</p>
                <div class="input-group">
                    <input type="text" id="nameInput" placeholder="Ketik nama kamu..." autocomplete="off">
                </div>
                <div id="error-msg" class="error-message"></div>
                <button class="btn" onclick="checkLogin()">Login Masuk Hati</button>
            `;
            break;
        case screens.FACE_VERIFY:
            card.innerHTML = `
                <h1>Face Verification 📷</h1>
                <div class="camera-status">🔴 Kamera Aktif</div>
                <div class="face-scanner" id="face-scanner">
                    <div class="scan-line"></div>
                    <img src="public/IMG_8198.JPG" class="login-photo" style="margin-bottom:0;" alt="Face Scan" />
                </div>
                <p id="verify-instruction" style="font-size:16px; font-weight:700; color:var(--secondary-color); height:60px; display:flex; align-items:center; justify-content:center; text-align:center;">Posisikan wajahmu menghadap kamera...</p>
                <div class="progress-bar-container">
                    <div class="progress-bar" id="verify-progress"></div>
                </div>
            `;
            runFaceVerification();
            break;
        case screens.Q1:
            card.innerHTML = `
                <h1>Pertanyaan 1 🌎</h1>
                <p>Dari kota manakah bidadari cantik ini berasal?</p>
                <div class="options-container">
                    <button class="option-btn" onclick="checkAnswer('Q1', false, this)">Bandung</button>
                    <button class="option-btn" onclick="checkAnswer('Q1', true, this)">Purwakarta</button>
                    <button class="option-btn" onclick="checkAnswer('Q1', false, this)">Jakarta</button>
                    <button class="option-btn" onclick="checkAnswer('Q1', false, this)">Planet Mars</button>
                </div>
            `;
            break;
        case screens.Q2:
            card.innerHTML = `
                <h1>Pertanyaan 2 🎂</h1>
                <p>Kapan hari paling bersejarah di dunia? (Hari lahirmu!)</p>
                <div class="options-container">
                    <button class="option-btn" onclick="checkAnswer('Q2', false, this)">14-02-2010</button>
                    <button class="option-btn" onclick="checkAnswer('Q2', false, this)">01-01-2011</button>
                    <button class="option-btn" onclick="checkAnswer('Q2', true, this)">31-03-2011</button>
                    <button class="option-btn" onclick="checkAnswer('Q2', false, this)">17-08-2011</button>
                </div>
            `;
            break;
        case screens.Q3:
            card.innerHTML = `
                <h1>Pertanyaan 3 👽</h1>
                <p>Siapakah cowok paling beruntung yang jadi pacar kamu?</p>
                <div class="options-container">
                    <button class="option-btn" onclick="checkAnswer('Q3', false, this)">Reza Rahadian</button>
                    <button class="option-btn" onclick="checkAnswer('Q3', false, this)">Justin Bieber</button>
                    <button class="option-btn" onclick="checkAnswer('Q3', true, this)">Danish (si Alien 👽)</button>
                    <button class="option-btn" onclick="checkAnswer('Q3', false, this)">Spider-Man</button>
                </div>
            `;
            break;
        case screens.GAME:
            card.innerHTML = `
                <h1>Mini Game Time! 🎮</h1>
                <p>Ayo klik dan tangkap 10 hati alien untuk membuka kunci ke galeri rahasia kita!</p>
                <div class="score-board">Terkumpul: <span id="game-score">0</span> / 10</div>
                <div class="game-area" id="game-area"></div>
            `;
            startGame();
            break;
        case screens.SUCCESS:
            // More intense hearts
            setInterval(() => {
                const heart = document.createElement('div');
                heart.classList.add('heart');
                heart.innerHTML = ['💖', '💕', '🥰', '🫶'][Math.floor(Math.random() * 4)];
                heart.style.left = Math.random() * 100 + 'vw';
                heart.style.animationDuration = (Math.random() * 2 + 3) + 's';
                heart.style.fontSize = (Math.random() * 30 + 20) + 'px';
                heartsContainer.appendChild(heart);
            }, 100);

            card.innerHTML = `
                <img src="assets/cute_alien.png" class="alien-badge" alt="alien" />
                <h1>Welcome, Nayla! 💖</h1>
                <p>Yeay!! Kamu berhasil melewati semua rintangannya!</p>
                
                <div class="gallery-wrapper">
                    <div class="gallery-grid">
                        <img src="public/FONH2265.JPG" alt="foto kita" class="gallery-img">
                        <img src="public/GIUL8717.JPG" alt="foto kita" class="gallery-img">
                        <img src="public/IMG_8198.JPG" alt="foto kita" class="gallery-img">
                        <img src="public/IMG_8199.JPG" alt="foto kita" class="gallery-img">
                        <img src="public/IMG_8201.JPG" alt="foto kita" class="gallery-img">
                        <img src="public/IMG_8255.JPG" alt="foto kita" class="gallery-img">
                    </div>
                </div>

                <div class="love-letter">
                    "Halo Nayla Raisyah Pratiwi cintanya Danish! ❤️<br><br>
                    Makasih ya udah jadi pacar yang paling hebat buat si alien ini. 👽
                    Semoga kita langgeng terus dan selalu bahagia. I love you more than 3000!"
                </div>
            `;
            break;
    }
}

// Logic
function checkLogin() {
    const input = document.getElementById('nameInput').value.toLowerCase().trim();
    const errorMsg = document.getElementById('error-msg');
    
    if(input.includes('nayla') || input.includes('raisyah') || input.includes('pratiwi')) {
        renderScreen(screens.FACE_VERIFY);
    } else {
        errorMsg.innerText = "Hmm... kayaknya kamu bukan Nayla deh. Coba lagi!";
        const btn = document.querySelector('.btn');
        btn.style.animation = 'shake 0.5s';
        setTimeout(() => {
            btn.style.animation = '';
            errorMsg.innerText = '';
        }, 2000);
    }
}

function checkAnswer(question, isCorrect, btnElement) {
    if(isCorrect) {
        btnElement.style.background = '#4CAF50';
        btnElement.style.color = 'white';
        btnElement.style.borderColor = '#4CAF50';
        
        setTimeout(() => {
            if(question === 'Q1') renderScreen(screens.Q2);
            if(question === 'Q2') renderScreen(screens.Q3);
            if(question === 'Q3') renderScreen(screens.GAME);
        }, 800);
    } else {
        btnElement.classList.add('error');
        setTimeout(() => btnElement.classList.remove('error'), 500);
    }
}

// Mini Game Logic
let gameScore = 0;
let gameInterval;

function startGame() {
    gameScore = 0;
    const gameArea = document.getElementById('game-area');
    const scoreSpan = document.getElementById('game-score');
    
    // Spawn a heart every 600ms
    gameInterval = setInterval(() => {
        const target = document.createElement('div');
        target.classList.add('game-target');
        // Randomly pick an emoji
        target.innerHTML = ['👽', '❤️', '💖', '🥰'][Math.floor(Math.random() * 4)];
        
        // Random position within the game area
        const maxX = gameArea.clientWidth - 40;
        const maxY = gameArea.clientHeight - 40;
        
        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);
        
        target.style.left = randomX + 'px';
        target.style.top = randomY + 'px';
        
        target.onclick = function() {
            gameScore++;
            scoreSpan.innerText = gameScore;
            target.remove();
            
            if(gameScore >= 10) {
                clearInterval(gameInterval);
                setTimeout(() => {
                    renderScreen(screens.SUCCESS);
                }, 500);
            }
        };
        
        gameArea.appendChild(target);
        
        // Disappear after 1.5 seconds if not clicked
        setTimeout(() => {
            if(target.parentNode === gameArea) {
                target.remove();
            }
        }, 1500);
        
    }, 600);
}

// Face Verification Logic
function runFaceVerification() {
    const instruction = document.getElementById('verify-instruction');
    const progressBar = document.getElementById('verify-progress');
    const scanner = document.getElementById('face-scanner');
    
    function runProgress(duration) {
        progressBar.style.transition = 'none';
        progressBar.style.width = '0%';
        progressBar.style.background = 'var(--primary-color)';
        setTimeout(() => {
            progressBar.style.transition = `width ${duration}ms linear`;
            progressBar.style.width = '100%';
        }, 50);
    }

    // Step 1: Start positioning
    runProgress(3000);

    // Step 2: Fake Failure
    setTimeout(() => {
        instruction.innerHTML = "❌ Verifikasi Gagal!<br>Cari tempat yang lebih terang / muka kurang dekat.";
        instruction.style.color = '#ff4d4d';
        progressBar.style.transition = 'none';
        progressBar.style.width = '100%';
        progressBar.style.background = '#ff4d4d';
        scanner.style.borderColor = '#ff4d4d';
        scanner.style.animation = 'shake 0.5s';
    }, 3000);

    // Step 3: Retry
    setTimeout(() => {
        instruction.innerHTML = "Mencoba ulang verifikasi... 🔄";
        instruction.style.color = 'var(--secondary-color)';
        scanner.style.borderColor = 'var(--primary-color)';
        scanner.style.animation = 'none';
        runProgress(2000);
    }, 6500);

    // Step 4: Kanan
    setTimeout(() => {
        instruction.innerText = "Coba tengok ke kanan... 👀";
        runProgress(4000);
    }, 8500);

    // Step 5: Kiri
    setTimeout(() => {
        instruction.innerText = "Sekarang coba tengok ke kiri... 👀";
        runProgress(4000);
    }, 12500);

    // Step 6: Geleng
    setTimeout(() => {
        instruction.innerText = "Coba geleng-geleng... 🤪";
        runProgress(4000);
    }, 16500);

    // Final
    setTimeout(() => {
        instruction.innerText = "Manis banget bidadari kaka 🥰❤️";
        progressBar.parentElement.style.display = 'none';
        document.querySelector('.scan-line').style.display = 'none';
    }, 20500);

    // Proceed to Q1
    setTimeout(() => {
        renderScreen(screens.Q1);
    }, 24000);
}

// Start
renderScreen(screens.LOGIN);
