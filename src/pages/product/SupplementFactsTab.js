import React, { useContext } from 'react';

import ProductContext from '../../contexts/ProductContext';

const ServingList = ({ data }) => {
  if (data) {
    let servings = data.map(
      serving => <li>{serving}</li>
    );

    return (
      <div>
        <h6>Serving</h6>
        <ul>{servings}</ul>
      </div>
    );
  }

  return null;
};

const ServingNotes = ({ data }) => {
  if (data) {
    let notes = data.map(
      note => <li>{note.replace(/\|/g, ',')}</li>
    );

    return (
      <ul className="fineprint">{notes}</ul>
    );
  }

  return null;
};

const OtherIngredients = ({ data }) => {
  if (data) {
    let otherIngredients = data.map(
      otherIngredient => <li>{otherIngredient.replace(/\|/g, ',')}</li>
    );

    return (
      <>
        <h6>Other Ingredients</h6>
        <ul>{otherIngredients}</ul>
      </>
    );
  }

  return null;
};

const ImportantNotes = ({ data }) => {
  if (data) {
    let importantNotes = data.map(
      note => <li>{note.replace(/\|/g, ',')}</li>
    );

    return (
      <>
        <h6>Important</h6>
        <ul>{importantNotes}</ul>
      </>
    );
  }

  return null;
};

export default function SupplementFactsTab() {
  const { content } = useContext(ProductContext);

  if (!content) {
    return null;
  }

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

  return (
    <div className="label-info-wrapper">
      <h2>Supplement Facts</h2>
      <div className="top-block">
        <div className="flex-desktop">
          <div className="card facts-text">
            <ServingList data={content.supplementFactsServing} />
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
          <ServingNotes data={content.supplementFactsServingNotes} />
        </div>
      </div>
      <div className="bottom-block">
        <div className="card other-ingredients">
          <OtherIngredients data={content.supplementFactsOtherIngredients} />
        </div>
        <div className="card important">
          <ImportantNotes data={content.supplementFactsImportant} />
        </div>
      </div>
    </div>
  );
}
