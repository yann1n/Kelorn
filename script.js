class NebulaField {
    constructor(container, count = 8) {
        this.container = container;
        this.count = count;
        this.nebulas = [];
        this.colors = [
            'rgba(106, 50, 232, 0.8)',
            'rgba(50, 80, 232, 0.7)',
            'rgba(150, 50, 200, 0.6)'
        ];
    }

    create() {
        for (let i = 0; i < this.count; i++) {
            const nebula = document.createElement('div');
            nebula.classList.add('nebula');
            
            const size = Math.random() * 500 + 300;
            nebula.style.width = `${size}px`;
            nebula.style.height = `${size}px`;
            nebula.style.top = `${Math.random() * 100 - 25}%`;
            nebula.style.left = `${Math.random() * 100 - 25}%`;
            nebula.style.background = this.colors[i % this.colors.length];
            
            this.container.appendChild(nebula);
            this.nebulas.push(nebula);
        }
    }

    startAnimation() {
        this.nebulas.forEach(nebula => {
            nebula.style.animationDuration = `${Math.random() * 15 + 15}s`;
            nebula.style.animationDelay = `${Math.random() * 15}s`;
            nebula.classList.add('is-pulsing');
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
                    const anim = content.animate({ maxHeight: 0 }, { duration: 300, easing: 'ease-out' });
                    anim.onfinish = () => item.removeAttribute('open');
                } else {
                    item.setAttribute('open', '');
                    content.animate({ maxHeight: [`0px`, `${content.scrollHeight}px`] }, { duration: 300, easing: 'ease-out' });
                }
            });
        });
    }
}

class App {
    constructor() {
        this.accordionContainer = document.querySelector('[data-accordion-container]');
        this.backgroundContainer = document.querySelector('[data-background-container]');
        this.header = document.querySelector('[data-header]');
        this.mainContent = document.querySelector('[data-main-content]');
    }

    init() {
        if (this.accordionContainer) {
            new Accordion(this.accordionContainer).init();
        }

        if (this.backgroundContainer) {
            const nebulaField = new NebulaField(this.backgroundContainer);
            nebulaField.create();

            // Wait for UI animations to finish before starting background animations
            const uiAnimationDuration = 2000; // Corresponds to header/panel animation time
            setTimeout(() => {
                nebulaField.startAnimation();
            }, uiAnimationDuration);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.init();
});