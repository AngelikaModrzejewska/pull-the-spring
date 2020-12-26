const ball = document.querySelector('.ball'), btn = document.querySelector('.btn-action'), spring = document.querySelector('.spring'), fill = document.querySelector('.fill');

const strechSpring = () => {
    fill.style.animationName = "fill";
    fill.style.animationPlayState = "running";
    spring.style.animationPlayState = "running";
    btn.textContent = "Release the spring";
    btn.removeEventListener('mousedown', strechSpring);
}

const releaseSpring = () => {
    const fillStyles = getComputedStyle(fill);
    const fillWidth = parseInt(fillStyles.width, 10);
    const barWidth = parseInt(getComputedStyle(document.querySelector('.bar')).width, 10);
    const progressPercent = (fillWidth / barWidth).toFixed(2);
    btn.textContent = `Your punching power: ${(progressPercent * 100).toFixed()}%`;
    fill.style.animationPlayState = 'paused'

    document.documentElement.style.setProperty('--power-x', `${30 + progressPercent * 50}%`);

    ball.style.animation = 'fly-ball-x 1s 1 forwards .15s cubic-bezier(.17, .67, .6, 1), fly-ball-y 1s 1 forwards .15s linear';

    //spring
    document.documentElement.style.setProperty('--spring-left', getComputedStyle(spring).left);
    spring.style.animation = 'release-spring .2s 1 forwards linear';

    //block the click
    btn.removeEventListener('mouseup', releaseSpring);

    //reset
    ball.addEventListener('animationend', resetAnimation);
}

const resetAnimation = () => {
    ball.addEventListener('animationend', resetAnimation);

    setTimeout(() => {
        btn.addEventListener('mousedown', strechSpring);
        btn.addEventListener('mouseup', releaseSpring);
        btn.textContent = "Pull the spring";
        spring.style.animation = "";
        ball.style.animation = "";
        fill.style.animationName = 'none';
    }, 2000);

}

btn.addEventListener('mousedown', strechSpring);
btn.addEventListener('mouseup', releaseSpring);