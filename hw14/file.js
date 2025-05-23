"use strict"
const btnSwipeLeftRight = document.querySelectorAll('.swipe-btn');
const images = [...document.querySelectorAll('.slide')];
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');
const dots = document.querySelectorAll('.btn-circle');

prevBtn.classList.add('btn-hide');

btnSwipeLeftRight.forEach(button => {
    button.addEventListener('click', function(event) {
        const currentBtn = event.target.closest('.swipe-btn');
        const currentIndex = images.findIndex(img => !img.classList.contains('img-hidden'));

        if (currentBtn.classList.contains('next')) {
            if (currentIndex < images.length - 1) {
                images[currentIndex].classList.add('img-hidden')
                images[currentIndex + 1].classList.remove('img-hidden')
                prevBtn.classList.remove('btn-hide')

                if (currentIndex + 1 === images.length - 1) {
                    nextBtn.classList.add('btn-hide');
                }
            }
        }

        if (currentBtn.classList.contains('prev')) {
            if (currentIndex > 0) {
                images[currentIndex].classList.add('img-hidden')
                images[currentIndex - 1].classList.remove('img-hidden')

                nextBtn.classList.remove('btn-hide')
                if (currentIndex - 1 === 0) {
                    prevBtn.classList.add('btn-hide')
                }
            }
        }
    })
})


dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        const currentIndex = images.findIndex(img => !img.classList.contains('img-hidden'));
        if (index !== currentIndex) {
            images[currentIndex].classList.add('img-hidden');
            images[index].classList.remove('img-hidden');
        }
            if (index === 0) {
            prevBtn.classList.add('btn-hide');
            nextBtn.classList.remove('btn-hide');
        } else if (index === images.length - 1) {
            nextBtn.classList.add('btn-hide');
            prevBtn.classList.remove('btn-hide');
        } else {
            prevBtn.classList.remove('btn-hide');
            nextBtn.classList.remove('btn-hide');
        }
    })
})
