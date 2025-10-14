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
        this.items = Array.from(container.querySelectorAll('.accordion-item'));
        this.activeItem = null;
    }

    async animate(element, keyframes, options) {
        const anim = element.animate(keyframes, { ...options, fill: 'forwards' });
        await anim.finished;
        return anim;
    }

    async open(item) {
        if (this.activeItem) await this.close(this.activeItem);
        
        this.activeItem = item;
        item.classList.add('is-open');
        
        const content = item.querySelector('.accordion-item__content');
        const innerContent = item.querySelector('.accordion-item__content-inner');
        
        await this.animate(
            content,
            { maxHeight: [`0px`, `${innerContent.scrollHeight}px`] },
            { duration: 400, easing: 'ease-out' }
        );
        
        await this.animate(
            innerContent,
            { opacity: [0, 1], transform: ['translateY(-15px)', 'translateY(0)'] },
            { duration: 300, easing: 'ease-out' }
        );
    }

    async close(item) {
        this.activeItem = null;
        item.classList.remove('is-open');

        const content = item.querySelector('.accordion-item__content');
        const innerContent = item.querySelector('.accordion-item__content-inner');

        await this.animate(
            innerContent,
            { opacity: [1, 0], transform: ['translateY(0)', 'translateY(-15px)'] },
            { duration: 200, easing: 'ease-in' }
        );
        
        await this.animate(
            content,
            { maxHeight: [`${innerContent.scrollHeight}px`, '0px'] },
            { duration: 300, easing: 'ease-in-out' }
        );
    }

    init() {
        this.items.forEach(item => {
            const header = item.querySelector('.accordion-item__header');
            header.addEventListener('click', () => {
                if (this.activeItem === item) {
                    this.close(item);
                } else {
                    this.open(item);
                }
            });
        });
    }
}

class App {
    constructor() {
        this.accordionContainer = document.querySelector('[data-accordion-container]');
        this.backgroundContainer = document.querySelector('[data-background-container]');
    }

    init() {
        if (this.accordionContainer) {
            new Accordion(this.accordionContainer).init();
        }

        if (this.backgroundContainer) {
            const nebulaField = new NebulaField(this.backgroundContainer);
            nebulaField.create();

            const uiAnimationDuration = 2000;
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