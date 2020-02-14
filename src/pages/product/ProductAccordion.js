import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import { BLOCKS } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Panel, Dialog } from '../../components/common';

const plusIcon = require('../../assets/images/plus_symbol.svg');
const magnifierIcon = require('../../assets/images/magnifier.svg');
const contentfulOptions = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: node => {
      let params = '?w=555&fm=jpg&q=50';

      if (window.screen.width < 768) {
        params = '?w=450&fm=jpg&q=50';
      }

      return (
        <img
          src={node.data.target.fields.file.url + params}
          alt={node.data.target.fields.title}
        />
      );
    }
  }
};

const ProductAccordion = ({ content }) => {
  const [expandedPanelIndex, setExpandedPanelIndex] = useState(null);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const onPanelChange = (expanded, panelIndex) => {
    if (!expanded) {
      setExpandedPanelIndex(null);
    } else {
      setExpandedPanelIndex(panelIndex);
    }
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('scroll'));
    }, 500);
  };
  const openClinicalResultsImageModal = () => setImageModalOpen(true);
  const closeClinicalResultsImageModal = () => setImageModalOpen(false);
  const {
    clinicalResults,
    clinicalResultsEnlargedImage,
    ingredients,
    directions = { summary: '', details: [] },
    frequentlyAskedQuestions,
    supplementFactsIngredientsParagraph = null,
    supplementFactsIngredients = [],
    supplementFactsNotes,
    supplementFactsOtherIngredients = [],
    supplementFactsImportant = []
  } = content;
  const accordionItems = [
    {
      title: 'Clinical Results',
      className: 'clinical-results',
      content: (
        <>
          <Box className="contentful-container">
            {documentToReactComponents(clinicalResults, contentfulOptions)}
          </Box>
          {clinicalResultsEnlargedImage && (
            <Box className="magnifier-container">
              <IconButton onClick={openClinicalResultsImageModal}>
                <img src={magnifierIcon} alt="" />
              </IconButton>
            </Box>
          )}
          <Dialog
            onClose={closeClinicalResultsImageModal}
            open={imageModalOpen}
          >
            <Box mt="-51.5px">
              {clinicalResultsEnlargedImage && (
                <img
                  src={clinicalResultsEnlargedImage.fields.file.url}
                  alt=""
                  width="100%"
                  height="auto"
                  style={{ marginBottom: -4 }}
                />
              )}
            </Box>
          </Dialog>
        </>
      )
    },
    {
      title: 'Ingredients',
      className: 'ingredients',
      content: documentToReactComponents(ingredients, contentfulOptions)
    },
    {
      title: 'Directions',
      className: 'directions',
      content: (
        <>
          <Box className="summary">{directions.summary}</Box>
          <Box className="details">
            {directions.details.map((detail, index) => (
              <Box className="entry" key={`entry_${index.toString()}`}>
                <Box className="icon">
                  <img src={detail.icon} alt="" />
                </Box>
                <Box className="text">{detail.label}</Box>
              </Box>
            ))}
          </Box>
        </>
      )
    },
    {
      title: 'Frequently Asked Questions',
      className: 'faqs',
      content: documentToReactComponents(
        frequentlyAskedQuestions,
        contentfulOptions
      )
    },
    {
      title: 'Supplement Facts',
      className: 'supplement-facts',
      content: (
        <>
          <Box className="ingredients">
            {supplementFactsIngredientsParagraph ? (
              <Box className="ingredients-pg">
                {supplementFactsIngredientsParagraph}
              </Box>
            ) : (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Each serving contains</TableCell>
                    <TableCell width="87px">Amount</TableCell>
                    <TableCell width="90px">% Daily Value</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {supplementFactsIngredients.map((ingredient, index) => (
                    <TableRow key={`tr_${index.toString()}`}>
                      <TableCell
                        dangerouslySetInnerHTML={{
                          __html: ingredient.ingredient
                        }}
                      />
                      <TableCell>{ingredient.amount}</TableCell>
                      <TableCell>{ingredient.daily_value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </Box>
          <Box className="notes">
            {documentToReactComponents(supplementFactsNotes, contentfulOptions)}
          </Box>
          <Box className="other-ingredients">
            <Typography variant="h4">Other Ingredients</Typography>
            <List disablePadding>
              {supplementFactsOtherIngredients.map((otherIngredient, index) => (
                <ListItem
                  key={`other-ingredient-${index.toString()}`}
                  disableGutters
                >
                  <Typography component="span">
                    {otherIngredient.replace(/\|/g, ',')}
                  </Typography>
                </ListItem>
              ))}
            </List>
          </Box>
          <Box className="important">
            <Typography variant="h4">Important</Typography>
            <List disablePadding>
              {supplementFactsImportant.map((important, index) => (
                <ListItem key={`important-${index.toString()}`} disableGutters>
                  <Typography component="span">
                    {important.replace(/\|/g, ',')}
                  </Typography>
                </ListItem>
              ))}
            </List>
          </Box>
        </>
      )
    }
  ];

  return (
    <>
      {accordionItems.map((accordionItem, index) => (
        <Panel
          key={`accordion_item_${index.toString()}`}
          title={
            <Box className="expansion-panel-title">
              <Box className="title-text">{accordionItem.title}</Box>
              <Box className="collapse-icon">
                <img src={plusIcon} alt="" />
              </Box>
            </Box>
          }
          collapsible
          hideExpandIcon
          expanded={expandedPanelIndex === index}
          onChange={e => onPanelChange(e, index)}
        >
          <Box className={accordionItem.className}>{accordionItem.content}</Box>
        </Panel>
      ))}
    </>
  );
};

ProductAccordion.propTypes = {
  content: PropTypes.shape({
    clinicalResults: PropTypes.any,
    clinicalResultsEnlargedImage: PropTypes.any,
    ingredients: PropTypes.any,
    directions: PropTypes.shape({
      summary: PropTypes.string,
      details: PropTypes.array
    }),
    frequentlyAskedQuestions: PropTypes.any,
    supplementFactsIngredientsParagraph: PropTypes.any,
    supplementFactsIngredients: PropTypes.arrayOf(
      PropTypes.shape({
        ingredient: PropTypes.string,
        amount: PropTypes.string,
        dailyValue: PropTypes.string
      })
    ),
    supplementFactsNotes: PropTypes.any,
    supplementFactsOtherIngredients: PropTypes.arrayOf(PropTypes.string),
    supplementFactsImportant: PropTypes.arrayOf(PropTypes.string)
  })
};

export default ProductAccordion;
