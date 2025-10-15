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

class ImageGrid {
    constructor(container, imageUrls) {
        this.container = container;
        this.imageUrls = imageUrls;
    }

    render() {
        if (!this.container) return;
        
        this.imageUrls.forEach(url => {
            const gridItem = document.createElement('div');
            gridItem.className = 'grid-item';

            const img = document.createElement('img');
            img.src = url;
            img.alt = 'Пример стилистики построек';
            img.loading = 'lazy';

            gridItem.appendChild(img);
            this.container.appendChild(gridItem);
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
        this.stylesGridContainer = document.querySelector('[data-styles-grid]');
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

        if (this.stylesGridContainer) {
            // ИЗМЕНЕНО: Обновленный список изображений
            const imageUrls = [
                'https://i.pinimg.com/236x/fa/9b/91/fa9b91072944068028255653e0a2c78f.jpg',
                'https://i.pinimg.com/236x/4e/26/36/4e26369a13bbf2e21e853ae8a37a44e4.jpg',
                'https://i.pinimg.com/236x/d2/c3/80/d2c380b211722cf2b296eaa40cc59fd7.jpg',
                'https://i.pinimg.com/236x/9b/da/fe/9bdafea8367b9b61ecb8f5c961f6403a.jpg',
                'https://i.pinimg.com/736x/5d/37/68/5d376801686fdb973985678389383995.jpg',
                'https://i.pinimg.com/736x/82/93/42/829342c59836ce32cff2fd88a96f2a91.jpg',
                'https://i.pinimg.com/1200x/f9/90/91/f9909195a9d5d4b2d3785fbb8f60c2ab.jpg',
                'https://i.pinimg.com/736x/31/31/8c/31318ca85f86acc167e48bf90dbbcc1f.jpg',
                'https://i.pinimg.com/736x/f4/24/c2/f424c2b85d1a7a5eaf0bfdf77003b03f.jpg',
                'https://i.pinimg.com/1200x/75/ca/6c/75ca6c2fd1247510ec2382ca6193078b.jpg',
                'https://i.pinimg.com/736x/7d/7e/2c/7d7e2ca691f4ddef80a4ea713420c466.jpg',
                'https://i.pinimg.com/736x/8b/bb/f2/8bbbf27b63cc2e75e30c10091870bb32.jpg',
                'https://i.pinimg.com/736x/49/3c/eb/493ceb9c5d328a69fc76efa6995d25e9.jpg',
                'https://i.pinimg.com/736x/04/2a/32/042a32fbefa15650d6b4feff362efd22.jpg'
            ];
            new ImageGrid(this.stylesGridContainer, imageUrls).render();
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.init();
});