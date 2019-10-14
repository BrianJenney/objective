import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { Button } from '../components/common';
import ScrollToTop from '../components/common/ScrollToTop';
import './about/about-styles.scss';

const AboutUs = () => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <div className="aboutus">
      {mobile ? (
        <img
          src="https://cdn1.stopagingnow.com/objective/aboutus/hero-mobile.png"
          alt=""
          className="hero"
        />
      ) : (
        <img
          src="https://cdn1.stopagingnow.com/objective/aboutus/hero-desktop.png"
          alt=""
          className="hero"
        />
      )}
      <Box py={8} className="mobile-padding">
        <Container className="section1">
          <div className="title">
            <h1>Our Objective</h1>
            <img
              src="http://cdn1.stopagingnow.com/objective/aboutus/slash-desktop.png"
              alt=""
              className="slash"
            />
          </div>
          <p>
            Here we are, right with you. In the middle of our circles--family,
            friends, neighbors, colleagues and our community. We’re worrying
            about our parents’ health, constantly concerned about the kids we’re
            raising. Feeling our own bodies starting to betray us. And we’re not
            going to take it.
          </p>
          <p>
            Like you, we are parents, sons and daughters, brothers and
            sisters--but we are also nutritionists, researchers and innovators
            who have been formulating and marketing vitamins and minerals for
            decades for everyone but ourselves, our generation.
          </p>
          <p>
            Until now. We’re taking everything we know and developing
            science-backed health solutions for us, our families, our
            friends...and for you and yours.
          </p>
          <p>
            And, frankly, we know a lot. We know to get real results, you need
            the amounts and forms of ingredients shown to work in clinical
            studies. Nothing unproven or trendy. No half doses. No pixie dust.
            Who has time to waste on pixie dust?
          </p>
          <p className="tagline">
            So, we set out to create a wellness brand that takes care of us, the
            generation who is taking care of everyone else. . .
          </p>
        </Container>
      </Box>
      <Box className="section2 mobile-padding" py={8}>
        <img
          src="https://cdn1.stopagingnow.com/objective/aboutus/beakers-mobile.png"
          className="mobile-img"
        />
        <Container>
          <div className="text">
            <p className="tagline">You see, it starts with you.</p>
            <p>
              It is why flight attendants ask caretakers to put their oxygen
              mask on first before helping the child. Simple right? The
              healthier you are, the better and longer you can care for those
              you love.
            </p>
            <p>
              But we also understand healthy can be confusing and downright
              overwhelming for those who haven’t spent decades analyzing the
              quality of raw ingredients or toying with hundreds of versions of
              formulas to get it right.
            </p>
            <p>
              So, we will give you the facts, what we can do but also what we
              can’t do. We will cut through all the clutter so you don’t have to
              – whether you are an expert label-reader or find supplements and
              health products daunting.
            </p>
          </div>
          <Link to="/gallery" className="buttonlink mobile-only">
            Shop Better Health (FPO)
          </Link>
        </Container>
      </Box>
      <Box py={8} className="mobile-padding">
        <Container className="section3">
          <div className="border">
            <h1>
              Our Objective approach <br />
              to better health
            </h1>
            <Grid container spacing={10}>
              <Grid item xs={12} md={4}>
                <img
                  src="https://cdn1.stopagingnow.com/objective/svg/plant_nutrition.svg"
                  alt=""
                  className="svg"
                />
                <h2>
                  Supplements Straight <br />
                  from Science
                </h2>
                <p>
                  We break down the research and put it at your fingertips. We
                  tell you what to expect and when. No magic bullets, just real
                  results. We believe you should know what you’re taking, where
                  it’s from and why it works.
                </p>
              </Grid>
              <Grid item xs={12} md={4}>
                <img
                  src="https://cdn1.stopagingnow.com/objective/svg/2_pills.svg"
                  alt=""
                  className="svg"
                />
                <h2>
                  A New Perspective on <br />
                  How to Take Supplements
                </h2>
                <p>
                  How you take supplements is just as important as what’s in
                  them. Sometimes pills work best. Sometimes it’s a powder to
                  add to your coffee. Sometimes it’s a chocolate mint to help
                  you sleep.
                </p>
              </Grid>
              <Grid item xs={12} md={4}>
                <img
                  src="https://cdn1.stopagingnow.com/objective/svg/balance.svg"
                  alt=""
                  className="svg"
                />
                <h2>
                  Solutions Beyond <br />
                  Supplements
                </h2>
                <p>
                  Pills (and chocolates and powders) are not the only path to
                  great health. What we eat and how we exercise, work and play
                  all play roles. Check out The Journal for tips, recipes and
                  other ways to make good health easy.
                </p>
              </Grid>
            </Grid>
            <Link to="/gallery" className="buttonlink">
              Shop Better Health (FPO)
            </Link>
          </div>
        </Container>
      </Box>
      <Box py={8} className="section4 mobile-padding">
        <h3>A Little More You Should Know...</h3>
        <h1>
          The objective take on <br />
          labeling & manufacturing
        </h1>
        <div className="hundred xs-hidden">
          <div className="left fifty">
            <Container className="container-left">
              <p className="tagline">What you see is what you get</p>
              <p>
                The ingredients, amounts and forms you find in the supplement
                facts section of our labels are what you’ll find
                inside—verified, validated and guaranteed. And we intentionally
                designed our labels to make it easy for you to see what’s inside
                and what it will do for you—whether you’re scrutinizing the
                supplement facts or glancing at the front of the package.
              </p>
            </Container>
            <img src="https://cdn1.stopagingnow.com/objective/aboutus/ingredients-mobile.png" />
          </div>
          <div className="right fifty">
            <img src="https://cdn1.stopagingnow.com/objective/aboutus/bottle-mobile2.png" />
            <Container className="container-right">
              <p className="tagline">We play it safe and by the rules</p>
              <p>
                All of our supplements are manufactured in the United States. We
                gather the raw ingredients from across the globe, bring them
                here, quarantine them, identify them, test them for purity and
                potency. Then we test and validate the finished products all
                over again.
              </p>
              <p>
                We work with a handful of manufacturers who meticulously adhere
                to the Food and Drug Administration’s (FDA) Current Good
                Manufacturing Procedures (cGMP). These facilities are regularly
                inspected and certified by the FDA. Frankly, any supplement you
                take should be able to say this. If they don’t—run, don’t walk.
              </p>
            </Container>
          </div>
        </div>
        <div className="mobile-only">
          <img src="https://cdn1.stopagingnow.com/objective/aboutus/bottle-mobile2.png" />
          <p className="tagline">What you see is what you get</p>
          <p>
            The ingredients, amounts and forms you find in the supplement facts
            section of our labels are what you’ll find inside—verified,
            validated and guaranteed. And we intentionally designed our labels
            to make it easy for you to see what’s inside and what it will do for
            you—whether you’re scrutinizing the supplement facts or glancing at
            the front of the package.
          </p>
          <img src="https://cdn1.stopagingnow.com/objective/aboutus/ingredients-mobile.png" />
          <p className="tagline">We play it safe and by the rules</p>
          <p>
            All of our supplements are manufactured in the United States. We
            gather the raw ingredients from across the globe, bring them here,
            quarantine them, identify them, test them for purity and potency.
            Then we test and validate the finished products all over again.
          </p>
          <p>
            We work with a handful of manufacturers who meticulously adhere to
            the Food and Drug Administration’s (FDA) Current Good Manufacturing
            Procedures (cGMP). These facilities are regularly inspected and
            certified by the FDA. Frankly, any supplement you take should be
            able to say this. If they don’t—run, don’t walk.
          </p>
        </div>
        <Link to="/gallery" className="buttonlink">
          Shop Better Health (FPO)
        </Link>
      </Box>
      <Box py={8} className="section5 mobile-padding">
        <Container>
          <h3>Press & Media Inquires?</h3>
          <h1>press@objectivewellness.com</h1>
        </Container>
      </Box>
    </div>
  );
};

export default AboutUs;
