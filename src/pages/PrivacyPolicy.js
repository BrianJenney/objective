import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import ScrollToTop from '../components/common/ScrollToTop';
import {
  StyledBackground,
  StyledTitle,
  StyledContainer,
  ParagraphContainer,
  StyledParagraph,
  StyledSubheaders,
  StyledParagraphHeader,
  StyledLink
} from './privacyPolicyAndTerms/StyledComponents';
import './privacyPolicyAndTerms/style.scss';

const PrivacyPolicy = () => {
  return (
    <ScrollToTop> 
    <StyledBackground>
      <StyledContainer className="privacypolicy-container">
        <Box>
          <Grid>
            <Box style={{paddingBottom: 35}}>
              <StyledParagraph>Objective is a part of the The Clorox Company’s family of brands supporting the overall corporate mission to make everyday life better, every day. Please read the Privacy Policy below for further details.</StyledParagraph>  
            </Box>  
            <Box textAlign="center">
              <StyledTitle>Privacy Policy Statement</StyledTitle>
            </Box>
          </Grid>
          <Grid>
            <Box>
              <StyledParagraph>Last revised: August 28, 2018</StyledParagraph>
              <StyledParagraph>
                Clorox and its{' '}
                <StyledLink href="https://www.thecloroxcompany.com/brands/">
                  family of companies
                </StyledLink>{' '}
                (collectively, “we,” “us,” “our”) provide this Privacy Policy
                Statement (“Privacy Statement”) to inform you of our practices
                regarding the collection, use and disclosure of information that
                you provide to us or that we collect from you through our
                websites, our social media pages that we control, and other
                online or mobile services, applications or advertisements that
                link to this Privacy Statement (collectively hereinafter, our
                “Properties”).
              </StyledParagraph>
              <StyledParagraph style={{ padding: '50px 0px 25px 0px' }}>
                Before using our Properties or providing information to us,
                please carefully review this Privacy Statement. By using one of
                our Properties, including registering for an account or
                accessing one of our Properties, you agree that we may collect,
                process and use your information in accordance with this Privacy
                Statement, as revised from time to time.
              </StyledParagraph>
            </Box>
          </Grid>
          <Grid>
            <ParagraphContainer style={{ paddingTop: '0px' }}>
              <StyledSubheaders>
                What’s Contained in this Privacy Statement
              </StyledSubheaders>
              <Box>
                <ul>
                  <StyledParagraph>
                    <li><StyledLink href="#highlights">Highlights of Our Practices</StyledLink></li>
                    <li><StyledLink href="#info">What Information We Collect</StyledLink></li>
                  <ul>
                    <li><StyledLink href="#info-personal">Personal Information</StyledLink></li>
                    <li><StyledLink href="#info-device">Device Information</StyledLink></li>
                    <li><StyledLink href="#info-aggregate">Aggregate and Statistical Information</StyledLink></li>
                  </ul>
                    <li><StyledLink href="#how">How We Use the Information We Collect</StyledLink></li>
                    <li><StyledLink href="#sharing">Information Sharing and Disclosure</StyledLink></li>
                  <ul>
                    <li><StyledLink href="#california-privacy">Your California Privacy Rights</StyledLink></li>
                  </ul>
                    <li><StyledLink href="#interest">Interest Based Advertising</StyledLink></li>
                    <li><StyledLink href="#retention">Retention and Storage of Personal Information</StyledLink></li>
                    <li><StyledLink href="#access">Accessing and Updating Your Personal Information</StyledLink></li>
                    <li><StyledLink href="#optout">Opting Out of Communications</StyledLink></li>
                    <li><StyledLink href="#security">Security</StyledLink></li>
                    <li><StyledLink href="#coverage">Websites Not Covered by this Statement</StyledLink></li>
                    <li><StyledLink href="#age">Children Under the Age of 13</StyledLink></li>
                    <li><StyledLink href="#border">Cross-Border Data Transfers</StyledLink></li>
                    <li><StyledLink href="#contact">Contacting Us</StyledLink></li>
                    <li><StyledLink href="#changes">Changes to this Privacy Statement</StyledLink></li>
                  </StyledParagraph>
                </ul>
              </Box>
            </ParagraphContainer>
          </Grid>
          <Grid>
            <ParagraphContainer>
              <StyledSubheaders id="highlights">Highlights of Our Practices</StyledSubheaders>
              <StyledParagraph style={{ paddingBottom: '25px' }}>
                This section is intended to provide you with a basic overview of
                the privacy practices described in this Privacy Statement. For
                complete details on our practices, please read this entire
                Privacy Statement.
              </StyledParagraph>
              <Box style={{ paddingTop: '10px' }}>
                <StyledParagraphHeader>
                  Information We Collect:
                </StyledParagraphHeader>
                <StyledParagraph>
                  We collect information about you from a variety of sources,
                  including:
                </StyledParagraph>
                <ul>
                  <StyledParagraph>
                    <li>
                      Information you provide to us directly, such as when you
                      fill out a registration or contact form;
                    </li>
                    <li>
                      Information automatically collected when you visit or use
                      our Properties, such as information on how you were
                      referred to our site and what you do on our site; and
                    </li>
                    <li>
                      Information from third parties, such as our vendors,
                      advertising networks and business partners as well as
                      social networks in which you participate.
                    </li>
                  </StyledParagraph>
                </ul>
                <StyledLink href="#info">
                  Read more about what information we collect
                </StyledLink>
              </Box>
              <Box style={{ paddingTop: '25px' }}>
                <StyledParagraphHeader>
                  How We Use Your Information:
                </StyledParagraphHeader>
                <StyledParagraph>
                  We use the information we collect to fulfill your requests,
                  conduct transactions with you, communicate with you about our
                  products and other matters, manage our Properties, and conduct
                  research and analysis.
                </StyledParagraph>
                <ul>
                  <StyledParagraph>
                    <li>
                      We and other parties may display behaviorally targeted
                      advertising to you across the Internet based on your use
                      of our Properties.
                    </li>
                    <li>
                      We do not sell or rent your personal information to third
                      party marketers.
                    </li>
                    <li>
                      We may combine all the information we collect about you.
                    </li>
                  </StyledParagraph>
                </ul>
                <StyledLink href="#how">
                  Read more about how we use your information
                </StyledLink>
              </Box>
              <Box style={{ paddingTop: '25px' }}>
                <StyledParagraphHeader>
                  How We Share Your Information:
                </StyledParagraphHeader>
                <StyledParagraph>
                  We may share your information:
                </StyledParagraph>
                <ul>
                  <StyledParagraph>
                    <li>
                      With our third party service providers that assist or
                      support our business operations, such as fulfillment,
                      research, marketing and technology;
                    </li>
                    <li>
                      With our affiliates, retailers and third party business
                      partners for research, analysis and other purposes, but
                      not for their direct marketing purposes;
                    </li>
                    <li>
                      With other parties in a form that does not identify you;
                    </li>
                    <li>
                      If all or part of our business is sold to another company;
                    </li>
                    <li>
                      To protect and defend our or other parties’ rights, safety
                      and property; and
                    </li>
                    <li>When required by law and/or government authorities.</li>
                  </StyledParagraph>
                </ul>
                <StyledLink href="#sharing">
                  Read more about how we share your information
                </StyledLink>
              </Box>
              <Box style={{ paddingTop: '25px' }}>
                <StyledParagraphHeader>Your Choices:</StyledParagraphHeader>
                <ul>
                  <StyledParagraph>
                    <li>
                      If you have opted in to receive communications from us, we
                      may send you emails, text messages or other communications
                      containing newsletters, special offers and other
                      information.
                    </li>
                    <li>
                      You can stop receiving promotional messages by following
                      the instructions contained in such communication, or if
                      applicable, by logging into the communication preference
                      center on the website associated with your account.
                    </li>
                    <li>
                      We may participate in interest-based advertising
                      initiatives that result in advertisements targeted to you
                      based on your online behavior. You can learn more about
                      what interest-based advertising is running on our
                      Properties and how to opt-out by clicking the AdChoices
                      link at the bottom of our web pages or by visiting the
                      opt-out pages of the{' '}
                      <StyledLink href="http://optout.aboutads.info/?c=2&lang=EN">
                        Digital Advertising Alliance
                      </StyledLink>{' '}
                      and{' '}
                      <StyledLink hred="http://optout.networkadvertising.org/?c=1">
                        Network Advertising Initiative
                      </StyledLink>{' '}
                      directly.
                    </li>
                  </StyledParagraph>
                </ul>
                <StyledLink href="#access">
                  Read more about updating your information and opting out of
                  communications
                </StyledLink>
              </Box>
            </ParagraphContainer>
          </Grid>
          <Grid>
            <ParagraphContainer>
              <StyledSubheaders id="info">What Information We Collect</StyledSubheaders>
              <StyledParagraph>
                We may collect several types of information about you,
                including:
              </StyledParagraph>
              <Box style={{ paddingTop: '25px' }}>
                <StyledParagraphHeader id="info-personal">
                  Personal information:
                </StyledParagraphHeader>
                <ul>
                  <StyledParagraph>
                    <li>
                      We may collect personal information through your use of
                      the Properties, such as when you register for our
                      Properties, subscribe to receive our communications,
                      update your account information, enter contests or
                      sweepstakes, respond to surveys, rate or review products,
                      make purchases, contact us with questions or comments,
                      apply for a job, connect with us through social networks,
                      submit user generated content or participate in our online
                      forums, promotions and social media platforms. In
                      addition, if you elect to connect your social media
                      account to your website account, certain personal
                      information from your social media account will be shared
                      with us, which may include personal information that is
                      part of your profile or your friends’ profiles
                    </li>
                    <li>
                      This personal information can include data attributes like
                      your full name, username, password, email address,
                      telephone number, physical or billing mail addresses, date
                      of birth and other information you may provide to us, as
                      well as credit card numbers or, in some limited cases,
                      national ID numbers, like your social security number, for
                      tax reporting purposes related to some high-value
                      promotional prize awards. It may also include other
                      personally identifiable information we have collected from
                      you, such as your attitudes and opinions about and usage
                      of our products, demographics, interests, household,
                      health or lifestyle information, job description,
                      satisfaction with our website and newsletters, your
                      purchasing behavior or history and your browsing,
                      downloading and other internet activity. Additionally, it
                      may include a resume or curriculum vitae or other
                      information you submitted in connection with a job
                      application or inquiry. If you have contacted us on behalf
                      of a business or other entity, we may also collect your
                      work contact information and details about your business
                      or entity that you provide.
                    </li>
                    <li>
                      We also collect information that is publicly available or
                      provided by third parties. For example, we collect certain
                      information that is posted on social media sites, blogs
                      and other websites. We may also purchase or obtain e-mail
                      lists, customer leads and other data sources from third
                      parties for our advertising and marketing purposes.
                    </li>
                    <li>
                      In some instances, we may combine your personal
                      information with other information about you, such as
                      combining your name with your geographic location or your
                      browsing or purchasing history. We also may combine
                      personal information with information we receive about you
                      from outside sources. For example, we may obtain
                      commercially available demographic or profile information
                      about you from third parties, receive device information
                      from mobile applications or advertisements or match your
                      profile with information about you provided by retailers
                      or data brokers.
                    </li>
                    <li>
                      If you disclose any personal information relating to other
                      people to us or to our service providers in connection
                      with our Properties, you represent that you have the
                      authority to do so and to permit us to use the information
                      in accordance with this Privacy Statement.
                    </li>
                  </StyledParagraph>
                </ul>
              </Box>
              <Box style={{ paddingTop: '25px' }}>
                <StyledParagraphHeader id="info-device">
                  Device information we collect through our Properties:
                </StyledParagraphHeader>
                <ul>
                  <StyledParagraph>
                    <li>
                      Server log files: An Internet Protocol (IP) address is a
                      number that is automatically assigned to the computer that
                      you are using by your Internet Service Provider and is
                      identified and logged automatically in our server log
                      files whenever you visit one of our Properties, along with
                      the time of the visit, the page(s) that were visited and
                      other information related to your visit. We use IP
                      addresses for purposes such as routing visitors to the
                      appropriate website for the visitor’s country, calculating
                      usage levels, helping diagnose server problems, and
                      administering our Properties. If you accessed one of our
                      Properties using a mobile device like a smartphone, we may
                      also collect your phone’s unique device ID and other
                      similar mobile device data.
                    </li>
                    <li>
                      Your use of mobile apps: When you download and use our
                      mobile apps on or through computers and mobile devices, we
                      and our service providers may track and collect
                      application usage data, such as the date and time the
                      application on your device accesses our servers and what
                      information and files have been downloaded to the
                      application based on your device number.
                    </li>
                    <li>
                      Cookies and similar technologies: A “Cookie” is a small
                        text file containing a random and unique alphanumeric
                        identifier that our Properties may transfer to your
                        computer’s hard drive through your web browser that
                        enables our systems to recognize your browser. We employ
                        technologies like Cookies, web beacons, clear GIF, pixel
                        or Internet tag technologies to uniquely identify your
                        account, or the IP address associated with your Internet
                        device. We also permit third parties to gather information
                        on our websites, including for advertising purposes,
                      through these technologies, as described <StyledLink href="#interest">below</StyledLink>. Cookies
                      and the other technologies mentioned above provide
                      information related to the ways consumers interact with
                      our advertising or our Properties, like browser type,
                      browsing behaviors, user web requests, pages and content
                      viewed, the number of new visits or log-ins, search engine
                      referral, affiliate referrals, traffic driven by banner
                      ads or other promotions, which items are placed in
                      shopping carts and which are abandoned, conversions and
                      what purchases were made and zip codes. These technologies
                      can contain or store personal and other information (such
                      as if you have previously registered on our Properties or
                      consented to the retention of certain personal
                      information) and allow web browser servers to recognize
                      return visits to our Properties and improve web browsing
                      navigation or the quality and delivery of certain features
                      or customized content through our Properties. Some Cookies
                      (known as “persistent cookies”) will remain on your
                      computer or Internet device until you delete them, while
                      others (known as “session cookies”) are automatically
                      erased when you exit your Internet browser. You can set
                      your computer or Internet device to accept or reject most
                      Cookies, or to notify you in most situations that a Cookie
                      is offered so that you can decide whether to accept it.
                      However, if you block Cookies, certain features on our
                      Sites may not function. Additionally, even if you block or
                      delete Cookies, not all tracking will necessarily stop.
                    </li>
                    <li>
                      Flash LSOs: We and our third-party service providers may
                      use Flash Local Storage Objects (“Flash LSOs”) in certain
                      situations, including to recognize you and remember your
                      preferences or other details about your visit. Flash LSOs
                      are different from browser Cookies because of the amount
                      and type of data stored. In addition, you generally cannot
                      control, delete or disable the acceptance of Flash LSOs
                      from your browser. For more information on Flash LSOs, and
                      to learn how to control them, click on the support page
                      for your Flash player and choose Global Storage Settings
                      Panel and follow the instructions. To see the Flash LSOs
                      on your computer now, go to your Flash player’s Website
                      Storage Settings Panel and follow the instructions to
                      review and, if you choose, to delete any specific Flash
                      LSO.
                    </li>
                    <li>
                      Third-party applications and APIs: We also offer and
                      deliver services, content or interactive features through
                      and/or using third party application programming
                      interfaces (API), gadgets, extensions that are hosted on
                      our Properties or through other third party websites, or
                      social networking platforms. When you participate in these
                      services, products, applications, or otherwise connect
                      with, or “accept” or “allow” third party applications,
                      networks, platforms or services through our Properties
                      and/or one of our services or products, you are
                      authorizing those third parties to receive your
                      information and additionally to potentially share any or
                      all of your information with us, based on your privacy or
                      other settings on the particular third party network or
                      platform. Any personal or other information we receive by
                      these means will be treated and/or processed according to
                      this Privacy Statement.
                    </li>
                    <li>
                      Location data: Some of our Properties may allow you to
                      submit information about your general location, such as
                      your zip code or address, in order to locate stores that
                      sell our products or provide other location-related
                      services. With your consent, some of our Properties also
                      may capture and record certain precise geo-location or
                      global positioning data from your device in order to
                      provide location-related functionality. We may link such
                      location data to other information that you provide to us
                      or that may be accessed in connection with your use of our
                      Properties. If we combine any location information with
                      personal information, we will treat the combined
                      information as personal information as long as it is
                      combined.
                    </li>
                  </StyledParagraph>
                </ul>
                <StyledParagraphHeader id="info-aggregate">
                  Analytical and statistical information we collect through our
                  Properties:
                </StyledParagraphHeader>
                <ul>
                  <StyledParagraph>
                    <li>
                      De-identified information: We may conduct surveys and
                      otherwise collect information that does not uniquely
                      identify any individual. This might include demographic
                      information like age and income range, gender, education,
                      household size and marital status, as well as information
                      from which identifying particulars have been removed. We
                      also may aggregate personal information in a manner that
                      no longer reveals your identity. If this information does
                      not personally identify you, we may collect, use and
                      disclose such information for any purpose, such as
                      research to improve our products or advertising.
                    </li>
                    <li>
                      Website analytics: We may work with third-party service
                      providers who use the technologies described in this
                      Privacy Statement <StyledLink href="#info-device">above</StyledLink> to
                              conduct website analytics to help us track and understand
                              how visitors use our Properties. For example, we use
                              Google Analytics, which uses cookies and similar
                              technologies to collect and analyze information about use
                              of the Properties and report on activities and trends.
                              This service may also collect information regarding the
                              use of other websites, apps and online resources. You can
                              learn about Google’s practices by going to{' '}
                      <StyledLink href="https://policies.google.com/technologies/partner-sites">www.google.com/policies/privacy/partners/</StyledLink>, and opt out of
                        them by downloading the Google Analytics opt-out browser
                      add-on, available at{' '}
                      <StyledLink href="https://tools.google.com/dlpage/gaoptout">
                        https://tools.google.com/dlpage/gaoptout
                      </StyledLink>
                      . We also may use companies like IBM Digital Analytics, a
                      third-party web analytics service provider, to help us
                      improve our website performance and user experience. You
                      can review the IBM Digital Analytics privacy policy and
                      its opt-out tool, by clicking{' '}
                      <StyledLink href="https://www.ibm.com/privacy/details/us/en/">
                        here
                      </StyledLink>
                      .
                    </li>
                  </StyledParagraph>
                </ul>
              </Box>
            </ParagraphContainer>
          </Grid>
          <Grid>
            <ParagraphContainer>
              <StyledSubheaders id="how">
                How We Use the Information We Collect:
              </StyledSubheaders>
              <StyledParagraph>
                We may use the information we collect about you for purposes
                such as to:
              </StyledParagraph>
              <Box>
                <ul>
                  <StyledParagraph>
                    <li>
                      complete transactions you have requested or fulfill orders
                      you have placed;
                    </li>
                    <li>
                      respond to or follow-up on your comments, reviews,
                      inquiries and other requests;
                    </li>
                    <li>
                      deliver targeted advertising, communications, product
                      solutions or content, as well as services you have
                      requested;
                    </li>
                    <li>
                      conduct research and analysis related to our business,
                      products or Properties;
                    </li>
                    <li>
                      improve our products, services or Properties and tailor
                      them to your usage or preferences;
                    </li>
                    <li>
                      communicate with you about contests, sweepstakes, loyalty
                      or rewards programs, coupons, rebates, promotions or other
                      matters which you have entered or joined or for which you
                      have requested information;
                    </li>
                    <li>
                      implement social networking features you have activated;
                    </li>
                    <li>
                      publish your reviews, comments, photos, videos and other
                      content you have posted to one of our interactive or
                      user-generated features;
                    </li>
                    <li>
                      communicate with you about your account or your use of our
                      Properties;
                    </li>
                    <li>
                      enforce the terms of use of our Properties or otherwise
                      manage our business; and
                    </li>
                    <li>
                      if you have opted-in to receive news, special offers or
                      other information from us or one of our brands by email or
                      text message, send you promotional messages we think will
                      be of interest to you. If you no longer want to receive
                      these direct marketing communications, you may opt-out of
                      such communications by the methods describe in the{' '}
                      <StyledLink href="#optout">“Opting Out of Communications”</StyledLink>{' '}
                      section below.
                    </li>
                  </StyledParagraph>
                </ul>
              </Box>
            </ParagraphContainer>
          </Grid>
          <Grid>
            <ParagraphContainer>
              <StyledSubheaders id="sharing">
                Information Sharing and Disclosure
              </StyledSubheaders>
              <StyledParagraph>
                We do not sell or rent your personal information to third
                parties. From time to time, we may share your personal
                information with our affiliates, service providers, sales
                brokers, retail partners and other third party business partners
                (and their service providers) for the purposes described in this
                Privacy Statement, such as in the following circumstances:
              </StyledParagraph>
              <Box>
                <ul>
                  <StyledParagraph>
                    <li>
                      to conduct research and/or analysis regarding products,
                      consumers and other matters;
                    </li>
                    <li>
                      to allow us to better understand your interests,
                      activities, demographics and profile;
                    </li>
                    <li>
                      to prevent such parties from sending promotional messages
                      on our behalf to people who have asked us to not send such
                      messages; or
                    </li>
                    <li>
                      if you have opted-in to receive promotional communications
                      from us, send a tailored promotional communications to you
                      jointly offering a product or service.
                    </li>
                  </StyledParagraph>
                </ul>
                <StyledParagraph>
                  We will require these parties to maintain the confidentiality
                  of your personal information, and will not authorize them to
                  use the personal information we provide for their direct
                  marketing purposes (as defined the California “Shine the
                  Light” Law, California Civil Code §§ 1798.83) unless we have
                  explicitly given you the option to opt-in or opt-out of such
                  disclosure.
                </StyledParagraph>
                <StyledParagraph>
                  We rely on third party service providers to perform a variety
                  of services on our behalf, and we may disclose your personal
                  information to such service providers, such as fulfillment
                  services, sweepstakes and contest administrators, email and
                  texting providers, loyalty and rebate program operators,
                  technical support providers, ad serving companies, customer
                  service providers, delivery services, e-commerce providers,
                  credit card processers and research and analytics providers.
                  However, we do not authorize these third parties’ to use your
                  data for purposes other than for which it has been provided,
                  and do not authorize these third parties to disclose that
                  information to unauthorized parties or use that information
                  for their direct marketing purposes.
                </StyledParagraph>
                <StyledParagraph>
                  Additionally, we will use and disclose personal information we
                  believe to be necessary or appropriate: (a) under applicable
                  law, including laws outside your country of residence; (b) to
                  comply with legal process; (c) to respond to requests from
                  public and government authorities including public and
                  government authorities outside your country of residence; (d)
                  to enforce our terms and conditions; (e) to protect our
                  operations or those of any of our affiliates; (f) to protect
                  our rights, privacy, safety or property, and/or that of our
                  affiliates, you or others; and (g) to allow us to pursue
                  available remedies or limit the damages that we may sustain.
                  In addition, we may transfer personal information and other
                  information to a third party in the event of any
                  reorganization, merger, sale, joint venture, assignment,
                  transfer or other disposition of all or any portion of our
                  business, brands, affiliates, subsidiaries or other assets.
                </StyledParagraph>
                <StyledParagraph>
                  We may offer community features and public interactive forums
                  through our Properties, like discussion boards, product
                  reviews, chat rooms, forums, wikis, social networking
                  platforms and blogs. When you participate in such offerings,
                  your username, postings and other personal information you
                  choose to provide or communicate in these public spaces may be
                  seen by others, and you should exercise caution when
                  disclosing such information and realize that information you
                  post could remain viewable in cached or archived webpages or
                  copied and stored by other users even after you remove it. We
                  cannot control the actions of other users of our Properties,
                  and we are not responsible for the results of your postings.
                  Furthermore, when you participate in these interactive
                  features, you may be agreeing to terms of use that, among
                  other things, allow us to use your name and other information
                  in our marketing and advertising.
                </StyledParagraph>
                <StyledParagraph>
                  Your personal information may also be disclosed to your
                  friends associated with your social media account, to other
                  website users and to your social media account provider, in
                  connection with your social sharing activity. By connecting
                  your Properties account and your social media account, you
                  authorize us to share information with your social media
                  account provider, and you understand that the use of the
                  information we share will be governed by the social media
                  provider’s privacy policy.
                </StyledParagraph>
                <StyledParagraph>
                  We may share aggregated, statistical or anonymous information
                  that does not identify you with third parties. For example, we
                  may disclose the number of visitors to our websites, the
                  number of people who have downloaded a particular coupon or
                  the number of people from a certain state who purchased a
                  product from one of our e-commerce websites.
                </StyledParagraph>
                <StyledParagraph>
                  We occasionally partner with other companies to run joint
                  promotions or offer you separate third party promotions. When
                  you provide information for these promotions, please note
                  whether you are providing your information directly to that
                  party to use for their own marketing purposes. In such
                  instances, their use of your information will be governed by
                  such party’s own privacy policy.
                </StyledParagraph>
                <Box style={{ paddingTop: '20px' }}>
                  <StyledParagraphHeader id="california-privacy">
                    Your California Privacy Rights
                  </StyledParagraphHeader>
                  <StyledParagraph>
                    If you are a California resident, you may have the right to
                    request and receive certain information about a company’s
                    disclosure of your personal information to third parties for
                    their own direct marketing use, and your choices with
                    respect to such disclosures. Because we do not share your
                    personal information with third parties for their own direct
                    marketing use unless you are first given the opportunity to
                    opt-in or out, we are exempt from this requirement. If you
                    still wish to learn more about our compliance with this
                    requirement, please contact us using the methods listed
                    below under <StyledLink href="#contact">“Contacting Us.”</StyledLink>
                  </StyledParagraph>
                </Box>
              </Box>
            </ParagraphContainer>
          </Grid>
          <Grid>
            <ParagraphContainer>
              <StyledSubheaders id="interest">Interest-based Advertising</StyledSubheaders>
              <StyledParagraph>
                We may place or recognize a unique Cookie on your browser when
                you visit our Properties for purposes of serving you targeted
                advertising (also referred to as “interest-based advertising”).
                We also allow third-party companies to place their own Cookies
                on your browser when you visit our Properties (or to use other
                technologies that permit them to collect information about your
                use of the Properties), so that they can collect information
                about your online activities over time and across different
                sites or other online services and serve customized
                advertisements to you as you browse the Internet or use mobile
                apps. These third parties may also use Cookies and other
                technologies to recognize you across the different devices you
                use, such as a desktop or laptop computer, smartphone or table,
                and serve interest-based ads to you on any of your devices.
                These advertising companies may participate in the
                Self-Regulatory Program for Online Behavioral Advertising
                managed by the Digital Advertising Alliance. As part of this
                program, our targeted advertisements may be delivered with “
                <StyledLink href="http://www.aboutads.info/">
                  AdChoices
                </StyledLink>
                ” icons that help you understand how data about you is being
                used and provide you with the ability to opt out of such
                interest-based advertising on the particular device from which
                you access the icon. Additionally, our Properties that
                participate in interest-based advertising may also contain such
                icons. Please click on an AdChoices icon or{' '}
                <StyledLink href="http://optout.aboutads.info/?lang=EN&c=2#!%2F">
                  click here
                </StyledLink>{' '}
                to learn more about your choices with respect to interest-based
                advertising on the device you are currently using. From a mobile
                device, please visit the Digital Advertising Alliance’s{' '}
                <StyledLink href="https://youradchoices.com/appchoices">
                  “AppChoices” website
                </StyledLink>{' '}
                to download a free app that allows you to set preferences for
                data collection and use across mobile apps. When you click an
                AdChoices icon on our Properties, you will also be provided with
                a list of third parties collecting behavioral data for
                ad-serving purposes on that Property; please visit the privacy
                policies of those service providers to learn more about how they
                collect and use data and the opt out choices they provide. To
                learn more about the Self-Regulatory Program for Online
                Behavioral Advertising, please visit{' '}
                <StyledLink href="http://optout.aboutads.info/?c=2&lang=EN">
                  http://www.aboutads.info/choices/
                </StyledLink>
                . You can also generally opt-out of receiving personalized ads
                from third party advertisers and ad networks who are members of
                the Network{' '}
                <StyledLink href="https://www.networkadvertising.org/">
                  Advertising Initiative (NAI)
                </StyledLink>{' '}
                by visiting the{' '}
                <StyledLink href="http://optout.networkadvertising.org/?c=1">
                  opt-out page
                </StyledLink>{' '}
                on the{' '}
                <StyledLink href="http://optout.networkadvertising.org/?partnerId=1%2F%2F&c=1">
                  NAI website
                </StyledLink>
                . While some browsers have a “do not track” feature that lets
                you tell websites that you do not want to have your online
                activities tracked, these features are not yet uniform and our
                Properties are not currently set up to respond to these signals.
                However, you have various choices and options as described in
                this Privacy Policy Statement regarding advertising and
                marketing communications.
              </StyledParagraph>
            </ParagraphContainer>
          </Grid>
          <Grid>
            <ParagraphContainer>
              <StyledSubheaders id="retention">
                Retention and Storage of Personal Information
              </StyledSubheaders>
              <StyledParagraph>
                We will retain personal information for as long as needed or
                permitted in light of the purpose(s) for which it was obtained.
                The criteria used to determine our retention periods include:
                (i) the length of time we have an ongoing relationship with you
                and provide services to you through our Properties; (ii) whether
                there is a legal obligation to which we are subject; or (iii)
                whether retention is advisable in light of our legal position
                (such as in regard to applicable statutes of limitations,
                litigation or regulatory investigations). We seek to use secure
                methods to destroy personal information when it is no longer
                needed, including the use of reasonable technical and physical
                security measures to avoid unauthorized access to or use of the
                personal information after it is disposed
              </StyledParagraph>
            </ParagraphContainer>
          </Grid>
          <Grid>
            <ParagraphContainer>
              <StyledSubheaders id="access">
                Accessing and Updating Your Personal Information
              </StyledSubheaders>
              <StyledParagraph>
                If you have created an online account on one of our websites and
                would like to update the personal information you have provided
                to us, you can access your account on the applicable website to
                view and make changes or corrections to your personal
                information. You may also contact us using the methods described
                below under <StyledLink href="#contact">“Contacting Us”</StyledLink> to request
                access or updates to your information. We will try to comply
                with your request as soon as reasonably practicable.
              </StyledParagraph>
            </ParagraphContainer>
          </Grid>
          <Grid>
            <ParagraphContainer>
              <StyledSubheaders id="optout">Opting Out of Communications</StyledSubheaders>
              <StyledParagraph>
                If you no longer want to receive marketing-related emails from
                one of our brands on a going-forward basis, you may opt-out of
                receiving marketing-related emails by clicking the “unsubscribe”
                link at the bottom of any email newsletter you receive from that
                brand, or, if you created an online account when you registered
                to receive our emails, you may log-in to your account on the
                applicable brand’s website and make changes to your
                communication preferences. If you no longer want to receive
                promotional text messages from one of our brands, please follow
                the cancellation instructions contained in the last text message
                sent by that brand. If you are having difficulty unsubscribing
                from our marketing communications using the above methods,
                please contact us directly using the methods listed below under{' '}
                <StyledLink href="#contact">Contacting Us</StyledLink>.
              </StyledParagraph>
              <StyledParagraph>
                Please allow ample time for us to process your request. However,
                please note that even if you opt-out from receiving marketing
                emails or text messages, we may still need to send you
                communications about your orders, customer service inquiries,
                promotions participation and other service-related matters. We
                also may keep information we have collected about you for
                record-keeping, research and other purposes. Also, please note
                that if you participated in a promotion that involved a third
                party, and, as part of that promotion, you agreed to receive
                future marketing communications directly from that party, you
                will need to contact that party to opt-out of such
                communications. This process may be outlined in that party’s
                privacy policy.
              </StyledParagraph>
            </ParagraphContainer>
          </Grid>
          <Grid>
            <ParagraphContainer>
              <StyledSubheaders id="security">Security</StyledSubheaders>
              <StyledParagraph>
                We use commercially reasonable organizational, technical and
                administrative means intended to protect stored and transmitted
                information from loss, misuse and unauthorized access or
                disclosure, and we (or our third-party payment processing
                providers) encrypt credit card numbers from e-commerce
                transactions conducted on our Properties using secure socket
                layer (SSL) technology. However, no method of Internet
                transmission or electronic storage is 100% secure or error-free,
                so we unfortunately cannot guarantee absolute security. If you
                have reason to believe that your interaction with us is no
                longer secure (for example, if you feel that the security of any
                account you might have with us has been compromised), please{' '}
                <StyledLink href="#contact">“Contact Us”</StyledLink> immediately.
              </StyledParagraph>
            </ParagraphContainer>
          </Grid>
          <Grid>
            <ParagraphContainer>
              <StyledSubheaders id="coverage">
                Websites Not Covered by this Privacy Policy
              </StyledSubheaders>
              <StyledParagraph>
                Our Properties may contain links or references to other websites
                or services that are managed by third parties or that are
                managed by us but contain a different privacy statement. This
                Privacy Statement governs only information that we collect
                through our Properties that link to this Privacy Statement, and
                not to websites, services or applications that do not link to
                this Privacy Statement or that are maintained and controlled by
                other companies or organizations, including third party websites
                linked to from our Properties, as well as communications from
                third parties that reference our company or products.
              </StyledParagraph>
              <StyledParagraph>
                For example, some of our Properties may offer you the ability to
                make purchases using third-party e-commerce providers or payment
                services. In those instances, you will be directed to a webpage
                that is hosted by the third party (or its service providers) and
                not by us. Unless otherwise stated, any personal information
                that you provide through that third party webpage will be
                collected by that party and not by us, and will be subject to
                that party’s privacy policy, rather than this Privacy Statement.
                In such a situation, we will have no control over, and shall not
                be responsible for, that party’s use of the information you
                provide to them.
              </StyledParagraph>
              <StyledParagraph>
                Please note that many of the websites we operate outside of the
                United States are governed by separate privacy policies linked
                to from those websites. This Privacy Statement also does not
                cover the “offline” collection of information by us unless you
                have been notified that this Privacy Statement applies at the
                time of collection.
              </StyledParagraph>
              <StyledParagraph>
                The collection and use of your information by and through third
                party websites, applications or other means will be governed by
                the privacy policies applicable to those third parties and
                mediums.
              </StyledParagraph>
              <StyledParagraph>
                We are not responsible for the information collection, use,
                disclosure or security policies or practices of other
                organizations, such as Facebook, Apple, Google, Microsoft or any
                other app developer, app provider, social media platform
                provider, operating system provider, wireless service provider
                or device manufacturer, including with respect to any personal
                information you disclose to other organizations through or in
                connection with software applications or social media pages. The
                inclusion of a link or reference on the Properties does not
                imply endorsement of the linked site by us or by our affiliates.
                Websites may contain our name, logos, products or other branding
                even though they are actually operated by third parties that may
                or may not have a relationship with us. Therefore, we encourage
                you to read the privacy statement of every service, application,
                or website you visit or interact with.
              </StyledParagraph>
            </ParagraphContainer>
          </Grid>
          <Grid>
            <ParagraphContainer>
              <StyledSubheaders id="age">Children</StyledSubheaders>
              <StyledParagraph>
                Our Properties are not intended for children under the age of 18
                and we do not knowingly collect personal information from
                children under age 18. Children under the age of 18 should not
                use our Properties and should not provide their personal
                information to us.
              </StyledParagraph>
            </ParagraphContainer>
          </Grid>
          <Grid>
            <ParagraphContainer>
              <StyledSubheaders id="border">Cross-Border Transfers</StyledSubheaders>
              <StyledParagraph>
                Because we operate globally, your personal information may be
                stored and processed in any country where we have facilities or
                in which we engage service providers. By using our Properties,
                you consent to the transfer of information to countries outside
                your country of residence, including the United States, which
                may have different data protection rules than in your country.
              </StyledParagraph>
            </ParagraphContainer>
          </Grid>
          <Grid>
            <ParagraphContainer>
              <StyledSubheaders id="contact">Contacting Us</StyledSubheaders>
              <StyledParagraph>
                Please direct any inquiries related to this Privacy Statement or
                personal information we have collected about you to our Privacy
                Team by sending mail to Clorox Consumer Services, PO Box 24305,
                Oakland, California, 94623-1305, or by completing this{' '}
                <StyledLink href="https://cloroxconnections.custhelp.com/app/ask/cws/thecloroxcompany.com">
                  online form
                </StyledLink>
                . If you have any questions or comments about our company or our
                products or have other customer service needs, please{' '}
                <StyledLink href="https://www.thecloroxcompany.com/contact-us/">
                 click here{' '}
                </StyledLink>
                for information on contacting our consumer service
                representatives.
              </StyledParagraph>
            </ParagraphContainer>
          </Grid>
          <Grid>
            <ParagraphContainer style={{ border: 'none', paddingBottom: 0 }}>
              <StyledSubheaders id="changes">
                Changes to this Privacy Statement
              </StyledSubheaders>
              <StyledParagraph>
                We will update this Privacy Statement from time to time to
                reflect changes to our practices, technology, legal requirements
                and other factors. Please check the “Last Revised” legend at the
                top of this page to see when this Privacy Statement was last
                revised. When changes are made to this Privacy Statement they
                will become immediately effective when published in a revised
                Privacy Statement posted on this page unless otherwise noted.
                Your use of the Properties following these changes indicates
                your consent to the practices described in the revised Privacy
                Statement.
              </StyledParagraph>
            </ParagraphContainer>
          </Grid>
        </Box>
      </StyledContainer>
      </StyledBackground>
    </ScrollToTop> 
  );
};

export default PrivacyPolicy;