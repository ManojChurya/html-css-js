const screens = document.querySelectorAll('.screen');
const choose_garbage_btns = document.querySelectorAll('.choose-garbage-btn');
const start_btn = document.getElementById('start-btn')
const game_container = document.getElementById('game-container')
const timeEl = document.getElementById('time')
const scoreEl = document.getElementById('score')
const message = document.getElementById('message')
let seconds = 0
let score = 0
let selected_garbage = {}

start_btn.addEventListener('click', () => screens[0].classList.add('up'))

choose_garbage_btns.forEach(btn => {
    btn.addEventListener('click', () => {
        const img = btn.querySelector('img')
        const src = img.getAttribute('src')
        const alt = img.getAttribute('alt')
        selected_garbage = { src, alt }
        screens[1].classList.add('up')
        setTimeout(creategarbage, 1000)
        startGame()
    })
})

function startGame() {
    setInterval(increaseTime, 1000)
}

function increaseTime() {
    let m = Math.floor(seconds / 60)
    let s = seconds % 60
    m = m < 10 ? `0${m}` : m
    s = s < 10 ? `0${s}` : s
    timeEl.innerHTML = `Time: ${m}:${s}`
    seconds++
}

function creategarbage() {
    const garbage = document.createElement('div')
    garbage.classList.add('garbage')
    const { x, y } = getRandomLocation()
    garbage.style.top = `${y}px`
    garbage.style.left = `${x}px`
    garbage.innerHTML = `<img src="${selected_garbage.src}" alt="${selected_garbage.alt}" style="transform: rotate(${Math.random() * 360}deg)" />`

    garbage.addEventListener('click', catchgarbage)

    game_container.appendChild(garbage)
}

function getRandomLocation() {
    const width = window.innerWidth
    const height = window.innerHeight
    const x = Math.random() * (width - 200) + 100
    const y = Math.random() * (height - 200) + 100
    return { x, y }
}

function catchgarbage() {
    increaseScore()
    this.classList.add('caught')
    setTimeout(() => this.remove(), 2000)
    addgarbage()
}

function addgarbage() {
    setTimeout(creategarbage, 1000)
    setTimeout(creategarbage, 1500)
}

function increaseScore() {
    score++
    if(score > 25) {
        message.classList.add('visible')
    }
    scoreEl.innerHTML = `Score: ${score}`
}