window.addEventListener('DOMContentLoaded', () => {
  console.log('app start')

  window.addEventListener('load', () => {
    console.log('app load')

    const sliders = document.querySelectorAll('.slider')

    if (sliders.length) {
      console.log('slider find')

      // data
      const DUPLICATE_COUNT = 2

      const SLIDE_ACTIVE_CLASS = 'slider__slide--active'

      // methods
      function initIndexes(slides) {
        slides.forEach((slide, index) => slide.setAttribute('data-slide-index', index))
      }

      function addDuplicate(wrapper, slides) {
        for (let i = 0; i < DUPLICATE_COUNT; i++) {
          for (let j = 0; j < slides.length; j++) {
            wrapper.prepend(slides[slides.length - j - 1].cloneNode(true))
            wrapper.append(slides[j].cloneNode(true))
          }
        }
      }

      function calcSize(wrapper, slide) {
        const slideClone = slide.cloneNode(true)

        slideClone.style.position = 'fixed'
        slideClone.style.top = '100%'
        slideClone.style.left = '100%'

        slideClone.classList.remove(SLIDE_ACTIVE_CLASS)
        
        wrapper.append(slideClone)

        const slideRect = slideClone.getBoundingClientRect()
        const slideWidth = slideRect.width

        slideClone.remove()

        return slideWidth
      }

      function calcSizes(wrapper, slides) {
        const sizes = []

        slides.forEach(slide => sizes.push(calcSize(wrapper, slide)))

        return sizes
      }

      function calcGap(wrapper, slides) {
        const slide = slides[0]
        const slideClone = slide.cloneNode(true)

        slideClone.style.position = 'fixed'
        slideClone.style.top = '100%'
        slideClone.style.left = '100%'

        wrapper.append(slideClone)

        const slideStyle = getComputedStyle(slideClone)
        const slideMarginRight = slideStyle.marginRight
        
        return +slideMarginRight.slice(0, -2)
      }

      sliders.forEach(slider => {
        console.log('slider')
        
        // data
        const fastWrapper = slider.querySelector('.slider__wrapper--fast')
        const alignWrapper = slider.querySelector('.slider__wrapper--align')
        const moveWrapper = slider.querySelector('.slider__wrapper--move')

        const slides = slider.querySelectorAll('.slider__slide')

        let sizes
        let gap

        let activeIndex = 0

        // events
        initIndexes(slides)

        addDuplicate(moveWrapper, slides)
        
        sizes = calcSizes(moveWrapper, slides)
        gap = calcGap(moveWrapper, slides)

        slides[activeIndex].classList.add(SLIDE_ACTIVE_CLASS)

        window.addEventListener('resize', () => {
          sizes = calcSizes(moveWrapper, slides)
          gap = calcGap(moveWrapper, slides)
        })
      })
    }
  })
})
