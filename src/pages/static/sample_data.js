module.exports.sampleContentful = {
  template: 'Template-1',
  slug: 'landing-page-this',
  components: [
    {
      type: 'navlink',
      value: [
        { value: 'GABA: THE CALMING NEUROTRANSMITTER', link: 'id001' },
        { value: 'SAFFRON: THE SPICE WITH A 100% SUCCESS RATE', link: 'id002' },
        { value: '7 SIGNS YOU’RE NOT SLEEPING WELL', link: 'id003' },
        { value: 'BETTER SLEEP—GUARANTEED TRY IT RISK-FREE', link: 'id004' }
      ],
      style: {
        desktop: {
          fontColor: '#FFF',
          fontWeight: 900,
          fontSize: '16px',
          lineHeight: 1.28,
          fontFamily: 'p22-underground',
          textTransform: 'uppercase',
          width: '20%'
        },
        mobile: {
          fontColor: '#1f396d',
          fontWeight: 900,
          fontSize: '12px',
          lineHeight: 1.28,
          fontFamily: 'p22-underground',
          textTransform: 'uppercase'
        }
      }
    },
    {
      type: 'title',
      value: 'Fall asleep faster. Stay asleep longer. Wake up feeling amazing.',
      style: {
        desktop: {
          fontColor: '#000000',
          fontWeight: 400,
          fontSize: '52px',
          lineHeight: 1.23,
          fontFamily: 'Canela Text Web'
        },
        mobile: {
          fontColor: '#000000',
          fontWeight: 400,
          fontSize: '36px',
          lineHeight: 1.23,
          fontFamily: 'Canela Text Web'
        }
      }
    },
    {
      type: 'subtitle',
      value: 'Get the sweetest sleep of your life—with the new non-melatonin sleep solution',
      style: {
        desktop: {
          fontColor: '#1f396d',
          fontWeight: 900,
          fontSize: '24px',
          lineHeight: 1.5,
          fontFamily: 'p22-underground',
          textTransform: 'uppercase'
        },
        mobile: {
          fontColor: '#1f396d',
          fontWeight: 900,
          fontSize: '18px',
          lineHeight: 1.5,
          fontFamily: 'p22-underground',
          textTransform: 'uppercase'
        }
      }
    },
    {
      type: 'heroDesktop',
      value:
        'https://images.ctfassets.net/mj9bpefl6wof/51FdlvcsHxRRpuQBsIRzzr/1339a2ade8cf32cba9f9857577e88cff/Hero_-_desktop.png',
      style: {
        display: 'block',
        width: '100%'
      }
    },
    {
      type: 'heroMobile',
      value:
        'https://images.ctfassets.net/mj9bpefl6wof/3B4lfG6Aus493ToyiTGd3N/ef8cdfbd7abe160beaa0caf06374961a/hero_-_mobile.png?w=450',
      style: {
        display: 'block',
        width: '100%'
      }
    }
  ]
};
