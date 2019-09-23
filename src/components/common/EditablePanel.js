import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Panel from './Panel';
import MenuLink from './MenuLink';

const EditablePanel = ({
  title,
  defaultValues,
  onSubmit,
  onRemove,
  onSetDefault,
  Form,
  Summary,
  ...rest
}) => {
  const [editing, setEditing] = useState(false);
  const handleSave = async (...args) => {
    try {
      if (onSubmit) {
        await onSubmit(...args);
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
          <Box fontSize={16} display="grid" alignItems="center">
            {onSetDefault && (
              <MenuLink
                onClick={onSetDefault}
                children="Make Default"
                underline="always"
              />
            )}
            {onRemove && (
              <MenuLink
                onClick={onRemove}
                children="Remove"
                underline="always"
              />
            )}
            {onSubmit && (
              <MenuLink
                onClick={() => setEditing(true)}
                children="Edit"
                underline="always"
              />
            )}
          </Box>
        </Summary>
      )}
    </Panel>
  );
};

EditablePanel.propTypes = {
  title: PropTypes.string,
  defaultValues: PropTypes.object,
  onSubmit: PropTypes.func,
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
