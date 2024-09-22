// CSS
const classNameTitle = 'text-xl underline';

const About = () => {
  return (
    <div>
      <h1 className="text-3xl text-center text-tertiary mb-6 underline">
        À propos de WiseChain
      </h1>
      <div className="space-y-4">
        <p>
          Bienvenue sur WiseChain, votre plateforme éducative et communautaire
          dédiée à la blockchain, aux crypto-monnaies et à l'investissement
          financier. Je m'appelle Alexis, et je suis un investisseur passionné
          par la finance et les crypto-monnaies depuis 2019. Fort de mon
          expérience, j'ai décidé de créer WiseChain pour partager mes
          connaissances et aider les autres à naviguer dans ce domaine complexe
          mais passionnant.
        </p>
        <h2 className={classNameTitle}>Notre Mission</h2>
        <p>
          Chez WiseChain, notre mission est de fournir des informations fiables,
          des outils pratiques et des ressources éducatives pour aider nos
          utilisateurs à comprendre les concepts de base, suivre les tendances
          du marché et prendre des décisions d'investissement éclairées. Nous
          visons à créer une expérience utilisateur immersive et éducative, tout
          en bâtissant une communauté active et engagée autour de la blockchain,
          des crypto-monnaies, des indices et des actions.
        </p>
        <h2 className={classNameTitle}>Nos Services</h2>
        <ul className="list-disc ml-8 space-y-4">
          <li>
            <span className="italic">Section Éducative :</span> Divisée en
            quatre catégories (Crypto-monnaies, Blockchain, Investissement,
            NFT), cette section propose des articles, vidéos, tutoriels et quiz
            pour approfondir vos connaissances. Nous couvrons également des
            sujets sur les indices boursiers et les actions pour offrir une vue
            d'ensemble complète de l'investissement.
          </li>
          <li>
            <span className="italic">Actualités et Analyses :</span> Restez
            informé des dernières actualités et analyses du marché des
            crypto-monnaies, des indices et des actions grâce à notre section
            dédiée.
          </li>
          <li>
            <span className="italic">Profil Utilisateur :</span> Suivez votre
            progression, interagissez avec la communauté, récupérez les
            récompenses des questionnaires et personnalisez votre profil.
          </li>
          <li>
            <span className="italic">Intégration d'APIs Tierces :</span> Accédez
            à des données en temps réel sur les crypto-monnaies, les indices et
            les actions grâce à l'intégration d'APIs tierces comme
            CoinMarketCap, CoinGecko et d'autres sources fiables.
          </li>
          <li>
            <span className="italic">Liste des Crypto-monnaies :</span>{' '}
            Consultez des informations détaillées sur les crypto-monnaies
            populaires avec des graphiques de prix en temps réel.
          </li>
          <li>
            <span className="italic">FAQ et Glossaire :</span> Trouvez des
            réponses aux questions fréquemment posées et des définitions des
            termes clés du domaine.
          </li>
        </ul>
        <h2 className={classNameTitle}>Notre Vision</h2>
        <p>
          Nous croyons que la blockchain et les crypto-monnaies représentent
          l'avenir de la finance. Notre vision est de démocratiser l'accès à ces
          technologies en fournissant des ressources éducatives de qualité et en
          créant une communauté où chacun peut apprendre et partager ses
          expériences. Nous nous efforçons également de fournir des informations
          et des outils pour l'investissement dans les indices et les actions,
          afin de permettre à nos utilisateurs de diversifier leurs
          portefeuilles et de maximiser leurs opportunités d'investissement.
        </p>
        <h2 className={classNameTitle}>Contact</h2>
        <p>
          Pour toute question ou pour en savoir plus sur nos services, n'hésitez
          pas à nous contacter à wisechainnet@gmail.com.
        </p>
      </div>
    </div>
  );
};

export default About;
