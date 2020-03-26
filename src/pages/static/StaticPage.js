import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { requestPage } from '../../modules/static/actions';
import { buildPage } from '../../utils/sputils';

import Box from '@material-ui/core/Box';

const StaticPage = ({ match }) => {
  const { slug } = match.params;
  const dispatch = useDispatch();
  const [pageLoaded, setPageLoaded] = useState(false);
  //const page = useSelector(state => state.page);
  const page = {
    template: 'Template-1',
    slug: 'landing-page-this',
    components: [
      {
        type: 'navigation',
        value: [
          { label: 'GABA: THE CALMING NEUROTRANSMITTER', scroll: 'id001' },
          { label: 'SAFFRON: THE SPICE WITH A 100% SUCCESS RATE', scroll: 'id002' },
          { label: '7 SIGNS YOU’RE NOT SLEEPING WELL', scroll: 'id003' },
          { label: 'BETTER SLEEP—GUARANTEED TRY IT RISK-FREE', scroll: 'id004' }
        ],
        desktopStyle: {
          fontColor: '#FFF',
          fontWeight: 900,
          fontSize: '16px',
          lineHeight: 1.28,
          fontFamily: 'p22-underground',
          textTransform: 'uppercase',
          width: '20%'
        },
        mobileStyle: {
          fontColor: '#1f396d',
          fontWeight: 900,
          fontSize: '12px',
          lineHeight: 1.28,
          fontFamily: 'p22-underground',
          textTransform: 'uppercase'
        }
      },
      {
        type: 'pageTitle',
        value: 'Fall asleep faster. Stay asleep longer. Wake up feeling amazing.',
        desktopStyle: {
          fontColor: '#000000',
          fontWeight: 400,
          fontSize: '52px',
          lineHeight: 1.23,
          fontFamily: 'Canela Text Web'
        },
        mobileStyle: {
          fontColor: '#000000',
          fontWeight: 400,
          fontSize: '36px',
          lineHeight: 1.23,
          fontFamily: 'Canela Text Web'
        }
      },
      {
        type: 'pageSubTitle',
        value: 'Get the sweetest sleep of your life—with the new non-melatonin sleep solution',
        desktopStyle: {
          fontColor: '#1f396d',
          fontWeight: 900,
          fontSize: '24px',
          lineHeight: 1.5,
          fontFamily: 'p22-underground',
          textTransform: 'uppercase'
        },
        mobileStyle: {
          fontColor: '#1f396d',
          fontWeight: 900,
          fontSize: '18px',
          lineHeight: 1.5,
          fontFamily: 'p22-underground',
          textTransform: 'uppercase'
        }
      },
      {
        type: 'hero',
        desktopImg:
          'https://images.ctfassets.net/mj9bpefl6wof/51FdlvcsHxRRpuQBsIRzzr/1339a2ade8cf32cba9f9857577e88cff/Hero_-_desktop.png',
        mobileImg:
          'https://images.ctfassets.net/mj9bpefl6wof/3B4lfG6Aus493ToyiTGd3N/ef8cdfbd7abe160beaa0caf06374961a/hero_-_mobile.png?w=450',
        desktopStyle: {
          display: 'block',
          width: '100%'
        },
        mobileStyle: {
          display: 'block',
          width: '100%'
        }
      },
      {
        type: 'oneColumnBox',
        value: {
          components: [
            {
              type: 'paragraph',
              value: [
                'There’s no way around it: You need to sleep—and you need to sleep well—to feel well, perform at your best during the day and, yes, even look good doing it.*',
                'But if you’re among the estimated 50-70 million Americans who struggle with occasional sleeplessness, know that sleeping well is easier said than done.1',
                'Whether your mind starts racing as soon as your head hits the pillow… or you find yourself wide awake in the middle of the night worrying about your to-do list, tossing and turning when you “should” be sleeping… or you wake up feeling exhausted yet again after spending all night in bed “trying to sleep,” not sleeping is NOT OK.*'
              ],
              desktopStyle: {
                fontColor: '#000000',
                fontWeight: 400,
                fontSize: '20px',
                lineHeight: 1.5,
                fontFamily: 'FreightTextProBook'
              },
              mobileStyle: {
                fontSize: '18px'
              }
            }
          ]
        }
      },
      {
        type: 'oneColumnBox',
        value: {
          components: [
            {
              type: 'sectionTitle',
              value: 'Sleep Quality Really Matters',
              desktopStyle: {
                fontColor: '#1f396d',
                fontWeight: 400,
                fontSize: '28px !important',
                fontFamily: 'Canela Text Web',
                textTransform: 'capitalize'
              },
              mobileStyle: {
                fontColor: '#1f396d',
                fontWeight: 400,
                fontSize: '28px !important',
                fontFamily: 'Canela Text Web',
                textTransform: 'capitalize'
              }
            },
            {
              type: 'image',
              desktopImg:
                'https://images.ctfassets.net/mj9bpefl6wof/69BsY8f5sLsHSu8LFlkZYW/0b6946c8ce19d2582d69f28e878ce675/sleep_quality.png?w=285',
              mobileImg:
                'https://images.ctfassets.net/mj9bpefl6wof/69BsY8f5sLsHSu8LFlkZYW/0b6946c8ce19d2582d69f28e878ce675/sleep_quality.png?w=285',
              desktopStyle: {
                float: 'right'
              },
              mobileStyle: {
                float: 'right',
                width: '50%'
              }
            },
            {
              type: 'paragraph',
              value: [
                'If you’re like most of us, balancing busy work schedules with kids’ schedules, maintaining a household and doing your best to exercise and take care of your body, chances are you don’t have more time to allocate for sleep. (When was the last time you took a nap?) So getting as much high-quality sleep as possible during the hours you have for sleep is critical to feeling your best during the day.*',
                'That means when bedtime rolls around, you need to be able to wind down and fall asleep fast—and stay sleeping soundly through the night—so that when you get up in the morning, you feel fully recharged and ready for whatever your day holds.*',
                'So what’s keeping you from getting this kind of sleep?',
                'STRESS.*'
              ],
              desktopStyle: {
                fontColor: '#000000',
                fontWeight: 400,
                fontSize: '20px',
                lineHeight: 1.5,
                fontFamily: 'FreightTextProBook'
              },
              mobileStyle: {
                fontSize: '18px'
              }
            }
          ]
        }
      },
      {
        type: 'oneColumnBox',
        value: {
          components: [
            {
              type: 'sectionTitle',
              value: 'The Clinical Results Are Solid (Gold)',
              desktopStyle: {
                fontColor: '#1f396d',
                fontWeight: 400,
                fontSize: '28px !important',
                fontFamily: 'Canela Text Web',
                textTransform: 'capitalize'
              },
              mobileStyle: {
                fontColor: '#1f396d',
                fontWeight: 400,
                fontSize: '28px !important',
                fontFamily: 'Canela Text Web',
                textTransform: 'capitalize'
              }
            },
            {
              type: 'paragraph',
              value: [
                'With issues around sleep, stress, anxiousness and mood affecting more and more of us these days, researchers are excited about saffron’s potential to help. Multiple clinical trials have demonstrated saffron’s mood-enhancing effects, but two are particularly notable.14,15*',
                'Both studies investigated the effects of a 30 mg/day dose of saffron extract on mood. By the end of the six- and eight-week study periods, the study participants taking saffron experienced dramatic, statistically significant improvements in overall mood balance.14,15*'
              ],
              desktopStyle: {
                fontColor: '#000000',
                fontWeight: 400,
                fontSize: '20px',
                lineHeight: 1.5,
                fontFamily: 'FreightTextProBook'
              },
              mobileStyle: {
                fontSize: '18px'
              }
            }
          ]
        }
      },
      {
        type: 'oneColumnBox',
        value: {
          components: [
            {
              type: 'sectionTitle',
              value: 'Stress Is The #1 Enemy Of Good Sleep',
              desktopStyle: {
                fontColor: '#1f396d',
                fontWeight: 400,
                fontSize: '28px !important',
                fontFamily: 'Canela Text Web',
                textTransform: 'capitalize'
              },
              mobileStyle: {
                fontColor: '#1f396d',
                fontWeight: 400,
                fontSize: '28px !important',
                fontFamily: 'Canela Text Web',
                textTransform: 'capitalize'
              }
            },
            {
              type: 'image',
              desktopImg:
                'https://images.ctfassets.net/mj9bpefl6wof/6RPrVLqZzKHgJeyNbDMnl2/6c30c6081cafe7ee2f90a20b1307775a/fast_asleep.png?h=300',
              mobileImg:
                'https://images.ctfassets.net/mj9bpefl6wof/6RPrVLqZzKHgJeyNbDMnl2/6c30c6081cafe7ee2f90a20b1307775a/fast_asleep.png?h=300',
              desktopStyle: {
                float: 'left'
              },
              mobileStyle: {
                float: 'left',
                width: '50%'
              }
            },
            {
              type: 'paragraph',
              value: [
                'Life today is stressful. The stress makes it hard to sleep, and the lack of sleep makes it hard to stay positive and on top of all the things we have to juggle each day, which, in turn, leads to—you guessed it—more stress.*',
                'It’s a vicious cycle most of us know all too well.',
                'Stress causes a state of hyperarousal that keeps your brain and body “on alert,” which can make it difficult to “power down” your brain at night when it’s time to relax and fall asleep. It can also make it hard to stay asleep or fall back to sleep after waking up in the middle of the night.*',
                'To make matters worse, our schedules are often at odds with the natural rhythms of day and night and light and dark that our bodies were originally designed for. Artificial light and caffeine often have us working, playing, thinking and scrolling around the clock, which layers on even more physical stress.*',
                'STRESS.*'
              ],
              desktopStyle: {
                fontColor: '#000000',
                fontWeight: 400,
                fontSize: '20px',
                lineHeight: 1.5,
                fontFamily: 'FreightTextProBook'
              },
              mobileStyle: {
                fontSize: '18px'
              }
            }
          ]
        }
      },
      {
        type: 'oneColumnBox',
        value: {
          components: [
            {
              type: 'sectionTitle',
              value: 'Button section title ',
              desktopStyle: {
                fontColor: '#1f396d',
                fontWeight: 400,
                fontSize: '28px !important',
                fontFamily: 'Canela Text Web',
                textTransform: 'capitalize'
              },
              mobileStyle: {
                fontColor: '#1f396d',
                fontWeight: 400,
                fontSize: '28px !important',
                fontFamily: 'Canela Text Web',
                textTransform: 'capitalize'
              }
            },
            {
              type: 'paragraph',
              value: [
                'Life today is stressful. The stress makes it hard to sleep, and the lack of sleep makes it hard to stay positive and on top of all the things we have to juggle each day, which, in turn, leads to—you guessed it—more stress.*'
              ],
              desktopStyle: {
                fontColor: '#000000',
                fontWeight: 400,
                fontSize: '20px',
                lineHeight: 1.5,
                fontFamily: 'FreightTextProBook'
              },
              mobileStyle: {
                fontSize: '18px'
              }
            },
            {
              type: 'button',
              value: 'Get 15% off - Buy now',
              skuAndQty: ['TMNO-1BOT-CAPS;2'],
              coupon: 'SLUMBER15',
              URL: '/checkout',
              desktopStyle: {
                backgroundColor: '#1f396d',
                display: 'block',
                float: 'left',
                fontColor: '#fff',
                fontWeight: '900',
                fontSize: '16px',
                lineHeight: '1.88',
                fontFamily: 'p22-underground',
                textTransform: 'uppercase',
                width: '385px',
                height: '60px'
              },
              mobileStyle: {
                display: 'block',
                width: '100%'
              }
            }
          ]
        }
      }
    ]
  };
  console.log('this page ', page);
  useEffect(() => {
    dispatch(requestPage(slug));
  }, []);

  useEffect(() => {
    // check this when we have real content from content ms
    if (page.hasOwnProperty('total') && page.total > 0) {
      // check for components here.
      setPageLoaded(true);
    }
  }, [page]);

  if (page) {
    return buildPage(page);
  } else {
    return null;
  }
};

export default withRouter(StaticPage);
