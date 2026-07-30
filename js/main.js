// 타이핑 효과
let typeText = document.querySelector(".typeText");
let typeTextArr = ["함께 일하고 싶은", "같이 밥먹고 싶은", "웹을 통해 이야기하는"];
let index = 0, isAdding = true, typeTextIndex = 0;
let typingInterval;

function typing() {

    typeText.innerText =
        typeTextArr[typeTextIndex].slice(0, index);

    if (isAdding) {

        if (index >= typeTextArr[typeTextIndex].length) {

            isAdding = false;

            setTimeout(
                resetAndContinue,
                5200,
                hideCursor
            );

        } else {

            index++;

        }

    } else {

        if (index === 0) {

            isAdding = true;

            typeTextIndex =
                (typeTextIndex + 1) % typeTextArr.length;

            if (typeTextIndex === 0) {

                clearInterval(typingInterval);

                hideCursor();

            }

        } else {

            index--;

        }

    }
}


function resetAndContinue() {

    index = 0;
    isAdding = true;

    typeTextIndex =
        (typeTextIndex + 1) % typeTextArr.length;

    if (typeTextIndex === 0) {

        clearInterval(typingInterval);

        hideCursor();

    }

}


// Cursor 숨기기
function hideCursor() {

    let cursor =
        document.querySelector(".typeAct");

    cursor.classList.add("active");

}


// 메뉴 클릭
let header = document.querySelector("header");
let navMenu = header.querySelectorAll("nav li");
let highlight = header.querySelector(".highlight");

let sct = window.scrollY;

let section =
    document.querySelectorAll("main section");

let siteRow =
    document.querySelectorAll(".row");

let uiuxRow =
    document.querySelector(".sec3");


// DOM 로드
document.addEventListener("DOMContentLoaded", function () {

    typing();

    typingInterval =
        setInterval(typing, 120);


    // 메뉴 클릭
    navMenu.forEach(item => {

        item.addEventListener("click", (e) => {

            e.preventDefault();

            let targetLeft =
                e.target.offsetLeft;

            let targetWidth =
                e.target.offsetWidth;


            highlight.style.left =
                targetLeft + "px";

            highlight.style.width =
                targetWidth + "px";

            highlight.style.display =
                "block";


            let targetId =
                item.querySelector("a").getAttribute("href");

            let targetOst =
                document.querySelector(targetId);


            window.scrollTo({

                left: 0,

                top: targetOst.offsetTop - 100,

                behavior: "smooth"

            });

        });

    });


    // 스크롤
    window.addEventListener("scroll", () => {

        sct = window.scrollY;


        section.forEach((sec, idx) => {

            let rect =
                sec.getBoundingClientRect();


            if (
                rect.top <= window.innerHeight / 2 &&
                rect.bottom >= window.innerHeight / 2
            ) {

                for (let m of navMenu) {

                    m.classList.remove("active");

                }

                navMenu[idx].classList.add("active");

                highlight.style.display =
                    "block";


                let targetLeft =
                    navMenu[idx].offsetLeft;

                let targetWidth =
                    navMenu[idx].offsetWidth;


                highlight.style.left =
                    targetLeft + "px";

                highlight.style.width =
                    targetWidth + "px";

            }

        });


        siteRow.forEach(row => {

            let rect =
                row.getBoundingClientRect();


            if (
                rect.top <= window.innerHeight / 2 &&
                rect.bottom >= window.innerHeight / 2
            ) {

                row.classList.add("active");

            }

        });


        if (uiuxRow.offsetTop - 250 <= sct) {

            uiuxRow.classList.add("active");

        }


        if (sct === 0) {

            highlight.style.display =
                "none";

            navMenu.forEach(m => {

                m.classList.remove("active");

            });

            header.classList.remove("active");

        } else {

            header.classList.add("active");

        }

    });

});


// =========================
// Skill
// =========================

const skillTrack =
    document.getElementById("skillTrack");

let skills = [];


// JSON 가져오기
fetch("./skill.json")
    .then(res => res.json())
    .then(data => {

        skills = data;

        createSkill();

    });


// 스킬 아이콘 생성
function createSkill() {

    skillTrack.innerHTML = "";


    // 첫 번째 세트
    skills.forEach(skill => {

        const item =
            document.createElement("div");

        item.classList.add("skill_item");

        item.innerHTML = `
             <div class="skill_img">
                <img
                    src="${skill.img}"
                    alt="${skill.name}"
                >
            </div>

            <p class="skill_name">
                ${skill.name}
            </p>
        `;

        skillTrack.appendChild(item);

    });

}