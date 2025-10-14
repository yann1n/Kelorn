class SplashScreen {
    constructor(element, duration = 4000) {
        this.element = element;
        this.duration = duration;
    }

    hide() {
        return new Promise(resolve => {
            this.element.classList.add('is-hidden');
            this.element.addEventListener('transitionend', () => {
                this.element.style.display = 'none';
                resolve();
            }, { once: true });
        });
    }

    init() {
        return new Promise(resolve => {
            setTimeout(() => {
                this.hide().then(resolve);
            }, this.duration);
        });
    }
}

class Accordion {
    constructor(container) {
        this.container = container;
        this.items = container.querySelectorAll('details');
    }

    init() {
        this.items.forEach(item => {
            const summary = item.querySelector('summary');
            const content = item.querySelector('.accordion-item__content');

            summary.addEventListener('click', (event) => {
                event.preventDefault();
                
                if (item.open) {
                    const closingAnimation = content.animate({ maxHeight: 0 }, { duration: 400, easing: 'ease-out' });
                    closingAnimation.onfinish = () => {
                        item.removeAttribute('open');
                    };
                } else {
                    item.setAttribute('open', '');
                    const openingAnimation = content.animate({ maxHeight: [0, `${content.scrollHeight}px`] }, { duration: 400, easing: 'ease-out' });
                    openingAnimation.onfinish = () => {
                         content.style.maxHeight = 'none';
                    };
                }
            });
        });
    }
}

class App {
    constructor() {
        this.splashScreenElement = document.querySelector('[data-splash-screen]');
        this.mainContentElement = document.querySelector('[data-main-content]');
        this.accordionContainerElement = document.querySelector('[data-accordion-container]');
    }

    showMainContent() {
        this.mainContentElement.classList.add('is-visible');
    }

    init() {
        const splash = new SplashScreen(this.splashScreenElement, 3000);
        const accordion = new Accordion(this.accordionContainerElement);
        
        accordion.init();
        
        splash.init().then(() => {
            this.showMainContent();
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.init();
});