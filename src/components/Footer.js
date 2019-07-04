import React from 'react';
import { Link } from 'react-router-dom';

import { Container, Menu, Segment, Divider } from 'semantic-ui-react';

const Footer = () => {
  return (
    <div>
      <Divider hidden />
      <Segment>
        <Container>
          <Menu text>
            <Menu.Item>
              <Link to="/about">About Us</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/terms">Terms & Conditions</Link>
            </Menu.Item>
          </Menu>
        </Container>
      </Segment>  
    </div>
  );
};

export default Footer;