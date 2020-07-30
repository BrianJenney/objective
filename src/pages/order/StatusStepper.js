import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Check from '@material-ui/icons/Check';
import StepConnector from '@material-ui/core/StepConnector';
import useMediaQuery from '@material-ui/core/useMediaQuery/useMediaQuery';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const QontoConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)'
  },
  active: {
    '& $line': {
      borderColor: '#553226'
    }
  },
  completed: {
    '& $line': {
      borderColor: '#553226'
    }
  },
  disabled: {
    '& $line': {
      borderColor: '#553226'
    }
  },
  line: {
    borderTopWidth: 3,
    borderRadius: 1
  }
})(StepConnector);

const useQontoStepIconStyles = makeStyles({
  root: {
    color: '#553226',
    display: 'flex',
    height: 22,
    alignItems: 'center'
  },
  active: {
    color: '#553226'
  },
  completed: {
    color: '#553226',
    zIndex: 1,
    fontSize: 28
  }
});

function QontoStepIcon(props) {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active
      })}
    >
      {completed ? <CheckCircleIcon className={classes.completed} /> : <RadioButtonUncheckedIcon />}
    </div>
  );
}

QontoStepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool
};

const useStyles = makeStyles(theme => ({
  root: {
    width: '90%'
  }
}));

const getSteps = (status, statusStepper) => {
  let step = 1;
  let steps = [];

  if (status === 'canceled' || status === 'refunded') {
    steps = ['Processed', 'Cancelled'];
    step = 2;
  } else if (status === 'placed') {
    steps = ['Not processed', 'Shipped', 'Delivered'];
    step = 0;
  } else {
    steps = ['Processed', 'Shipped', 'Delivered'];
    if (status === 'shipped') {
      step = 2;
    }
    if (status === 'delivered') {
      step = 3;
    }
  }
  return { step, steps };
};

const StatusStepper = ({ status, statusStepper }) => {
  const classes = useStyles();
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down('xs'));
  const { step, steps } = getSteps(status, statusStepper);
  const [activeStep, setActiveStep] = React.useState(step);

  const DesktopStatusStepper = () => (
    <Stepper alternativeLabel activeStep={activeStep} connector={<QontoConnector />}>
      {steps.map(label => (
        <Step key={label}>
          <StepLabel StepIconComponent={QontoStepIcon}>
            {label} {statusStepper[label]}
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );

  const MobileStatusStepper = () => (
    <>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map(label => (
          <Step key={label} >
            <StepLabel StepIconComponent={QontoStepIcon}>
              {label} {statusStepper[label]}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <br />
    </>
  );

  return <div className={classes.root}>{xs ? <MobileStatusStepper /> : <DesktopStatusStepper />}</div>;
};

export default StatusStepper;
