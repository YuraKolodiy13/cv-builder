import {Gallery, Item} from "react-photoswipe-gallery";
import 'photoswipe/dist/photoswipe.css';
import React from "react";
import noImage from "../../assets/icons/no-image.png";
import moreImages from "../../assets/icons/more-images.svg";
import './ReviewImageBox.scss';

interface IReviewImageBoxProps {
  media: string[]
}

const ReviewImageBox: React.FC<IReviewImageBoxProps> = ({media = []}) => {
  return (
    <div className='ReviewImageBox'>
      {!!media.length
        ? <Gallery>
            {media.slice(0, 1).map((item, key) =>
              <Item
                key={key}
                original={item}
                thumbnail={item}
                width="1024"
                height="683"
              >
                {({ref, open}) => (
                  <img ref={ref as React.MutableRefObject<HTMLImageElement>} onClick={open} src={item} alt=''/>
                )}
              </Item>
            )}

            {media.length > 1 && (
              <Item
                original={media[1]}
                thumbnail={media[1]}
                width="1024"
                height="683"
              >
                {({ref, open}) => (
                  <div className="visitReview__overlay" ref={ref as React.MutableRefObject<HTMLImageElement>} onClick={open}>
                    <img src={moreImages} alt=''/>
                    <p>{media.length - 1}</p>
                  </div>
                )}
              </Item>
            )}
          </Gallery>
        : <img src={noImage} alt='' />
      }
    </div>
  )
};

export default ReviewImageBox;