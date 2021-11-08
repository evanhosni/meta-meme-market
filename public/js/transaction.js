const buyButton = document.querySelector('#buyMe');
const sellButton = document.querySelector('#sellme'); 


async function sellShare(e) {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    fetch(`/api/memes/sell/${id}`, {
        method: 'GET',
        credentials: 'same-origin',
        headers:{
            "Content-Type":"application/json"
        },
    }).then(async (res) => {
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
}

// Send GET request to buy shares.
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
    }).then(async (res) => {
        const { boughtCount, memeData, totalCost, numShares } = await res.json();
        console.log(`You bought ${boughtCount} shares!`);
        console.log(boughtCount, memeData);
        const balanceField = document.getElementById('balance');
        const seller = document.getElementById('sold-shares');
        const numSharesField = document.getElementById('num-shares');
        console.log(numShares);
        if (boughtCount) {
            let balance = Number.parseInt(balanceField.textContent) - totalCost;
            balanceField.textContent = balance;
            seller.textContent = `Bought ${1} shares!`;
            numSharesField.textContent = `You own ${numShares} shares of this meme!`;
            updateTable(memeData.shares);
        } else {
            seller.textContent = 'You cannot buy these shares!';
            // textContent.setAttribute("id", "classSet")
        }
    });
}

// Render table on page load.
function renderTable() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    fetch(`/api/memes/meme/${id}`, {
        method: 'GET',
        headers:{
            "Content-Type":"application/json"
        },
    }).then(async (res) => {
        const memeData = await res.json();
        if (res.ok) {
            updateTable(memeData.shares);
        }
    });
}

function updateTable(shares) {
    console.log(shares);
    const tbody = document.getElementById('table-body');
    tbody.innerHTML = '';

    const toList = shares.length >= 5 ? 5 : shares.length;

    for (let i = 0; i < toList; i++) {
        console.log('SHARES I')
        console.log(shares[i]);
        let row = document.createElement('tr');
        let row_data_1 = document.createElement('td');
        row_data_1.innerHTML = shares[i].bought_price;
        row.appendChild(row_data_1);

        let row_data_2 = document.createElement('td');
        row_data_2.innerHTML = shares[i].total_listed;
        row.appendChild(row_data_2);
        tbody.appendChild(row);
    }
}

renderTable();
sellButton.addEventListener('click', sellShare);
buyButton.addEventListener('click', buyShares);