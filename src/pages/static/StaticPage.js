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
      return (store.img = `https: ${imgURL}`);
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

  const transformText = (store, entries, length) => {
    if (!entries.content) {
    } else {
      entries.content.map(entry => transformText(store, entry, length));
    }
    if (entries.value) {
      return store.push(entries.value);
    }
    return store;
  };

  const transformOneColumn = (store, entries, prevStore) => {
    if (!entries.content) {
      return null;
    }
    entries.content.map(entry => transformOneColumn(store, entry, prevStore));
    // log('testing-ENTRY@@@', entries);
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
    columnComponent = { value: { components: [] } };
    storage = {};
    const metaDataSection = transformMetadata(fields.metadata);

    if (metaDataSection.type === 'navigation' || metaDataSection.type === 'button') {
      if (fields.name.toLowerCase().includes('mobile')) {
        const navLinkData = transformNavLink([], fields.content);
        storage.value = navLinkData;
      } else if (fields.name.toLowerCase().includes('desktop')) {
        const navLinkData = transformNavLink([], fields.content);
        storage.value = navLinkData;
      }
      if (metaDataSection.type === 'button') {
        const navButton = transformNavLink([], fields.content);
        const btnStyle = Object.keys(metaDataSection.style).filter(
          key => key !== 'productSkuAndQty' && key !== 'coupon' && key !== 'url'
        );
        const metaDataBtn = btnStyle.reduce((metaObj, key) => {
          if (!metaObj[key]) {
            metaObj[key] = metaDataSection.style[key];
          }
          return metaObj;
        }, {});

        storage = {
          value: navButton[0].label,
          skuAndQty: metaDataSection.style.productSkuAndQty,
          coupon: metaDataSection.style.coupon,
          URL: metaDataSection.style.url,
          style: metaDataBtn
        };
      }
      if (storeContent.components) {
        storeContent.components.push({
          ...storage,
          ...metaDataSection
        });
      }
    }

    if (
      metaDataSection.type === 'title' ||
      metaDataSection.type === 'subTitle' ||
      metaDataSection.type === 'banner' ||
      metaDataSection.type === 'sectionTitle' ||
      metaDataSection.type === 'boxTitle'
    ) {
      const titleData = transformTitle({}, fields.content);
      if (storeContent.components) {
        storeContent.components.push({
          ...titleData,
          ...metaDataSection
        });
      }
      return { ...titleData, ...metaDataSection };
    }
    if (metaDataSection.type === 'hero' || metaDataSection.type === 'image') {
      const heroData = transformHero({}, fields.content);
      if (storeContent.components) {
        storeContent.components.push({
          ...heroData,
          ...metaDataSection
        });
      }
      return { ...heroData, ...metaDataSection };
    }

    if (metaDataSection.type === 'paragraph' || metaDataSection.type === 'list') {
      let paragraphData = transformText([], fields.content);
      if (metaDataSection.type === 'boxTitle' || metaDataSection.type === 'sectionTitle') {
        paragraphData = paragraphData.toString();
      }
      storeContent = { value: paragraphData, ...metaDataSection };
      return storeContent;
    }

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
