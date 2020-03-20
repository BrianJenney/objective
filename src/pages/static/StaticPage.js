import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@material-ui/core/Box';
import { requestPage } from '../../modules/static/actions';

const StaticPage = ({ location }) => {
  // const [featuredMain, setFeaturedMain] = useState({});
  const { log } = console;
  const dispatch = useDispatch();
  const contentfulEntries = useSelector(state => state.page.items);
  let dataObj = {};
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
          } else if (value.toLowerCase().includes('mobile')) {
            metaObj.mobileStyle = { ...metaData };
          } else {
            metaObj.style = { ...metaData };
          }
        }
      }
      return metaObj;
    }, {});
    return metaFields;
  };

  const transformNavLink = (name, store, entries) => {
    if (!entries.content) {
    } else {
      entries.content.map(entry => transformNavLink(name, store, entry));
    }
    if (entries.nodeType === 'hyperlink') {
      store.push({
        scroll: entries.data.uri,
        label: entries.content[0].value
      });
    }
    return store;
  };

  const transformTitle = (store, entries) => {
    if (!entries.content) {
    } else {
      entries.content.map(entry => transformTitle(store, entry));
    }
    if (entries.value) {
      store.push(entries.value);
    }
    return store;
  };

  // START
  if (contentfulEntries) {
    let currentStore = {};
    const { template, slug, content } = contentfulEntries[0].fields;
    dataObj = {
      template,
      slug,
      components: []
    };
    const mainContent = content.map(({ fields }) => {
      log('testing-fields', fields);
      const metaDataSection = transformMetadata(fields.metadata);
      log('testing-METADATA', metaDataSection);
      if (metaDataSection.type === 'navigation') {
        if (fields.name.toLowerCase().includes('mobile')) {
          const navLinkData = transformNavLink(fields.name, [], fields.content);
          currentStore.value = navLinkData;
        }
        if (fields.name.toLowerCase().includes('desktop')) {
          const navLinkData = transformNavLink(fields.name, [], fields.content);
          currentStore.value = navLinkData;
        }
        dataObj.components.push({
          ...currentStore,
          ...metaDataSection
        });
      }
      currentStore = {};
      if (metaDataSection.type === 'title') {
        const titleData = transformTitle([], fields.content);
        currentStore.value = titleData;
        dataObj.components.push({
          ...currentStore,
          ...metaDataSection
        });
      }
    });
  }
  log('TESTING---', dataObj);

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
