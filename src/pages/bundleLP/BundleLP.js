import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme, withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import { requestPage } from '../../modules/static/actions';
import LoadingSpinner from '../../components/LoadingSpinner';
import { generateComponents } from './buildBundlePage';
import ScrollToTop from '../../components/common/ScrollToTop';

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
  const page = useSelector(state => state.page);

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
  if (pageLoaded) {
    FinalPage = () => generateComponents(page, xs);
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
