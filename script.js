let amount = document.querySelector('#input')
const outputBox = document.querySelector('#output')
let fromSelect = document.querySelector('#from')
let toSelect = document.querySelector('#to')
const convertBtn = document.querySelector('.convert')
const switchBtn = document.querySelector('.switch')
let firstLoad = true;
let data;
// function for fetch API

function fetchApi() {
    let link = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromSelect.value}.json`
    return fetch(link)
    .then((response) => {
        if(!response.ok){
            console.error(`Error: ${response.statusText}`);
        }
        return response.json();
    })
    .then((data) => {
        console.log(data);
        return data[fromSelect.value]
    })
    .catch((error) => {
        console.error("Failed to fetch API ", error);
        throw error;
    });
}

async function loadData() {
    try{
        data = await fetchApi()

        // default values removed in both from and to
        if (firstLoad) {
            fromSelect.innerHTML = ''
            toSelect.innerHTML = ''
        }

        // put options inside the from and to select
        for (const key in data) {
            const option1 = document.createElement('option');
            option1.value = key;
            option1.textContent = key;
            fromSelect.appendChild(option1);

            const option2 = document.createElement('option');
            option2.value = key;
            option2.textContent = key;
            toSelect.appendChild(option2);
        }

        // set the selected value to usd and inr by default ONLY for first time load
        if (firstLoad) {
            fromSelect.value = 'usd'
            toSelect.value = 'inr'
            firstLoad = false
        }

    }
    catch(error) {
        console.log("Error loading the data", error);
    }
}

fromSelect.addEventListener('change', (e) => {
    loadData()
})

convertBtn.addEventListener('click', (e) => {
    if (!amount.value) {
        window.alert("Please enter an amount")
    }
    outputBox.value = amount.value * data[toSelect.value]
})

switchBtn.addEventListener('click', (e) => {
    let temp = ''
    temp = fromSelect.value
    fromSelect.value = toSelect.value
    toSelect.value = temp
    temp = amount.value
    amount.value = outputBox.value
    outputBox.value = temp
    loadData()
})

loadData()