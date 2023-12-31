//타이핑 효과
let typeText = document.querySelector(".typeText");
let typeTextArr = ["함께 일하고 싶은", "같이 밥먹고 싶은", "웹을 통해 이야기하는"];
let index = 0, isAdding = true, typeTextIndex = 0;
let typingInterval;

function typing() {
  typeText.innerText = typeTextArr[typeTextIndex].slice(0, index);

  if (isAdding) {
    // 텍스트 추가
    if (index >= typeTextArr[typeTextIndex].length) {
      // 텍스트 추가 완료
      isAdding = false;
      setTimeout(resetAndContinue, 5200, hideCursor);
    } else {
      index++;
    }
  } else {
    // 텍스트 지우기
    if (index === 0) {
      // 텍스트 지우기 완료
      isAdding = true;
      typeTextIndex = (typeTextIndex + 1) % typeTextArr.length;
      if (typeTextIndex === 0) {
        // 모든 텍스트를 타이핑한 후에 반복 중지
        clearInterval(typingInterval);
        // 텍스트 타이핑이 완료된 후에 cursor를 숨기기 위해 hideCursor 함수 호출
        hideCursor();
      }
    } else {
      index--;
    }
  }
}

function resetAndContinue() {
  // 텍스트 초기화
  index = 0;
  isAdding = true;

  // 다음 텍스트로 이동
  typeTextIndex = (typeTextIndex + 1) % typeTextArr.length;

  // 모든 텍스트를 타이핑한 후에 반복 중지
  if (typeTextIndex === 0) {
    clearInterval(typingInterval);
    // 텍스트 타이핑이 완료된 후에 cursor를 숨기기 위해 hideCursor 함수 호출
    hideCursor();
  }
}


// cursor를 숨기는 함수
function hideCursor() {
  let cursor = document.querySelector(".typeAct");
  cursor.classList.add("active");
}


//메뉴 클릭
let header = document.querySelector("header");
let navMenu = header.querySelectorAll("nav li");
let highlight = header.querySelector(".highlight");




let sct = window.scrollY;
let section = document.querySelectorAll("main section");
let siteRow = document.querySelectorAll(".row");
let uiuxRow = document.querySelector(".sec3");

// Circle Chart
let chartBox = document.querySelector(".charts");
let charts = chartBox.querySelectorAll(".chart");
let chartOST = chartBox.offsetTop; // 첫 번째 chart의 offsetTop을 기준으로 계산

let isActive = false;

window.onload = function() {
  typing();

  // setInterval 사용
  typingInterval = setInterval(typing, 120);
  
  navMenu.forEach(item => {
    item.addEventListener("click", (e)=> {
      e.preventDefault();
      let targetLeft = e.target.offsetLeft;
      let targetWidth = e.target.offsetWidth;
  
      highlight.style.left = targetLeft + 'px';
      highlight.style.width = targetWidth + 'px';
      highlight.style.display = 'block';
  
      let targetId = item.querySelector("a").getAttribute("href");
      let targetOst = document.querySelector(targetId);
  
      window.scrollTo({ left: 0, top: targetOst.offsetTop - 100, behavior: "smooth" }); 
  
    })
  
  });

  
window.addEventListener("scroll", () => {
  sct = window.scrollY;

  section.forEach((sec, idx) => {
    let rect = sec.getBoundingClientRect();
    if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
      for (let m of navMenu) {
        m.classList.remove("active");
      }
      navMenu[idx].classList.add("active");
      highlight.style.display = "block";

      let targetLeft = navMenu[idx].offsetLeft;
      let targetWidth = navMenu[idx].offsetWidth;
      highlight.style.left = targetLeft + "px";
      highlight.style.width = targetWidth + "px";
    }
  });

  siteRow.forEach(row => {
    let rect = row.getBoundingClientRect();
    if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
      row.classList.add("active");
    }
  });

  if (uiuxRow.offsetTop - 250 <= sct) {
    uiuxRow.classList.add("active");
  }

  if (sct === 0) {
    highlight.style.display = "none";
    navMenu.forEach(m => {
      m.classList.remove("active");
    });
    header.classList.remove("active");
  } else {
    header.classList.add("active");
  }

  if (sct >= chartOST - 500) {
    if (!isActive) {
      chartAnimation();
      isActive = true;
    }
  } 

});

};


function chartAnimation() {
  charts.forEach(chart => {
    let title = chart.querySelector('h2');
    let targetNum = title.getAttribute('data-num');
    let targetSVG = chart.querySelector('circle');
    
    let num = 0;
    let duration = 800;
    let startTime = performance.now();

    function animate() {
      let currentTime = performance.now();
      let progress = Math.min((currentTime - startTime) / duration, 1);
      num = Math.ceil(progress * targetNum);

      title.textContent = num;

      let value = 400 - (400 * num / 100);
      targetSVG.style.strokeDashoffset = -value;

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    animate();
  });
}






