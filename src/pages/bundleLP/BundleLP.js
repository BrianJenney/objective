import React, { useState, useEffect, useCallback, createRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme, withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import { requestPage } from '../../modules/static/actions';
import LoadingSpinner from '../../components/LoadingSpinner';
import { generateComponents } from './buildBundlePage';
import ScrollToTop from '../../components/common/ScrollToTop';
import { addToCart } from '../../modules/cart/functions';
export const StyledContainer = withStyles(theme => ({
  root: {
    padding: '0',
    [theme.breakpoints.down('xs')]: {
      padding: '38px 0 40px',
      backgroundColor: '#fdfbf9',
      width: '100%'
    }
  }
}))(Container);

const BundleLP = ({ match }) => {
  const { slug } = match.params;
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down('xs'));
  const dispatch = useDispatch();
  const [pageLoaded, setPageLoaded] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState({});
  const [ATCAdded, setATCAdded] = useState(false);
  const [ATCAdding, setATCAdding] = useState(false);
  const page = useSelector(state => state.page);
  const cart = useSelector(state => state.cart);
  const ref = createRef();
  const { variants } = useSelector(state => state.catalog);
  console.log('testing-ATCCCC', ATCAdded, ATCAdding);
  const handleAddToCart = useCallback(() => {
    console.log('testing-BUNDLE-VARIANT', selectedVariant);
    setATCAdded(true);
    setATCAdding(true);
    setTimeout(() => {
      // Give effect of item being added
      addToCart(cart, selectedVariant, 1);
      setATCAdding(false);
      setTimeout(() => {
        setATCAdded(false);
      }, 500);
    }, 500);
    ref.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }, [cart, selectedVariant, dispatch, ref]);

  useEffect(() => {
    if (!pageLoaded) dispatch(requestPage(slug));
  }, []);

  useEffect(() => {
    if (page.template) {
      setPageLoaded(true);
      window.analytics.page(`Bundle-LP: ${page.name}`);
    }
  }, [page]);

  let FinalPage = null;
  if (pageLoaded && variants) {
    FinalPage = () =>
      generateComponents(
        page,
        xs,
        variants,
        cart,
        ATCAdded,
        ATCAdding,
        handleAddToCart,
        setSelectedVariant
      );
  }

  if (FinalPage) {
    return (
      <div className="bundlePage">
        <ScrollToTop>
          <StyledContainer>
            <FinalPage />
          </StyledContainer>
        </ScrollToTop>
      </div>
    );
  }
  return <LoadingSpinner loadingMessage="...loading" page="lp" />;
};

export default withRouter(BundleLP);
