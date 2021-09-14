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

let data = {
    labels: labels,
    datasets: [{
        label: 'Место в рейтинге стран, в которых живет больше всего кошек (млн.)',
        backgroundColor: 'rgb(220, 53, 69)',
        borderColor: 'rgb(220, 53, 69)',
        data: [7.2, 7.5, 7.7, 7.75, 9.5, 9.5, 12.5, 12.5, 53, 76.5],
    }]
};

const config = {
    type: 'line',
    data: data,
    options: {}
};

const RED = "rgb(220, 53, 69)";
const GREEN = "rgb(25, 135, 84)";
const BLUE = "rgb(13, 110, 253)";

var myChart = new Chart(
    document.getElementById('myChart'),
    config
);

let changeColor = () => {
    console.log("клац")
}

document.querySelector("#graph-color-btn").onclick = () => {
    switch (document.querySelector("#graph-color").value) {
        case "red":
            var color = RED;
            break;
        case "green":
            var color = GREEN;
            break;
        case "blue":
            var color = BLUE;
            break;
    }

    data.datasets[0].backgroundColor = color;
    data.datasets[0].borderColor = color;
    myChart.update();
}