import React, { useContext } from 'react';

import { BLOCKS } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

import ProductContext from '../../contexts/ProductContext';

export default function HowItWorksTab() {
  const { content, product } = useContext(ProductContext);

  if (!content) {
    return null;
  }

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
  const border = `solid 1px ${product ? product.color : ''}`
  return (
    <div className="how-it-works-wrapper">
      <h2>{content.howItWorksHeader}</h2>
      <div className="topBlock">
        <div className="leftCol">
          {documentToReactComponents(
            content.howItWorksBlock1,
            contentfulOptions
          )}
          {/*
          <img src="https://res.cloudinary.com/dhp51sf7h/image/upload/v1566999165/pdptabs/whitepowder_ubat1z_pcde7c.png" alt="" />
          <div className="colTitle">Lorem ipsum dolor sit amet</div>
          <div className="colTextBody">Donec dapibus nunc arcu, ac blandit mi pulvinar quis. Quisque vitae magna tempus ipsum bibendum sollicitudin. Phasellus orci ligula, rhoncus non mollis vitae, posuere eu orci. Donec rutrum nunc sed ante egestas imperdiet.</div>
          */}
        </div>
        <div className="rightCol">
          {documentToReactComponents(
            content.howItWorksBlock2,
            contentfulOptions
          )}
        </div>
      </div>
      <div className="coreBenefits" style={{borderTop: border}}>
        <div className="textTitle">Core Benefits</div>
        <div className="topBlock">
          <div className="cardTop leftCol" style={{borderTop: border}}>
            {documentToReactComponents(
              content.howItWorksCoreBenefit1,
              contentfulOptions
            )}
            {/*
            <div className="blockTitle">
              <img src="https://res.cloudinary.com/dhp51sf7h/image/upload/v1566999165/pdptabs/icon-leaf_ddlnrr_hiauaw.png" alt="" />
              <h6>Nutrition</h6>
            </div>
            <div className="blockTextBody">Donec dapibus nunc arcu, ac blandit mi pulvinar quis. Quisque vitae magna tempus ipsum bibendum sollicitudin. Phasellus orci ligula, rhoncus non mollis vitae, posuere eu orci. Donec rutrum nunc sed ante egestas imperdiet.</div>
            <ul>
              <li>Aliquam posuere vehicula</li>
              <li>In hac habitasse platea dictumst</li>
              <li>Fusce neque nulla</li>
            </ul>
            <div className="blockMisc"></div>
            */}
          </div>
          <div className="cardTop rightCol" style={{borderTop: border, borderLeft: border}}>
            {documentToReactComponents(
              content.howItWorksCoreBenefit2,
              contentfulOptions
            )}
          </div>
        </div>
        <div className="bottomBlock">
          <div className="cardBottom leftCol" style={{borderTop: border}}>
            <div className="textTitle textTitleBotom" style={{borderBottom: border}}>Who This is For</div>
            <div className="content">
              {documentToReactComponents(
                content.howItWorksWhoThisIsFor,
                contentfulOptions
              )}
            </div>
          </div>
          <div className="cardBottom rightCol" style={{borderTop: border, borderLeft: border}}>
            <div className="textTitle textTitleBotom" style={{borderBottom: border}}>Clinical Results</div>
            <div className="content">
              {documentToReactComponents(
                content.howItWorksClinicalResults,
                contentfulOptions
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
