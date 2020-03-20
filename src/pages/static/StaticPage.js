import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@material-ui/core/Box';
import { requestPage } from '../../modules/static/actions';

const StaticPage = ({ location }) => {
  // const [featuredMain, setFeaturedMain] = useState({});
  const dispatch = useDispatch();
  const { log } = console;
  const contentfulEntries = useSelector(state => state.page.items);

  const transformMetadata = metaEntries => {
    const metaFields = metaEntries.reduce((metaObj, { fields }) => {
      const metaStyles = Object.keys(fields).filter(each => each !== 'contentType' && each !== 'pageName');
      const metaData = metaStyles.reduce((obj, each) => {
        if (!obj[each]) {
          obj[each] = fields[each];
        }
        return obj;
      }, {});

      for (const [key, value] of Object.entries(fields)) {
        if (key === 'contentType') {
          metaObj.type = value;
        }
        if (key === 'pageName') {
          if (value.toLowerCase().includes('desktop')) {
            metaObj.desktopStyle = { ...metaData };
          }
          if (value.toLowerCase().includes('mobile')) {
            metaObj.mobileStyle = { ...metaData };
          }
        }
      }
      return metaObj;
    }, {});
    return metaFields;
  };

  const transformData = entries => {
    const currentEntries = entries;
    // log('testing+++', currentEntries); // {data:{}. content:[], nodeType: ''}
  };
  // START
  if (contentfulEntries) {
    const object = {};
    const mainContent = contentfulEntries[0].fields.content.map(({ fields }) => {
      const metaDataSection = transformMetadata(fields.metadata);
      // const sectionValue = transformData(fields.content);
      log('testing', fields);
    });
  }

  useEffect(() => {
    dispatch(requestPage('staticpage'));
    console.log('this results');
  }, []);

  return (
    <>
      <Box py={8}>
        <h1>Contentful</h1>
      </Box>
    </>
  );
};

export default StaticPage;
