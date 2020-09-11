import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from './product.module.css';
import { increment, decrement } from '../../redux/actions';

import Button from '../button';

const Product = ({ product, amount, increment, decrement, fetchData }) => {
  useEffect(() => {
    fetchData && fetchData(product.id);
    // eslint-disable-next-line
  }, []);

  return (
    <div className={styles.product} data-id="product">
      <div className={styles.content}>
        <div>
          <h4 className={styles.title}>{product.name}</h4>
          <p className={styles.description}>{product.ingredients.join(', ')}</p>
          <div className={styles.price}>{product.price} $</div>
        </div>
        <div>
          <div className={styles.counter}>
            <div className={styles.count} data-id="product-amount">
              {amount}
            </div>
            <div className={styles.buttons}>
              <Button
                onClick={() => decrement(product.id)}
                data-id="product-decrement"
                icon="minus"
              />
              <Button
                onClick={() => increment(product.id)}
                data-id="product-increment"
                icon="plus"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Product.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.number,
    ingredients: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  }).isRequired,
  // from HOC counter
  amount: PropTypes.number,
  increment: PropTypes.func,
  decrement: PropTypes.func,
  fetchData: PropTypes.func,
};

const mapStateToProps = (state, ownProps) => ({
  amount: state.order[ownProps.product.id] || 0,
});

const mapDispatchToProps = {
  increment,
  decrement,
};

// const mapDispatchToProps = (dispatch) => ({
//   increment: () => dispatch(increment()),
//   decrement: () => dispatch(decrement()),
// });

export default connect(mapStateToProps, mapDispatchToProps)(Product);
