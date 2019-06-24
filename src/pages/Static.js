import React from 'react';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';
import { requestFetchContent } from '../modules/content/actions';

class Static extends React.Component {
  componentWillMount() {
    this.props.requestFetchContent(process.env.REACT_APP_STORE_ID);
  }

  render() {
    return (
      <Container>
        {this.props.content.content}
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    content: state.content
  };
};

const mapDispatchToProps = {
  requestFetchContent
};

export default connect(mapStateToProps, mapDispatchToProps)(Static);