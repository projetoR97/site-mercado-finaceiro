// Componentes reutilizáveis

class Card {
    constructor(title, value, change, changePercent, icon) {
        this.title = title;
        this.value = value;
        this.change = change;
        this.changePercent = changePercent;
        this.icon = icon;
    }

    render(container) {
        const changeClass = this.changePercent > 0 ? 'positive' : 'negative';
        const iconClass = this.icon || 'fas fa-chart-line';

        const cardHTML = `
            <div class="card">
                <div class="card-header">
                    <i class="${iconClass} text-2xl text-gray-500"></i>
                    <span class="card-title">${this.title}</span>
                </div>
                <div class="card-value">${this.value}</div>
                <div class="card-change ${changeClass}">
                    ${this.change} (${this.changePercent}%)
                </div>
            </div>
        `;
        
        container.insertAdjacentHTML('beforeend', cardHTML);
    }
}

class MarketData {
    constructor() {
        this.data = {
            stocks: [
                { symbol: 'PETR4', value: '38.50', change: '+1.20', changePercent: 3.21, icon: 'fas fa-oil-can' },
                { symbol: 'VALE3', value: '62.30', change: '-0.85', changePercent: -1.35, icon: 'fas fa-mountain' },
                { symbol: 'ITUB4', value: '35.20', change: '+0.45', changePercent: 1.30, icon: 'fas fa-university' },
                { symbol: 'BBDC4', value: '28.90', change: '+0.75', changePercent: 2.67, icon: 'fas fa-building-columns' },
                { symbol: 'WEGE3', value: '45.80', change: '-0.30', changePercent: -0.65, icon: 'fas fa-cogs' },
                { symbol: 'MGLU3', value: '8.45', change: '+0.25', changePercent: 3.05, icon: 'fas fa-shopping-cart' }
            ]
        };
    }

    getStockData() {
        return this.data.stocks;
    }
}

// Export para uso global
window.Components = { Card, MarketData };
