import React from 'react';
import Image from './Image';
import Title from './Title';
import Button from './Button';

const SPStickyBtn = ({ data }) => (
  <>
    {data.map(obj => {
      switch (obj.type) {
        case 'image':
          return <Image data={obj} type={obj.type} id={`${obj.name}`} style={{ width: '180px' }} />;
          break;
        case 'sectionTitle':
          return (
            <div className="Title" style={{ padding: '15px 0' }}>
              <Title data={obj} type={obj.type} id={`${obj.name}`} />
            </div>
          );
          break;
        case 'button':
          return (
            <div
              className="Button"
              style={{ display: 'flex', justifyContent: 'center', margin: '0 0 20px' }}
            >
              <Button
                data={obj}
                type={obj.type}
                align={obj.desktopStyle.align}
                id={`${obj.name}`}
              />
            </div>
          );
          break;
        default:
          return null;
      }
    })}
  </>
);
export default SPStickyBtn;
