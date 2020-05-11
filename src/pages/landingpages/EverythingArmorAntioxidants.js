import React, { useEffect, useRef, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { useTheme } from '@material-ui/core/styles';
import { Container, Grid, useMediaQuery, Box } from '@material-ui/core';
import { addCoupon, addToCart } from '../../modules/cart/functions';
import { trackLPSection } from '../../utils/misc';
import Logo from '../../components/common/Icons/Logo/Logo';
import './fast-asleep.scss';

const scrollToRef = ref => window.scrollTo(0, ref.current.offsetTop);

const EverythingArmorAntioxidants = ({ location, history }) => {
  const cart = useSelector(state => state.cart);
  const catalog = useSelector(state => state.catalog);
  const [prodAdded, setProdAdded] = useState(false);
  const [couponAdded, setCouponAdded] = useState(false);
  const section = useRef({
    a: false,
    b: false,
    c: false,
    d: false,
    e: false,
    f: false
  });
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

  const handleScroll = e => {
    if (section.current.a === false && window.scrollY >= 1240 && window.scrollY < 1700) {
      section.current.a = true;
      trackLPSection(
        'Everything Armor Exercise Recovery',
        'Meet Astaxanthin, Possibly the Most Powerful Antioxidant You’ve Never Heard Of',
        'TPZU-1BOT-GELS'
      );
    }

    if (section.current.b === false && window.scrollY >= 2251 && window.scrollY < 2900) {
      section.current.b = true;
      trackLPSection('Everything Armor Exercise Recovery', 'Here’s Why Antioxidants Matter', 'TPZU-1BOT-GELS');
    }

    if (section.current.c === false && window.scrollY >= 4050 && window.scrollY < 4900) {
      section.current.c = true;
      trackLPSection(
        'Everything Armor Exercise Recovery',
        '12 For 12: 12 Ways 12 Mg Of Astaxanthin Helps You, Head-To-Toe',
        'TPZU-1BOT-GELS'
      );
    }

    if (section.current.d === false && window.scrollY >= 6294 && window.scrollY < 7000) {
      section.current.d = true;
      trackLPSection(
        'Everything Armor Exercise Recovery',
        'Better Everything, Guaranteed. Try It Today—Risk-Free!',
        'TPZU-1BOT-GELS'
      );
    }

    if (section.current.e === false && window.scrollY >= 7200 && window.scrollY < 7700) {
      section.current.e = true;
      trackLPSection(
        'Everything Armor Exercise Recovery',
        'Better Workouts, Better Health, Better Everything',
        'TPZU-1BOT-GELS'
      );
    }
  };

  const handleAddToCart = useCallback(() => {
    const selectedVariant = catalog.variants.find(item => item.slug === 'everything-armor');
    setTimeout(() => {
      addToCart(cart, selectedVariant, 1);
      window.analytics.track('Product Clicked', {
        brand: 'OBJ',
        cart_id: cart._id,
        coupon: 'SAVE25',
        image_url: selectedVariant.assets.thumbnail,
        name: selectedVariant.name,
        price: selectedVariant.effectivePrice,
        product_id: selectedVariant.product_id,
        quantity: 1,
        site_location: 'Everything Armor Exercise Recovery',
        sku: selectedVariant.sku,
        url: window.location.href
      });
      setProdAdded(true);
    }, 500);
  }, [cart, catalog, dispatch]);

  const handleAddCoupon = useCallback(() => {
    setTimeout(() => {
      addCoupon(cart._id, 'SAVE25');
      setCouponAdded(true);
    }, 500);
  }, [cart, catalog, dispatch]);

  const handleClick = useCallback(() => {
    handleAddToCart();
  }, [cart, catalog, dispatch]);

  useEffect(() => {
    if (prodAdded && couponAdded) {
      history.push('/checkout');
    }
  }, [prodAdded, couponAdded]);

  useEffect(() => {
    if (prodAdded && couponAdded === false) {
      handleAddCoupon();
    }
  }, [cart]);

  useEffect(() => {
    window.analytics.page('EverythingArmorAntioxidants');
    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="landing-page-design everything-armor">
      <div className="landing-header">
        <Container>
          <div className="link-holder">
            <NavLink to="/">
              <Logo />
            </NavLink>
            <NavLink onClick={executeScroll} className="hidden-xs">
              OUTPERFORMING
              <br /> VITAMIN C & COQ10
            </NavLink>
            <NavLink onClick={executeScrollTwo} className="hidden-xs">
              WHY ANTIOXIDANTS
              <br /> MATTER
            </NavLink>
            <NavLink onClick={executeScrollThree} className="hidden-xs">
              12 WAYS ASTAXANTHIN
              <br /> HELPS YOU HEAD-TO-TOE
            </NavLink>
            <NavLink onClick={executeScrollFour} className="hidden-xs">
              BETTER HEALTH—Guaranteed
              <br /> try it risk-free
            </NavLink>
          </div>
        </Container>
      </div>
      <Container>
        <Grid container>
          <Grid item xs={12} md={8} className="smaller-container">
            <h1>Move Over Vitamin C, There’s an Antioxidant 6,000x More Powerful</h1>
            <h3>...and 800x more powerful than CoQ10, with energy, heart, brain and skin benefits</h3>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} md={10} className="smaller-container">
            <img
              className="w-100 hero-image hidden-xs"
              src="https://images.ctfassets.net/mj9bpefl6wof/5FtAvZbVEa6NhyMDWLOUzu/30fccd4aac89b8aa1f5f177a57af34c9/oranges_desktop.gif?w=1114"
            />
          </Grid>
        </Grid>
      </Container>
      <img
        className="w-100 hero-image xs-only"
        src="https://images.ctfassets.net/mj9bpefl6wof/13OEs7rYIIZVpw9LSaYPDS/862c56bce4365703a46aaa315c52eb2c/oranges_mobile.gif?w=450"
      />
      <Container>
        <Grid container>
          <Grid item xs={12} md={8} className="smaller-container">
            <div className="xs-only link-holder-mobile">
              <ul>
                <li>
                  <NavLink onClick={executeScroll}>OUTPERFORMING VITAMIN C & COQ10</NavLink>
                </li>
                <li>
                  <NavLink onClick={executeScrollTwo}>WHY ANTIOXIDANTS MATTER</NavLink>
                </li>
                <li>
                  <NavLink onClick={executeScrollThree}>12 WAYS ASTAXANTHIN HELPS YOU HEAD-TO-TOE</NavLink>
                </li>
                <li>
                  <NavLink onClick={executeScrollFour}>BETTER HEALTH—Guaranteed</NavLink>
                </li>
              </ul>
            </div>
            <p>
              You’ve heard of antioxidants, and you know they’re good for you. And if you’re like most people, you
              probably opt for antioxidant-rich foods when you can (like darkly colored berries, pomegranate juice and
              red wine) and maybe you even take supplements like CoQ10 or vitamin C—but what exactly are antioxidants
              and why are they so good for us?
            </p>
            <p>
              Antioxidants are compounds that help combat oxidation (the process that causes iron to rust and cut apples
              to turn brown), which is where they get their name—anti-oxidant. And yes, oxidation in your body is every
              bit as cringe worthy as rusted iron and brown apples.
            </p>
            <p>
              In fact, it’s one of the biggest underlying causes of nearly all the negative health aspects of aging. No
              wonder so many baby boomers have started calling the “golden years” the “rusting years.”
            </p>
            <p>
              So if antioxidants are among the few things we know can help our bodies resist oxidation, it makes sense
              to get more of them, right? Absolutely. But some antioxidants work better than others, and a little-known
              antioxidant called astaxanthin (as-ta-zan-thin) is proving to be far more effective than the rest.
            </p>
            <h2 ref={myRef}>Meet Astaxanthin, Possibly the Most Powerful Antioxidant You’ve Never Heard Of</h2>
            <div className="floating">
              <div className="beige-box float-right num1 hidden-xs">
                <div className="box-header">
                  THE ANTIOXIDANT THAT’S UP TO 800X MORE POWERFUL THAN CoQ10 and 6,000X MORE POWERFUL THAN VITAMIN C
                </div>
                <p>
                  In a test that specifically measured its ability to neutralize a particularly unstable and destructive
                  type of free radical called singlet oxygen, astaxanthin was shown to be up to:
                </p>
                <ul>
                  <li>800x stronger than CoQ10</li>
                  <li>6,000x stronger than vitamin C</li>
                  <li>40x stronger than beta-carotene</li>
                  <li>100x stronger than vitamin E</li>
                </ul>
                <div className="cta-holder">
                  <div className="text">
                    Feel the amazing power of
                    <br />
                    astaxanthin for yourself!
                  </div>
                  <NavLink onClick={handleClick} className="green-btn">
                    get 25% off — Buy Now
                  </NavLink>
                </div>
              </div>
              <p>
                In one test, astaxanthin was shown to be 800 times more powerful than CoQ10 and 6,000 times stronger
                than vitamin C at neutralizing a particularly harmful free radical called singlet oxygen. Singlet oxygen
                is linked to DNA damage and age-related concerns affecting the skin, eyes, brain, blood vessels and
                other sensitive tissues in the body.
              </p>
              <p>
                Basically, astaxanthin is one of those rare ingredients that works hard for you NOW (easing post-workout
                joint and muscles aches) and works hard for your future health (so you can dance at your kids’
                weddings…and their kids’ weddings).
              </p>
              <p>
                Believed to give salmon their almost supernatural ability to achieve marathon swimming feats, like
                traveling against the current for days and leaping up waterfalls, astaxanthin (as-ta-zan-thin) is a
                little-known antioxidant found exclusively in a species of microalgae called H. pluvialis.
              </p>
              <p>
                The algae produce astaxanthin as a defense mechanism to protect them from the sun’s intense ultraviolet
                rays when the water supply dries up. As a carotenoid pigment (a plant compound that absorbs light and
                protects chlorophyll), astaxanthin gives krill, salmon, flamingos and other creatures their
                pinkish-orange hue.
              </p>
              <p>
                Astaxanthin essentially creates an antioxidant force field of protection for the algae—and scientists
                think this survival mechanism provides a clue as to how astaxanthin can help protect our cells, too.
              </p>
              <div className="beige-box float-right num1 xs-only w-100">
                <div className="box-header">
                  THE ANTIOXIDANT THAT’S UP TO 800X MORE POWERFUL THAN CoQ10 and 6,000X MORE POWERFUL THAN VITAMIN C
                </div>
                <p>
                  In a test that specifically measured its ability to neutralize a particularly unstable and destructive
                  type of free radical called singlet oxygen, astaxanthin was shown to be up to:
                </p>
                <ul>
                  <li>800x stronger than CoQ10</li>
                  <li>6,000x stronger than vitamin C</li>
                  <li>40x stronger than beta-carotene</li>
                  <li>100x stronger than vitamin E</li>
                </ul>
                <div className="cta-holder">
                  <div className="text">
                    Feel the amazing power of
                    <br />
                    astaxanthin for yourself!
                  </div>
                  <NavLink onClick={handleClick} className="green-btn">
                    get 25% off — Buy Now
                  </NavLink>
                </div>
              </div>
            </div>
            <hr />
            <h2 ref={myRefTwo}>Here’s Why Antioxidants Matter</h2>
            <p>
              Simply put, antioxidants are our most effective weapon against the free radicals that cause oxidation
              throughout the body. Free radicals are molecules with unpaired electrons that “steal” electrons from
              stable molecules, leading to a cascade of cellular damage that can accelerate the aging process, and makes
              us feel old, tired and achy.
            </p>
            <div className="floating">
              <div className="gaba-img-and-desc">
                <img
                  className="w-100"
                  src="https://images.ctfassets.net/mj9bpefl6wof/1sgAjgqboSvOa7ZU3LdoN3/d3ef5055befb93d2459f7c624e31b97e/girl_lifting.png?h=225"
                />
                <em>
                  Exercise floods your body with free radicals, which is part of why you feel sore after working out.
                </em>
              </div>
              <p>
                Free radicals are generated by things like air pollution, processed foods, refined sugar, excessive
                sunlight exposure, and ironically, life itself.
              </p>
              <p>
                You might be surprised to learn that exercise floods your body with free radicals, which is part of why
                you feel sore after working out. When you exercise, cellular respiration increases, which creates energy
                to fuel your muscles.
              </p>
              <p>
                That’s why your breathing becomes deeper and more rapid during exercise and why your heart rate
                increases—all to accommodate your cells’ increased need for oxygen. The downside of this increase in
                cellular respiration? An increase in carbon dioxide and metabolic byproducts (aka free radicals) that
                temporarily increase oxidation.
              </p>
              <p>
                Once your workout is over, your body surges with these free radicals. This is not a problem if you have
                the antioxidant resources available to deal with the oxidative stress; but if you don't, you'll
                experience muscle soreness and fatigue, and if you don't allow your body to recover fully, there is
                potential for lasting harm to your joints or other tissues.
              </p>
              <p>
                The truth is exercising without enough antioxidant firepower is like putting yourself on an aging
                acceleration program!
              </p>
              <p>
                This is where astaxanthin comes to the rescue, helping to clear out free radicals while delivering
                oxygen and energy to the cells that need it.
              </p>
            </div>
            <h2>The Clinical Results Are In: Astaxanthin Can Do Amazing Things for Your Health</h2>
            <p>
              The anecdote about how astaxanthin helps salmon swim upstream is interesting, but what does it really mean
              for you? According to these gold-standard clinical studies, it means more energy, strength and stamina,
              and less soreness. Here’s just a small sampling of the results:
            </p>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} md={6} className="smaller-container">
            <div className="large-checklist">
              <ul className="large-ul">
                <li>
                  Astaxanthin has been shown to help deliver oxygen to muscle cells during exercise while enhancing the
                  energy-producing capacity of your cells’ mitochondria, resulting in{' '}
                  <b>increased energy and stamina</b> during exercise and throughout the day.
                </li>
                <li>
                  Astaxanthin reduced levels of lactic acid (the metabolite that really causes you to “feel the burn”)
                  during exercise by 28.6%, adding up to the welcome benefit of <b>reduced post-exercise soreness.</b>
                </li>
                <li>
                  Astaxanthin helped lower levels of C-reactive protein (CRP), a marker of inflammation, by 20% in just
                  eight weeks, making it an ally for a{' '}
                  <b>normal inflammatory response, healthy joints and optimal cardiovascular wellness.</b>
                </li>
                <li>
                  Astaxanthin <b>enhanced cognitive performance</b> in older adults, helping them score notably higher
                  on two of the top tests used today. Astaxanthin is widely considered a “brain-friendly” antioxidant,
                  due to its ability to cross the blood-brain barrier.
                </li>
                <li>
                  Astaxanthin was shown to be five times more effective than the carotenoid lutein at promoting{' '}
                  <b>healthy vision.</b> It crosses the blood-retina barrier to neutralize free radicals in the eyes,
                  easing eyestrain and promoting better <b>overall eye health.</b>
                </li>
                <li>
                  Astaxanthin’s free radical fighting power helps keep skin healthy on a cellular level. Studies have
                  shown it enhances cell repair and collagen production for increased moisture and{' '}
                  <b>firmer, smoother, more youthful-looking skin.</b>
                </li>
              </ul>
            </div>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} md={8} className="smaller-container">
            <h2>What’s the Ideal Dose?</h2>
            <div className="floating">
              <div className="float-right dose-img">
                <img
                  className="w-100"
                  src="https://images.ctfassets.net/mj9bpefl6wof/4qLfXhoqxVcRNQyn2lhifh/a7d74ce741207e7cb0304bda84f664bd/perfect_dose_1.png?h=220"
                />
              </div>
              <p>
                While 4 mg was considered the ideal daily astaxanthin dose for years, recent research has revealed what
                was once a closely guarded secret among elite athletes and marathon runners, who have credited larger
                doses—of up to 12 mg—with helping them reach previously unthought-of feats of endurance and stamina.
              </p>
              <p>
                At the 12 mg daily dosage, astaxanthin has been shown to go above and beyond other antioxidants to
                deliver powerful support for a healthy inflammatory response, which has body-wide implications.
              </p>
            </div>
            <hr />
            <h2 ref={myRefThree}>12 for 12: 12 Ways 12 mg of Astaxanthin Helps You, Head-to-Toe</h2>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} md={6} className="smaller-container">
            <div className="num-list">
              <p>
                <span className="p22-list">1.</span> Neutralizes free radicals to protect cells, reduce DNA damage and{' '}
                <b>fight aging</b>
              </p>
              <p>
                <span className="p22-list">2.</span> Promotes a <b>normal inflammatory response</b> body-wide
              </p>
              <p>
                <span className="p22-list">3.</span> <b>Boosts energy</b> by protecting your cells’ energy-producing
                mitochondria
              </p>
              <p>
                <span className="p22-list">4.</span> Improves stamina, muscle endurance and <b>exercise performance</b>
              </p>
              <p>
                <span className="p22-list">5.</span> Significantly reduces muscle soreness and fatigue for{' '}
                <b>faster exercise recovery</b>
              </p>
              <p>
                <span className="p22-list">6.</span> Helps <b>reduce joint pain</b> and supports healthy, flexible
                joints
              </p>
              <p>
                <span className="p22-list">7.</span> Supports healthy circulation and overall{' '}
                <b>cardiovascular health</b>
              </p>
              <p>
                <span className="p22-list">8.</span> Helps maintain normal triglycerides and <b>cholesterol levels</b>
              </p>
              <p>
                <span className="p22-list">9.</span> <b>Improves short-term memory</b> and supports brain and nervous
                system function
              </p>
              <p>
                <span className="p22-list">10.</span> Relieves eye strain and fatigue and{' '}
                <b>supports optimal vision and eye health</b>
              </p>
              <p>
                <span className="p22-list">11.</span> Reduces dryness and the appearance of{' '}
                <b>fine lines and wrinkles</b>
              </p>
              <p>
                <span className="p22-list">12.</span> Helps support a <b>healthy immune system</b> and response
              </p>
            </div>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} md={10} className="smaller-container hidden-xs">
            <div className="big-banner hidden-xs">
              there’s a simple, convenient way to get astaxanthin’s science-backed benefits
            </div>
          </Grid>
        </Grid>
      </Container>
      <div className="big-banner xs-only">
        there’s a simple, convenient way to get astaxanthin’s science-backed benefits
      </div>
      <Container>
        <Grid container>
          <Grid item xs={12} md={8} className="smaller-container">
            <h2 className="mt-0">
              Everything Armor Makes <em>Everything</em> Better
            </h2>
            <div className="floating">
              <div className="float-right gif-cta cta-holder hidden-xs">
                <img
                  className="float-right"
                  src="https://images.ctfassets.net/mj9bpefl6wof/IQFEY5tX7fI8VG8zHzyiU/255be541df836f63f3876e5a693c0e79/20_01_14_EA_1080x1080.gif?h=305"
                />
                <NavLink onClick={handleClick} className="green-btn">
                  get 25% off — Buy Now
                </NavLink>
                <div className="text">Enjoy the amazing “now and later” benefits of astaxanthin</div>
              </div>
              <p>
                Due to astaxanthin’s recent surge in popularity, the market has been flooded with subpar supplements,
                many of which are made with synthetic astaxanthin and contain a mere fraction of the 12 mg dose shown in
                the studies to provide all the benefits listed above.
              </p>
              <p>
                With study after study demonstrating astaxanthin’s extraordinary head-to-toe benefits, it became clear
                to the Objective R&D team that astaxanthin was not just a passing health trend. So we went to work
                sourcing a pure, effective astaxanthin—and figuring out how to fit 12 mg of it into a single softgel. We
                call it <a href="/products/everything-armor">Everything Armor</a>, and we love it because it works!
              </p>
              <p>
                Featuring a research-based 12 mg dose of high-quality, concentrated astaxanthin, Everything Armor is
                here to make exercise easier—and to help your body perform at its best, whether for today’s workouts or
                tomorrow’s heart, brain and vision health.
              </p>
              <div className="xs-only">
                <div className="w-100 gif-cta cta-holder">
                  <img
                    className=""
                    src="https://images.ctfassets.net/mj9bpefl6wof/IQFEY5tX7fI8VG8zHzyiU/255be541df836f63f3876e5a693c0e79/20_01_14_EA_1080x1080.gif?w=450"
                  />
                  <NavLink onClick={handleClick} className="green-btn">
                    get 25% off — Buy Now
                  </NavLink>
                  <div className="text">Enjoy the amazing “now and later” benefits of astaxanthin</div>
                </div>
              </div>
            </div>
            <hr />
            <h2>Going to the Original Source for Exceptional Quality</h2>
            <div className="floating new-h4">
              <div className="float-right steps">
                <img
                  className="one"
                  src="https://images.ctfassets.net/mj9bpefl6wof/4wF3AyvZ8jzDAaXhzFzxXr/7aa5c46e3b5fb511c41d36d1acfd049b/step_1_astaxanthin.png?h=230"
                />
                <img
                  className="two"
                  src="https://images.ctfassets.net/mj9bpefl6wof/3Q0y1FK5quFkHq1auYXmBR/74210808c7e257335a1af00a19e91871/step_2_astaxanthin.png?h=230"
                />
                <em>
                  Top photo: algae ponds before sun exposure; bottom photo: a pond after sun exposure, when the
                  astaxanthin has been activated.
                </em>
              </div>
              <p>
                The green microalgae H. pluvialis, which produces bright red astaxanthin as a protective survival
                mechanism when its water supply dries up, is the ONLY source of true astaxanthin. And luckily, we found
                a supplier that spent years developing a sophisticated 4-step process for producing astaxanthin in
                Chile’s remote, pristine Elqui Valley.
              </p>
              <h4>AN ADVANCED 4-STEP PRODUCTION PROCESS</h4>
              <ul>
                <li>First, H. pluvialis is cultivated in carefully controlled greenhouses.</li>
                <li>
                  Then, the algae biomass moves through a series of cascaded open ponds to stimulate the production of
                  astaxanthin.
                </li>
                <li>
                  The astaxanthin-rich algae biomass is then harvested, concentrated and preserved through a special
                  drying process.
                </li>
                <li>
                  Lastly, the astaxanthin is extracted using proprietary Deep Extract® supercritical CO2 technology at
                  an organic-certified facility in Florida.
                </li>
              </ul>
              <h4>QUALITY, PURITY AND EFFECTIVENESS YOU CAN TRUST</h4>
              <p>
                The result is the super clean, super potent, amazingly effective astaxanthin that goes into every
                Everything Armor softgel. We test and validate the finished products once they are complete to ensure
                that they meet the highest quality standards. And we work exclusively with manufacturers who adhere to
                the Food and Drug Administration’s (FDA) Current Good Manufacturing Procedures (cGMP). These facilities
                are regularly inspected and certified by the FDA.
              </p>
            </div>
            <hr />
            <h2 ref={myRefFour}>Better Everything, guaranteed. Try it today—risk-free!</h2>
            <p>
              Hundreds of studies have documented the powerful, wide-ranging health benefits of astaxanthin, and now,
              you can experience them for yourself. Once <a href="/products/everything-armor">Everything Armor</a>{' '}
              builds up in your body to clinically beneficial levels, there's no mistaking that it’s working. Here's
              what you can expect:
            </p>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} md={10} className="smaller-container">
            <div className="floating">
              <ul className="ml-ul">
                <li>A big boost in your energy, stamina and muscle endurance</li>
                <li>Less soreness and fatigue for faster exercise recovery</li>
                <li>Reduced joint pain and support for healthy, flexible joints</li>
                <li>Support for healthy circulation and overall cardiovascular health</li>
                <li>Improved mood, focus, memory and overall cognitive health</li>
                <li>Support for overall eye health and relief from eye strain</li>
                <li>Vibrant, youthful-looking skin and reduced dryness and appearance of wrinkles</li>
              </ul>
            </div>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} md={8} className="smaller-container">
            <p>And the results get better and better with time!</p>
            <p>
              Everything Armor is backed by our industry-leading money-back guarantee. And for a limited time, you can
              try it risk-free with free shipping. If it doesn’t work, just let us know and we’ll refund your money. No
              need to return it&mdash;give it to a friend to try.
            </p>
            <h2 className="text-center">
              Feel the Everything Armor Difference— <br className="hidden-xs" />
              Or Get Your Money Back
            </h2>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} md={10} className="smaller-container">
            <div className="wake-up-box">
              <img
                className="hidden-xs"
                src="https://images.ctfassets.net/mj9bpefl6wof/5JxPRON6zPIiIcsG3l5DrI/7ee8b8e95b62af15c099d087ef91077d/ea_static.png?w=900"
              />
              <div className="box-right">
                <div className="title">Better Workouts, Better Health, Better Everything</div>
                <div className="subtitle">HIGH POTENCY ANTIOXIDANT</div>
                <div className="price-holder">
                  <div className="price">$35</div>
                  <div className="variant">/ 30 softgels</div>
                </div>
                <ul>
                  <li>Fights free radicals body-wide</li>
                  <li>Promotes a healthy inflammatory response</li>
                  <li>Increases energy and stamina</li>
                  <li>Eases post-exercise muscle and joint soreness</li>
                </ul>
                <NavLink onClick={handleClick} className="black-btn">
                  get 25% off — Buy Now
                </NavLink>
              </div>
              <img
                className="xs-only w-100"
                src="https://images.ctfassets.net/mj9bpefl6wof/5JxPRON6zPIiIcsG3l5DrI/7ee8b8e95b62af15c099d087ef91077d/ea_static.png?w=450"
              />
            </div>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} md={8} className="smaller-container">
            <div className="sf">Scientific References</div>
            <ul className="sr">
              <li>
                Kidd P. Astaxanthin, cell membrane nutrient with diverse clinical benefits and anti-aging potential. Alt
                Med Rev 2011;16(4):355-64.
              </li>
              <li>
                Capelli B et al. Chapter 48: Role of Astaxanthin in Sports Nutrition. Nutrition and Enhanced Sports
                Performance 2013;pp 465-71.
              </li>
              <li>
                Naguib YM. Antioxidant activities of astaxanthin and related carotenoids. J Agric Food Chem
                2000;4(4):1150-4.
              </li>
              <li>
                Nishida Y et al. Quenching activities of common hydrophilic and lipophilic antioxidants against singlet
                oxygen using chemiluminescence detection system. Carotenoid Science 2007;11:16-20
              </li>
              <li>
                Naguib Y. Antioxidant activities of astaxanthin and related carotenoids. J Agric Food Chem
                2000;48:1150-4.
              </li>
              <li>Shen H et al. FASEB J 2009;23:1958-68.</li>
              <li>
                Camera E et al. Astaxanthin, canthaxanthin and beta carotene differentially affect UVA-induced oxidative
                damage and expression of oxidative stress-response enzymes. Exp Dermatol 2009;18(3):222-31.
              </li>
              <li>
                Wolf A et al. Astaxanthin protects mitochondrial redox state and functional integrity against oxidative
                stress. J Nutr Biochem 2010;21:381-9.
              </li>
              <li>
                Nakagawa K et al. Antioxidant effect of astaxanthin on phospholipid peroxidation in human erythrocytes.
                Br J Nutr 2011;105(11):1563-71.
              </li>
              <li>
                Iwabayashi M et al. Efficacy and safety of eight-week treatment with astaxanthin in individuals screened
                for increased oxidative stress burden. Anti-Aging Med 2009;6(4):15-21.
              </li>
              <li>
                Shiratori K et al. Effect of astaxanthin on accommodation and asthenopia-efficacy identification study
                in healthy volunteers. J Clin Ther Med 2005;21(6):637-50.
              </li>
              <li>
                Nagaki Y et al. The supplementation effect of astaxanthin on accommodation and asthenopia. J Clin Ther
                Med 2006;22(1):41-54.
              </li>
              <li>
                Katagiri M et al. Effects of astaxanthin-rich Haematococcus pluvialis extract on cognitive function: a
                randomized, double-blind, placebo-controlled study. J Clin Biochem Nutr 2012;51(2):102-7.
              </li>
              <li>
                Yamashita E. The effects of a dietary supplement containing astaxanthin on skin condition. Carotenoid
                Science 2006;10:91-5.
              </li>
              <li>
                Earnest CP et al. Effects of astaxanthin on cycling time trial performance. Int J Sports Med
                2011;32(11):882-8.
              </li>
              <li>
                Malmsten C and A Lignell. Dietary supplementation with astaxanthin-rich algal meal improves strength
                endurance-a double-blind, placebo-controlled study on male students. Carotenoid Science 2008;13:20-22.
              </li>
              <li>
                Park JS et al. Astaxanthin decreased oxidative stress and enhanced immune response in humans. Nutr Metab
                (Lond) 2010;7:18
              </li>
            </ul>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default withRouter(EverythingArmorAntioxidants);