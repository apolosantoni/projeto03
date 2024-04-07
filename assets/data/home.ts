export const dados = [
    {
      id:1,
      image:require('../../assets/image/halsey_sorry.jpg'),
      url: 'http://localhost',
      title: 'Halsey',
      description: 'Musics from this artist'
    },
    {
      id:2,
      image:require('../../assets/image/lp_lost_on_your.jpg'),
      url: 'http://localhost',
      title: 'LP',
      description: 'Musics from this artist'
    },
    {
      id:3,
      image:require('../../assets/image/miley_cirrus-malibu.jpg'),
      url: 'http://localhost',
      title: 'Miley Cirrus',
      description: 'Musics from this artist'
    },
    {
      id:4,
      image:require('../../assets/image/the_kooks-bad_habit.jpg'),
      url: 'http://localhost',
      title: 'The Kooks',
      description: 'Musics from this artist'
    },
      ]


      type ItemProps = {
        id:number,
        title: string,
        description: string,
        image:string,
        url:string,
      }
  
