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
        const { numShares, stake, listedShares, soldSuccess } = await res.json();
        console.log(numShares, stake, listedShares, soldSuccess);
        const seller = document.getElementById('sold-shares');
        if (soldSuccess) {
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
        if (soldSuccess) {
            seller.textContent = `Bought ${1} shares!`;
        } else {
            seller.textContent = 'No shares to sell.';
        }
    });
}

sellButton.addEventListener('click', sellShare);
buyButton.addEventListener('click', buyShares);