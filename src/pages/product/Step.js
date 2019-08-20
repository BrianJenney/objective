import React, { useContext } from 'react';
import Container from '@material-ui/core/Container';
import ProductContext from '../../contexts/ProductContext';


export default function Step() {
    const { stepBoxes } = useContext(ProductContext);

    if (!stepBoxes) {
        return null;
    }

    return (
        <Container>
            <div dangerouslySetInnerHTML={{ __html: stepBoxes }} />
        </Container>
    );
};
