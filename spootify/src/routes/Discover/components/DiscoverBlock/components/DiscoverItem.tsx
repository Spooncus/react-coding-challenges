import React from 'react';
import '../styles/_discover-item.scss';

//TODO: Fix types here
interface IDiscoverItemProps {
  images: Array<IImage>;
  name: string;
}

interface IImage{
  height: number,
  url: string,
  width: number
}

export default class DiscoverItem extends React.Component<IDiscoverItemProps> {
  render = () => {
    const { images, name } = this.props;
    console.log(images)
    return (
      <div className="discover-item animate__animated animate__fadeIn">
        <div
          className="discover-item__art"
          style={{ backgroundImage: `url(${images[0].url})` }}
        />
        <p className="discover-item__title">{name}</p>
      </div>
    );
  }
}
