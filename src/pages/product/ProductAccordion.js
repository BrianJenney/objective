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
  };
  const openClinicalResultsImageModal = () => setImageModalOpen(true);
  const closeClinicalResultsImageModal = () => setImageModalOpen(false);
  const accordionItems = [
    {
      title: 'Clinical Results',
      className: 'clinical-results',
      content: (
        <>
          <Box className="contentful-container">
            {documentToReactComponents(
              content.clinicalResults,
              contentfulOptions
            )}
          </Box>
          <Box className="magnifier-container">
            <IconButton onClick={openClinicalResultsImageModal}>
              <img src={magnifierIcon} alt="" />
            </IconButton>
          </Box>
        </>
      )
    },
    {
      title: 'Ingredients',
      className: 'ingredients',
      content: documentToReactComponents(content.ingredients, contentfulOptions)
    },
    {
      title: 'Directions',
      className: 'directions',
      content: (
        <>
          <Box className="summary">{content.directions.summary}</Box>
          <Box className="details">
            <Box className="entry">
              <Box className="icon">
                <img src={content.directions.details[0].icon} alt="" />
              </Box>
              <Box className="text">{content.directions.details[0].label}</Box>
            </Box>
            <Box className="entry">
              <Box className="icon">
                <img src={content.directions.details[1].icon} alt="" />
              </Box>
              <Box className="text">{content.directions.details[1].label}</Box>
            </Box>
          </Box>
        </>
      )
    },
    {
      title: 'Frequently Asked Questions',
      className: 'faqs',
      content: documentToReactComponents(
        content.frequentlyAskedQuestions,
        contentfulOptions
      )
    },
    {
      title: 'Supplement Facts',
      className: 'supplement-facts',
      content: (
        <>
          <Box className="ingredients">
            {content.supplementFactsIngredientsParagraph ? (
              <Box className="ingredients-pg">
                {content.supplementFactsIngredientsParagraph}
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
                  {content.supplementFactsIngredients.map(
                    (ingredient, index) => (
                      <TableRow key={`tr_${index.toString()}`}>
                        <TableCell>{ingredient.ingredient}</TableCell>
                        <TableCell>{ingredient.amount}</TableCell>
                        <TableCell>{ingredient.dailyValue}</TableCell>
                      </TableRow>
                    )
                  )}
                </TableBody>
              </Table>
            )}
          </Box>
          <Box className="notes">
            {documentToReactComponents(
              content.supplementFactsNotes,
              contentfulOptions
            )}
          </Box>
          <Box className="other-ingredients">
            <Typography variant="h4">Other Ingredients</Typography>
            <List disablePadding>
              {content.supplementFactsOtherIngredients.map(
                (otherIngredient, index) => (
                  <ListItem
                    key={`other-ingredient-${index.toString()}`}
                    disableGutters
                  >
                    <Typography component="span">
                      {otherIngredient.replace(/\|/g, ',')}
                    </Typography>
                  </ListItem>
                )
              )}
            </List>
          </Box>
          <Box className="important">
            <Typography variant="h4">Important</Typography>
            <List disablePadding>
              {content.supplementFactsImportant.map((important, index) => (
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
      <Dialog onClose={closeClinicalResultsImageModal} open={imageModalOpen}>
        <Box mx={4} p={5}>
          <img
            src={content.clinicalResults.content[1].data.target.fields.file.url}
            alt=""
            width="100%"
            height="auto"
          />
        </Box>
      </Dialog>
    </>
  );
};

ProductAccordion.propTypes = {
  content: PropTypes.shape({
    clinicalResults: PropTypes.any,
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
