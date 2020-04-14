import React, { useContext } from 'react';

import ProductContext from '../../contexts/ProductContext';

const ServingList = ({ data }) => {
  if (data) {
    const servings = data.map(serving => <li>{serving}</li>);

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
    const notes = data.map(note => <li>{note.replace(/\|/g, ',')}</li>);

    return <ul className="fineprint">{notes}</ul>;
  }

  return null;
};

const OtherIngredients = ({ data }) => {
  if (data) {
    const otherIngredients = data.map(otherIngredient => <p>{otherIngredient.replace(/\|/g, ',')}</p>);

    return (
      <>
        <h6>Other Ingredients</h6>
        <div>{otherIngredients}</div>
      </>
    );
  }

  return null;
};

const ImportantNotes = ({ data }) => {
  if (data) {
    const importantNotes = data.map(note => <li>{note.replace(/\|/g, ',')}</li>);

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
  const { content, product } = useContext(ProductContext);

  if (!content) {
    return null;
  }
  const border1 = `solid 1px ${product ? product.color : ''}`;
  const border2 = `solid 2px ${product ? product.color : ''}`;

  let ingredientList = null;
  if (!content.supplementFactsIngredientsParagraph) {
    ingredientList = content.supplementFactsIngredients.map(ingredient => (
      <tr>
        <td dangerouslySetInnerHTML={{ __html: ingredient.ingredient }} style={{ border: border1 }}></td>
        <td align="center" style={{ border: border1 }}>
          {ingredient.amount}
        </td>
        <td align="center" style={{ border: border1 }}>
          {ingredient.daily_value}
        </td>
      </tr>
    ));
  } else {
    ingredientList = (
      <div className="ingredients-pg" style={{ border: border1, padding: 20 }}>
        {content.supplementFactsIngredientsParagraph}
      </div>
    );
  }

  return (
    <div className="label-info-wrapper">
      {content && content.supplementFactsTitle ? (
        <h2>{content.supplementFactsTitle}</h2>
      ) : (
          <h2>Supplement FactsSSSS</h2>
        )}
      <div className="top-block" style={{ borderTop: border2 }}>
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
          ) : (
              <table>
                <thead>
                  <tr>
                    <th style={{ border: border1 }}>Each Serving Contains</th>
                    <th align="center" style={{ border: border1 }}>
                      Amount
                  </th>
                    <th align="center" style={{ border: border1 }}>
                      % Daily Value
                  </th>
                  </tr>
                </thead>
                <tbody>{ingredientList}</tbody>
              </table>
            )}
          <ServingNotes data={content.supplementFactsServingNotes} />
        </div>
      </div>
      <div className="bottom-block" style={{ borderTop: border1 }}>
        <div className="card other-ingredients" style={{ borderRight: border1 }}>
          <OtherIngredients data={content.supplementFactsOtherIngredients} />
        </div>
        <div className="card important">
          <ImportantNotes data={content.supplementFactsImportant} />
        </div>
      </div>
    </div>
  );
}
