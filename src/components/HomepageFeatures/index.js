import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Spirit of the Living God',
    Svg: require('@site/static/img/holy-spirit-fire.svg').default,
    description: (
      <>
         And you show that you are a letter from Christ delivered by us, <b>written not with ink but with the Spirit of the living God, </b> 
           not on tablets of stone but on tablets of human hearts.
           <div style={{ textAlign: 'center', marginTop: '8px' }}>
          <b>2 Corinthians 3:3</b>
        </div>
      </>
    ),
  },
  {
    title: 'Living and Active',
    Svg: require('@site/static/img/open-bible.svg').default,
    description: (
      <>
        For <b>the word of God is living and active</b>. Sharper than any double-edged sword, it penetrates even to dividing soul and spirit, joints and marrow; <b>it judges the thoughts and attitudes of the heart.</b>
        <div style={{ textAlign: 'center', marginTop: '8px' }}>
          <b>Hebrews 4:12</b>
        </div>
      </>
    ),
  },
  {
    title: 'Proclaim Yeshua! (יְשׁוּעָה)',
    Svg: require('@site/static/img/mountains.svg').default,
    description: (
      <>
        How beautiful on the mountains are the feet of those who bring good news, who proclaim peace, who bring good tidings, who proclaim <b>salvation</b>, who say to Zion, “<b>Your God reigns!</b>”
        <div style={{ textAlign: 'center', marginTop: '8px' }}>
          <b>Isaiah 52:7</b>
        </div>
      </>
    ),
  }
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
