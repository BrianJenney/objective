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

const QontoConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)'
  },
  active: {
    '& $line': {
      borderColor: 'black'
    }
  },
  completed: {
    '& $line': {
      borderColor: 'black'
    }
  },
  disabled: {
    '& $line': {
      borderColor: '#eaeaf0'
    }
  },
  line: {
    borderTopWidth: 3,
    borderRadius: 1
  }
})(StepConnector);

const useQontoStepIconStyles = makeStyles({
  root: {
    color: '#eaeaf0',
    display: 'flex',
    height: 22,
    alignItems: 'center'
  },
  active: {
    color: 'black'
  },
  completed: {
    color: 'black',
    zIndex: 1,
    fontSize: 18
  }
});

function QontoStepIcon(props) {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;
  console.log('testing-COMPLETE', completed);
  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active
      })}
    >
      {completed ? <Check className={classes.completed} /> : <RadioButtonUncheckedIcon />}
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
  if (['canceled', 'refunded'].includes(status)) {
    step = 2;
  } else if (statusStepper.Delivered) step = 3;
  else if (statusStepper.Shipped) step = 2;

  if (status === 'canceled' || status === 'refunded') {
    steps = ['Processed', 'Cancelled'];
  } else if (status === 'placed') {
    steps = ['Not processed', 'Shipped', 'Delivered'];
  } else {
    steps = ['Processed', 'Shipped', 'Delivered'];
  }
  return { step, steps };
};

const StatusStepper = ({ status, statusStepper }) => {
  const classes = useStyles();
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down('xs'));
  const { step, steps } = getSteps(status, statusStepper);
  console.log('testing-STATUS', status);
  console.log('testing-STEPS', steps);
  console.log('testing-STEPPPP', statusStepper);
  const [activeStep, setActiveStep] = React.useState(step);
  console.log('testing-ACTIVE-STEP', activeStep);
  // activeStep = { activeStep } => this change to checkmark
  const DesktopStatusStepper = () => (
    <Stepper alternativeLabel connector={<QontoConnector />}>
      {steps.map(label => {
        console.log('testing-LABEL', label);
        return (
          <Step key={label}>
            <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
          </Step>
        );
      })}
    </Stepper>
  );

  const MobileStatusStepper = () => (
    <>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>
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
