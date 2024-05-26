// src/components/CryptoDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CryptoModal from '../Components/CrytoModal';
import styles from './CryptoDashboard.module.css';
import bitcoin2 from '../Assets/bitcoin2.png'

const CryptoDashboard = () => {
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCrypto, setSelectedCrypto] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchCryptos = async (page) => {
    setLoading(true);
    try {
      const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
        params: {
          vs_currency: 'usd',
          order: 'market_cap_desc',
          per_page: 10,
          page: page,
          sparkline: false,
        },
      });
      console.log("API", response);
      setCryptos(response.data);
      const totalItems = response.headers['x-total-count'] || 100; // Fallback if header is not provided
      setTotalPages(Math.ceil(totalItems / 10));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching the cryptocurrency data:', error);
      setError('Error fetching the cryptocurrency data.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCryptos(currentPage);
  }, [currentPage]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredCryptos = cryptos.filter(crypto =>
    crypto.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleCryptoClick = (crypto) => {
    setSelectedCrypto(crypto);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCrypto(null);
  };

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }
  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div>
      <h1><img src= {bitcoin2} alt={bitcoin2} style={{width:'50px',
        height:'50px',marginBottom:'-16px',marginRight:'15px'}}/>Cryptocurrency Dashboard 
        </h1>
    <div className={styles.cryptoDashboard}>
      
      <div className={styles.searchField}>
      <h2>Top 10 Crypto Currencies</h2>
      <input
        type="text"
        placeholder="Search CryptoCurrency"
        value={searchTerm}
        onChange={handleSearch}
        className={styles.searchInput}
      />
      </div>
      <div className={styles.tableContainer}>
        <table className={styles.cryptoTable}>
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Rank</th>
              <th>Name</th>
              <th>Price</th>
              <th>Market Cap</th>
              <th>24h Volume</th>
              <th>Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {filteredCryptos.map((crypto) => (
              <tr key={crypto.id} onClick={() => handleCryptoClick(crypto)}>
                <td><img src={crypto.image} alt={crypto.name} className={styles.cryptoImage} /></td>
                <td>{crypto.market_cap_rank}</td>
                <td>{crypto.name}</td>
                <td>${crypto.current_price.toLocaleString()}</td>
                <td>${crypto.market_cap.toLocaleString()}</td>
                <td>${crypto.total_volume.toLocaleString()}</td>
                <td>{new Date(crypto.last_updated).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.pagination}>
        <button onClick={prevPage} disabled={currentPage === 1} className={styles.pageButton}>Previous</button>
        <button onClick={nextPage} disabled={currentPage === totalPages} className={styles.pageButton}>Next</button>
      </div>
      <CryptoModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        crypto={selectedCrypto}
      />
      
    </div>
    <footer className={styles.footer}>
        <p>&copy; 2024 Crypto Dashboard. All Rights Reserved. Designed and Developed by PRAJWAL</p>
      </footer>
    </div>
  );
};

export default CryptoDashboard;
