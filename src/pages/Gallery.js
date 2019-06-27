import React from 'react';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { requestFetchProducts } from '../modules/products/actions';

class Gallery extends React.Component {
  componentWillMount() {
    this.props.requestFetchProducts(['5ceea2eb0023ee3bcc730cc7', '5ceebf7ea686a03bccfa67bf', '5ceec48fa686a03bccfa67c4']);
    //'5ceea2eb0023ee3bcc730cc7', '5ceebf7ea686a03bccfa67bf', '5ceec48fa686a03bccfa67c4'
  }
  
  render() {
    console.log('ppppppppproooooooooooooooddss');

    if(!this.props.products){
      return (<div></div>);
    }


    let prods = this.props.products;
    console.log(prods);
    return(
      "this"
    )
    // let prodlist = this.props.products.map(product=>{
    //   return (
    //     <Container key={product._id}>
    //       <p>{product.name}</p>
    //     </Container>
    //    );
    // })

    // let prodList = this.props.products.map(function(p) {
    //   return (
    //       <p> {p.name}</p>
    //   );
    // })
 
    // return (
    //   <Container>
    //     {prodList}
    //   </Container>
    // );
  }
}

const mapStateToProps = state => {
  console.log("stattttte");
  console.log(state);
  return {
    products: state.products
  };
};

const mapDispatchToProps = {
    requestFetchProducts
};

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);