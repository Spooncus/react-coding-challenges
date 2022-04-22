import React, { Component } from 'react';
import DiscoverBlock from './DiscoverBlock/components/DiscoverBlock';
import '../styles/_discover.scss';
import axios from 'axios'
import { spotifyApiUri } from '../../../constants/constants';

//TODO: Fix `any` types here

interface IDiscoverProps {}

interface IInterfaceWithImages {
  images: Array<IImage>,
  name: string,
}

interface IInterfaceWithIcon {
  icons: Array<IImage>,
  name: string,
}

interface IImage{
  height: number,
  url: string,
  width: number
}

interface IDiscoverState {
  newReleases: Array<IInterfaceWithImages>;
  playlists: Array<IInterfaceWithImages>;
  categories: Array<IInterfaceWithIcon>;
}

export default class Discover extends Component<IDiscoverProps, IDiscoverState> {
  constructor(props: IDiscoverProps) {
    super(props);

    this.state = {
      newReleases: [],
      playlists: [],
      categories: []
    };
  }

  //TODO: Handle APIs

  formatTwoDigits = (digit: number) => ("0" + digit).slice(-2);
  tempDate = new Date();
  date = `${this.tempDate.getFullYear()}-${this.formatTwoDigits(this.tempDate.getMonth()+1)}-${this.formatTwoDigits(this.tempDate.getDate())}T${this.formatTwoDigits(this.tempDate.getHours())}:${this.formatTwoDigits(this.tempDate.getMinutes())}:${this.formatTwoDigits(this.tempDate.getSeconds())}`;

  config = {
    headers: { Authorization: `Bearer j` }
  };

  getNewReleaseData() {
    axios.get(`${spotifyApiUri}/new-releases?country=TR&limit=10&offset=5`, this.config)
    .then((resp) => {
      if(resp.status === 200) {
        this.setState({newReleases: resp.data.albums.items})
        // console.log(resp.data);
      }
    })
    .catch((err) => {
      console.error(err);
    })
  }

  getCategoriesData() {
    axios.get(`${spotifyApiUri}/categories?country=TR&locale=tr_TR&limit=10&offset=3`, this.config)
    .then((resp) => {
      if(resp.status === 200) {
        this.setState({categories: resp.data.categories.items})
        // console.log(resp.data);
      }
    })
    .catch((err) => {
      console.error(err);
    })
  }

  getFeaturedPlaylistsData() {
    axios.get(`${spotifyApiUri}/featured-playlists?country=TR&locale=tr_TR&timestamp=${this.date}&limit=10&offset=5`, this.config)
    .then((resp) => {
      if(resp.status === 200) {
        this.setState({playlists: resp.data.playlists.items})
        // console.log(resp.data);
      }
    })
    .catch((err) => {
      console.error(err);
    })
  }
  
  componentDidMount() {
    this.getNewReleaseData();
    this.getFeaturedPlaylistsData();
    this.getCategoriesData();
  }
  
  render() {
    const { newReleases, playlists, categories } = this.state;

    return (
      <div className="discover">
        <DiscoverBlock text="RELEASED THIS WEEK" id="released" data={newReleases} />
        <DiscoverBlock text="FEATURED PLAYLISTS" id="featured" data={playlists} />
        <DiscoverBlock text="BROWSE" id="browse" data={categories} imagesKey="icons" />
      </div>
    );
  }
}
