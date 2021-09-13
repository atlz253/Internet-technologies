const labels = [
    'Япония',
    'Украина',
    'Германия',
    'Великобритания',
    'Италия',
    'Франция',
    'Бразилия',
    'Россия',
    'Китай',
    'Америка'
];
const data = {
    labels: labels,
    datasets: [{
        label: 'Место в рейтинге стран, в которых живет больше всего кошек (млн.)',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: [7.2, 7.5, 7.7, 7.75, 9.5, 9.5, 12.5, 12.5, 53, 76.5],
    }]
};
const config = {
    type: 'line',
    data: data,
    options: {}
};
var myChart = new Chart(
    document.getElementById('myChart'),
    config
);