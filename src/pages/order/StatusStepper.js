import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles, useTheme, withStyles} from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Check from '@material-ui/icons/Check';
import StepConnector from '@material-ui/core/StepConnector';
import useMediaQuery from '@material-ui/core/useMediaQuery/useMediaQuery';

const QontoConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  active: {
    '& $line': {
      borderColor: '#784af4',
    },
  },
  completed: {
    '& $line': {
      borderColor: '#784af4',
    },
  },
  disabled: {
    '& $line': {
      borderColor: '#eaeaf0',
    },
  },
  line: {
    borderTopWidth: 3,
    borderRadius: 1,
  },
})(StepConnector);

const useQontoStepIconStyles = makeStyles({
  root: {
    color: '#eaeaf0',
    display: 'flex',
    height: 22,
    alignItems: 'center',
  },
  active: {
    color: '#784af4',
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
  completed: {
    color: '#784af4',
    zIndex: 1,
    fontSize: 18,
  },
});

function QontoStepIcon(props) {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}
    >
      {completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
    </div>
  );
}

QontoStepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
};

const useStyles = makeStyles(theme => ({
  root: {
    width: '90%',
  },
}));

const getSteps = () => {
  return ['Processed', 'Shipped', 'Delivered'];
};

const StatusStepper = ({statusStepperDate}) => {
  const classes = useStyles();
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down('xs'));

  const [activeStep, setActiveStep] = React.useState(3);
  const steps = getSteps();

  const DesktopStatusStepper = () => {
    return (
      <Stepper alternativeLabel activeStep={activeStep} connector={<QontoConnector />} >
        {steps.map(label => (
          <Step key={label}>
            <StepLabel StepIconComponent={QontoStepIcon}>
              {label} {statusStepperDate[label]}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    );
  };

  const MobileStatusStepper = () => {
    return (
      <>
        <Stepper activeStep={activeStep}  orientation="vertical">
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>
                {label} {statusStepperDate[label]}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
        <br/>
      </>
    );
  };

  return (
    <div className={classes.root}>
      {xs ? <MobileStatusStepper /> : <DesktopStatusStepper/> }
    </div>
  );
};

export default StatusStepper;
