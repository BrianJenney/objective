import React from 'react';
import { Link } from 'react-router-dom'

import { Container, Menu, Divider} from 'semantic-ui-react';

const Navbar = () => {
  return (
    <Container>
      <Menu>
        <Link to="/" className="active item">Home</Link>
        <Link to="/gallery" className="item">Products</Link>
        <Link to="/cart" className="item"><i className="cart link icon"></i> Cart</Link>
        <Menu.Menu position='right'>
          <div className="item">
            <div className="ui icon input">
              <input type="text" placeholder="Search..." />
              <i className="search link icon"></i>
            </div>
          </div>
          <Link to="/login" className="item">Login</Link>
        </Menu.Menu>
      </Menu>
      <Divider hidden />
    </Container>
  );
}

export default Navbar;