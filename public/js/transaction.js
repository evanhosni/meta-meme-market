const buyButton = document.querySelector('#buyme');
const sellButton = document.querySelector('#sellme');
// const memeId = 

async function sellShare(e) {
    console.log('SELLING');
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    fetch(`/api/memes/sell/${id}`, {
        method: 'GET',
        credentials: 'same-origin',
        headers:{
            "Content-Type":"application/json"
        },
        // body: JSON.stringify(data)
    }).then(async (res) => {
        // console.log(await res.json());
        const { numShares, stake, listedShares, soldSuccess, memeData } = await res.json();
        console.log(numShares, stake, listedShares, soldSuccess);
        const seller = document.getElementById('sold-shares');
        if (soldSuccess) {
            updateTable(memeData.shares);
            seller.textContent = `Listed ${1} shares!`;
        } else {
            seller.textContent = 'No shares to sell.';
        }
    });
    // const data = await sellInfo.json();
    // console.log(data);
}

async function buyShares(e) {
    console.log('BUYING');
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    fetch(`/api/memes/buy/${id}`, {
        method: 'GET',
        credentials: 'same-origin',
        headers:{
            "Content-Type":"application/json"
        },
        // body: JSON.stringify(data)
    }).then(async (res) => {
        // console.log(await res.json());
        const { boughtCount, memeData } = await res.json();
        // console.log(numShares, stake, listedShares, soldSuccess);
        console.log(`You bought ${boughtCount} shares!`);
        console.log(boughtCount, memeData);
        const seller = document.getElementById('sold-shares');
        if (boughtCount) {
            seller.textContent = `Bought ${1} shares!`;
            updateTable(memeData.shares);
        } else {
            seller.textContent = 'No shares to sell.';
        }
    });
}

function updateTable(shares) {
    console.log(shares);
    let table = document.createElement('table');
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');

    table.appendChild(thead);
    table.appendChild(tbody);

    let heading_1 = document.createElement('th');
    heading_1.innerHTML = "Ask Price";
    let heading_2 = document.createElement('th');
    heading_2.innerHTML = "Quantity";
    row_1 = document.createElement('tr');
    row_1.appendChild(heading_1);
    row_1.appendChild(heading_2);
    thead.appendChild(row_1);

    const toList = shares.length >= 5 ? 5 : shares.length;

    for (let i = 0; i < toList; i++) {
        console.log('SHARES I')
        console.log(shares[i]);
        let row = document.createElement('tr');
        let row_data_1 = document.createElement('td');
        row_data_1.innerHTML = shares[i].bought_price; //TODO: IMPLEMENT
        row.appendChild(row_data_1);

        let row_data_2 = document.createElement('td');
        row_data_2.innerHTML = shares[i].total_listed; //TODO: IMPLEMENT
        row.appendChild(row_data_2);
        tbody.appendChild(row);
    }

    // Adding the entire table to the body tag
    document.getElementById('buy-sell').appendChild(table);
}

sellButton.addEventListener('click', sellShare);
buyButton.addEventListener('click', buyShares);