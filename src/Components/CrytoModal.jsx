// src/components/CryptoModal.js
import React from 'react';
import Modal from 'react-modal';
import styles from './CryptoModal.module.css';

Modal.setAppElement('#root');

const CryptoModal = ({ isOpen, onRequestClose, crypto }) => {
  if (!crypto) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <h2>{crypto.name} Details</h2>
      <p><strong>Symbol:</strong> {crypto.symbol}<img src={crypto.image} alt={crypto.name} className={styles.cryptoImage} /></p>
      <p><strong>Rank:</strong> {crypto.market_cap_rank}</p>
      <p><strong>Current Price:</strong> ${crypto.current_price.toLocaleString()}</p>
      <p><strong>Market Cap:</strong> ${crypto.market_cap.toLocaleString()}</p>
      <p><strong>Total Volume:</strong> ${crypto.total_volume.toLocaleString()}</p>
      <p><strong>Last Updated:</strong> {new Date(crypto.last_updated).toLocaleString()}</p>
      <button onClick={onRequestClose} className={styles.closeButton}>Close</button>
    </Modal>
  );
};

export default CryptoModal;
