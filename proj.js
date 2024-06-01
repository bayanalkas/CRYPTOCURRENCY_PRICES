document.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch("https://api.coincap.io/v2/assets");
    const data = await response.json();
    const cryptoDropdown = document.getElementById("cryptoDropdown");

    data.data.forEach((crypto, index) => {
        const option = document.createElement('option');
        option.value = crypto.id;
        option.textContent = crypto.name;
        cryptoDropdown.appendChild(option);

        if (index === 0) displayCryptoInfo(crypto);
    });

    cryptoDropdown.addEventListener('change', event => {
        const selectedCrypto = data.data.find(crypto => crypto.id === event.target.value);
        displayCryptoInfo(selectedCrypto);
    });
});

function displayCryptoInfo(crypto) {
    document.getElementById('cryptoName').textContent = crypto.name;
    document.getElementById('cryptoSymbol').textContent = crypto.symbol;
    document.getElementById('cryptoSupply').textContent = Math.round(crypto.supply);
    document.getElementById('cryptoPrice').textContent = `${parseFloat(crypto.priceUsd).toFixed(2)}`;
    document.getElementById('cryptoChange').textContent = `${parseFloat(crypto.changePercent24Hr).toFixed(2)}%`;
    document.getElementById('cryptoInfoSection').style.display = 'block';
}
