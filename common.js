//page0




// page1



const rects = document.querySelectorAll('.pianoSvg rect');


const whiteKeyAudios = [
    '../audio/C3.mp3', '../audio/D3.mp3', '../audio/E3.mp3', '../audio/F3.mp3',
    '../audio/G3.mp3', '../audio/A3.mp3', '../audio/B3.mp3', '../audio/C4.mp3',
    '../audio/D4.mp3', '../audio/E4.mp3', '../audio/F4.mp3', '../audio/G4.mp3',
    '../audio/A4.mp3', '../audio/B4.mp3', '../audio/C5.mp3', '../audio/D5.mp3',
    '../audio/E5.mp3'
];

const blackKeyAudios = [
    '../audio/Db3.mp3', '../audio/Eb3.mp3', '../audio/Gb3.mp3', '../audio/Ab3.mp3', '../audio/Bb3.mp3',
    '../audio/Db4.mp3', '../audio/Eb4.mp3', '../audio/Gb4.mp3', '../audio/Ab4.mp3', '../audio/Bb4.mp3',
    '../audio/Db5.mp3', '../audio/Eb5.mp3'
];

let whiteKeyIndex = 0;
let blackKeyIndex = 0;

rects.forEach((rect) => {
    const key = rect.getAttribute('data-key');
    const originalColor = rect.getAttribute('fill');
    let audio;


    if (originalColor === 'white') {
        audio = new Audio(whiteKeyAudios[whiteKeyIndex]);
        whiteKeyIndex++;
    } else if (originalColor === '#484848') {
        audio = new Audio(blackKeyAudios[blackKeyIndex]);
        blackKeyIndex++;
    } else {
        console.warn('Unrecognized key color:', originalColor);
        return;
    }


    rect.addEventListener('mousedown', () => {
        if (originalColor === 'white') {
            rect.setAttribute('fill', '#D9D9D9'); // 흰 건반 누를 때
        } else if (originalColor === '#484848') {
            rect.setAttribute('fill', '#000000'); // 검은 건반 누를 때
        }

        if (audio) {
            audio.currentTime = 0;
            audio.play();
        }
    });


    rect.addEventListener('mouseup', () => {
        rect.setAttribute('fill', originalColor);
    });


    rect.addEventListener('mouseleave', () => {
        rect.setAttribute('fill', originalColor);
    });
});

function toggleKey(noteClass) {
    console.log('Note class:', noteClass);
    const note = document.querySelector(`.note-${noteClass}`);
    console.log('Selected note:', note);
    if (note) {
        note.classList.toggle("show-note");
    } else {
        console.warn(`Note with class .note-${noteClass} not found`);
    }
}





// page2

const page2wrap = document.querySelector(".wrap_abacus");

if (page2wrap) {

    const animationDuration = 500;

    const answerGroups = {
        question1_abacus: {
            answers: document.querySelectorAll('.question1_abacus #answer1'),
            clicked: new Set(),
            stamp: document.querySelector('.stamp1'),
        },
        question2_abacus: {
            answers: document.querySelectorAll('.question2_abacus #answer1'),
            clicked: new Set(),
            stamp: document.querySelector('.stamp2'),
        },
    };

    function resetAbacus() {
        document.querySelectorAll('.abacus_top img').forEach(img => {
            img.style.top = '-0.9vw';
            img.style.transition = `top ${animationDuration}ms ease`;
        });

        document.querySelectorAll('.abacus_under img').forEach(img => {
            img.style.top = '1.3vw';
            img.style.transition = `top ${animationDuration}ms ease`;
        });

        Object.values(answerGroups).forEach(group => {
            group.clicked.clear();
            group.stamp.style.display = 'none';
        });
    }

    document.getElementById('setButton_abacus1').addEventListener('click', resetAbacus);
    document.getElementById('setButton_abacus2').addEventListener('click', resetAbacus);



    document.querySelectorAll('.abacus_under img').forEach(img => {
        img.addEventListener('click', () => {
            if (img.style.top === '1.3vw' || img.style.top === '') {
                img.style.top = '0';
            } else {
                img.style.top = '1.3vw';
            }
            img.style.transition = `top ${animationDuration}ms ease`;

            Object.entries(answerGroups).forEach(([groupName, group]) => {
                if (img.closest(`.${groupName}`) && img.id === 'answer1') {
                    group.clicked.add(img);

                    if (group.clicked.size === group.answers.length) {
                        setTimeout(() => {
                            alert(`정답입니다! 칭찬 도장 찍어드릴게요!`);
                            group.stamp.style.display = 'block';
                        }, animationDuration);
                    }
                }
            });
        });
    });

    document.querySelectorAll('.abacus_top img').forEach(img => {

        img.addEventListener('click', () => {
            if (img.style.top === '-0.9vw' || img.style.top === '') {
                img.style.top = '0';
            } else {
                img.style.top = '-0.9vw';
            }
            img.style.transition = `top ${animationDuration}ms ease`;
        });
    });



    // 정답 처리하는 과정에서 뭔가 충돌이 있는듯.
    //     const underImages = document.querySelectorAll('.abacus_under img');
    // const stamp1 = document.querySelector('.stamp1');
    // const stamp2 = document.querySelector('.stamp2');

    // // `question1_abacus`의 정답 확인 로직
    // function checkAnswerForQuestion1() {
    //     const question1Images = document.querySelectorAll('.question1_abacus .abacus_under img#answer1');
    //     const allAnswered = Array.from(question1Images).every(img => img.style.top === '0px');

    //     if (allAnswered) {
    //         setTimeout(() => {
    //             alert('정답입니다! 칭찬 도장 찍어드릴게요!');
    //             stamp1.style.display = 'block'; // stamp1 표시
    //         }, 500); // 애니메이션 후 실행
    //     }
    // }

    // // `question2_abacus`의 정답 확인 로직
    // function checkAnswerForQuestion2() {
    //     const question2Images = document.querySelectorAll('.question2_abacus .abacus_under img#answer1');
    //     const allAnswered = Array.from(question2Images).every(img => img.style.top === '0px');

    //     if (allAnswered) {
    //         setTimeout(() => {
    //             alert('정답입니다! 참 잘했어요!');
    //             stamp2.style.display = 'block'; // stamp2 표시
    //         }, 500); // 애니메이션 후 실행
    //     }
    // }

    // // under 이미지 클릭 이벤트
    // underImages.forEach(img => {
    //     img.addEventListener('click', () => {
    //         if (img.style.top === '1.3vw' || img.style.top === '') {
    //             img.style.top = '0';
    //         } else {
    //             img.style.top = '1.3vw';
    //         }
    //         img.style.transition = 'top 0.5s ease';

    //         // 각각의 질문에 대해 정답 여부를 확인
    //         checkAnswerForQuestion1();
    //         checkAnswerForQuestion2();
    //     });
    // });

    // // top 이미지 초기화 버튼
    // document.getElementById('setButton_abacus1').addEventListener('click', () => {
    //     document.querySelectorAll('.abacus_top img').forEach(img => {
    //         img.style.top = '-0.9vw';
    //         img.style.transition = 'top 0.5s ease';
    //     });

    //     document.querySelectorAll('.abacus_under img').forEach(img => {
    //         img.style.top = '1.3vw';
    //         img.style.transition = 'top 0.5s ease';
    //     });

    //     // stamp 초기화
    //     stamp1.style.display = 'none';
    //     stamp2.style.display = 'none';
    // });

    // document.getElementById('setButton_abacus2').addEventListener('click', () => {
    //     document.querySelectorAll('.abacus_top img').forEach(img => {
    //         img.style.top = '-0.9vw';
    //         img.style.transition = 'top 0.5s ease';
    //     });

    //     document.querySelectorAll('.abacus_under img').forEach(img => {
    //         img.style.top = '1.3vw';
    //         img.style.transition = 'top 0.5s ease';
    //     });

    //     // stamp 초기화
    //     stamp1.style.display = 'none';
    //     stamp2.style.display = 'none';
    // });





}
















// page3
const page3Canvas = document.querySelector(".wrap_draw");
// const canvas = document.getElementById("jsCanvas");

if (page3Canvas) {
    const canvas = document.getElementById("jsCanvas");
    const ctx = canvas.getContext("2d");
    const colors = document.getElementsByClassName("jsColor_art");
    const range = document.getElementById("jsRange_art");
    const mode = document.getElementById("jsMode_art");
    const saveBtn = document.getElementById("jsSave_art");

    const INITIAL_COLOR = "#000000";
    const CANVAS_SIZE_W = window.innerWidth * 0.40;
    const CANVAS_SIZE_H = window.innerWidth * 0.26;

    console.log('Canvas Width:', CANVAS_SIZE_W, 'px');
    console.log('Canvas Height:', CANVAS_SIZE_H, 'px');


    ctx.strokeStyle = "#2c2c2c";

    canvas.width = CANVAS_SIZE_W;
    canvas.height = CANVAS_SIZE_H;

    ctx.fillStyle = "#e0b37b";
    // ctx.globalAlpha ='0.4';
    // ctx.fillRect(30,200,150,150);
    ctx.fillRect(0, 0, CANVAS_SIZE_W, CANVAS_SIZE_H);

    ctx.strokeStyle = INITIAL_COLOR;
    ctx.fillStyle = INITIAL_COLOR;
    ctx.lineWidth = 2.5;

    let painting = false;
    let filling = false;

    function stopPainting() {
        painting = false;
    }

    function startPainting() {
        painting = true;
    }

    function onMouseMove(event) {
        const x = event.offsetX;
        const y = event.offsetY;
        if (!painting) {
            ctx.beginPath();
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
            ctx.stroke();
        }
    }

    window.onload = function () {
        const colorButtons = document.querySelectorAll('.controls_color');

        colorButtons.forEach((button) => {
            button.addEventListener('click', handleColorClick);
        });
    };

    // 함수 저장만하고 호출을 안 해서 해결이 안 됐었는데 window.onload 쓰고 된다!!!
    // 참고로 처음에는 코드가 아래와 같았음
    // function handleColorClick(event) {
    //     // alert("ok");
    //     const color = event.target.style.backgroundColor;
    //     ctx.strokeStyle = color;
    //     ctx.fillStyle = color;
    // }


    function handleColorClick(event) {
        const ctx = canvas.getContext("2d");
        const color = event.target.style.backgroundColor;
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
    }


    function handleRangeChange(event) {
        const size = event.target.value;
        ctx.lineWidth = size;
    }

    function handleModeClick() {
        if (filling === true) {
            filling = false;
            mode.innerText = "채우기";
        } else {
            filling = true;
            mode.innerText = "그리기";
        }
    }

    function handleCanvasClick() {
        if (filling) {
            ctx.fillRect(0, 0, CANVAS_SIZE_W, CANVAS_SIZE_H);
        }
    }

    // 우클릭 방지
    /*
    function handleCM(event) {
       event.preventDefault();
     }
     */

    function handleSaveClick() {
        const image = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = image;
        link.download = "내가그린기린그림.png";
        link.click();
    }

    if (canvas) {
        canvas.addEventListener("mousemove", onMouseMove);
        canvas.addEventListener("mousedown", startPainting);
        canvas.addEventListener("mouseup", stopPainting);
        canvas.addEventListener("mouseleave", stopPainting);
        canvas.addEventListener("click", handleCanvasClick);
        // canvas.addEventListener("contextmenu", handleCM);
    }

    Array.from(colors).forEach(color =>
        color.addEventListener("click", handleColorClick));


    if (range) {
        range.addEventListener("input", handleRangeChange);
    }

    if (mode) {
        mode.addEventListener("click", handleModeClick);
    }

    if (saveBtn) {
        saveBtn.addEventListener("click", handleSaveClick);
    }

}





//page4

const page4wrap = document.querySelector(".wrap_ballet")

if (page4wrap) {
    const balletButtons = document.querySelectorAll('.balletBtn');
    const balletImgbox = document.querySelector('.balletImgbox');

    balletButtons.forEach(button => {
        button.addEventListener('click', () => {
            balletButtons.forEach(btn => {
                btn.style.background = 'transparent';
                btn.style.color = '#683f03';
            });

            button.style.background = '#683f03';
            button.style.color = '#ce974d';


            switch (button.value) {
                case 'passe':
                    balletImgbox.style.backgroundImage = "url('../img/passe.png')";
                    balletImgbox.style.animation = 'balletgif1 2s steps(4),linear';
                    break;
                case 'Developpe':
                    balletImgbox.style.backgroundImage = "url('../img/developpe.png')";
                    balletImgbox.style.animation = 'balletgif2 2s steps(11),linear';
                    break;
                case 'Arabesque':
                    balletImgbox.style.backgroundImage = "url('../img/Arabesque.png')";
                    balletImgbox.style.animation = 'balletgif3 2s steps(5),linear';
                    break;
                case 'Penche':
                    balletImgbox.style.backgroundImage = "url('../img/Penche.png')";
                    balletImgbox.style.animation = 'balletgif4 2s steps(8),linear';
                    break;
                case 'Plie':
                    balletImgbox.style.backgroundImage = "url('../img/Plie.png')";
                    balletImgbox.style.animation = 'balletgif1 2s steps(4),linear';
                    break;
            }

            balletImgbox.classList.remove('animate');
            void balletImgbox.offsetWidth; // Reflow
            balletImgbox.classList.add('animate');
        });
    });




}






//page5

const page5wrap = document.querySelector(".wrap_design")

if (page5wrap) {
    // console.log("스크립트가 로드되었습니다.");

    const boxes_design = document.querySelectorAll('.box_design');
    const colorPalette_design = document.getElementById('colorPalette_design'); // 변수 이름 수정
    const opacitySlider_design = document.getElementById('opacitySlider_design');
    const cube_design = document.getElementById('cube_design');

    let isDragging_design = false;
    let previousMousePosition_design = { x: 0, y: 0 };
    let rotation_design = { x: 0, y: 0 };

    boxes_design.forEach(box => {
        box.addEventListener('click', () => {
            const newColor_design = colorPalette_design.value;
            const opacity_design = opacitySlider_design.value / 100; //투명도
            box.style.backgroundColor = `${newColor_design}${Math.round(opacity_design * 255).toString(16).padStart(2, '0')}`; // RGBA 형식으로 색상 설정
        });
    });

    cube_design.addEventListener('mousedown', (event) => {
        isDragging_design = true;
        previousMousePosition_design = { x: event.clientX, y: event.clientY };
    });

    document.addEventListener('mousemove', (event) => {
        if (isDragging_design) {
            const deltaX_design = event.clientX - previousMousePosition_design.x;
            const deltaY_design = event.clientY - previousMousePosition_design.y;

            rotation_design.y += deltaX_design * 0.5;
            rotation_design.x -= deltaY_design * 0.5;

            cube_design.style.transform = `rotateX(${rotation_design.x}deg) rotateY(${rotation_design.y}deg)`; // 수정된 부분

            previousMousePosition_design = { x: event.clientX, y: event.clientY };
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging_design = false;
    });


};




//page6

const page6wrap = document.querySelector(".wrap_idol")


if (page6wrap) {
    document.querySelectorAll(".heart_idol").forEach((heartIdol) => {
        heartIdol.addEventListener("click", () => {
            const idolImg = heartIdol.closest(".idol_area").querySelector(".idolImg");
            const heartContainer = heartIdol.closest(".idol_area");

            const originalHeartSrc = heartIdol.src;
            heartIdol.src = "../img/heart_fill.PNG";

            const originalIdolSrc = idolImg.src;
            idolImg.src = "../img/smile.PNG";

            setTimeout(() => {
                heartIdol.src = originalHeartSrc;
                idolImg.src = originalIdolSrc;
            }, 300);

            const heart = document.createElement("div");
            heart.classList.add("heart");

            const randomX = Math.random() * 2 + 44; // 44~46 범위
            const randomSize = Math.random() * 0.5 + 0.75; // 크기 0.75 ~ 1.25배
            heart.style.left = `${randomX}vw`;
            heart.style.width = `${randomSize * 2}vw`;
            heart.style.height = `${randomSize * 2}vw`;

            heart.style.position = "absolute";
            heart.style.bottom = "0";
            heart.style.backgroundImage = "url('../img/heart_fill.PNG')";
            heart.style.backgroundSize = "cover";
            heart.style.animation = "floatUp 2s ease-out forwards";
            heart.style.pointerEvents = "none";

            heartContainer.appendChild(heart);

            heart.addEventListener("animationend", () => {
                heart.remove();
            });
        });
    });


}








//page7

const page7wrap = document.querySelector(".wrap_programming")

if (page7wrap) {
    const radio_programming = document.querySelectorAll('input[type="radio"]')
    const loading_programming = document.querySelector('.programmingImg_container')
    const bg_programming = document.querySelector('.programming_bg')
    const face_programming = document.querySelector('.programming_face')
    const laptop_programming = document.querySelector('.programming_laptop')
    const star_programming = document.querySelector('.star_contain')
    const bubble_programming = document.querySelector('.bubble_contain')

    radio_programming.forEach(item => {
        item.addEventListener('click', () => {

            if (item.value === 'light') {
                loading_programming.style.background = '#b2feff53'
                bg_programming.style.background = 'url("../img/imagine_bg.svg")no-repeat'
                bg_programming.style.backgroundSize = '37vw'
                bg_programming.style.top = '10vw'
                bg_programming.style.left = '3.5vw'
                face_programming.style.background = 'url("../img/imagine_face.svg")no-repeat'
                face_programming.style.backgroundSize = '7vw'
                face_programming.style.top = '7.5vw'
                face_programming.style.left = '18.5vw'
                face_programming.style.animation = 'nod 1.5s infinite'
                laptop_programming.style.backgroundSize = '11vw'
                star_programming.style.display = 'block'
                bubble_programming.style.display = 'none'
            } else if (item.value === 'dark') {
                loading_programming.style.background = '#00000253'
                bg_programming.style.background = 'url("../img/reality_bg.svg")no-repeat'
                bg_programming.style.backgroundSize = '37vw'
                face_programming.style.background = 'url("../img/reality_face.svg")no-repeat'
                face_programming.style.backgroundSize = '7vw'
                face_programming.style.top = '7vw'
                face_programming.style.left = '18vw'
                face_programming.style.backgroundSize = '7.3vw'
                face_programming.style.animation = 'tiltani 2.5s infinite'
                laptop_programming.style.backgroundSize = '11vw'
                star_programming.style.display = 'none'
                bubble_programming.style.display = 'block'
            }

        })
    })
}









//page8


const page8wrap = document.querySelector(".wrap_tea");

if (page8wrap) {
    function setupMultiSelection_tea(buttons, activeClass) {
        buttons.forEach((btn) => {
            btn.addEventListener("click", function () {
                const img = this.querySelector("img");

                if (this.classList.contains(activeClass)) {
                    const originalSrc = img.dataset.src;
                    img.setAttribute("src", originalSrc);
                    this.classList.remove(activeClass);
                } else {
                    const selectedSrc = img.dataset.src.replace(".PNG", "_select.PNG");
                    img.setAttribute("src", selectedSrc);
                    this.classList.add(activeClass);
                }
            });
        });
    }


    function initializeSelection_tea() {
        // 차 버튼 초기화
        const teaButtons_tea = document.querySelectorAll(".leftSide_tea button");
        teaButtons_tea.forEach((btn) => {
            const img = btn.querySelector("img");
            img.dataset.src = img.getAttribute("src");
        });
        setupMultiSelection_tea(teaButtons_tea, "selected-tea");

        // 추가 재료 버튼 초기화 
        const ingredientButtons_tea = document.querySelectorAll(".rightSide_tea button");
        ingredientButtons_tea.forEach((btn) => {
            const img = btn.querySelector("img");
            img.dataset.src = img.getAttribute("src");
        });
        setupMultiSelection_tea(ingredientButtons_tea, "selected-ingredient");
    }

    document.querySelector(".makeBtn_tea").addEventListener("click", function () {
        const selectedTeas_tea = document.querySelectorAll(".selected-tea img");
        const selectedIngredients_tea = document.querySelectorAll(".selected-ingredient img");

        if (selectedTeas_tea.length === 0 && selectedIngredients_tea.length === 0) {
            alert("재료를 선택하세요!");
        } else {
            const teaClasses_tea = Array.from(selectedTeas_tea).map((img) => img.classList[0]);

            const ingredientClasses_tea = Array.from(selectedIngredients_tea).map((img) => img.classList[0]);

            const teaPart_tea = teaClasses_tea.join("_");
            const ingredientPart_tea = ingredientClasses_tea.join("_");

            const newSrc_tea = `../img/${teaPart_tea}_${ingredientPart_tea}.PNG`;

            // 이미지가 존재하는지 확인
            const img = new Image();
            img.src = newSrc_tea;
            img.onload = function () {
                const teaComImg_tea = document.querySelector(".middle_tea .tea_com");
                teaComImg_tea.setAttribute("src", newSrc_tea);
                teaComImg_tea.style.display = "block";
            };
            img.onerror = function () {
                const teaComImg_tea = document.querySelector(".middle_tea .tea_com");
                teaComImg_tea.setAttribute("src", "../img/strange.PNG");
                teaComImg_tea.style.display = "block";
            };
        }
    });


    document.querySelector(".jsSave_tea").addEventListener("click", function () {
        const teaComImg_tea = document.querySelector(".middle_tea .tea_com");

        if (teaComImg_tea && teaComImg_tea.src) {
            const imgSrc_tea = teaComImg_tea.src;

            const a_tea = document.createElement("a");
            a_tea.href = imgSrc_tea;
            a_tea.download = "맛있게드세요!.png";
            a_tea.style.display = "none";

            document.body.appendChild(a_tea);
            a_tea.click();

            document.body.removeChild(a_tea);
        } else {
            alert("저장할 이미지를 먼저 생성하세요!");
        }
    });

    // 초기화
    document.addEventListener("DOMContentLoaded", initializeSelection_tea);


}










// page9




const page9wrap = document.querySelector(".wrap_knit")

if (page9wrap) {
    function setupSelection(buttons, activeClass) {
        buttons.forEach((btn) => {
            btn.addEventListener('click', function () {
                buttons.forEach((b) => {
                    const img = b.querySelector('img');
                    const originalSrc = img.dataset.src;
                    img.setAttribute('src', originalSrc);
                    b.classList.remove(activeClass);
                });

                const img = this.querySelector('img');
                const selectedSrc = img.dataset.src.replace('.PNG', '_select.PNG');
                img.setAttribute('src', selectedSrc);
                this.classList.add(activeClass);
            });
        });
    }

    const colorButtons = document.querySelectorAll('.knit_color button');
    setupSelection(colorButtons, 'selected-color');

    const designButtons = document.querySelectorAll('.knit_design button');
    setupSelection(designButtons, 'selected-design');

    // makeBtn 클릭
    document.querySelector('.makeBtn_knit').addEventListener('click', function () {
        const selectedColor = document.querySelector('.selected-color img');
        const selectedDesign = document.querySelector('.selected-design img');

        if (selectedColor && selectedDesign) {
            const colorClass = selectedColor.className.split(' ')[0]; // 예: 'yellow', 'blue', 'orange'
            const designClass = selectedDesign.className.split(' ')[0]; // 예: 'rabbitDesign', 'giraffeDesign', 'dogDesign'

            const comImg = document.querySelector('.com_img');
            const newSrc = `../img/${designClass}_${colorClass[0]}.PNG`; // 예: giraffe_y.PNG
            comImg.setAttribute('src', newSrc);
            comImg.style.display = 'block'
        } else {
            alert('색상과 디자인을 모두 선택하세요!');
        }
    });


    // Save 버튼 클릭
    document.querySelector('.jsSave_knit').addEventListener('click', function () {
        const comImg = document.querySelector('.com_img');

        if (comImg && comImg.src) {
            const imgSrc = comImg.src;

            const a = document.createElement('a');
            a.href = imgSrc;
            a.download = 'knit_animal!.png';
            a.style.display = 'none';

            document.body.appendChild(a);
            a.click();

            document.body.removeChild(a);
        } else {
            alert('저장할 이미지를 먼저 선택해주세요!');
        }
    });

}
