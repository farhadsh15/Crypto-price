import React, { useState, useEffect } from 'react';

// API
import { getCoin } from '../services/api';

// Components
import Loader from './Loader';
import Coin from './Coin';

// Style
import styles from "./Landing.module.css"

const Landing = () => {

    const [coins, setCoins] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchAPI = async () => {
            const data = await getCoin();
            setCoins(data )
        }

        fetchAPI();
    }, [])

    const searchHandeler = event => {
        setSearch(event.target.value)
        // console.log(event)
    }

    const searchedCoin = coins.filter(coin => coin.name.toLowerCase().includes(search.toLowerCase()))

    return (
        <>
            <h1 style={{margin:"2rem 0px -1rem 0px"}}>Farhacrypto</h1>
            <input type='text' placeholder='Search' value={search} onChange={searchHandeler}  className={styles.input} />   
            {
                searchedCoin.length ?
                    <div className={styles.coinContainer}>
                        {
                            searchedCoin.map(coin => <Coin 
                                key={coin.id}
                                name={coin.name}
                                image={coin.image}
                                symbol={coin.symbol}
                                price={coin.current_price}
                                marketCap={coin.market_cap}
                                priceChange={coin.price_change_percentage_24h} 
                            />)
                        }
                    </div> :
                    <Loader />
            }
        </>
    );
};

export default Landing;