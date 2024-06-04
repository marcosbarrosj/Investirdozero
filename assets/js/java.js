const ctx = document.getElementById('myChart');

let labelx = ["ações","Renda fixa"," Fundos multimercado","Imoves"]

new Chart(ctx, {
  type: 'bar',
  data: {
    labels: labelx,
    datasets: [{
      label: 'Investir',
      data: [40 , 30, 20, 10,],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

 


document.getElementById('calculate-btn').addEventListener('click', function () {
    const investment = parseFloat(document.getElementById('investment').value);
    const profile = document.getElementById('risk-profile').value;

    if (isNaN(investment) || investment <= 0) {
        alert('Por favor, insira um valor de investimento válido.');
        return;
    }

    const allocation = calcularAlocacao(investment, profile);
    renderChart(allocation);
});

const profiles = {
    conservador: { acoes: 0.20, rendaFixa: 0.40, fundosMultimercado: 0.20, imoveisOutros: 0.20 },
    moderado: { acoes: 0.40, rendaFixa: 0.30, fundosMultimercado: 0.20, imoveisOutros: 0.10 },
    agressivo: { acoes: 0.60, rendaFixa: 0.20, fundosMultimercado: 0.10, imoveisOutros: 0.10 }
};

function calcularAlocacao(investimentoTotal, perfil) {
    const alocacao = profiles[perfil];
    if (!alocacao) {
        throw new Error('Perfil de risco inválido.');
    }

    return {
        acoes: investimentoTotal * alocacao.acoes,
        rendaFixa: investimentoTotal * alocacao.rendaFixa,
        fundosMultimercado: investimentoTotal * alocacao.fundosMultimercado,
        imoveisOutros: investimentoTotal * alocacao.imoveisOutros
    };
}

function renderChart(allocation) {
    const ctx = document.getElementById('allocation-chart').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Ações', 'Renda Fixa', 'Fundos Multimercado', 'Imóveis/Outros'],
            datasets: [{
                label: 'Alocação de Ativos',
                data: [allocation.acoes, allocation.rendaFixa, allocation.fundosMultimercado, allocation.imoveisOutros],
                backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe', '#ffce56'],
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            const label = context.label || '';
                            const value = context.raw || 0;
                            return `${label}: R$ ${value.toFixed(2)}`;
                        }
                    }
                }
            }
        }
    });
}
