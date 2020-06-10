const displayCoinData = coinObject => {

    const dataWrapper = document.querySelector(".dataWrapper")

    const coinTicker = document.createElement("div");
    coinTicker.setAttribute("class", "coinTicker");

    const coinSymbol = document.createElement("span");
    coinSymbol.setAttribute("class", "coinSymbol");
    coinSymbol.innerText = coinObject.symbol;

    const coinPrice = document.createElement("span");
    coinPrice.setAttribute("class", "coinPrice");
    const priceValue = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' } ).format(coinObject.price);
    coinPrice.innerText = priceValue;

    const coinChange = document.createElement("span");
    coinChange.setAttribute("class", "coinChange");

    if ( coinObject.change < 0 ) {
      coinChange.style.color = '#FF6060';
    };

    coinChange.innerText = coinObject.change;

    coinTicker.append(coinSymbol, coinPrice, coinChange);

    dataWrapper.append(coinTicker);

    addClickEvent(coinTicker, coinObject);

  };


  const getCoinData = () => {
    axios.get("https://api.coinranking.com/v1/public/coins")
         .then( response => {
            const newCoinData = response.data.data.coins.splice(0, 10);
            const dataWrapper = document.querySelector(".dataWrapper")
            dataWrapper.textContent = '';
            newCoinData.forEach( coin => {
              console.log(coin);
              displayCoinData(coin);
            });
          });
  };
  

  const refreshData = () => {
    setInterval(() => {
      getCoinData();
    }, 10000);
  };

  const addClickEvent = (ticker, coinInfo) => {
    ticker.addEventListener('click', () => {
      const moreInfo = document.createElement('div');
      moreInfo.innerHTML = coinInfo.description;
      ticker.style.height = 'auto';
      ticker.style.flexDirection = 'column';
      ticker.style.color = '#f75735';
      ticker.append(moreInfo); 
    })
  }


  getCoinData();
  
  refreshData();