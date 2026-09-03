/* =========================================================
   DOM ELEMENTS
========================================================= */

const header = document.querySelector('.header');
const revealItems = document.querySelectorAll('.reveal');


/* =========================================================
   SCROLL REVEAL
========================================================= */

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            /*
                다시 위로 올라갔을 때
                애니메이션이 다시 시작되도록
            */
            entry.target.classList.remove('show');
        }
    });
}, {
    threshold: 0.14
});

revealItems.forEach((item) => {
    observer.observe(item);
});


/* =========================================================
   HEADER SCROLL
========================================================= */

window.addEventListener('scroll', () => {
    if (!header) return;

    header.classList.toggle(
        'scrolled',
        window.scrollY > 20
    );
});


/* =========================================================
   PC NAV SMOOTH SCROLL
========================================================= */

document.querySelectorAll('.gnb a').forEach((a) => {
    a.addEventListener('click', (e) => {
        const href = a.getAttribute('href');
        const target = document.querySelector(href);

        if (target) {
            e.preventDefault();

            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});


/* =========================================================
   MOBILE MENU
========================================================= */

const menuButton = document.querySelector('.menu');
const mobileNav = document.querySelector('.mobile-nav');

if (menuButton && mobileNav) {

    /* 모바일 메뉴 열기 / 닫기 */

    menuButton.addEventListener('click', () => {
        const isActive = menuButton.classList.toggle('active');

        mobileNav.classList.toggle(
            'active',
            isActive
        );

        menuButton.setAttribute(
            'aria-expanded',
            isActive
        );
    });


    /* 모바일 메뉴 클릭 시 닫기 */

    document.querySelectorAll('.mobile-nav a').forEach((a) => {
        a.addEventListener('click', (e) => {
            const href = a.getAttribute('href');
            const target = document.querySelector(href);

            if (target) {
                e.preventDefault();

                menuButton.classList.remove('active');
                mobileNav.classList.remove('active');

                menuButton.setAttribute(
                    'aria-expanded',
                    'false'
                );

                setTimeout(() => {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }, 50);
            }
        });
    });

}


/* =========================================================
   HERO TYPING EFFECT
========================================================= */

const typeText = document.querySelector('.typeText');
const cursor = document.querySelector('.typeAct');

if (typeText && cursor) {

    const typeTextArr = [
        '함께 일하고 싶은',
        '같이 밥먹고 싶은',
        '웹을 통해 이야기하는'
    ];

    let typeTextIndex = 0;
    let charIndex = 0;
    let isDeleting = false;


    function typing() {
        const currentText = typeTextArr[typeTextIndex];


        /* 글자 입력 */

        if (!isDeleting) {
            typeText.textContent = currentText.slice(
                0,
                charIndex
            );

            charIndex++;


            /* 문장을 다 입력하면 잠시 대기 */

            if (charIndex > currentText.length) {
                isDeleting = true;

                setTimeout(typing, 2200);

                return;
            }


        /* 글자 삭제 */

        } else {
            charIndex--;

            typeText.textContent = currentText.slice(
                0,
                charIndex
            );


            /* 문장을 모두 삭제하면 다음 문장 */

            if (charIndex === 0) {
                isDeleting = false;

                typeTextIndex =
                    (typeTextIndex + 1) % typeTextArr.length;
            }
        }


        /* 입력 / 삭제 속도 */

        setTimeout(
            typing,
            isDeleting ? 55 : 100
        );
    }


    typing();

}
