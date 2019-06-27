import React from 'react';
import { connect } from 'react-redux';
import { Container, Segment } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { requestFetchProducts } from '../modules/products/actions';

class Gallery extends React.Component {
  componentWillMount() {
    this.props.requestFetchProducts(['5ceea2eb0023ee3bcc730cc7', '5ceebf7ea686a03bccfa67bf', '5ceec48fa686a03bccfa67c4']);
  }
  
  render() {
    if(!this.props.products){
      return (<div></div>);
    }

    let prods = this.props.products;
    let prodlist = Object.values(prods).map((product, ind) => (
      <Container key={product._id}>
          <Segment>
            <h3>{product.name}</h3>
            SKU: {product.sku}<br/>
            {product.description}<br/>
            Price: {product.price.$numberDecimal}
          </Segment>
      </Container>
    ));
    
    return(
        prodlist
    )
  }
}

const mapStateToProps = state => {
  return {
    products: state.products
  };
};

const mapDispatchToProps = {
    requestFetchProducts
};

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);