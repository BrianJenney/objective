import React from 'react';
import { useMediaQuery } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { NavLink } from '../../components/common';
import './NotFound.scss';

const useStyles = makeStyles({
  root: {
    width: '100%',
    marginBottom: '-4px'
  }
});
// Not found 404 Page
const NotFound = () => {
  const theme = useTheme();
  const classes = useStyles();
  const mobile = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <>
      <NavLink to={'/'}>
        {mobile ? (
          <img
            src="https://images.ctfassets.net/mj9bpefl6wof/19ChPMduwPcvkvecLiOiXf/ebdd41cd42ed97e2249b92eb88a1d58d/404-mobile.png?w=450&fm=jpg&q=50"
            alt=""
            className={classes.root}
          />
        ) : (
            <img
              src="https://images.ctfassets.net/mj9bpefl6wof/3bJxwTFP6IpI9tkT5xiLZL/d3b2981571f8a26ac372f836b696f555/404_-_desktop.png?w=2000&q=50&fm=jpg"
              alt=""
              className={classes.root}
            />
          )}
      </NavLink>
    </>
  );

  // const desktopImage = 'https://images.ctfassets.net/mj9bpefl6wof/5loXjfMH09OyWJ0jf2mJmB/456292b8129b50626fd60bc09a565c66/broken_pill_desktop.png?w=2000&fm=jpg&q=50';
  // const mobileImage = 'https://images.ctfassets.net/mj9bpefl6wof/5dKaCvZbW7P36PurFOzShz/cc1ae84f6add97889662daebc1874ef8/broken_pill_mobile.png?w=450&fm=jpg&q=50';
  // const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  // const imageUrl = windowWidth >= 650 ? desktopImage : mobileImage;

  // const handleWindowResize = () => {
  //   setWindowWidth(window.innerWidth);
  // };

  // useEffect(() => {
  //   window.addEventListener('resize', handleWindowResize);

  //   return () => {
  //     window.removeEventListener('resize', handleWindowResize);
  //   }
  // });

  // return (
  //   <div className="notFound" style={{ backgroundImage: `url(${imageUrl})` }}>
  //     <div className="notFound-content">
  //       <h1>Pineapples</h1>
  //       <p>They are good</p>
  //     </div>
  //   </div>
  // );
};

export default NotFound;
