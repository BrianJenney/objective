module.exports.sampleContentful = {
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
      type: 'title',
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
      type: 'subtitle',
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
      type: 'oneColumn',
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
          },
          {
            type: 'box',
            border: 'yes',
            desktopStyle: {
              backgroundColor: '#fcf8f4',
              borderColor: '#000000',
              display: 'block',
              float: 'right',
              width: '285px'
            },
            mobileStyle: {
              width: '100%'
            },
            value: {
              components: [
                {
                  type: 'boxTitle',
                  value: 'BENEFITS TO DEEP, RESTORATIVE SLEEP',
                  desktopStyle: {
                    fontColor: '#1f396d',
                    fontWeight: 900,
                    fontSize: '18px',
                    lineHeight: 1.28,
                    fontFamily: 'p22-underground',
                    textTransform: 'uppercase'
                  },
                  mobileStyle: {
                    fontColor: '#1f396d',
                    fontWeight: 900,
                    fontSize: '18px',
                    lineHeight: 1.28,
                    fontFamily: 'p22-underground',
                    textTransform: 'uppercase'
                  }
                },
                {
                  type: 'list',
                  value: [
                    'More energy during the day',
                    'Enhanced mental clarity',
                    'Increased productivity',
                    'Brighter moods'
                  ],
                  bulletSymbol: 'blueCheckmark',
                  desktopStyle: {
                    fontColor: '#333',
                    fontWeight: 400,
                    fontSize: '18px',
                    lineHeight: 1.28,
                    fontFamily: 'FreightTextProBook'
                  },
                  mobileStyle: {
                    fontColor: '#333',
                    fontWeight: 400,
                    fontSize: '18px',
                    lineHeight: 1.28,
                    fontFamily: 'FreightTextProBook'
                  }
                }
              ]
            }
          }
        ]
      }
    },
    {
      type: 'oneColumn',
      value: {
        components: [
          {
            type: 'title',
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
          }
        ]
      }
    }
  ]
};
