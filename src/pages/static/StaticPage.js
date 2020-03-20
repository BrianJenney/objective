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
          { label: '7 SIGNS YOURE NOT SLEEPING WELL', scroll: 'id003' },
          { label: 'BETTER SLEEP—GUARANTEED TRY IT RISK-FREE', scroll: 'id004' }
        ],
        desktopStyle: {},
        mobileStyle: {}
      },
      {
        type: 'title',
        value: 'Fall asleep faster. Stay asleep longer. Wake up feeling amazing.',
        desktopStyle: {
          fontSize: '18px',
          fontColor: 'black'
        },
        mobileStyle: {}
      },
      {
        type: 'subtitle',
        value: 'this subtitle is awesome',
        desktopStyle: {
          fontSize: '14px',
          fontColor: 'blue'
        },
        mobileStyle: {}
      },
      {
        type: 'hero',
        desktopImg:
          'https://images.ctfassets.net/mj9bpefl6wof/51FdlvcsHxRRpuQBsIRzzr/1339a2ade8cf32cba9f9857577e88cff/Hero_-_desktop.png',
        mobileImg:
          'https://images.ctfassets.net/mj9bpefl6wof/3B4lfG6Aus493ToyiTGd3N/ef8cdfbd7abe160beaa0caf06374961a/hero_-_mobile.png?w=450',
        desktopStyle: {},
        mobileStyle: {}
      },
      {
        type: 'oneColumn',
        desktopStyle: {},
        mobileStyle: {},
        value: {
          components: [
            {
              type: 'title',
              value: 'Fall asleep faster. Stay asleep longer. Wake up feeling amazing.',
              desktopStyle: {},
              mobileStyle: {}
            },
            {
              type: 'paragragh',
              value: [
                'Theres no way around it: You need to sleep—and you need to sleep well—to feel well, perform at your best during the day and, yes, even look good doing it.* ',
                'But if youre among the estimated 50 - 70 million Americans who struggle with occasional sleeplessness, know that sleeping well is easier said than done',
                'Whether your mind starts racing as soon as your head hits the pillow… or you find yourself wide awake in the middle of the night worrying about your to-do list, tossing and turning when you "should" be sleeping… or you wake up feeling exhausted yet again after spending all night in bed "trying to sleep," not sleeping is NOT OK.*'
              ],
              desktopStyle: {},
              mobileStyle: {}
            },
            {
              type: 'image',
              desktopImg: '',
              mobileImg: '',
              desktopStyle: {},
              mobileStyle: {}
            }
            // {
            //   type: 'button',
            //   value: 'Get 15% off - Buy now',
            //   skuAndQty: ['TMNO-1BOT-CAP;2', 'TGSS-1BOT-CHO;1'],
            //   coupon: 'SLUMBER15',
            //   URL: '/checkout',
            //   desktopStyle: {},
            //   mobileStyle: {}
            // }
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

  const RenderPage = ({ components }) => components.map((component, i) => <div key={i}>{component}</div>);

  if (page) {
    return <RenderPage components={buildPage(page)} />;
  } else {
    return null;
  }
};

export default withRouter(StaticPage);
