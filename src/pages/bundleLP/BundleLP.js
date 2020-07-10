import React, { useState, useEffect, useCallback, createRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme, withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import { requestPage } from '../../modules/static/actions';
import LoadingSpinner from '../../components/LoadingSpinner';
import { buildComponents } from './buildBundlePage';
import '../home/home-style.scss';
export const StyledContainer = withStyles(theme => ({
  root: {
    padding: '0',
    [theme.breakpoints.down('xs')]: {
      padding: '0 0 40px',
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
  const page = useSelector(state => state.page);
  const { variants } = useSelector(state => state.catalog);

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
    FinalPage = () => buildComponents(page, xs, variants);
  }

  if (FinalPage) {
    return (
      <div className="home-style">
        <StyledContainer>
          <FinalPage />
        </StyledContainer>
      </div>
    );
  }
  return <LoadingSpinner loadingMessage="...loading" page="lp" />;
};

export default withRouter(BundleLP);
