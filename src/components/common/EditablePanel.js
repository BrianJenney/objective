import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
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
          <Box mt={4} fontSize={16} display="flex" flexDirection="column">
            {onSetDefault ? (
              <MenuLink
                onClick={onSetDefault}
                children="Make default"
                underline="always"
              />
            ) : (
              <Box display="flex" alignItems="center">
                <CheckIcon style={{ width: '16px', height: '16px' }} />
                <Typography
                  variant="body2"
                  children="Saved as default"
                  style={{ marginLeft: 5 }}
                />
              </Box>
            )}
            <Box mt="13px" height={16} display="flex" alignItems="center">
              {onRemove && (
                <MenuLink
                  onClick={onRemove}
                  children="Remove"
                  underline="always"
                  style={{
                    paddingRight: 9,
                    borderRight: onFormSubmit ? '1px solid #231f20' : 0
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
                  style={{ paddingLeft: onRemove ? 9 : 0 }}
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
