import React from 'react';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';
import { requestFetchContent } from '../modules/content/actions';

class Static extends React.Component {
  componentWillMount() {
    const { page } = this.props.match.params;

    this.props.requestFetchContent(page);
  }

  renderContent(content) {
    if (content === '404') {
      return <p>404 Page</p>;
    } else {
      return (
        <Container>
          <div dangerouslySetInnerHTML={{__html: content}} />
        </Container>
      );
    }
  }

  render() {
    const { content } = this.props.content;

    return this.renderContent(content);
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