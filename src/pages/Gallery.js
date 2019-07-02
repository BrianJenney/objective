import React from 'react';
import { connect } from 'react-redux';
import { Container, Grid, Divider, Card, Image } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { requestFetchProducts } from '../modules/products/actions';

class Gallery extends React.Component {
  componentWillMount() {
    this.props.requestFetchProducts(['5ceea2eb0023ee3bcc730cc7', '5ceebf7ea686a03bccfa67bf', '5ceec48fa686a03bccfa67c4']);
  }
  
  render() {
    if (!this.props.products) {
      return (<div></div>);
    }

    let prods = this.props.products;
    var cardStyle = {
      padding: '20px',
      height: '525px'
    }
    var imgStyle = {
      height: '200px',
      margin: '0 auto'
    }
    let prodlist = Object.values(prods).map((product) => (
      <Grid.Column className="card" key={product._id}>
        <Card style={cardStyle}>
          <Image src={product.assets.imgs} ui={false} style={imgStyle} />
          <Divider hidden/>
          <Card.Content>
            <Card.Header>{product.name}</Card.Header>
            <Card.Description>
              <p>SKU: {product.sku}</p>
              <p>{product.description}</p>
              <p>Price: {product.price.$numberDecimal}</p>
            </Card.Description>
          </Card.Content>
        </Card>
      </Grid.Column>
    ));

    return (
      <Container>
        <Divider hidden />
        <Divider hidden />
        <Grid columns={3} className="box">
              {prodlist}
          </Grid>
      </Container>
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