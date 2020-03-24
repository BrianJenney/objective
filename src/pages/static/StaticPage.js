import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@material-ui/core/Box';
import { requestPage } from '../../modules/static/actions';

const StaticPage = ({ location }) => {
  // const [featuredMain, setFeaturedMain] = useState({});
  const { log } = console;
  const dispatch = useDispatch();
  const contentfulEntries = useSelector(state => state.page.items);
  let mainDataObj = {};
  let storage = {};
  let columnComponent = { value: { components: [] } };
  // let columnOneObj = {};
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

  const transformNavLink = (store, entries) => {
    if (!entries.content) {
    } else {
      entries.content.map(entry => transformNavLink(store, entry));
    }
    if (entries.nodeType === 'hyperlink') {
      return store.push({
        scroll: entries.data.uri,
        label: entries.content[0].value
      });
    }
    return store;
  };

  const transformHero = (store, entries) => {
    if (!entries.content) {
    } else {
      entries.content.map(entry => transformHero(store, entry));
    }
    if (entries.nodeType === 'embedded-asset-block') {
      const { title } = entries.data.target.fields;
      const imgURL = entries.data.target.fields.file.url;
      if (title.toLowerCase().includes('desktop')) {
        return (store.desktopImg = `https:${imgURL}`);
      }
      if (title.toLowerCase().includes('mobile')) {
        return (store.mobileImg = `https:${imgURL}`);
      }
    }
    return store;
  };

  const transformTitle = (store, entries) => {
    if (!entries.content) {
    } else {
      entries.content.map(entry => transformTitle(store, entry));
    }
    if (entries.value) {
      return (store.value = entries.value);
    }
    return store;
  };

  const transformParagraph = (store, entries, length) => {
    // log('testing-PARA-ENTRY', entries, store);
    if (!entries.content) {
    } else {
      entries.content.map(entry => transformParagraph(store, entry, length));
    }

    if (entries.value) {
      return store.push(entries.value);
    }
    return store;
  };

  // const transformBox = (store, entries, container) => {
  //   // log('testing-BOX-ENTRY', entries);
  //   if (!entries.content) {
  //   } else {
  //     entries.content.map(entry => transformBox(store, entry, container));
  //   }
  //   if (entries.nodeType === 'embedded-entry-block') {
  //     const { fields } = entries.data.target;
  //     const entryContent = transformContent(fields, store);
  //     container.value.components.push(entryContent);
  //     return container;
  //   }
  //   // return container;
  // };

  const transformOneColumn = (store, entries, prevStore) => {
    if (!entries.content) {
      return null;
    }
    entries.content.map(entry => transformOneColumn(store, entry, prevStore));

    // log('testing-ENTRIES', entries);
    if (entries.nodeType === 'embedded-entry-block') {
      const { fields } = entries.data.target;
      store = transformContent(fields, {});
      if (store) {
        prevStore.value.components.push(store);
      }
    }
    return prevStore;
  };

  const transformContent = (fields, storeContent, storeContainer) => {
    // log('++TESTING++CONTENT++', fields);
    const metaDataSection = transformMetadata(fields.metadata);

    if (metaDataSection.type === 'navigation') {
      if (fields.name.toLowerCase().includes('mobile')) {
        const navLinkData = transformNavLink([], fields.content);
        storage.value = navLinkData;
      }
      if (fields.name.toLowerCase().includes('desktop')) {
        const navLinkData = transformNavLink([], fields.content);
        storage.value = navLinkData;
      }
      storeContent.components.push({
        ...storage,
        ...metaDataSection
      });
      storage = {};
    }

    if (metaDataSection.type === 'title' || metaDataSection.type === 'subTitle') {
      const titleData = transformTitle({}, fields.content);
      // log('testing-TITLE-DATA', titleData);
      // log('testing-STORECONTENT', storeContent);
      storeContent.components.push({
        ...titleData,
        ...metaDataSection
      });
    }
    if (metaDataSection.type === 'hero') {
      const heroData = transformHero({}, fields.content);
      storeContent.components.push({
        ...heroData,
        ...metaDataSection
      });
    }

    if (
      metaDataSection.type === 'paragraph' ||
      metaDataSection.type === 'list' ||
      metaDataSection.type === 'boxTitle' ||
      metaDataSection.type === 'sectionTitle'
    ) {
      const paragraphData = transformParagraph([], fields.content);
      // log('TESTING++DATA', paragraphData);
      storeContent = { value: paragraphData, ...metaDataSection };
      // log('testing-STORE-CONTENT', storeContent, storeContainer);
      return storeContent;
    }
    columnComponent = { value: { components: [] } };
    storage = {};
    if (metaDataSection.type === 'oneColumn' || metaDataSection.type === 'box') {
      columnComponent = { ...metaDataSection, ...columnComponent };
      // log('testing-META', metaDataSection, columnComponent);
      const columnData = transformOneColumn({}, fields.content, columnComponent);
      if (columnData.type === 'box') {
        storage = columnData;
      }
      if (columnData.type === 'oneColumn') {
        columnComponent = columnData;
        columnComponent.value.components.push(storage);
        if (storeContent.components) {
          storeContent.components.push(columnComponent);
        }
      }
    }
  };
  // START
  if (contentfulEntries) {
    const { template, slug, content } = contentfulEntries[0].fields;
    mainDataObj = {
      template,
      slug,
      components: []
    };

    content.map(({ fields }) => {
      transformContent(fields, mainDataObj);
    });
  }
  log('+++TESTING+++', mainDataObj);

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
