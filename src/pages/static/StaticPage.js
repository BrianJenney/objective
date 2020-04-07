import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@material-ui/core/Box';
import { requestPage } from '../../modules/static/actions';

const StaticPage = ({ location }) => {
  // const [featuredMain, setFeaturedMain] = useState({});
  const dispatch = useDispatch();
  const contentfulEntries = useSelector(state => state.page.items);

  let mainDataObj = {};
  let storage = {};
  let columnComponent = { value: { components: [] } };
  const tableComponent = [];
  const transformMetadata = (metaEntries, name = null) => {
    const metaFields = metaEntries.reduce(
      (metaObj, { fields }) => {
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
              metaObj.desktopStyle = { ...metaData };
            }
          }
        }
        if (name) {
          metaObj.name = name;
        }
        return metaObj;
      },
      { desktopStyle: {}, mobileStyle: {} }
    );
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
      store.desktopImg = `https:${imgURL}`;
      store.mobileImg = `https:${imgURL}`;
      return store;
    }
    if (entries.nodeType === 'embedded-entry-block') {
      const { fields } = entries.data.target;
      return (store.caption = transformContent(fields, {}));
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

  const addStyles = (styles, value) => {
    let paraWithMultiStyles = '';
    styles.forEach(each => {
      if (!paraWithMultiStyles) {
        paraWithMultiStyles = value;
      }
      if (each.type === 'bold') {
        paraWithMultiStyles = `<b>${paraWithMultiStyles}</b>`;
      }
      if (each.type === 'italic') {
        paraWithMultiStyles = `<i>${paraWithMultiStyles}</i>`;
      }
      if (each.type === 'underline') {
        paraWithMultiStyles = `<u>${paraWithMultiStyles}</u>`;
      }
    });
    return paraWithMultiStyles;
  };

  const transformText = (store, entries, length) => {
    if (entries.nodeType === 'paragraph' && entries.content.length >= 2) {
      const sameLinePara = [];
      let paraWithStyle = '';

      for (let i = 0; i < entries.content.length; i++) {
        if (entries.content[i].nodeType === 'hyperlink') {
          if (entries.content[i].content[0].marks.length > 0) {
            paraWithStyle = addStyles(entries.content[i].content[0].marks, entries.content[i].content[0].value);
          }
          paraWithStyle = `<a href=${entries.content[i].data.uri}>${paraWithStyle}</a>`;
          sameLinePara.push(paraWithStyle);
        }
        if (entries.content[i].nodeType === 'text' && entries.content[i].value.length) {
          if (entries.content[i].marks.length) {
            paraWithStyle = addStyles(entries.content[i].marks, entries.content[i].value);
            sameLinePara.push(paraWithStyle);
          } else {
            sameLinePara.push(entries.content[i].value);
          }
        }
      }
      return store.push(sameLinePara.join(''));
    }
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
    columnComponent = { value: { components: [] } };
    storage = {};
    const metaDataSection = transformMetadata(fields.properties, fields.name);

    if (metaDataSection.type === 'navigation' || metaDataSection.type === 'button') {
      if (fields.name.toLowerCase().includes('mobile')) {
        const navLinkData = transformNavLink([], fields.content);
        storage.value = navLinkData;
      } else if (fields.name.toLowerCase().includes('desktop')) {
        const navLinkData = transformNavLink([], fields.content);
        storage.value = navLinkData;
      }
      if (metaDataSection.type === 'button') {
        let btnDesktopStyle;
        let btnMobileStyle;
        const navButton = transformNavLink([], fields.content);
        if (metaDataSection.desktopStyle) {
          const metaDesktop = Object.keys(metaDataSection.desktopStyle).filter(
            key => key !== 'productSkuAndQty' && key !== 'coupon' && key !== 'url'
          );
          btnDesktopStyle = metaDesktop.reduce((metaObj, key) => {
            if (!metaObj[key]) {
              metaObj[key] = metaDataSection.desktopStyle[key];
            }
            return metaObj;
          }, {});
        }
        if (metaDataSection.mobileStyle) {
          const metaMobile = Object.keys(metaDataSection.mobileStyle).filter(
            key => key !== 'productSkuAndQty' && key !== 'coupon' && key !== 'url'
          );
          btnMobileStyle = metaMobile.reduce((metaObj, key) => {
            if (!metaObj[key]) {
              metaObj[key] = metaDataSection.mobileStyle[key];
            }
            return metaObj;
          }, {});
        }

        storage = {
          type: metaDataSection.type,
          value: navButton[0].label,
          skuAndQty: metaDataSection.desktopStyle.productSkuAndQty,
          coupon: metaDataSection.desktopStyle.coupon,
          URL: metaDataSection.desktopStyle.url,
          desktopStyle: btnDesktopStyle,
          mobileStyle: btnMobileStyle
        };
      }

      if (storeContent.components) {
        storeContent.components.push({
          ...storage,
          ...metaDataSection
        });
      }
      return { ...storage, ...metaDataSection };
    }

    if (
      metaDataSection.type === 'pageTitle' ||
      metaDataSection.type === 'pageSubTitle' ||
      metaDataSection.type === 'banner' ||
      metaDataSection.type === 'sectionTitle' ||
      metaDataSection.type === 'boxTitle' ||
      metaDataSection.type === 'boxSubTitle' ||
      metaDataSection.type === 'imageCaption' ||
      metaDataSection.type === 'tableHead' ||
      metaDataSection.type === 'sectionSubTitle'
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

    if (
      metaDataSection.type === 'paragraph' ||
      metaDataSection.type === 'list' ||
      metaDataSection.type === 'tableBody'
    ) {
      const paragraphData = transformText([], fields.content);

      if (storeContent.components) {
        storeContent.components.push({
          value: paragraphData,
          ...metaDataSection
        });
      }
      return { value: paragraphData, ...metaDataSection };
    }

    if (
      metaDataSection.type === 'oneColSection' ||
      metaDataSection.type === 'box' ||
      metaDataSection.type === 'table' ||
      metaDataSection.type === 'tableContainer' ||
      metaDataSection.type === 'container' ||
      metaDataSection.type === 'twoColSection'
    ) {
      columnComponent = { ...metaDataSection, ...columnComponent };

      const columnData = transformOneColumn({}, fields.content, columnComponent);

      if (columnData.type === 'box' || columnData.type === 'container') {
        return columnData;
      }
      if (columnData.type === 'table') {
        storage = { value: { components: tableComponent }, ...metaDataSection };
        return storage;
      }
      if (columnData.type === 'tableContainer') {
        tableComponent.push(columnData);
      }
      if (columnData.type === 'oneColSection') {
        columnComponent = columnData;
        if (storage.length) {
          columnComponent.value.components.push(storage);
        }
        if (storeContent.components) {
          storeContent.components.push(columnComponent);
        }
        storage = columnComponent;
      }
      if (columnData.type === 'twoColSection') {
        columnComponent = columnData;
        if (storeContent.components) {
          storeContent.components.push(columnComponent);
        }
      }
    }
  };

  if (contentfulEntries) {
    const { template, slug, content, name } = contentfulEntries[0].fields;
    mainDataObj = {
      name,
      template,
      slug,
      components: []
    };

    content.map(({ fields }) => {
      transformContent(fields, mainDataObj);
    });
  }
  console.log('TESTING@@@', mainDataObj);

  useEffect(() => {
    dispatch(requestPage('jen-test-page'));
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
