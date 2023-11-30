// Элементы на странице
const slider = document.querySelector('#slider')
const sliderItems = Array.from(slider.children)
const dotsWrapper = document.querySelector('#dots-wrapper')
const dots = Array.from(document.querySelectorAll('.dot'))
const btnNext = document.querySelector('#btnNext')
const btnPrev = document.querySelector('#btnPrev')

sliderItems.forEach((slide, index) => {
	// Скрываем все слайды, кроме первого
	if (index !== 0) slide.classList.add('hidden')

	// Добавляем индексы
	slide.dataset.index = index

	// Добавляем data атрибут active для первого (активного) слайда
	sliderItems[0].setAttribute('data-active', '')

	// Клик по слайдам
	slide.addEventListener('click', () => {
		showNextSlide({ direction: 'next' })
	})
})

dots.forEach((dot, index) => {
	// Добавляем индексы
	dot.dataset.index = index

	// Добавляем атрибут active для первой (активной) точки
	dots[0].setAttribute('active', '')

	// Клик по точкам
	dot.addEventListener('click', event => {
		showNextSlide({ index: event.target.dataset.index })
	})
})

// Клик по кнопкам
btnNext.addEventListener('click', function () {
	showNextSlide({ direction: 'next' })
})

btnPrev.addEventListener('click', function () {
	showNextSlide({ direction: 'prev' })
})

// Функции
function showNextSlide({ direction, index }) {
	// Скрываем текущий слайд
	const currentSlide = slider.querySelector('[data-active]')
	const currentSlideIndex = Number(currentSlide.dataset.index)

	currentSlide.classList.add('hidden')
	currentSlide.removeAttribute('data-active')
	dots[currentSlideIndex].removeAttribute('active')

	// Рассчитываем следующий индекс в зависимости от направления движения
	let nextSlideIndex

	if (index) {
		nextSlideIndex = Number(index)
	} else if (direction === 'next') {
		nextSlideIndex =
			currentSlideIndex + 1 === sliderItems.length ? 0 : currentSlideIndex + 1
	} else if (direction === 'prev') {
		nextSlideIndex =
			currentSlideIndex === 0 ? sliderItems.length - 1 : currentSlideIndex - 1
	}

	// Показываем следующий слайд
	const nextSlide = slider.querySelector(`[data-index="${nextSlideIndex}"]`)
	nextSlide.classList.remove('hidden')
	nextSlide.setAttribute('data-active', '')
	dots[nextSlideIndex].setAttribute('active', '')
}
