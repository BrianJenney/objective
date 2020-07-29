import React from 'react';
import Image from './Image';
import Title from './Title';
import Button from './Button';
import { transformMobileStyle } from '../transformComponents';

const SPStickyBtn = ({ data, xs }) => (
  <>
    {data.map(obj => {
      switch (obj.type) {
        case 'image':
          return xs ? null : (
            <Image data={obj} type={obj.type} id={`${obj.name}`} style={{ width: '180px' }} />
          );
          break;
        case 'sectionTitle':
          return (
            <div
              className="Title"
              style={
                xs
                  ? { display: 'inline-block', ...transformMobileStyle(obj) }
                  : { padding: '15px 0' }
              }
            >
              <Title data={obj} type={obj.type} id={`${obj.name}`} />
            </div>
          );
          break;
        case 'button':
          return (
            <div
              className="Button"
              style={
                xs
                  ? {
                    float: 'right',
                    display: 'inline-block',
                    padding: '15px 15px 0 0'
                  }
                  : { display: 'flex', justifyContent: 'center', margin: '0 0 20px' }
              }
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
