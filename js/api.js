let labels = [],
    values = [];

const updateAvaible = () => {
    let request = new XMLHttpRequest();

    request.open("GET", "https://sedelkin.ru/api/security_list");

    request.addEventListener("readystatechange", () => {
        if (request.readyState === 4) {
            if (request.status === 200) {
                let avaibleGraphs;
                let avaibleSelect = document.querySelector("#graph-avaible");

                avaibleGraphs = JSON.parse(request.responseText);

                avaibleGraphs["data"].forEach(element => {
                    let option = document.createElement("option");
                    option.text = element["title"];
                    option.value = element["secid"];

                    avaibleSelect.appendChild(option);
                });
            }
            else {
                alert("Не получилось получить доступные таблицы");
            }
        }
    });

    request.send();
}
updateAvaible();

const updateIntervals = () => {
    let request = new XMLHttpRequest();

    request.open("GET", "https://sedelkin.ru/api/interval");

    request.addEventListener("readystatechange", () => {
        if (request.readyState === 4 && request.status === 200) {
            let avaibleIntervals;
            let avaibleSelect = document.querySelector("#graph-interval");

            avaibleIntervals = JSON.parse(request.responseText);

            avaibleIntervals["data"].forEach(element => {
                let option = document.createElement("option");
                option.text = element["title"];
                option.value = element["value"];

                avaibleSelect.appendChild(option);
            });
        }
    });

    request.send();
}
updateIntervals();

document.querySelector("#graph-date").valueAsDate = new Date();

let data = {
    labels: labels,
    datasets: [{
        label: '',
        backgroundColor: 'rgb(220, 53, 69)',
        borderColor: 'rgb(220, 53, 69)',
        data: values,
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

document.querySelector("#graph-switch-btn").onclick = () => {
    let request = new XMLHttpRequest();
    let formData = new FormData();
    formData.append("app_key", "lpDRhW4f%5Bj|i8mB~BjlCD#Ve6wAi");
    formData.append("interval", document.querySelector("#graph-interval").value);
    formData.append("limits", document.querySelector("#graph-count").value);
    formData.append("secid", document.querySelector("#graph-avaible").value);
    formData.append("start", document.querySelector("#graph-date").value);

    request.open("POST", "https://sedelkin.ru/api/history/get_data", true);

    request.addEventListener("readystatechange", () => {
        if (request.readyState === 4 && request.status === 200) {
            let jsondata = JSON.parse(request.responseText);

            if (jsondata["status"] == "OK") {
                values = [];
                labels = [];

                jsondata["data"].forEach(element => {
                    values.push(element["close"]);
                    labels.push(element["datetime"]);
                });

                data.labels = labels;
                data.datasets[0].data = values;
                data.datasets[0].label = document.querySelector("#graph-avaible").value;

                myChart.update();
            }
            else if (jsondata["data"]["app_key"]["status"] == "Error")
            {
                alert(jsondata["data"]["app_key"]["message"]);
            }
            else if (jsondata["data"]["secid"]["status"] == "Error")
            {
                alert(jsondata["data"]["secid"]["message"]);
            }
            else if (jsondata["data"]["interval"]["status"] == "Error")
            {
                alert(jsondata["data"]["interval"]["message"]);
            }
            else if (jsondata["data"]["limits"]["status"] == "Error")
            {
                alert(jsondata["data"]["limits"]["message"]);
            }
            else if (jsondata["data"]["start"]["status"] == "Error")
            {
                alert(jsondata["data"]["start"]["message"]);
            }
        }
    });

    request.send(formData);
}