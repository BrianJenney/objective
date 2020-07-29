import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import CheckIcon from '@material-ui/icons/Check';
import Panel from './Panel';
import MenuLink from './MenuLink';

const EditablePanel = ({
  title,
  defaultValues,
  onFormSubmit,
  onEdit,
  onRemove,
  onSetDefault,
  Form,
  Summary,
  ...rest
}) => {
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down('xs'));
  const [editing, setEditing] = useState(false);
  const handleSave = async (...args) => {
    try {
      if (onFormSubmit) {
        await onFormSubmit(...args);
      }
      setEditing(false);
    } catch (err) {
      throw err;
    }
  };
  const handleCancel = () => setEditing(false);

  return (
    <Panel title={title}>
      {editing && Form ? (
        <Form
          defaultValues={defaultValues}
          onSubmit={handleSave}
          onBack={handleCancel}
          {...rest}
        />
      ) : (
        <Summary values={defaultValues} {...rest}>
          <Box
            mt={4}
            fontSize={xs ? 12 : 16}
            display="flex"
            flexDirection="column"
          >
            {onSetDefault ? (
              <MenuLink
                onClick={onSetDefault}
                children="Make default"
                underline="always"
              />
            ) : (
              <Box display="flex" alignItems="center">
                <CheckIcon style={{ width: '16px', height: '16px', color: theme.palette.brand.camoGreen }} />
                <Box children="Saved as default" style={{ marginLeft: 5, fontSize: '14px', color: theme.palette.brand.camoGreen }} />
              </Box>
            )}
            <Box mt="13px" height={16} display="flex" alignItems="center">
              {onRemove && (
                <MenuLink
                  onClick={onRemove}
                  children="Delete"
                  underline="always"
                  style={{
                    paddingRight: 9,
                    borderRight: onFormSubmit ? '1px solid #231f20' : 0, 
                    color: theme.palette.brand.camoGreen,
                    fontSize: '14px',
                    float: 'right'
                  }}
                />
              )}
              {(onFormSubmit || onEdit) && (
                <MenuLink
                  onClick={() => {
                    if (onFormSubmit) {
                      setEditing(true);
                    } else {
                      onEdit();
                    }
                  }}
                  children="Edit"
                  underline="always"
                  style={{ paddingLeft: onRemove ? 9 : 0, fontSize: '14px', color: theme.palette.brand.camoGreen}}
                />
              )}
            </Box>
          </Box>
        </Summary>
      )}
    </Panel>
  );
};

EditablePanel.propTypes = {
  title: PropTypes.string,
  defaultValues: PropTypes.object,
  onFormSubmit: PropTypes.func,
  onEdit: PropTypes.func,
  onRemove: PropTypes.func,
  onSetDefault: PropTypes.func,
  Form: PropTypes.any,
  Summary: PropTypes.any.isRequired
};

EditablePanel.defaultProps = {
  title: '',
  defaultValues: {}
};

export default EditablePanel;
