let playBtn = document.querySelector('.play-btn');
let selectCategory = document.querySelector('.select-Category');

playBtn.addEventListener('click', ()=>{
    selectCategory.classList.toggle('select-Category-display');
})


