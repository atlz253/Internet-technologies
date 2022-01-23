let labels = [],
    values = [];

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
    options: {
        plugins: {
            legend: {
                display: false
            },
        }
    }
};

var myChart = new Chart(
    document.getElementById('myChart'),
    config
);

const API = {
    _url: "https://sedelkin.ru/api/",
    get avaibleUrl() { return this._url + "security_list" },
    get intervalUrl() { return this._url + "interval" },
    get dataUrl() { return this._url + "history/get_data" },
    _updateAvaibleData(url, select) {
        new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();

            request.open("GET", url, true);

            request.addEventListener("readystatechange", () => {
                if (request.readyState === 4) {
                    if (request.status === 200) {
                        resolve(JSON.parse(request.responseText));
                    }
                    else {
                        reject("Не получилось получить доступные таблицы");
                    }
                }
            });

            request.send();
        }).then(
            json => {
                select.innerHTML = "";

                json["data"].forEach(element => {
                    let option = document.createElement("option");
                    option.text = element["title"];
                    element.hasOwnProperty("secid") ? option.value = element["secid"] : option.value = element["value"];

                    select.appendChild(option);
                });
            },
            message => alert(message)
        );
    },
    update() {
        this._updateAvaibleData(this.avaibleUrl, document.querySelector("#graph-avaible"));
        this._updateAvaibleData(this.intervalUrl, document.querySelector("#graph-interval"));
        document.querySelector("#graph-date").valueAsDate = new Date();
    },
    getData() {
        new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();
            let formData = new FormData();
            formData.append("app_key", "lpDRhW4f%5Bj|i8mB~BjlCD#Ve6wAi");
            formData.append("interval", document.querySelector("#graph-interval").value);
            formData.append("limits", document.querySelector("#graph-count").value);
            formData.append("secid", document.querySelector("#graph-avaible").value);
            formData.append("start", document.querySelector("#graph-date").value);

            request.open("POST", this.dataUrl, true);

            request.addEventListener("readystatechange", () => {
                if (request.readyState === 4 && request.status === 200) {
                    let jsondata = JSON.parse(request.responseText);

                    if (jsondata["status"] == "OK")
                        resolve(jsondata);
                    else if (jsondata["data"]["app_key"]["status"] == "Error")
                        reject(jsondata["data"]["app_key"]["message"]);
                    else if (jsondata["data"]["secid"]["status"] == "Error")
                        reject(jsondata["data"]["secid"]["message"]);
                    else if (jsondata["data"]["interval"]["status"] == "Error")
                        reject(jsondata["data"]["interval"]["message"]);
                    else if (jsondata["data"]["limits"]["status"] == "Error")
                        reject(jsondata["data"]["limits"]["message"]);
                    else if (jsondata["data"]["start"]["status"] == "Error")
                        reject(jsondata["data"]["start"]["message"]);
                    else
                        reject("Неизвестная ошибка");
                }
            })

            request.send(formData);
        }).then(
            json => {
                values = [];
                labels = [];

                json["data"].forEach(element => {
                    values.push(element["close"]);
                    labels.push(element["datetime"]);
                });

                data.labels = labels;
                data.datasets[0].data = values;
                data.datasets[0].label = document.querySelector("#graph-avaible").value;

                myChart.update();
            },
            message => alert(message)
        );;
    }
};

Object.freeze(API);
API.update();

document.querySelector("#graph-switch-btn").onclick = () => API.getData();