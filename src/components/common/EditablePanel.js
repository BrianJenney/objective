import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import Panel from './Panel';
import Button from './Button';

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
      await onSubmit(...args);
      setEditing(false);
    } catch (err) {
      throw err;
    }
  };

  return (
    <Panel title={title}>
      {editing ? (
        <Form defaultValues={defaultValues} onSubmit={handleSave} {...rest} />
      ) : (
        <Summary values={defaultValues} {...rest}>
          <Box mt={2}>
            {onSetDefault && (
              <Button
                type="button"
                onClick={onSetDefault}
                children="Set Default"
                mr={1}
                variant="text"
              />
            )}
            {onRemove && (
              <Button
                type="button"
                onClick={onRemove}
                children="Remove"
                mr={1}
                variant="text"
              />
            )}
            <Button
              type="button"
              onClick={() => setEditing(true)}
              children="Edit"
              variant="text"
            />
          </Box>
        </Summary>
      )}
    </Panel>
  );
};

EditablePanel.propTypes = {
  title: PropTypes.string,
  defaultValues: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onRemove: PropTypes.func,
  onSetDefault: PropTypes.func,
  Form: PropTypes.node.isRequired,
  Summary: PropTypes.node.isRequired
};

EditablePanel.defaultProps = {
  title: '',
  defaultValues: {}
};

export default EditablePanel;
