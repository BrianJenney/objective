import React, { Component } from 'react';

import { OBJECTIVE_SPACE } from '../constants/contentfulSpaces';
import { OBJECTIVE_HOMEPAGE } from '../constants/contentfulEntries';

import { BLOCKS } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import { Link } from 'react-router-dom';
import { Button } from '../components/common';
import './home/home-style.scss';

const contentful = require('contentful');
const contentfulClient = contentful.createClient({
  space: OBJECTIVE_SPACE,
  accessToken: process.env.REACT_APP_CONTENTFUL_TOKEN
});

const contentfulOptions = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: node => {
      return (
        <img
          src={node.data.target.fields.file.url}
          alt={node.data.target.fields.title}
        />
      );
    }
  }
};
const placeholderImg = require('../../src/assets/images/658x658.png');
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    contentfulClient
      .getEntry(OBJECTIVE_HOMEPAGE)
      .then(entry => {
        let content = entry.fields;

        this.setState({
          content: {
            ...content
          }
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  renderHeroSlider() {
    if (!this.state.content.heroSlider) return <></>;

    return this.state.content.heroSlider.map(image => (
      <li>
        <img src={image.fields.file.url} style={{ width: '100%' }} />
      </li>
    ));
  }

  renderSections() {
    if (!this.state.content.homepageSection) return <></>;

    return this.state.content.homepageSection.map(section => (
      <div className="section">
        {documentToReactComponents(
          section.fields.mainContent,
          contentfulOptions
        )}
      </div>
    ));
  }

  renderContent() {
    if (!this.state.content) return <></>;

    let { welcomeHeader, welcomeText } = this.state.content;

    return (
      <div className="home-style">
        <Link to="/gallery">
          <ul>{this.renderHeroSlider()}</ul>
        </Link>
        <Container>
          <Box py={10} className="welcome">
            <h1>{welcomeHeader}</h1>
            <p>{welcomeText}</p>
          </Box>
        </Container>
        <div className="home-bestsellers beige-bg">
          <Container>
            <Box py={10}>
              <h1>Our Bestsellers</h1>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Card className="tile green">
                    <CardMedia
                      style={{ height: 430, width: 430 }}
                      image={placeholderImg}
                      className="tile-img"
                    />
                    <CardContent className="pding">
                      <div className="prod-name-holder">
                        <Typography>
                          <Link to={`/products/TPZU/TPZU1`} className="title">
                            Everything Armour
                          </Link>
                        </Typography>
                      </div>
                      <div className="variant-info">
                        <div>
                          <strong>$16.95</strong> &mdash; 60 oz.
                        </div>
                      </div>
                    </CardContent>
                    <div className="cta-area">
                      <CardActions className="home-atc">
                        <Button
                          variant="contained"
                          color="primary"
                          fullWidth={true}
                          className="atc-button"
                        >
                          ADD TO CART
                        </Button>
                      </CardActions>
                    </div>
                  </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Card className="tile blue">
                    <CardMedia
                      style={{ height: 430, width: 430 }}
                      image={placeholderImg}
                      className="tile-img"
                    />
                    <CardContent className="pding">
                      <div className="prod-name-holder">
                        <Typography>
                          <Link to={`/products/TSGF/TSGF1`} className="title">
                            Focus + Clarity
                          </Link>
                        </Typography>
                      </div>
                      <div className="variant-info">
                        <div>
                          <strong>$32.95</strong> &mdash; 10 veggie capsules
                        </div>
                      </div>
                    </CardContent>
                    <div className="cta-area">
                      <CardActions className="home-atc">
                        <Button
                          variant="contained"
                          color="primary"
                          fullWidth={true}
                          className="atc-button"
                        >
                          ADD TO CART
                        </Button>
                      </CardActions>
                    </div>
                  </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Card className="tile red">
                    <CardMedia
                      style={{ height: 430, width: 430 }}
                      image={placeholderImg}
                      className="tile-img"
                    />
                    <CardContent className="pding">
                      <div className="prod-name-holder">
                        <Typography>
                          <Link to={`/products/TCNB/TCNB1`} className="title">
                            Smooth + Luminous
                          </Link>
                        </Typography>
                      </div>
                      <div className="variant-info">
                        <div>
                          <strong>$12.95</strong> &mdash; 20 single serve
                          packets
                        </div>
                      </div>
                    </CardContent>
                    <div className="cta-area">
                      <CardActions className="home-atc">
                        <Button
                          variant="contained"
                          color="primary"
                          fullWidth={true}
                          className="atc-button"
                        >
                          ADD TO CART
                        </Button>
                      </CardActions>
                    </div>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          </Container>
        </div>
        <Container className="section-container">
          <Box py={10} className="section-holder">
            {this.renderSections()}
          </Box>
        </Container>
        <div className="his-hers-theirs beige-bg">
          <Container>
            <Box py={10}>
              <h1>HIS, HERS & THEIRS</h1>
              <p>Solutions for the whole family!</p>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Card className="tile green">
                    <CardMedia
                      style={{ height: 430, width: 430 }}
                      image={placeholderImg}
                      className="tile-img"
                    />
                    <CardContent className="pding">
                      <div className="prod-name-holder">
                        <Typography>
                          <Link to={`/products/TOPT/TOPT1`} className="title">
                            Proactive Prostate
                          </Link>
                        </Typography>
                      </div>
                      <div className="variant-info">
                        <div>
                          <strong>$16.95</strong> &mdash; 60 oz.
                        </div>
                      </div>
                    </CardContent>
                    <div className="cta-area">
                      <CardActions className="home-atc">
                        <Button
                          variant="contained"
                          color="primary"
                          fullWidth={true}
                          className="atc-button"
                        >
                          ADD TO CART
                        </Button>
                      </CardActions>
                    </div>
                  </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Card className="tile blue">
                    <CardMedia
                      style={{ height: 430, width: 430 }}
                      image={placeholderImg}
                      className="tile-img"
                    />
                    <CardContent className="pding">
                      <div className="prod-name-holder">
                        <Typography>
                          <Link to={`/products/TMNO/TMNO1`} className="title">
                            Keep Cool
                          </Link>
                        </Typography>
                      </div>
                      <div className="variant-info">
                        <div>
                          <strong>$32.95</strong> &mdash; 10 veggie capsules
                        </div>
                      </div>
                    </CardContent>
                    <div className="cta-area">
                      <CardActions className="home-atc">
                        <Button
                          variant="contained"
                          color="primary"
                          fullWidth={true}
                          className="atc-button"
                        >
                          ADD TO CART
                        </Button>
                      </CardActions>
                    </div>
                  </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Card className="tile red">
                    <CardMedia
                      style={{ height: 430, width: 430 }}
                      image={placeholderImg}
                      className="tile-img"
                    />
                    <CardContent className="pding">
                      <div className="prod-name-holder">
                        <Typography>
                          <Link to={`/products/TIMN/TIMN1`} className="title">
                            Immune + Wellness
                          </Link>
                        </Typography>
                      </div>
                      <div className="variant-info">
                        <div>
                          <strong>$12.95</strong> &mdash; 20 single serve
                          packets
                        </div>
                      </div>
                    </CardContent>
                    <div className="cta-area">
                      <CardActions className="home-atc">
                        <Button
                          variant="contained"
                          color="primary"
                          fullWidth={true}
                          className="atc-button"
                        >
                          ADD TO CART
                        </Button>
                      </CardActions>
                    </div>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          </Container>
        </div>
      </div>
    );
  }

  render() {
    return this.renderContent();
  }
}
