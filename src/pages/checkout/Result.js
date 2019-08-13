import React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

class Result extends React.Component {
  constructor(props) {
    super(props);
    this.state = props || { };
  }

  render() {

    if(!this.props.success) {
      return(<div></div>);
    }

    console.log(this.props);
    return (
      <Paper>
        <Typography component="h1" variant="h4" align="center">
          Things
        </Typography>
      </Paper>
    );
  }
}

export default Result;