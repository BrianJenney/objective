import React from 'react';
import CircularProgress from "@material-ui/core/CircularProgress";

const LoaderInProgress = ({size=24}) => <CircularProgress size={size} style={{marginLeft: 15, position: 'relative', top: 4}} />;

export default LoaderInProgress;
