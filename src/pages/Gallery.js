import React from 'react';
import { connect } from 'react-redux';
import { Container, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import { requestFetchProducts } from '../modules/products/actions';
import GalleryContext from '../contexts/GalleryContext';

class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount() {
    this.props.requestFetchProducts(['5ceea2eb0023ee3bcc730cc7', '5ceebf7ea686a03bccfa67bf', '5ceec48fa686a03bccfa67c4']);
  }

  handleClick(product) {
    this.context.selectedProduct = product;
  }

  render() {
    if (!this.props.products) {
      return (<div></div>);
    }

    let prods = this.props.products;
    let prodlist = Object.values(prods).map((product) => (
      <Container key={product._id}>
        <Segment>
          <h3>{product.name}</h3>
          SKU: {product.sku}<br />
          {product.description}<br />
          Price: {product.price.$numberDecimal}<br />
          <Link to={`/product/${product._id}`}>See Details</Link>
        </Segment>
      </Container>
    ));

    return (
      <GalleryContext.Consumer>
        { 
          value => {
            return (prodlist);
          } 
        }
      </GalleryContext.Consumer>
    )
  }
}

Gallery.contextType = GalleryContext;

const mapStateToProps = state => {
  return {
    products: state.products,
  };
};

const mapDispatchToProps = {
  requestFetchProducts
};

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);