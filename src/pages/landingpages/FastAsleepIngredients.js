import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { GalleryStore } from '../../contexts/GalleryContext';
import Products from '../gallery/Products';
import { CartMergeNotification, CartNotification } from '../../components/cart';
import { addCoupon, removeCoupon, addToCart } from '../../modules/cart/functions';
import { setCartNotification } from '../../modules/utils/actions';
import Logo from '../../components/common/Icons/Logo/Logo';
import { Container, Grid } from '@material-ui/core';
import FastAsleepMelatonin from './FastAsleepMelatonin';

import './fast-asleep.scss';

const scrollToRef = ref => window.scrollTo(0, ref.current.offsetTop);

const FastAsleepIngredients = ({ location }) => {
  const cart = useSelector(state => state.cart);
  const catalog = useSelector(state => state.catalog);
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('xs'));
  const dispatch = useDispatch();
  const myRef = useRef(null);
  const executeScroll = () => scrollToRef(myRef);
  const myRefTwo = useRef(null);
  const executeScrollTwo = () => scrollToRef(myRefTwo);
  const myRefThree = useRef(null);
  const executeScrollThree = () => scrollToRef(myRefThree);
  const myRefFour = useRef(null);
  const executeScrollFour = () => scrollToRef(myRefFour);

  useEffect(() => {
    window.analytics.page('FastAsleepIngredients');
  }, []);
  const handleClick = () => {
    console.log('HANDLE CLICK');
    console.log(catalog);
    console.log(catalog.variants);
    const vts = catalog.variants;
    const targetObject = vts.find(item => item.slug == 'fast-asleep');
    console.log('targetObject:', targetObject);
    //atc
    addToCart(cart._id, targetObject, 1);
    console.log('1');
    //add coupon
    addCoupon(cart._id, 'voucherify.io-sandbox-04');
    console.log('2');
    //redirect
    //window.location.href = '/checkout';
  };

  return (
    <>
      <div className="landing-header">
        <Container>
          <div className="link-holder">
            <NavLink to="/">
              <Logo />
            </NavLink>
            <NavLink onClick={executeScroll} className="hidden-xs">
              GABA: THE CALMING <br />
              NEUROTRANSMITTER
            </NavLink>
            <NavLink onClick={executeScrollTwo} className="hidden-xs">
              SAFFRON: THE SPICE WITH
              <br /> A 100% SUCCESS RATE
            </NavLink>
            <NavLink onClick={executeScrollThree} className="hidden-xs">
              7 SIGNS YOU’RE
              <br /> NOT SLEEPING WELL
            </NavLink>
            <NavLink onClick={executeScrollFour} className="hidden-xs">
              BETTER SLEEP—Guaranteed
              <br /> try it risk-free
            </NavLink>
          </div>
        </Container>
      </div>
      <Container>
        <Grid container>
          <Grid item xs={12} md={8} className="smaller-container">
            <h1>Do GABA & saffron beat melatonin at improving sleep quality?</h1>
            <h3>This natural power combo fights the #1 enemy of good sleep</h3>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} md={10} className="smaller-container">
            <img
              className="w-100 hero-image hidden-xs"
              src="https://images.ctfassets.net/mj9bpefl6wof/51FdlvcsHxRRpuQBsIRzzr/1339a2ade8cf32cba9f9857577e88cff/Hero_-_desktop.png"
            />
          </Grid>
        </Grid>
      </Container>
      <img
        className="w-100 hero-image xs-only"
        src="https://images.ctfassets.net/mj9bpefl6wof/3B4lfG6Aus493ToyiTGd3N/ef8cdfbd7abe160beaa0caf06374961a/hero_-_mobile.png?w=450"
      />
      <Container>
        <Grid container>
          <Grid item xs={12} md={8} className="smaller-container">
            <div className="xs-only link-holder-mobile">
              <ul>
                <li>
                  <NavLink onClick={executeScroll}>GABA: THE CALMING NEUROTRANSMITTER</NavLink>
                </li>
                <li>
                  <NavLink onClick={executeScrollTwo}>SAFFRON: THE SPICE WITH A 100% SUCCESS RATE</NavLink>
                </li>
                <li>
                  <NavLink onClick={executeScrollThree}>7 SIGNS YOU’RE NOT SLEEPING WELL</NavLink>
                </li>
                <li>
                  <NavLink onClick={executeScrollFour}>BETTER SLEEP—Guaranteed</NavLink>
                </li>
              </ul>
            </div>
            <div className="floating">
              <div className="beige-box float-right benefits hidden-xs">
                <div className="box-header">BENEFITS TO DEEP, RESTORATIVE SLEEP</div>
                <ul>
                  <li>More energy during the day</li>
                  <li>Enhanced mental clarity</li>
                  <li>Increased productivity</li>
                  <li>Brighter moods</li>
                  <li>Faster muscle recovery</li>
                  <li>A stronger immune system</li>
                  <li>Better hormone balance</li>
                  <li>Reduced food cravings</li>
                  <li>Improved cardiovascular health</li>
                </ul>
              </div>
              <p>
                There’s no way around it: You need to sleep—and you need to sleep well—to feel well, perform at your
                best during the day and, yes, even look good doing it.<sup>*</sup>
              </p>
              <p>
                But if you’re among the estimated 50-70 million Americans who struggle with occasional sleeplessness,
                know that sleeping well is easier said than done.<sup>1</sup>
              </p>
              <p>
                Whether your mind starts racing as soon as your head hits the pillow… or you find yourself wide awake in
                the middle of the night worrying about your to-do list, tossing and turning when you “should” be
                sleeping… or you wake up feeling exhausted yet again after spending all night in bed “trying to sleep,”
                not sleeping is NOT OK.<sup>*</sup>
              </p>
              <p>
                Aside from daytime drowsiness, lack of focus and reduced productivity, missing out on high-quality sleep
                can have serious implications for your health, ranging from weight gain to increased cardiovascular
                risk.
                <sup>*</sup>
              </p>
              <div className="beige-box w-100 benefits xs-only">
                <div className="box-header">BENEFITS TO DEEP, RESTORATIVE SLEEP</div>
                <ul>
                  <li>More energy during the day</li>
                  <li>Enhanced mental clarity</li>
                  <li>Increased productivity</li>
                  <li>Brighter moods</li>
                  <li>Faster muscle recovery</li>
                  <li>A stronger immune system</li>
                  <li>Better hormone balance</li>
                  <li>Reduced food cravings</li>
                  <li>Improved cardiovascular health</li>
                </ul>
              </div>
              <p>
                And it’s NOT melatonin—it’s a revolutionary new solution that combines a calming neurotransmitter known
                as GABA (in amino acid form) with an extract made from the aromatic spice saffron. These two powerful,
                yet gentle, clinically studied ingredients help counteract the negative effects of stress to promote
                deep, restorative sleep.<sup>3-16*</sup>
              </p>
            </div>
            <hr />
            <h2 ref={myRef}>GABA: The calming neurotransmitter</h2>
            <p>
              If racing thoughts or feelings of anxiousness make it hard for you to fall asleep at night, a
              neurotransmitter called gamma-aminobutyric acid, or GABA for short, could be the key to calming your mind
              and helping you “power down” at night so you can get the deep, restorative, high-quality sleep you need.
              <sup>3-10*</sup>
            </p>
            <div className="floating">
              <div className="gaba-img-and-desc">
                <img
                  className="w-100"
                  src="https://images.ctfassets.net/mj9bpefl6wof/Wm45kKU1MtkRH2TfA54r1/79443bdd3c20acf18247e28f1701d845/gaba.png?h=215"
                />
                <em>
                  GABA reduces the activity of nerve cells throughout your nervous system and helps your mind move from
                  the wakeful state to the sleeping state
                  <sup>*</sup>
                </em>
              </div>
              <p>
                GABA’s primary jobs are to reduce the activity of nerve cells throughout your nervous system and help
                your mind move from the wakeful state to the sleeping state. By inhibiting neural activity, GABA reduces
                mental and physical stress, eases feelings of anxiousness, creates a calmness of mood and induces sleep.
                <sup>3-10*</sup>
              </p>
              <p>
                As a supplement, GABA has been shown to ease nighttime feelings of anxiousness and promote deep, restful
                sleep. It moves directly into active brain circuits to inhibit alertness and promote relaxation. Before
                you know it, your racing mind quiets down and gently fades off into blissful sleep.
                <sup>3-10*</sup>
              </p>
            </div>
            <h2 className="mt-50">Studies show this natural form of GABA really works</h2>
            <p>
              When GABA’s calming effects on the nervous system were first revealed in the research, many companies
              raced to market with synthetic GABA supplements, which didn’t yield great results. But then a new form of
              GABA came on to the scene. Called PharmaGABA®, it’s produced by fermentation using the same friendly
              probiotic (Lactobacilllus hilgardi) used to culture the traditional Korean fermented food, kimchi.
              <sup>5*</sup>
            </p>
            <p>
              PharmaGABA® has been shown to effectively increase the alpha-wave brain activity associated with calmness
              and relaxation while decreasing the beta-wave activity linked with nervousness and feelings of
              anxiousness.
              <sup>6,7*</sup>
            </p>
            <p>
              In a small 7-day study, PharmaGABA® reduced the time it took study participants to fall asleep and
              increased sleep quality and efficiency (the amount of time asleep while in bed), according to Pittsburgh
              Sleep Quality Index (PSQI) scores. Participants also reported improvements in the way they felt upon
              waking.<sup>8*</sup>
            </p>
            <p>
              In a second 4-week study with healthy older adults, participants reported improved sleep and less
              drowsiness in the morning, along with a welcomed decrease in nighttime urination.<sup>9*</sup>
            </p>
            <p>
              And a third non-sleep study showed how PharmaGABA® effectively eased stress. Participants reported calmer
              feelings and EEG readings confirmed it: They showed measurably decreased stress responses.<sup>10*</sup>
            </p>
            <p>
              Another great thing about PharmaGABA® is that it’s quickly absorbed. It starts working within 30 minutes
              after ingestion—making it perfect for bedtime.<sup>10*</sup>
            </p>
            <hr />
            <h2 ref={myRefTwo}>Saffron: The natural sleep aid worth its weight in gold</h2>
            <p>
              Famed for imparting a brilliant yellow color and delicate aromatic flavor to rice dishes like paella and
              biryani—and for being the world’s most expensive spice—saffron is made from the bright red thread-like
              stigmas of the flowering plant, Crocus sativus.
            </p>
            <div className="floating">
              <div className="beige-box float-left adds hidden-xs">
                <div className="box-header">All of This Adds Up to Profound benefits:</div>
                <ul>
                  <li>Better, more satisfying sleep</li>
                  <li>Relief from stress and anxiety</li>
                  <li>Brighter, more balanced moods</li>
                  <li>Improved psychological health</li>
                  <li>Enhanced cognitive health</li>
                </ul>
              </div>
              <p>
                Harvested by hand, each delicate thread must be carefully removed from the center of the flower. It
                takes more than 12,000 individual stigmas to produce a single ounce of saffron. But it's truly worth its
                weight in gold (especially for the sleep-deprived among us)!<sup>*</sup>
              </p>
              <p>
                Saffron contains several biologically active antioxidant compounds, including crocin, picrocrocin and
                saffranal. Recent studies show that these compounds help support a normal inflammatory response, reduce
                levels of the stress hormone cortisol, and can help balance levels of important mood- and
                sleep-regulating brain chemicals like serotonin, dopamine and glutamate.11-16<sup>*</sup>
              </p>
              <div className="beige-box adds xs-only">
                <div className="box-header">All of This Adds Up to Profound benefits:</div>
                <ul>
                  <li>Better, more satisfying sleep</li>
                  <li>Relief from stress and anxiety</li>
                  <li>Brighter, more balanced moods</li>
                  <li>Improved psychological health</li>
                  <li>Enhanced cognitive health</li>
                </ul>
              </div>
            </div>
            <h2>The clinical results are solid (gold)</h2>
            <p>
              With issues around sleep, stress, anxiousness and mood affecting more and more of us these days,
              researchers are excited about saffron’s potential to help. Multiple clinical trials have demonstrated
              saffron’s mood-enhancing effects, but two are particularly notable.<sup>14,15*</sup>
            </p>
            <p>
              Both studies investigated the effects of a 30 mg/day dose of saffron extract on mood. By the end of the
              six- and eight-week study periods, the study participants taking saffron experienced dramatic,
              statistically significant improvements in overall mood balance.<sup>14,15*</sup>
            </p>
            <h2>A 100% success rate for better sleep</h2>
            <div className="floating">
              <div className="beige-box float-right saffron hidden-xs">
                <div className="box-header">
                  100% of people in the saffron group saw improvement with:<sup>16</sup>
                </div>
                <ul>
                  <li>Ease in falling asleep</li>
                  <li>Overall sleep quality</li>
                  <li>Feeling refreshed upon waking</li>
                </ul>
              </div>
              <p>
                Another truly impressive study—a randomized, double-blind, placebo-controlled clinical trial—evaluated
                the effects of a daily dose of 30 mg per day of a standardized saffron extract called Saffr’Activ® on
                mood, anxiousness and sleep in 30 healthy adults.<sup>16*</sup>
              </p>
              <p>
                Over the course of six weeks, the participants answered standardized questionnaires at weekly intervals.
                The saffron group experienced notable improvements in mood and feelings of anxiousness symptoms by the
                end of the study period.<sup>16*</sup>
              </p>
              <p>
                And, amazingly, for issues related to sleep, those taking the saffron showed statistically significant
                improvements after just three weeks. By the end of the six weeks, 100% of people in the saffron group
                (that’s everyone, which is almost unheard of in clinical trials) showed improvement in three key
                measures of sleep.<sup>*</sup>
              </p>
            </div>
            <div className="beige-box saffron xs-only">
              <div className="box-header">
                100% of people in the saffron group saw improvement with:<sup>16</sup>
              </div>
              <ul>
                <li>Ease in falling asleep</li>
                <li>Overall sleep quality</li>
                <li>Feeling refreshed upon waking</li>
              </ul>
            </div>
            <h2>Saffr’ACTIV® is the real deal</h2>
            <p>
              Growing, harvesting, drying and extracting saffron is no simple endeavor, and as is the case with most
              things as precious (and pricey) as saffron, adulteration is a huge issue when it comes to sourcing the raw
              material. Saffron swindlers have been known to mix other plant materials, bulking agents and dyes into
              products sold as “genuine saffron.”<sup>*</sup>
            </p>
            <div className="floating">
              <div className="saffron-flowers">
                <img
                  className="w-100"
                  src="https://images.ctfassets.net/mj9bpefl6wof/45PqaEUbsmjZZNVqNUs7zp/1fe492148f9c23360e5f285df8bc98ac/saffron.png?h=250"
                />
                <em>Saffron flowers collected by hand</em>
              </div>
              <p>
                Saffr’ACTIV® is the real deal. It’s made from Crocus sativa saffron flowers grown in North Africa,
                Greece and the Middle East.<sup>*</sup>
              </p>
              <p>
                The flowers are collected by hand in the fall, early in the morning when they are just starting to open.
                This ensures that 1) the energy of the plant and its biologically active compounds are concentrated in
                the flower and; 2) the delicate stigmas are protected inside the flower’s still mostly closed petals.
                <sup>*</sup>
              </p>
              <p>
                The individual stigmas are then removed manually and dried according to precise temperature and humidity
                conditions that favor optimal levels of saffron’s active compounds before being sent to France for
                extraction.<sup>*</sup>
              </p>
            </div>
            <hr />
            <h2>Why GABA and Saffron Instead of Melatonin?</h2>
            <p>
              From weird, disturbing dreams and morning grogginess to interfering with your body’s sleep-wake rhythm,
              the sleep-inducing hormone melatonin has some pretty significant drawbacks.<sup>2*</sup>
            </p>
            <p>
              GABA and saffron, on the other hand, offer side effect-free, non-habit-forming sleep support. And they
              come with powerful mood-boosting, stress-relieving benefits that increase over time, which means sleep
              that gets better and better—and days that get brighter and more productive.<sup>3-16*</sup>
            </p>
            <div className="beige-box w-100 two-boxes">
              <div className="w-50">
                <div className="box-header">Melatonin</div>
                <div className="ul-holder">
                  <ul>
                    <li>Causes intense dreams in some people</li>
                    <li>Can lead to morning grogginess</li>
                    <li>A hormone that alters sleep-wake rhythm</li>
                    <li>Loses effectiveness over time</li>
                  </ul>
                </div>
              </div>
              <div className="w-50">
                <div className="box-header">GABA + Saffron</div>
                <div className="ul-holder">
                  <ul>
                    <li>Free of side effects</li>
                    <li>Eases stress and feelings of anxiousness</li>
                    <li>Non-hormonal and non-habit-forming</li>
                    <li>Increases in effectiveness over time</li>
                  </ul>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} md={6} className="smaller-container">
            <div className="cta-holder">
              <div className="text">
                Get the deep restorative sleep you need <br />
                with Saffron & GABA Chocolates
              </div>
              <NavLink onClick={handleClick}>
                <div className="green-btn">GET 25% OFF</div>
              </NavLink>
            </div>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} md={8} className="smaller-container">
            <hr />
            <h2>
              Sleep <em>Quality</em> Really Matters
            </h2>
            <div className="floating">
              <img
                className="float-right sleeping-lady"
                src="https://images.ctfassets.net/mj9bpefl6wof/69BsY8f5sLsHSu8LFlkZYW/0b6946c8ce19d2582d69f28e878ce675/sleep_quality.png?w=285"
              />
              <p>
                If you’re like most of us, balancing busy work schedules with kids’ schedules, maintaining a household
                and doing your best to exercise and take care of your body, chances are you don’t have more time to
                allocate for sleep. (When was the last time you took a nap?) So getting as much high-quality sleep as
                possible during the hours you have for sleep is critical to feeling your best during the day.
                <sup>*</sup>
              </p>
              <p>
                That means when bedtime rolls around, you need to be able to wind down and fall asleep fast—and stay
                sleeping soundly through the night—so that when you get up in the morning, you feel fully recharged and
                ready for whatever your day holds.<sup>*</sup>
              </p>
              <p>So what’s keeping you from getting this kind of sleep?</p>
              <p>
                STRESS.<sup>*</sup>
              </p>
            </div>
            <h2>Stress Is the #1 Enemy of Good Sleep</h2>
            <p>
              Life today is stressful. The stress makes it hard to sleep, and the lack of sleep makes it hard to stay
              positive and on top of all the things we have to juggle each day, which, in turn, leads to—you guessed
              it—more stress.<sup>*</sup>
            </p>
            <p>It’s a vicious cycle most of us know all too well. </p>
            <p>
              Stress causes a state of hyperarousal that keeps your brain and body “on alert,” which can make it
              difficult to “power down” your brain at night when it’s time to relax and fall asleep. It can also make it
              hard to stay asleep or fall back to sleep after waking up in the middle of the night.<sup>*</sup>
            </p>
            <p>
              To make matters worse, our schedules are often at odds with the natural rhythms of day and night and light
              and dark that our bodies were originally designed for. Artificial light and caffeine often have us
              working, playing, thinking and scrolling around the clock, which layers on even more physical stress.
              <sup>*</sup>
            </p>
            <h2 ref={myRefThree}>7 signs you aren’t getting Enough High-Quality sleep</h2>
            <p>
              Everyone’s sleep needs are different, but most adults do best with 7-9 solid hours a night. Unfortunately,
              many of us are burning the candle at both ends and struggling to sleep well in the hours in between,
              resulting in a slow accumulation of sleep debt that takes its toll on our health, performance and
              appearance. Here are seven signs you aren’t getting enough high-quality sleep:<sup>17-20*</sup>
            </p>
            <p>
              <strong>1. Daytime drowsiness:</strong> This one might seem obvious, but it can be serious and can even
              lead to impaired driving.<sup>*</sup>
            </p>
            <p>
              <strong>2. Dark under-eye circles:</strong> Missing sleep can cause fluid to accumulate below your eyes,
              leading to circles, swelling and puffiness.<sup>*</sup>
            </p>
            <p>
              <strong>3. Brain fog:</strong> Lack of sleep can cause lack of focus and decreased productivity. Studies
              have even linked it to memory issues.<sup>*</sup>
            </p>
            <p>
              <strong>4. Low mood:</strong> Lack of sleep can severely dampen your mental outlook, making it harder to
              handle the stresses of daily life.<sup>*</sup>
            </p>
            <p>
              <strong>5. Hunger pangs:</strong> Not sleeping can increase levels of hormones that control appetite,
              resulting in cravings that can be hard to control.<sup>*</sup>
            </p>
            <p>
              <strong>6. Impaired immune function:</strong> Your immune system works while you sleep, and not getting
              the sleep you need makes it harder for it to do its job.<sup>*</sup>
            </p>
            <p>
              <strong>7. Heart health concerns:</strong> Ongoing lack of sleep has been linked to cardiovascular
              concerns.
              <sup>*</sup>
            </p>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} md={10} className="smaller-container">
            <div className="big-banner">
              there’s a simple, way to get the deep, <br />
              restorative, high-quality sleep you need
            </div>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} md={8} className="smaller-container">
            <h2>Better nights = better days = better health</h2>
            <p>
              The fact is your whole body runs better after a good night of sleep. And help is here—and it completely
              bucks the system when it comes to typical sleep solutions.<sup>*</sup>
            </p>
            <div className="floating">
              <img
                className="float-right fast-asleep"
                src="https://images.ctfassets.net/mj9bpefl6wof/4pOZp8G5Qk4w8uP6x47Aqs/d02235ff6215ff8ba83029abb4d7a964/FA_-_desktop.png?h=244"
              />
              <p>
                <a href="/products/fast-asleep">Fast Asleep</a> is a revolutionary new way to get the high-quality sleep
                you need to be the best version of yourself. It’s not a pill, and it’s not melatonin—it’s a delightful
                dark chocolate mint filled with two powerful, natural sleep-inducing ingredients that help counteract
                the negative effects of stress on sleep: GABA and saffron.<sup>*</sup>
              </p>
              <div className="blue-btn">Try fast asleep risk-free</div>
            </div>
            <hr />
            <h2>Your sweetest (naturally sugar-free) sleep ever </h2>
            <p>
              Now, thanks to recent scientific advances in our understanding of stress and sleep and innovations in how
              we take supplements, the Objective team is excited to introduce a SWEET new sleep solution that takes
              natural sleep support to the next level.
            </p>
            <p>
              Fast Asleep harnesses the latest research findings on PharmaGABA™ and Saffr’Activ saffron to bring you an
              amazingly effective support for deep, restorative sleep—and a treat you’ll look forward to nightly.
              <sup>*</sup>
            </p>
            <h4>Sweet dreams are made of chocolate</h4>
            <p>
              Nearly every sleep solution comes in pill form. Why is that an issue? Because taking pills requires
              drinking water, which just doesn’t make sense right before bed. Why take something to help you sleep only
              to have your bladder wake you up in the middle of the night?<sup>*</sup>
            </p>
            <p>
              That’s why Fast Asleep is a mint dark chocolate that feels like an indulgent bedtime ritual. Fast Asleep
              is naturally sugar-free—it’s sweetened with keto-friendly allulose—and is non-habit-forming, so it’s a
              nightcap you can feel good about! (Yes, dark chocolate does contain trace amounts of caffeine, but you can
              rest assured that it’s a negligible amount and is balanced by the other ingredients.)<sup>*</sup>
            </p>
            <h4>Quality, purity and effectiveness you can trust</h4>
            <p>
              Fast Asleep is manufactured in the U.S. with research-based doses of PharmaGABA® and Saffr’Activ®, which
              we chose because they each have extensive research backing their safety and efficacy. We are meticulous in
              sourcing, positively identifying and testing our raw ingredients for purity and potency. We also test and
              validate the finished products once they are complete.
            </p>
            <p>
              We work exclusively with manufacturers who adhere to the Food and Drug Administration’s (FDA) Current Good
              Manufacturing Procedures (cGMP). These facilities are regularly inspected and certified by the FDA.
            </p>
            <hr />
            <h2 ref={myRefFour}>Better sleep, guaranteed. Try it today—risk-free!</h2>
            <p>
              The great news about Fast Asleep is that it often starts working the first night you take it. Depending on
              your physiology and sleep habits, it may take up to a week to start seeing the effects, but you’ll KNOW
              when it’s working, because you’ll:<sup>*</sup>
            </p>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} md={10} className="smaller-container">
            <div className="floating">
              <img
                className="chocos float-right"
                src="https://images.ctfassets.net/mj9bpefl6wof/6f3UWTGXIM58ZiUHDOcVVS/9f7a51b10686ac92e567f5696423a3fa/chocolates.jpg?h=290"
              />
              <ul className="ml-ul">
                <li>Experience deep relaxation as GABA quiets racing thoughts</li>
                <li>Fall asleep faster without tossing and turning</li>
                <li>Sleep blissfully through the night</li>
                <li>Wake up refreshed, alert and rejuvenated</li>
                <li>Feel less stressed, more focused and more motivated</li>
                <li>Enjoy better moods as saffron builds up in your system</li>
                <li>Notice improved overall health, thanks to better quality sleep</li>
              </ul>
            </div>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} md={8} className="smaller-container">
            <p>And the results get better and better with time!</p>
            <p>
              Plus, the fact that Fast Asleep contains all natural, non-habit-forming ingredients and is naturally
              sugar-free means that you're not simply getting short-term benefits at the risk of long-term damage to
              your health.<sup>*</sup> Fast Asleep is backed by our industry-leading money-back guarantee. And for a
              limited time, you can try it risk-free with free shipping. If it doesn’t work, don’t lose MORE sleep over
              it—just let us know and we’ll refund your money. No need to return it, give it to a friend to try.
            </p>
            <h2 className="text-center">
              Get the deep, restorative sleep you need to <br />
              wake up feeling like your best self&mdash;
              <br /> or get your money back
            </h2>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} md={10} className="smaller-container">
            <div className="wake-up-box">
              <img src="https://images.ctfassets.net/mj9bpefl6wof/4pOZp8G5Qk4w8uP6x47Aqs/d02235ff6215ff8ba83029abb4d7a964/FA_-_desktop.png?w=556" />
              <div className="box-right">
                <div className="title">Wake Up Refreshed with Fast Asleep</div>
                <div className="subtitle">SAFFRON SLEEP CHOCOLATES</div>
                <ul>
                  <li>GABA relaxes your mind to lull you to sleep</li>
                  <li>Saffron keeps you sound asleep all night</li>
                  <li>You’ll wake up refreshed and alert</li>
                </ul>
                <div className="black-btn">GET 25% off your first order</div>
              </div>
            </div>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} md={8} className="smaller-container">
            <div className="sf">Scientific References</div>
            <ol>
              <li>https://www.ncbi.nlm.nih.gov/books/NBK19961/</li>
              <li>https://www.webmd.com/sleep-disorders/news/20171004/is-natural-sleep-aid-melatonin-safe</li>
              <li>https://pubmed.ncbi.nlm.nih.gov/2573696/</li>
              <li>https://pubmed.ncbi.nlm.nih.gov/2573696</li>
              <li>https://www.fda.gov/media/97030/download</li>
              <li>https://pubmed.ncbi.nlm.nih.gov/16971751</li>
              <li>https://pubmed.ncbi.nlm.nih.gov/22203366</li>
              <li>https://pubmed.ncbi.nlm.nih.gov/30263304</li>
              <li>http://lifescience.co.jp/yk/yk13/yke1310.html</li>
              <li>https://www.ncbi.nlm.nih.gov/pubmed/22203366</li>
              <li>https://pubmed.ncbi.nlm.nih.gov/19462324</li>
              <li>https://www.researchgate.net/publication/292667092_Saffron_chemicals_and_medicine_usage</li>
              <li>https://pubmed.ncbi.nlm.nih.gov/25384672</li>
              <li>https://pubmed.ncbi.nlm.nih.gov/15852492</li>
              <li>https://pubmed.ncbi.nlm.nih.gov/17174460</li>
              <li>Randomized double blind placebo controlled study of Saffr’activ. Unpublished.</li>
              <li>https://www.webmd.com/sleep-disorders/features/10-results-sleep-loss#1</li>
              <li>https://jamanetwork.com/journals/jamaneurology/article-abstract/2674274</li>
              <li>https://jamanetwork.com/journals/jamaneurology/article-abstract/2674279</li>
              <li>https://www.webmd.com/sleep-disorders/features/immune-system-lack-of-sleep#1</li>
            </ol>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default FastAsleepIngredients;
