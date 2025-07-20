const selector = any => document.querySelector(any);

const speed = max => Math.round(Math.random() * max);

const playGame = _ => {

    let lintasan = 1;

    // ... ambil semua bot ( comp )
    const comp1 = selector('.car1');
    const comp2 = selector('.car2');
    const comp4 = selector('.car4');
    const comp5 = selector('.car5');
    const player = selector('.car3');

    // identify
    const badgeComp1 = selector('.all-bot .badge.badge-danger');
    const badgeComp2 = selector('.all-bot .badge.badge-primary');
    const badgeComp4 = selector('.all-bot .badge.badge-warning');
    const badgeComp5 = selector('.all-bot .badge.badge-light');
    const badgeP = selector('.all-bot .badge.badge-success');

    // ... kecepatan masing" bot ( comp )
    const speedCom1 = speed(400);
    const speedCom2 = speed(400);
    const speedCom4 = speed(400);
    const speedCom5 = speed(400);
    const speedP = speed(400);

    // race comp 1
    const intervalComp1 = setInterval(_ => {
        if (lintasan >= 100) {
            clearInterval(intervalComp1);

        } else {
            lintasan++;
            comp1.style.width = `${lintasan}%`;
            comp1.setAttribute(`title`, `Progress : ${lintasan}%`);
            badgeComp1.style.marginLeft = `${lintasan - 3}%`;

        }

    }, speedCom1);

    // ... comp 2
    const intervalComp2 = setInterval(_ => {
        if (lintasan >= 100) {
            clearInterval(intervalComp2);

        } else {
            lintasan++;
            comp2.style.width = `${lintasan}%`;
            comp2.setAttribute(`title`, `Progress : ${lintasan}%`);
            badgeComp2.style.marginLeft = `${lintasan - 3}%`;
            
        }

    }, speedCom2);

    // ... comp 4
    const intervalComp4 = setInterval(_ => {
        if (lintasan >= 100) {
            clearInterval(intervalComp4);

        } else {
            lintasan++;
            comp4.style.width = `${lintasan}%`;
            comp4.setAttribute(`title`, `Progress : ${lintasan}%`);
            badgeComp4.style.marginLeft = `${lintasan - 3}%`;
    
        }

    }, speedCom4);

    // ... comp 5
    const intervalComp5 = setInterval(_ => {
        if (lintasan >= 100) {
            clearInterval(intervalComp5);

        } else {
            lintasan++;
            comp5.style.width = `${lintasan}%`;
            comp5.setAttribute(`title`, `Progress : ${lintasan}%`);
            badgeComp5.style.marginLeft = `${lintasan - 3}%`;
            
        }

    }, speedCom5);

    // ...player
    const intervalP = setInterval(_ => {
        if (lintasan >= 100) {
            clearInterval(intervalP);
            winner();

        } else {
            lintasan++;
            player.style.width = `${lintasan}%`;
            player.setAttribute(`title`, `Progress : ${lintasan}%`);
            badgeP.style.marginLeft = `${lintasan -3}%`;
            
        }

    }, speedP);
}

const winner = _ => {

    // ... get winner
    const reply = selector('.reply');
    const winners = document.querySelectorAll('.car');
    const papanScore = document.querySelector('.papan-final-score .score-list');
    papanScore.innerHTML = '';

    winners.forEach(winner => {

        // ...syarat menang
        const requirement = winner.style.width;
        // ...nama player
        const name = winner.dataset.player;
        // ... badges
        const myBadge = winner.previousElementSibling.getAttribute('class');

        papanScore.innerHTML += `
        <div class="d-flex justify-content-start align-items-center p-2">
            <img src="./img/info/${name.toLowerCase()}_info.png" alt="Info Car ${name}">
            <player-name class="mb-0">
                <span class="${(requirement == '100%') ? myBadge : 'badge badge-secondary'}">
                    ${name}
                </span>
                <score-clip class="text-white">
                    ${requirement}
                </score-clip>
            </player-name>
        </div>`;
        
        if (requirement == '100%') {
            if (name == 'Kamu') {
                Swal.fire({
                    icon: 'success',
                    title: 'Winner!',
                    html: `<span class="lead font-weight-bold text-primary">${name}</span> 
                            Memenangkan Pertandingan ini!`
                }).then(() => {
                    reply.hidden = false;
                    $('.papan-final-score').removeClass('d-none');

                });

            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Lose..!',
                    html: `<span class="lead font-weight-bold text-primary">${name}</span> 
                            Yang Memenangkan Pertandingan ini!`
                }).then(() => {
                    reply.hidden = false;
                    $('.papan-final-score').removeClass('d-none');

                });
            }
        }
    });

}

const animateTitle = DOM => {
    const arrayAnimate = [
        'Cars Race', 'Fun Racing', 'Cars Awesome', 'SpeedRacing', 'Racers', 'Welcome Player'
    ];

    const limit = arrayAnimate.length;

    const rand1 = Math.floor(Math.random() * limit);
    const rand2 = Math.floor(Math.random() * limit);

    if (rand1 === rand2) {
        DOM.innerText = arrayAnimate[rand1];

    } else {
        animateTitle(DOM);

    }
}

// ... utama
const main = _ => {

    const title = selector('h1');
    const playRace = selector('.raceButton');
    const reply = selector('.reply');

    const racers = document.querySelectorAll('.car');
    const badges = document.querySelectorAll('.badge');
    const images = document.querySelectorAll('img');

    images.forEach(img => {
        img.draggable = false;
        img.className = 'rounded';
    });

    reply.hidden = true;

    playRace.addEventListener('click', () => {
        playGame();
        playRace.hidden = true;
    });

    reply.addEventListener('click', () => {
        $('.papan-final-score').addClass('d-none');
        playRace.hidden = false;
        reply.hidden = true;

        // ... setel ulang
        badges.forEach(badge => {
            badge.removeAttribute('style');
        });

        racers.forEach(racer => {
            racer.removeAttribute('style');
            racer.removeAttribute('title');
        });

    });

    // ... title animate
    setInterval(_ => {
        animateTitle(title);

    }, 1200);

}

export default main;