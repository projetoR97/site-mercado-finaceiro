// Main.js - Inicialização e controle principal do site

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 B3 Finance carregado com sucesso!');
    
    // Inicializar componentes
    initNavigation();
    initCharts();
    initMarketData();
    initScrollAnimations();
    initSmoothScrolling();
    
    // Carregar dados iniciais
    loadMarketData();
    
    // Atualizar dados a cada 30 segundos
    setInterval(loadMarketData, 30000);
});

// Navegação
function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Remove active class de todos os links
            navLinks.forEach(l => l.classList.remove('active'));
            // Adiciona active no link clicado
            link.classList.add('active');
            
            // Fecha menu mobile
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            
            // Scroll suave para a seção
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            targetSection.scrollIntoView({ behavior: 'smooth' });
        });
    });
}

// Gráficos
function initCharts() {
    const ctx = document.getElementById('ibovChart');
    if (ctx) {
        const ibovChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'],
                datasets: [{
                    label: 'Ibovespa',
                    data: [134500, 135200, 136100, 135800, 136500, 137200, 136800, 137100, 136892],
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        grid: {
                            color: 'rgba(0,0,0,0.05)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });

        // Atualizar gráfico periodicamente
        setInterval(() => {
            updateChart(ibovChart);
        }, 10000);
    }
}

function updateChart(chart) {
    const now = new Date();
    const timeLabel = now.toLocaleTimeString('pt-BR', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
    });
    
    chart.data.labels.push(timeLabel);
    chart.data.datasets[0].data.push(Math.floor(Math.random() * 2000) + 135000);
    
    // Manter apenas 10 pontos
    if (chart.data.labels.length > 10) {
        chart.data.labels.shift();
        chart.data.datasets[0].data.shift();
    }
    
    chart.update('none');
}

// Dados do mercado
function initMarketData() {
    const marketData = new window.Components.MarketData();
    const cotacoesGrid = document.getElementById('cotacoes-grid');
    
    // Renderizar cards iniciais
    marketData.getStockData().forEach(stock => {
        const card = new window.Components.Card(
            stock.symbol,
            `R$ ${stock.value}`,
            stock.change,
            stock.changePercent,
            stock.icon
        );
        card.render(cotacoesGrid);
    });
}

async function loadMarketData() {
    try {
        // Simular loading
        showLoading();
        
        const api = new FinancialAPI();
        const data = await api.getMarketData();
        
        updateHeroStats(data.ibov, data.dolar);
        updateIndexDetails(data.ibov);
        updateCurrency(data.dolar);
        updateSelic(data.selic);
        
        hideLoading();
    } catch (error) {
        console.error('Erro ao carregar dados:', error);
        hideLoading();
    }
}

function updateHeroStats(ibov, dolar) {
    document.getElementById('ibov-value').textContent = ibov.value;
    document.getElementById('dolar-value').textContent = dolar.value;
}

function updateIndexDetails(ibov) {
    const indexCard = document.querySelector('.index-card .index-value');
    if (indexCard) {
        indexCard.innerHTML = `136.892 <span class="positive">+1,23%</span>`;
    }
}

function updateCurrency(dolar) {
    const currencyValue = document.querySelector('.currency-value');
    const currencyChange = document.querySelector('.currency-change');
    
    if (currencyValue) currencyValue.textContent = `R$ ${dolar.value}`;
    if (currencyChange) {
        currencyChange.textContent = `${dolar.changePercent}%`;
        currencyChange.className = `currency-change ${dolar.changePercent > 0 ? 'positive' : 'negative'}`;
    }
}

function updateSelic(selic) {
    const selicCurrent = document.querySelector('.selic-current');
    if (selicCurrent) {
        selicCurrent.textContent = `${selic.rate} a.a.`;
    }
}

function showLoading() {
    // Adicionar classe de loading nos elementos principais
    document.querySelector('.hero-stats').classList.add('loading');
}

function hideLoading() {
    document.querySelector('.hero-stats').classList.remove('loading');
}

// Animações de scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar todas as seções
    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.8s ease';
        observer.observe(section);
    });
}

// Scroll suave para âncoras
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Atualização em tempo real simulada
function simulateRealTimeUpdates() {
    const updates = [
        { selector: '#ibov-value', values: ['136892', '137150', '136750', '137300'] },
        { selector: '#dolar-value', values: ['5.6723', '5.6850', '5.6610', '5.6780'] }
    ];

    setInterval(() => {
        updates.forEach(update => {
            const element = document.querySelector(update.selector);
            if (element) {
                const randomValue = update.values[Math.floor(Math.random() * update.values.length)];
                element.textContent = randomValue;
            }
        });
    }, 5000);
}

// Inicializar simulação em tempo real
simulateRealTimeUpdates();

// Service Worker para PWA (opcional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(reg => console.log('SW registrado'))
            .catch(err => console.log('SW falhou'));
    });
}