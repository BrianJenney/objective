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

const Terms = () => {
  return (
    <ScrollToTop>
      <StyledBackground>
        <StyledContainer className="terms-container">
          <Box>
            <Grid>
              <Box style={{ paddingBottom: 35 }}>
                <StyledParagraph>
                  Objective is a part of the The Clorox Company’s family of
                  brands supporting the overall corporate mission to make
                  everyday life better, every day. Please read the Terms of
                  Service below for further details.
                </StyledParagraph>
              </Box>
              <Box textAlign="center">
                <StyledTitle>Terms of Use</StyledTitle>
              </Box>
            </Grid>
            <Grid>
              <Box>
                <StyledParagraph>
                  Last Updated: February 9, 2016
                </StyledParagraph>
                <StyledParagraph>
                  PLEASE READ THIS TERMS OF USE AGREEMENT CAREFULLY. BY
                  ACCESSING OR USING OUR SITES, YOU AGREE TO BE BOUND BY THE
                  TERMS DESCRIBED HEREIN. IF YOU DO NOT AGREE TO ALL OF THESE
                  TERMS, DO NOT USE OUR SITES.
                </StyledParagraph>
                <StyledParagraph style={{ padding: '20px 0px 25px 0px' }}>
                  The Clorox Company and its{' '}
                  <StyledLink href="https://www.thecloroxcompany.com/brands/">
                    family of companies
                  </StyledLink>{' '}
                  (collectively, “Company,” “we,” “us,” or “our”) welcome you to
                  our digital home. Like you, we take great pride in our home,
                  and have developed the following rules to help our home stay
                  clean and beautiful, free from germs and viruses, and a source
                  of information about how our products can make your everyday
                  life better, every day. We know terms like these can be long
                  and boring, but please read them anyway for important
                  information about your use of our sites.
                </StyledParagraph>
              </Box>
            </Grid>
            <Grid>
              <ParagraphContainer style={{ paddingTop: '0px' }}>
                <StyledSubheaders>
                  What’s Contained in this Agreement
                </StyledSubheaders>
                <Box>
                  <ul>
                    <StyledParagraph>
                      <li>
                        <StyledLink href="#highlights">Highlights of the Agreement</StyledLink>
                      </li>
                      <li>
                        <StyledLink href="#our-rights">
                          Our Intellectual Property Rights
                        </StyledLink>
                      </li>
                      <li>
                        <StyledLink href="#your-use">
                          Your Authorized Use of Our Sites
                        </StyledLink>
                      </li>
                      <li>
                        <StyledLink href="#content-submitted">Content Submitted by You</StyledLink>
                      </li>
                      <li>
                        <StyledLink href="#interactive">Interactive Features</StyledLink>
                      </li>
                      <li>
                        <StyledLink href="#accounts">Accounts</StyledLink>
                      </li>
                      <li>
                        <StyledLink href="#descriptions">Descriptions and Orders</StyledLink>
                      </li>
                      <li>
                        <StyledLink href="#third-party">Third-Party Content and Links</StyledLink>
                      </li>
                      <li>
                        <StyledLink href="#copyright">Copyright Infringement Notices</StyledLink>
                      </li>
                      <li>
                        <StyledLink href="#updates">Updates to this Agreement</StyledLink>
                      </li>
                      <li>
                        <StyledLink href="#other-policies">Other Policies</StyledLink>
                      </li>
                      <li>
                        <StyledLink href="#additional">Additional Terms</StyledLink>
                      </li>
                      <ul>
                        <li>
                          <StyledLink href="#termination">Termination</StyledLink>
                        </li>
                        <li>
                          <StyledLink href="#children">Children</StyledLink>
                        </li>
                        <li>
                          <StyledLink href="#medical">Disclaimer of Medical Advice</StyledLink>
                        </li>
                        <li>
                          <StyledLink href="#warranty">Disclaimer of Warranty</StyledLink>
                        </li>
                        <li>
                          <StyledLink href="#liability">Limitation of Liability</StyledLink>
                        </li>
                        <li>
                          <StyledLink href="#indemnity">Indemnity</StyledLink>
                        </li>
                        <li>
                          <StyledLink href="#consent">Consent to Communication</StyledLink>
                        </li>
                        <li>
                          <StyledLink href="#international">International Users</StyledLink>
                        </li>
                      </ul>
                      <li>
                        <StyledLink href="#disputes">
                          Disputes, Arbitration and Class Action Waiver
                        </StyledLink>
                      </li>
                      <li>
                        <StyledLink href="#contact">Contacting Us</StyledLink>
                      </li>
                    </StyledParagraph>
                  </ul>
                </Box>
              </ParagraphContainer>
            </Grid>
            <Grid>
              <ParagraphContainer>
                <StyledSubheaders id="highlights">Highlights of the Agreement</StyledSubheaders>
                <StyledParagraph>
                  This Terms of Use Agreement (the “Agreement”) is a legal
                  agreement between you and us governing your use of our
                  websites and other online or mobile services, software or
                  applications that link to this Agreement (each a “Site” and
                  collectively “Sites”).
                </StyledParagraph>
                <StyledParagraph>
                  The table below is intended to provide you with a basic
                  overview of the contents of this Agreement. However, please
                  read this entire Agreement for a complete understanding of the
                  terms you are agreeing to. The meaning of capitalized words
                  can be found in the full Agreement.
                </StyledParagraph>
                <Box style={{ paddingTop: '25px' }}>
                  <StyledParagraphHeader>Our Rights:</StyledParagraphHeader>
                  <ul>
                    <StyledParagraph>
                      <li>
                        All of the Content on our Sites is protected by
                        intellectual property rights―you may
                      </li>
                      <li>
                        We may block you from accessing our Sites, block or
                        delete your User Content or terminate your account for
                        any reason.
                      </li>
                      <li>
                        We are not liable for third party content hosted on our
                        Sites, external websites linked to from our Sites, or
                        errors regarding product information, availability or
                        promotional offers.
                      </li>
                    </StyledParagraph>
                  </ul>
                  <StyledLink href="#our-rights">
                    Read more about our rights and control of our Sites and
                    Content
                  </StyledLink>
                </Box>
                <Box style={{ paddingTop: '25px' }}>
                  <StyledParagraphHeader>
                    Your Use of Our Sites:
                  </StyledParagraphHeader>
                  <ul>
                    <StyledParagraph>
                      <li>
                        You only may use our Sites and our Content for your
                        personal, non-commercial use.
                      </li>
                      <li>
                        You should only use our Sites if you are a U.S. resident
                        of the age of majority (or at least 13-years-old with
                        your parent’s supervision).
                      </li>
                      <li>
                        While on our Sites, you may not violate any laws,
                        infringe any rights, threaten, harass or impersonate
                        others, or take other actions that harm us or other
                        people or parties.
                      </li>
                      <li>
                        You must not attempt to bypass security protections on
                        our Sites, introduce viruses or other harmful code or
                        use our Sites to attack other websites or services.
                      </li>
                      <li>
                        If you register for an account on a Site, you should
                        keep your password confidential and not allow other
                        people to use your account.
                      </li>
                    </StyledParagraph>
                  </ul>
                  <StyledLink href="#your-use">
                    Read more about what you can and cannot do on our Sites
                  </StyledLink>
                </Box>
                <Box style={{ paddingTop: '25px' }}>
                  <StyledParagraphHeader>Your Content:</StyledParagraphHeader>
                  <ul>
                    <StyledParagraph>
                      <li>
                        If you send us or post or upload User Content to our
                        Sites, we may use that User Content for any purpose,
                        including commercial uses, product development and
                        advertising.
                      </li>
                      <li>
                        If you post your name, personal information or other
                        User Content to public areas of our Sites, that
                        information might be seen and used by any visitors to
                        our Sites.
                      </li>
                      <li>
                        You should not send us or post User Content that 1) you
                        want to keep proprietary or 2) you do not have the
                        rights to post.
                      </li>
                    </StyledParagraph>
                  </ul>
                  <StyledLink href="#content-submitted">
                    Read more about the Content you transmit to us or through
                    our Sites
                  </StyledLink>
                </Box>
                <Box style={{ paddingTop: '25px' }}>
                  <StyledParagraphHeader>
                    Other Things to Know:
                  </StyledParagraphHeader>
                  <ul>
                    <StyledParagraph>
                      <li>
                        By using a Site, you automatically consent to the terms
                        of this Agreement, which will be updated by us from time
                        to time without advance notice.
                      </li>
                      <li>
                        This Agreement contains limitations on our liability to
                        you, important disclaimers of warranties and
                        indemnification obligations by you.
                      </li>
                      <li>
                        This Agreement governs how disputes will be handled,
                        including through the use of arbitration with a class
                        action waiver.
                      </li>
                      <li>
                        Your use of a Site may be governed by other terms and
                        conditions applicable to certain features or promotions.
                        You should also read our{' '}
                        <StyledLink href="https://objectivewellness.com/privacypolicy">
                          Privacy Statement
                        </StyledLink>
                        .
                      </li>
                      <li>
                        This Agreement contains information about how you can{' '}
                        <StyledLink href="https://www.thecloroxcompany.com/contact-us/">
                          contact us
                        </StyledLink>{' '}
                        regarding complaints, questions or copyright
                        infringement claims.
                      </li>
                    </StyledParagraph>
                  </ul>
                  <StyledLink href="#our-rights">Read the complete Agreement below</StyledLink>
                </Box>
              </ParagraphContainer>
            </Grid>
            <Grid>
              <ParagraphContainer>
                <StyledSubheaders id="our-rights">
                  Our Intellectual Property Rights
                </StyledSubheaders>
                <StyledParagraph>
                  All names, logos, text, designs, graphics, trade dress,
                  characters, interfaces, code, software, images, sounds,
                  videos, photographs and other content appearing in or on the
                  Sites (the “Content”) are protected intellectual property of,
                  or used with permission or under license by, our Company. Such
                  Content may be protected by copyright, trademark, patent or
                  other proprietary rights and laws. This includes the entire
                  Content of each Site, copyrighted and protected as a
                  collective work. All intellectual property rights associated
                  with the Sites, and related goodwill, are proprietary to us or
                  our licensors. You do not acquire any right, title or interest
                  in any Content by accessing or using the Sites. Any rights not
                  expressly granted herein are reserved. Except as set forth
                  below, the use of any Content available on a Site is strictly
                  prohibited.
                </StyledParagraph>
                <StyledParagraph>
                  We grant you a limited license to access and use the Sites and
                  their Content for personal, informational and shopping
                  purposes. No Content from the Sites may be copied, reproduced,
                  republished, performed, displayed, downloaded, posted,
                  transmitted, or distributed in any way without written
                  permission of the rights owner, except that you may download
                  or print one copy of specific Content or software made
                  available for your downloading or printing for your personal,
                  non-commercial home use, subject to your compliance with this
                  Agreement and solely for as long as you continue to be
                  permitted to access the Sites. To use Content under such an
                  exception, you must (1) keep intact any copyright, trademark
                  or other proprietary notices, (2) use such Content pursuant to
                  any licenses associated with such Content, (3) not copy or
                  post such Content on any networked computer or broadcast it in
                  any media, (4) make no modifications to any such Content, and
                  (5) make no additional representations or warranties relating
                  to such Content. Except as otherwise expressly authorized
                  herein or in writing by us, you agree not to reproduce,
                  modify, rent, lease, perform, display, transmit, loan, sell,
                  distribute, or create derivative works based (in whole or in
                  part) on all or any part of a Site or the Content.
                </StyledParagraph>
              </ParagraphContainer>
            </Grid>
            <Grid>
              <ParagraphContainer>
                <StyledSubheaders id="your-use">
                  Your Authorized Use of Our Sites
                </StyledSubheaders>
                <StyledParagraph>
                  While using a Site, you are required to comply with all
                  applicable statutes, orders, regulations, rules and other
                  laws. You may not use a Site for any fraudulent or unlawful
                  purpose, and you may not take any action to interfere with a
                  Site or any other party’s use of a Site. In addition, we
                  expect users of the Sites to respect the rights and dignity of
                  others. For example, you may not do any of the following
                  without our consent:
                </StyledParagraph>
                <ul>
                  <StyledParagraph>
                    <li>
                      Post, upload, share, transmit, distribute, facilitate
                      distribution of or otherwise make available to or through
                      a Site any content that is unlawful, harmful, harassing,
                      defamatory, threatening, intimidating, fraudulent,
                      tortious, vulgar, obscene, hateful, violative of privacy
                      or publicity rights, infringing of intellectual property
                      or other proprietary rights, or otherwise objectionable,
                      including unauthorized or unsolicited advertising;
                    </li>
                    <li>
                      Post to or transmit through the Sites any sensitive
                      personally identifiable information about yourself or
                      third parties, such as social security, credit card or
                      bank account numbers, health or medical information, or
                      other information concerning personal matters, unless
                      specifically requested by us;
                    </li>
                    <li>
                      Reproduce, duplicate, copy, publicly display, frame,
                      mirror, sell, resell or otherwise exploit for any
                      commercial purposes, any portion of, use of, or access to
                      a Site;
                    </li>
                    <li>
                      Impersonate any person or entity or falsely state or
                      otherwise misrepresent your affiliation with any person or
                      entity in connection with a Site, or express or imply that
                      we endorse any statement you make;
                    </li>
                    <li>
                      Violate, or attempt to violate, the security of a Site;
                    </li>
                    <li>
                      Disseminate on a Site any viruses, worms, spyware, adware,
                      or other malicious computer code, file or program that is
                      harmful or invasive or is intended to damage or hijack the
                      operation of, or monitor the use of, any hardware,
                      software or equipment;
                    </li>
                    <li>
                      Use scripts, macros or other automated means to impact the
                      integrity of voting, ratings or similar features;
                    </li>
                    <li>
                      Use any data mining, bots, spiders, automated tools or
                      similar data gathering and extraction methods, directly or
                      indirectly, on a Site or to collect any information from a
                      Site or any other user of a Site; or
                    </li>
                    <li>
                      Assist or permit any persons in violating this Agreement
                      or other applicable laws or rules governing the use of the
                      Sites.
                    </li>
                  </StyledParagraph>
                </ul>
                <StyledParagraph>
                  You are granted a limited, non-exclusive right to create text
                  hyperlinks to the Sites for informational purposes, provided
                  such links do not portray us in a false, misleading,
                  derogatory or otherwise defamatory manner and provided that
                  the linking site does not contain any material that is
                  pornographic, obscene, illegal, offensive, harassing or
                  otherwise objectionable in our judgment. Additionally,
                  notwithstanding the foregoing, and subject to compliance with
                  any instructions posted in the robots.txt file located in a
                  Site’s root directory, we grant to the operators of public
                  search engines permission to use spiders to copy Content from
                  the Site for the sole purpose of (and solely to the extent
                  necessary for) creating publicly available, searchable indices
                  of such Content, but not caches or archives of such Content.
                  We may revoke these permissions at any time.
                </StyledParagraph>
              </ParagraphContainer>
            </Grid>
            <Grid>
              <ParagraphContainer>
                <StyledSubheaders id="content-submitted">Content Submitted by You</StyledSubheaders>
                <StyledParagraph>
                  You are responsible for any information, text, images, videos
                  or other materials or content that you post on a Site or
                  transmit through our Sites (“User Content”). You agree,
                  represent and warrant that any User Content you post on a Site
                  or transmit through our Sites is truthful, accurate, not
                  misleading and offered in good faith, and that you have the
                  right to transmit such User Content. You shall not upload,
                  post or otherwise make available on or through a Site any User
                  Content protected by copyright, trademark or other proprietary
                  right of any third party without the express written
                  permission of the owner of such right(s). You shall be solely
                  liable for any damages resulting from any infringement of
                  copyright, trademark, proprietary rights, or any other harm
                  resulting from such User Content.
                </StyledParagraph>
                <StyledParagraph>
                  PLEASE DO NOT POST OR SEND US ANY IDEAS, SUGGESTIONS, OR OTHER
                  USER CONTENT THAT YOU WISH TO KEEP PROPRIETARY OR FOR WHICH
                  YOU EXPECT TO RECEIVE COMPENSATION. By sending any ideas,
                  concepts, know-how, proposals, techniques, suggestions or
                  other User Content to us, you agree that: (i) we are free to
                  use such User Content for any purpose, (ii) such User Content
                  will be deemed not to be confidential or proprietary (iii) we
                  may have something similar already under consideration or in
                  development, and (iv) you are not entitled to any compensation
                  or reimbursement of any kind from us under any circumstances
                  unless otherwise expressly agreed in writing by us.
                </StyledParagraph>
                <StyledParagraph>
                  By submitting User Content to us directly or indirectly
                  (including through the use of hashtags on third party social
                  media platforms), you grant to us (or warrant that the owner
                  of such information and material has expressly granted to us)
                  a royalty-free, perpetual, sublicensable, irrevocable, and
                  unrestricted right and license: (a) to use, reproduce,
                  display, modify, adapt, publish, perform, translate, transmit
                  and distribute or otherwise make available to others such User
                  Content (in whole or in part and for any purpose) worldwide;
                  (b) to incorporate such User Content in other works in any
                  form, media, product, service or technology now known or
                  hereafter developed for any purpose, including sale,
                  manufacture or advertising (and to exercise all intellectual
                  property rights associated with such products or other works);
                  and (c) to use your name, screen name, location, photograph,
                  avatar, image, voice, likeness and biographical information
                  provided in connection with the User Content in any and all
                  media and for advertising or promotional purposes. You also
                  hereby grant each user of the Sites a non-exclusive license to
                  access your User Content through a Site, and to tag, rate,
                  review, comment on, use, reproduce, distribute, display and
                  perform such User Content as permitted through the
                  functionality of a Site and under this Agreement.
                  Additionally, you irrevocably waive any “moral rights” or
                  other rights with respect to attribution of authorship or
                  integrity of your User Content that you may have under any
                  applicable law or legal theory. Notwithstanding the foregoing,
                  please note that any personally identifiable information you
                  submit to us through our “contact us” forms, product order
                  pages, job application portals or other forms that are
                  intended to be confidential will be handled in accordance with
                  our{' '}
                  <StyledLink href="https://objectivewellness.com/privacypolicy">
                    Privacy Statement
                  </StyledLink>{' '}
                  and will not be publicly disclosed, except as described in our{' '}
                  <StyledLink href="https://objectivewellness.com/privacypolicy">
                    Privacy Statement
                  </StyledLink>{' '}
                  or otherwise approved by you.
                </StyledParagraph>
              </ParagraphContainer>
            </Grid>
            <Grid>
              <ParagraphContainer>
                <StyledSubheaders id="interactive">Interactive Features</StyledSubheaders>
                <StyledParagraph>
                  We may host message boards, user-generated content,
                  promotions, product reviews, blogs, and other interactive
                  features or services through which users can post or upload
                  User Content (each, a “Forum”) on our Sites. We do not endorse
                  User Content posted in Forums, cannot guarantee the accuracy
                  or authenticity of such User Content, and are acting only as a
                  passive conduit for such User Content. User Content may
                  include suggestions for uses of our products that have not
                  been evaluated or approved by us; we do not recommend such
                  uses. You should never use our products in any manner other
                  than as is described on its packaging.
                </StyledParagraph>
                <StyledParagraph>
                  You acknowledge and agree that Forums are public spaces and
                  that your participation in such Forums creates no expectation
                  of privacy. Further, you acknowledge that any User Content you
                  communicate in Forums may be seen and used by others. You
                  understand that our staff, outside contributors, or other
                  users connected with us may participate in Forums or other
                  aspects of the Sites and may employ anonymous user names when
                  doing so. Any user failing to comply with this Agreement may
                  be expelled from and refused continued access to Forums in the
                  future. However, we are not responsible for User Content that
                  you or others choose to communicate in Forums, or for your
                  actions or the actions of other users. IF YOU CHOOSE TO MAKE
                  ANY OF YOUR PERSONAL INFORMATION OR OTHER USER CONTENT
                  PUBLICLY AVAILABLE IN A FORUM OR OTHERWISE ON OR THROUGH THE
                  SITES, YOU DO SO AT YOUR OWN RISK.
                </StyledParagraph>
                <StyledParagraph>
                  You acknowledge and agree that we reserve the right (but have
                  no obligation) to do one or all of the following, at our sole
                  discretion: (a) evaluate User Content before allowing it to be
                  posted on a Site or any Forum; (b) monitor User Content and
                  Forums; (c) alter, remove, reject, or refuse to post or allow
                  to be posted, without notice to you, any User Content, for any
                  reason or for no reason whatsoever; provided, however, that we
                  shall have no obligation or liability to you for failure to do
                  so or for doing so in any particular manner; and/or (d)
                  disclose any User Content, and the circumstances surrounding
                  its transmission, to any third party in order to operate a
                  Site, to protect us, our Site visitors or others, to comply
                  with legal obligations or governmental requests, to enforce
                  this Agreement, or for any other reason or purpose we deem
                  appropriate. If you see User Content on our Sites that you
                  believe violates the terms of this Agreement, please{' '}
                  <StyledLink href="https://www.thecloroxcompany.com/contact-us/">
                    contact us
                  </StyledLink>
                  .
                </StyledParagraph>
              </ParagraphContainer>
            </Grid>
            <Grid>
              <ParagraphContainer>
                <StyledSubheaders id="accounts">Accounts</StyledSubheaders>
                <StyledParagraph>
                  In general, you are not obligated to register in order to
                  access the Sites. However, certain sections and features of
                  some of the Sites are available only to users who have
                  registered for an account (“Registered Users”). We may reject,
                  and you may not use, a user ID (or e-mail address) for any
                  reason in our sole discretion. For example, we may reject a
                  user ID (or e-mail address) that is already being used by
                  someone else; that may be construed as impersonating another
                  person; that belongs to another person; that violates the
                  intellectual property or other rights of any person; or that
                  is offensive. You may only have one active Registered User
                  account on each Site at any given time and you may not allow
                  other people to use your account to access a Site.
                </StyledParagraph>
                <StyledParagraph>
                  If you are a Registered User, we expect you to accurately
                  maintain and update any information about yourself that you
                  have provided to us. You agree that you are responsible for
                  all activities that occur under your Registered User account,
                  and for maintaining the confidentiality of your password and
                  restricting access to your computer so others may not access a
                  Site in violation of this Agreement. In addition, you agree to
                  exit from your Registered User account at the end of each
                  session if you are using a device that is shared with other
                  people.
                </StyledParagraph>
                <StyledParagraph>
                  You agree to notify us of any unauthorized use of your
                  Registered User username, log-in ID, password or any other
                  breach of security that you become aware of involving or
                  relating to a Site by{' '}
                  <StyledLink href="https://www.thecloroxcompany.com/contact-us/">
                    contact us
                  </StyledLink>{' '}
                  as soon as possible. We reserve the right to take any and all
                  actions we deem necessary or reasonable to maintain the
                  security of our Sites and your account, including without
                  limitation, terminating your account, changing your password
                  or requesting information to authorize transactions on your
                  account. WE EXPLICITLY DISCLAIM LIABILITY FOR ANY AND ALL
                  LOSSES AND DAMAGES ARISING FROM YOUR FAILURE TO COMPLY WITH
                  THIS SECTION.
                </StyledParagraph>
              </ParagraphContainer>
            </Grid>
            <Grid>
              <ParagraphContainer>
                <StyledSubheaders id="descriptions">Descriptions and Orders</StyledSubheaders>
                <StyledParagraph>
                  We may make improvements and/or changes in products or
                  services described on the Sites, add new features, or
                  terminate a Site at any time without notice. We also: (a)
                  reserve the right to change the goods and services advertised
                  or offered for sale through a Site, the prices, ingredients or
                  specifications of such goods and services, and any promotional
                  offers at any time without any notice or liability to you or
                  any other person; (b) cannot guarantee that goods or services
                  advertised or offered for sale on a Site will be available
                  when ordered or thereafter; (c) reserve the right to limit
                  quantities sold or made available for sale; (d) do not warrant
                  that information on a Site (including without limitation
                  product descriptions, colors or photographs) is accurate,
                  complete, reliable, current or error-free; and (e) reserve the
                  right to modify, cancel, terminate or not process orders
                  (including accepted orders) where the price or other material
                  information on a Site is inaccurate, where we have
                  insufficient quantities to fulfill an order or for any other
                  reason in our sole discretion. If we do not process an order
                  for such reason, we will either not charge you or will apply
                  credit to the payment type used in the order. Some
                  jurisdictions may not allow the exclusions and disclaimers of
                  certain implied warranties, so some of the provisions of this
                  section may not apply to you.
                </StyledParagraph>
                <StyledParagraph>
                  If we are legally required to collect sales tax on merchandise
                  you order, the tax amount will be added automatically to your
                  purchase price. On rare occasions an error in our state sales
                  tax database may cause the sales tax charge to be incorrect.
                  If this happens, at any time up to two years from your date of
                  purchase you may <StyledLink href="https://www.thecloroxcompany.com/contact-us/">contact us</StyledLink> for a refund of tax overcharges.
                  This right to a refund is your exclusive remedy for sales tax
                  errors.
                </StyledParagraph>
              </ParagraphContainer>
            </Grid>
            <Grid>
              <ParagraphContainer>
                <StyledSubheaders id="third-party">Third-Party Content and Links</StyledSubheaders>
                <StyledParagraph>
                  Any information, statements, opinions or other information provided by third parties and made available on our Sites are those of the respective author(s) and not us. We do not guarantee the validity, accuracy, completeness or reliability of any opinion, advice, service, offer, statement or other Content on our Sites other than those from our authorized representatives acting in an official capacity. Under no circumstance will we be liable for or in connection with any loss or damage caused by your reliance on any Content.
                </StyledParagraph>
                <StyledParagraph>
                  We may provide on the Sites, solely as a convenience to users, links to websites, social media pages, mobile applications or other services operated by other entities. If you click these links, you will leave our Sites. If you decide to visit any external link, you do so at your own risk and it is your responsibility to take all protective measures to guard against viruses or other destructive elements. We do not make any warranty or representation regarding, or endorse or otherwise sponsor, any linked sites or the information appearing thereon or any of the products or services described thereon. Links do not imply that we are legally authorized to use any trademark, trade name, logo or copyright symbol displayed in or accessible through the links; or that any linked site is authorized to use any of our trademarks, logos or copyright symbols.
                </StyledParagraph>
                <StyledParagraph>
                  We may maintain a presence on and link to social media websites, including Facebook, LinkedIn, Google Plus, Twitter, YouTube, Vine, Pinterest and Instagram, (collectively, “Social Media Pages”), to provide a place for people to learn more about us and our products and to share experiences with our products. When you visit these Social Media Pages, you are no longer on our Site, but rather a website operated by a third party. All comments, visuals and other materials posted by visitors to our Social Media Pages do not necessarily reflect our opinions, values or ideas. All visitors to our Social Media Pages must comply with the respective social media platform’s terms of use.
                </StyledParagraph>
                <StyledParagraph>
                  YOU AGREE THAT YOUR USE OF THIRD PARTY WEBSITES, APPLICATIONS, SERVICES AND RESOURCES, INCLUDING WITHOUT LIMITATION YOUR USE OF ANY CONTENT, INFORMATION, DATA, ADVERTISING, PRODUCTS, OR OTHER MATERIALS ON OR AVAILABLE THROUGH SUCH THIRD PARTIES, IS AT YOUR OWN RISK AND IS SUBJECT TO THE TERMS AND CONDITIONS OF USE APPLICABLE TO SUCH SITES AND RESOURCES.
                </StyledParagraph>
              </ParagraphContainer>
            </Grid>
            <Grid>
              <ParagraphContainer>
                <StyledSubheaders id="copyright">Copyright Infringement Notices</StyledSubheaders>
                <StyledParagraph>If you believe that any Content on a Site infringes upon any copyright which you own or control, you may send a written notification to our designated copyright agent (the “Designated Agent”), identified below, with the following information:</StyledParagraph>
                <StyledParagraph>(a) A description of the copyrighted work or other intellectual property that you claim has been infringed, with sufficient detail so that we can identify the alleged infringing material;
                (b) The URL or other specific location on the Site that contains the alleged infringing material described in (a) above, with reasonably sufficient information to enable us to locate the alleged infringing material;
                (c) Your name, mailing address, telephone number and email address;
                (d) The electronic or physical signature of the owner of the copyright or a person authorized to act on the owner’s behalf;
                (e) A statement by you that you have a good faith belief that the disputed use is not authorized by the copyright owner, its agent, or the law; and
                (f) A statement by you that the information contained in your notice is accurate and that you attest under penalty of perjury that you are the copyright owner or that you are authorized to act on the copyright owner’s behalf.
                </StyledParagraph>
                <StyledParagraph>Designated Agent: Senior Trademark and Copyright Counsel<br></br>
                Email: <StyledLink>DMCAtakedown@clorox.com</StyledLink>{' '}<br></br>
                  Address: 1221 Broadway, Oakland, CA 94612<br></br>
                Phone: <StyledLink href="tel:510-271-7000">510-271-7000</StyledLink>
                </StyledParagraph>
                <StyledParagraph>
                We will terminate users who, in our sole discretion, are deemed to be repeat infringers. Knowingly misrepresenting in a notification that material is infringing can subject you to damages, including costs and attorneys’ fees, incurred by us or the alleged infringer.</StyledParagraph>
              </ParagraphContainer>
            </Grid>
            <Grid>
              <ParagraphContainer>
                <StyledSubheaders id="updates">Updates to this Agreement</StyledSubheaders>
                <StyledParagraph>We may revise or otherwise change or update this Agreement from time to time. Please check the “Last Updated” legend at the top of this page to see when this Agreement was last revised. When changes are made to this Agreement they will become immediately effective when published on this page unless otherwise noted. We encourage you to periodically review this Agreement―there may have been changes to our policies that may affect you. If you do not agree to the Agreement as modified, then you must discontinue your use of our Sites. Your continued use of a Site will signify your continued agreement to this Agreement as it may be revised.</StyledParagraph>
                <StyledParagraph>We may assign this Agreement at any time with or without notice to you. You may not assign or sublicense this Agreement or any of your rights or obligations under this Agreement without our prior written consent.</StyledParagraph>
              </ParagraphContainer>
            </Grid>
            <Grid>
              <ParagraphContainer>
                <StyledSubheaders id="other-policies">Other Policies</StyledSubheaders>
                <StyledParagraph>This Agreement applies exclusively to your access to, and use of, the Sites and does not alter in any way the terms or conditions of any other agreement you may have with us for products, services, programs or otherwise. Additional policies and terms may apply to use of specific portions of a Site (such as our Ratings and Review features) and to the purchase of certain merchandise or services and are included as part of this Agreement.</StyledParagraph>
                <StyledParagraph>Any sweepstakes, contests, coupons, rebates or other promotions made available through a Site will be governed by specific rules that are separate from this Agreement. By participating in any such promotion, you will become subject to those rules, which may vary from the terms set forth herein and which, in addition to describing such promotion, may have eligibility requirements, such as certain age or geographic restrictions. It is your responsibility to read the applicable rules to determine whether or not your participation, registration, submission and/or entry are valid; you agree to read and abide by the applicable rules.</StyledParagraph>
                <StyledParagraph>We have also adopted a <StyledLink href="https://objectivewellness.com/privacypolicy">Privacy Statement</StyledLink> that you should refer to in order to fully understand how we use and collect information. To learn about our privacy practices, please refer to our <StyledLink href="https://objectivewellness.com/privacypolicy">Privacy Statement</StyledLink>.</StyledParagraph>
              </ParagraphContainer>
            </Grid>
            <Grid>
              <ParagraphContainer>
                <StyledSubheaders id="additional">Additional Terms</StyledSubheaders>
                <Box style={{ paddingTop: '25px' }}>
                  <StyledParagraphHeader id="termination">Termination</StyledParagraphHeader>
                  <StyledParagraph>The Sites and this Agreement are in effect until terminated by us. In addition to any right or remedy that may be available to us under applicable law, we may suspend, limit, or terminate all or a portion of your access to a Site or any of its features at any time with or without notice and with or without cause, including without limitation, if we believe that you have violated or acted inconsistently with the letter or spirit of this Agreement. The provisions of this Agreement concerning protection of intellectual property rights, authorized use, user submitted content, disclaimers, limitations of liability, indemnity, and disputes, as well as any other provisions that by their nature should survive, shall survive any such termination.</StyledParagraph>
                  <StyledParagraph>Upon any such termination, you must destroy all Content obtained from the Sites and all copies thereof. You agree that if your use of a Site is terminated pursuant to this Agreement, you will not attempt to use that Site under any name, real or assumed, and further agree that if you violate this restriction after being terminated, you indemnify and hold us harmless from any and all liability that we may incur therefore. We reserve the right to have all violators prosecuted to the fullest extent of the law.</StyledParagraph>
                  <StyledParagraph>Even after the termination of this Agreement or of your account or access to a Site, any User Content you have posted or submitted may remain on a Site indefinitely.</StyledParagraph>
                </Box>
                <Box style={{ paddingTop: '25px' }}>
                  <StyledParagraphHeader id="children">Children</StyledParagraphHeader>
                  <StyledParagraph>Our Sites are not designed to appeal to minors, and we do not knowingly attempt to solicit or receive any information from children under 13. YOU MUST BE AT LEAST 13 TO ACCESS AND USE OUR SITES. If you are under the age of majority in your home state, which is 18 in most states, you may not establish a registered account with us, and you should use our Sites only with the supervision of a parent or guardian who agrees to be bound by this Agreement. Additionally, certain Sites or sections of our Sites, as well as promotions, programs and commerce we may offer on a Site, may be explicitly limited to people over the age of majority. If you are not old enough to access our Sites or certain sections or features of our Sites, you should not attempt to do so.
                  </StyledParagraph>
                  <StyledParagraph>Pursuant to 47 U.S.C. Section 230(d) as amended, we hereby notify you that parental control protections (such as computer hardware, software or filtering services) are commercially available that may assist you in limiting access to material that is harmful to minors. Information identifying current providers of such protections is available at <StyledLink href="https://www.consumer.ftc.gov/features/feature-0038-onguardonline">OnGuard Online</StyledLink>. Please note that we do not endorse any of the products or services listed at such sites.</StyledParagraph>
                </Box>
                <Box style={{ paddingTop: '25px' }}>
                  <StyledParagraphHeader id="medical">Disclaimer of Medical Advice</StyledParagraphHeader>
                  <StyledParagraph>THE CONTENT CONTAINED ON SOME OF OUR SITES MAY CONTAIN INFORMATION ABOUT NATURAL INGREDIENTS, NATURAL PROCESSES, AND/OR NATURAL THERAPIES THAT ARE NOT EVALUATED OR REGULATED BY THE UNITED STATES FOOD AND DRUG ADMINISTRATION. OUR SITES MAY ALSO CONTAIN INFORMATION ABOUT MEDICAL CONDITIONS AND MEDICAL TREATMENTS. SUCH INFORMATION IS INTENDED AS AN EDUCATIONAL AID ONLY. IT IS NOT INTENDED AS MEDICAL ADVICE FOR INDIVIDUAL CONDITIONS OR TREATMENT. IT IS NOT A SUBSTITUTE FOR A PROFESSIONAL MEDICAL DIAGNOSIS, NOR DOES IT REPLACE THE NEED FOR SERVICES PROVIDED BY MEDICAL PROFESSIONALS.</StyledParagraph>
                  <StyledParagraph>ALWAYS SEEK THE ADVICE OF YOUR PHYSICIAN, PHARMACIST OR OTHER QUALIFIED HEALTH CARE PROVIDER WITH ANY QUESTIONS YOU MAY HAVE REGARDING A MEDICAL CONDITION OR TREATMENT OR A CHANGE IN YOUR PERSONAL CARE OR HEALTH CARE REGIME. NEVER DISREGARD PROFESSIONAL MEDICAL ADVICE OR DELAY IN SEEKING IT BECAUSE OF SOMETHING YOU HAVE READ ON A SITE. WE ARE NOT RESPONSIBLE FOR THE RESULTS OF YOUR USE OF THE CONTENT, INCLUDING, BUT NOT LIMITED TO, USERS’ CHOOSING TO SEEK OR NOT TO SEEK PROFESSIONAL MEDICAL CARE, OR USERS’ CHOOSING OR NOT CHOOSING SPECIFIC TREATMENT BASED ON THE CONTENT.</StyledParagraph>
                </Box>
                 <Box style={{ paddingTop: '25px' }}>
                   <StyledParagraphHeader id="warranty">Disclaimer of Warranty</StyledParagraphHeader>
                   <StyledParagraph>WE DO NOT WARRANT OR MAKE ANY REPRESENTATIONS REGARDING THE USE, VALIDITY, ACCURACY OR RELIABILITY OF THE CONTENT AVAILABLE ON A SITE OR ANY OTHER SITES LINKED TO OR FROM A SITE. DOWNLOADING OR OTHERWISE OBTAINING ANY CONTENT THROUGH A SITE IS DONE AT YOUR OWN RISK. THE CONTENT OF A SITE IS PROVIDED “AS IS” AND ON AN “AS AVAILABLE” BASIS, WITHOUT WARRANTIES OF ANY KIND EITHER EXPRESS OR IMPLIED. TO THE FULLEST EXTENT POSSIBLE UNDER APPLICABLE LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NONINFRINGEMENT.</StyledParagraph>
                 </Box>
                 <Box style={{ paddingTop: '25px' }}>
                   <StyledParagraphHeader id="liability">Limitation of Liability</StyledParagraphHeader>
                   <StyledParagraph>WE AND OUR AFFILIATES, SUBSIDIARIES, DIVISIONS AND RELATED COMPANIES AS WELL AS OUR AGENTS, SUPPLIERS, SERVICE PROVIDERS AND RETAILERS (COLLECTIVELY, THE “RELEASEES”) WILL NOT BE LIABLE FOR ANY DAMAGES OF ANY KIND ARISING OUT OF OR RELATING TO THE USE OR THE INABILITY TO USE A SITE, A SITE’S CONTENT OR EXTERNAL LINKS, INCLUDING BUT NOT LIMITED TO DAMAGES CAUSED BY OR RELATED TO ERRORS, OMISSIONS, INTERRUPTIONS, DEFECTS, DELAY IN OPERATION OR TRANSMISSION, OR ANY COMPUTER VIRUS OR FAILURE. RELEASEES WILL ALSO NOT BE LIABLE FOR ANY INDIRECT, SPECIAL, INCIDENTAL, EXEMPLARY, PUNITIVE OR CONSEQUENTIAL DAMAGES OR ANY LOSS OF DATA OR PROFITS, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OR LIMITATION OF CERTAIN DAMAGES, SO THE ABOVE LIMITATIONS MAY NOT APPLY TO YOU. RELEASEES ALSO SHALL NOT HAVE ANY LIABILITY OR RESPONSIBILITY FOR ANY ACTS, OMISSIONS OR CONDUCT OF ANY USER OR OTHER THIRD PARTY. REGARDLESS OF THE PREVIOUS SENTENCES, IF WE ARE FOUND TO BE LIABLE, OUR LIABILITY TO YOU OR TO ANY THIRD PARTY IS LIMITED TO THE GREATER OF THE ACTUAL TOTAL AMOUNT RECEIVED BY US FROM YOU OR $100.</StyledParagraph>
                 </Box>
                 <Box style={{ paddingTop: '25px' }}>
                  <StyledParagraphHeader id="indemnity">Indemnity</StyledParagraphHeader>
                   <StyledParagraph>You agree to indemnify, defend and hold us and the Releasees and all of our directors, officers, employees, agents and contractors harmless from and against any and all claims, damages, losses, costs (including without limitation reasonable attorneys’ fees) or other expenses that arise directly or indirectly out of or from (i) your breach of any provision of this Agreement; (ii) your activities in connection with a Site; or (iii) the Content or other information you provide to us through a Site.</StyledParagraph>
                 </Box>
                 <Box style={{ paddingTop: '25px' }}>
                   <StyledParagraphHeader id="consent">Consent to Communication</StyledParagraphHeader>
                   <StyledParagraph>When you use a Site or send communications to us through a Site, you are communicating with us electronically. You consent to receive electronically any communications related to your use of a Site. We may communicate with you by email or by posting notices on the Site. You agree that all agreements, notices, disclosures and other communications that are provided to you electronically satisfy any legal requirement that such communications be in writing. All notices from us intended for receipt by you shall be deemed delivered and effective when sent to the email address you provide to us. Please note that by submitting User Content, creating a Registered User account or otherwise providing us with your email address, postal address or phone number, you are agreeing that we or our agents may contact you at that address or number in a manner consistent with our <StyledLink href="https://objectivewellness.com/privacypolicy">Privacy Statement</StyledLink>.</StyledParagraph>
                 </Box>
                 <Box style={{ paddingTop: '25px' }}>
                   <StyledParagraphHeader id="international">International Users</StyledParagraphHeader>
                   <StyledParagraph>Each Site is controlled, operated and administered by us (or our licensees or agents) from our offices within the United States of America and is not intended to subject us to the laws or jurisdiction of any state, country or territory other than that of the United States. Each claim or statement about the effectiveness of our products or comparing the effectiveness of our products is expressly limited to the United States, unless otherwise disclosed. WE DO NOT REPRESENT OR WARRANT THAT A SITE OR ANY PART THEREOF IS APPROPRIATE OR AVAILABLE FOR USE IN ANY PARTICULAR JURISDICTION OTHER THAN THE UNITED STATES. Those who choose to access a Site do so on their own initiative and at their own risk, and are responsible for complying with all local statutes, orders, regulations, rules, and other laws. You are also subject to United States export controls and are responsible for any violations of such controls, including without limitation any United States embargoes or other federal rules and regulations restricting exports. We may limit a Site’s availability, in whole or in part, to any person, geographic area or jurisdiction we choose, at any time and in our sole discretion.</StyledParagraph>
                 </Box>
              </ParagraphContainer>
            </Grid>
            <Grid>
              <ParagraphContainer>
                <StyledSubheaders id="disputes">Disputes, Arbitration and Class Action Waiver</StyledSubheaders>
                <StyledParagraph>PLEASE READ THIS SECTION CAREFULLY – IT MAY SIGNIFICANTLY AFFECT YOUR LEGAL RIGHTS, INCLUDING YOUR RIGHT TO FILE A LAWSUIT IN COURT. You and we agree that any dispute, claim or controversy arising out of or relating in any way to this Agreement, a Site or the <StyledLink href="https://objectivewellness.com/privacypolicy">Privacy Statement</StyledLink> shall be determined by binding arbitration or in small claims court. Arbitration is more informal than a lawsuit in court. Arbitration uses a neutral arbitrator instead of a judge or jury, allows for more limited discovery than in court, and is subject to very limited review by courts. You may choose to be represented by a lawyer in arbitration or proceed without one. You acknowledge that, by agreeing to this Agreement, the U.S. Federal Arbitration Act governs the interpretation and enforcement of this provision, and that you and we are each waiving the right to a trial by jury or to participate in a class action. You also agree that any dispute in connection with a Site, this Agreement or the <StyledLink href="https://objectivewellness.com/privacypolicy">Privacy Statement</StyledLink> will be governed by the laws of the State of California and the United States of America. This provision shall survive termination of this Agreement.</StyledParagraph>
                <StyledParagraph>If you elect to seek arbitration or file a small claim court action, you must first send to us, by certified mail, a written notice of your claim (“Notice”). The Notice to us must be addressed to: General Counsel, The Clorox Company, 1221 Broadway, Oakland, CA 94612. If we initiate arbitration, we will send a written Notice to an email address you have previously provided to us, if available. A Notice, whether sent by you or by us, must (a) describe the nature and basis of the claim or dispute; and (b) set forth the specific relief sought (“Demand”). If you and we do not reach an agreement to resolve the claim within 30 days after the Notice is received, you or us may commence an arbitration proceeding or file a claim in small claims court. Arbitration forms can be downloaded from <StyledLink href="www.jamsadr.com">www.jamsadr.com</StyledLink>. If you are required to pay a filing fee, after we receive Notice that you have commenced arbitration, we will promptly reimburse you for your payment of the filing fee, unless your claim is for greater than US$10,000 or the arbitrator determines the claims are frivolous, in which event you will be responsible for filing fees.</StyledParagraph>
                <StyledParagraph>The arbitration shall be administered by JAMS or its successor (“JAMS”) and conducted in accordance with the JAMS Streamlined Arbitration Rules And Procedures in effect at the time the Arbitration is initiated or, if the amount in controversy exceeds $100,000, in accordance with the JAMS Comprehensive Arbitration Rules And Procedures then in effect (respectively, the “JAMS Rules”), except to the extent that the JAMS Rules are inconsistent with this Agreement or the class action waiver described below. The arbitrator shall be selected in accordance with the JAMS Rules or the mutual agreement of the parties, and shall follow California law in adjudicating the Dispute. The arbitrator, and not any federal, state or local court or agency, shall have exclusive authority to resolve all Disputes arising out of or relating to the interpretation, applicability, enforceability or formation of this Agreement, including, but not limited to any claim that all or any part of this Agreement is void or voidable, or whether a claim is subject to arbitration. The arbitrator shall be empowered to grant whatever relief would be available in a court under law or in equity, subject to the limitations set forth herein. The arbitrator shall issue a reasoned written decision setting forth the Arbitrator’s complete determination of the Dispute and the factual findings and legal conclusions relevant to it. The arbitrator’s award shall be binding on the parties, and may be entered as a judgment in any court of competent jurisdiction.</StyledParagraph>
                <StyledParagraph>The arbitrator is bound by the terms of this Agreement. All issues are for the arbitrator to decide, including issues relating to the scope and enforceability of this arbitration agreement. Unless you and us agree otherwise, any arbitration hearings will take place in a location determined by JAMS and not more than 100 miles from your home. If your claim is for US$10,000 or less, we agree that you may choose whether the arbitration will be conducted solely on the basis of documents submitted to the arbitrator, through a telephonic hearing, or by an in-person hearing as established by the JAMS Rules. If your claim exceeds US$10,000, the right to a hearing will be determined by the JAMS Rules. In the event that the arbitration will be conducted solely on the basis of submitted documents, the arbitrator’s decision and award will be made and delivered within six (6) months of the selection of the arbitrator, unless extended by the arbitrator. Except as expressly set forth herein, the payment of all filing, administration and arbitrator fees will be governed by the JAMS Rules.</StyledParagraph>
                <StyledParagraph>YOU AND WE AGREE THAT EACH MAY BRING CLAIMS AGAINST THE OTHER ONLY IN YOUR OR OUR INDIVIDUAL CAPACITY, AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS OR REPRESENTATIVE PROCEEDING. Further, unless both you and we agree otherwise, the arbitrator may not consolidate more than one person’s claims with your claims, and may not otherwise preside over any form of a representative or class proceeding. If this specific provision is found to be unenforceable, then the entirety of this arbitration provision shall be null and void. The arbitrator may award declaratory or injunctive relief only in favor of the individual party seeking relief and only to the extent necessary to provide relief warranted by that party’s individual claim.</StyledParagraph>
                <StyledParagraph>Notwithstanding the foregoing, you and we both agree that you or we may bring suit in court to enjoin infringement or other misuse of intellectual property rights. In the event a court or arbitrator having jurisdiction finds any portion of this Agreement unenforceable, that portion shall not be effective and the remainder of the Agreement shall remain effective. No waiver, express or implied, by either party of any breach of or default under this Agreement will constitute a continuing waiver of such breach or default or be deemed to be a waiver of any preceding or subsequent breach or default.</StyledParagraph>
              </ParagraphContainer>
            </Grid>
            <Grid>
            <ParagraphContainer style={{ border: 'none', paddingBottom: 0 }}>
              <StyledSubheaders id="contact">Contacting Us</StyledSubheaders>
              <StyledParagraph>
                If you have questions about this Agreement, or if you have technical questions about the operation of a Site, please contact us through this <StyledLink href="https://cloroxconnections.custhelp.com/app/ask/cws/thecloroxcompany.com">
                  online form
                </StyledLink> or by writing us at Clorox Consumer Services, PO Box 24305, Oakland, California, 94623-1305. If you have any questions or comments about our company or our products or have other customer service needs, please <StyledLink href="https://www.thecloroxcompany.com/contact-us/">
                 click here
                </StyledLink> for information on contacting our consumer service representatives.
              </StyledParagraph>
              <StyledParagraph>
                Additionally, under California Civil Code Section 1789.3, California users are entitled to the following consumer rights notice: California residents may reach the Complaint Assistance Unit of the Division of Consumer Services of the California Department of Consumer Affairs by mail at 1625 North Market Blvd., Sacramento, CA 95834, or by telephone at <StyledLink href="tel:916-445-1254">(916) 445-1254</StyledLink> or <StyledLink href="tel:800-952-5210">(800) 952-5210</StyledLink>.
              </StyledParagraph>
            </ParagraphContainer>
          </Grid>
          </Box>
        </StyledContainer>
      </StyledBackground>
    </ScrollToTop>
  );
};

export default Terms;
