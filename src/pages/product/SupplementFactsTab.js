import React, { useContext } from 'react';

import { BLOCKS } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

import ProductContext from '../../contexts/ProductContext';

export default function SupplementFactsTab() {
  const { content } = useContext(ProductContext);

  if (!content) {
    return null;
  }

  const servingList = content.supplementFactsServing.map(serving => (
    <li>{serving}</li>
  ));

  let ingredientList = null;
  if (!content.supplementFactsIngredientsParagraph) {
    ingredientList = content.supplementFactsIngredients.map(ingredient => (
      <tr>
        <td dangerouslySetInnerHTML={{ __html: ingredient.ingredient }}></td>
        <td align="center">{ingredient.amount}</td>
        <td align="center">{ingredient.daily_value}</td>
      </tr>
    ));
  } else {
    ingredientList = content.supplementFactsIngredientsParagraph;
  }

  const servingNotes = content.supplementFactsServingNotes.map(note => (
    <li>{note.replace(/\|/g, ',')}</li>
  ));

  const otherIngredients = content.supplementFactsOtherIngredients.map(
    otherIngredient => <li>{otherIngredient.replace(/\|/g, ',')}</li>
  );

  const importantNotes = content.supplementFactsImportant.map(note => {
    return <li>{note.replace(/\|/g, ',')}</li>;
  });

  return (
    <div className="label-info-wrapper">
      <h2>Supplement Facts</h2>
      <div className="top-block">
        <div className="flex-desktop">
          <div className="card facts-text">
            <div>
              <h6>Serving</h6>
              <ul>{servingList}</ul>
            </div>
          </div>
          <div className="card facts-text">
            <div>
              <h6>Directions</h6>
              <p>{content.supplementFactsDirections}</p>
            </div>
          </div>
        </div>
        <div className="card facts-table">
          {content.supplementFactsIngredientsParagraph ? (
            ingredientList
          ): (
            <table>
              <thead>
                <tr>
                  <th>Each Serving Contains</th>
                  <th align="center">Amount</th>
                  <th align="center">% Daily Value</th>
                </tr>
              </thead>
              <tbody>{ingredientList}</tbody>
            </table>
          )}
          <ul className="fineprint">{servingNotes}</ul>
        </div>
      </div>
      <div className="bottom-block">
        <div className="card other-ingredients">
          <h6>Other Ingredients</h6>
          <ul>{otherIngredients}</ul>
        </div>
        <div className="card important">
          <h6>Important</h6>
          <ul>{importantNotes}</ul>
        </div>
      </div>
    </div>
  );
}
