import {Track} from 'react-native-track-player';
import {ResourceObject} from '../../node_modules/react-native-track-player/lib/interfaces/ResourceObject';
export type Track1 = {
  id: number | any;
  title: string;
  artist: string;
  album: string;
  artwork: string | ResourceObject;
  url: string | ResourceObject;
};
export const playsListData: Track1[] = [
  {
    id: 1,
    title: 'Sory',
    artist: 'Halsey',
    album: 'Halsey',
    artwork: require('../../assets/image/halsey_sorry.jpg'),
    url: require('../music/Halsey-Sorry.mp3')
  },
  {
    id: 2,
    title: 'Lost On You',
    artist: 'LP',
    album: 'LP',
    artwork: require('../../assets/image/lp_lost_on_your.jpg'),
    url: require('../music/LP-Lost_On_You.mp3')
  },
  {
    id: 3,
    title: 'Malibu',
    artist: 'Miley Cyrus',
    album: 'Miley Cyrus',
    artwork: require('../../assets/image/miley_cirrus-malibu.jpg'),
    url: require('../music/Miley_Cyrus-Malibu.mp3')
  },
  {
    id: 4,
    title: 'Bad Habit',
    artist: 'The Kooks',
    album: 'The Kooks',
    artwork: require('../../assets/image/the_kooks-bad_habit.jpg'),
    url: require('../music/The_Kooks-Bad_Habit.mp3')
  }
];
