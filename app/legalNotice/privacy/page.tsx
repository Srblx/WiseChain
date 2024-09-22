// CSS
const classNameTitle = 'text-xl underline';

const Privacy = () => {
  return (
    <div>
      <h1 className="text-3xl text-center text-tertiary mb-6 underline">
        Politique de Confidentialité
      </h1>
      <div className="space-y-4">
        <h2 className={classNameTitle}>1. Introduction</h2>
        <p>
          Cette politique de confidentialité explique comment WiseChain
          collecte, utilise, et protège vos données personnelles lorsque vous
          utilisez notre site web.
        </p>
        <h2 className={classNameTitle}>2. Données Collectées</h2>
        <p>Nous collectons les données personnelles suivantes :</p>
        <ul className="list-disc ml-8">
          <li>Prénom et nom</li>
          <li>Pseudo</li>
          <li>Adresse e-mail</li>
          <li>Mot de passe</li>
          <li>Pays</li>
          <li>Date de naissance</li>
          <li>Image de profil (facultatif)</li>
          <li>
            Informations sur les articles, questionnaires, messages
            communautaires, et autres interactions sur le site
          </li>
        </ul>
        <h2 className={classNameTitle}>3. Finalités du Traitement</h2>
        <p>Les données collectées sont utilisées pour :</p>
        <ul className="list-disc ml-8">
          <li>La gestion des comptes utilisateurs</li>
          <li>
            La fourniture des services proposés (cours en ligne, webinaires,
            articles, etc.)
          </li>
          <li>La communication avec les utilisateurs</li>
          <li>L'amélioration de nos services</li>
          <li>La sécurité et la prévention des fraudes</li>
        </ul>
        <h2 className={classNameTitle}>4. Base Légale du Traitement</h2>
        <p>
          Le traitement de vos données personnelles repose sur les bases légales
          suivantes :
        </p>
        <ul className="list-disc ml-8">
          <li>
            Exécution d'un contrat (gestion des comptes utilisateurs et
            fourniture des services)
          </li>
          <li>Consentement (pour certaines communications marketing)</li>
          <li>Intérêt légitime (amélioration des services et sécurité)</li>
        </ul>
        <h2 className={classNameTitle}>5. Droits des Utilisateurs</h2>
        <p>Conformément au RGPD, vous disposez des droits suivants :</p>
        <ul className="list-disc ml-8">
          <li>
            <strong>Droit d'accès :</strong> Vous pouvez demander l'accès à vos
            données personnelles.
          </li>
          <li>
            <strong>Droit de rectification :</strong> Vous pouvez demander la
            correction de vos données personnelles inexactes.
          </li>
          <li>
            <strong>Droit à l'effacement :</strong> Vous pouvez demander la
            suppression de vos données personnelles.
          </li>
          <li>
            <strong>Droit à la limitation du traitement :</strong> Vous pouvez
            demander la limitation du traitement de vos données personnelles.
          </li>
          <li>
            <strong>Droit à la portabilité :</strong> Vous pouvez demander à
            recevoir vos données personnelles dans un format structuré,
            couramment utilisé et lisible par machine.
          </li>
          <li>
            <strong>Droit d'opposition :</strong> Vous pouvez vous opposer au
            traitement de vos données personnelles pour des motifs légitimes.
          </li>
        </ul>
        <p>
          Pour exercer ces droits, veuillez nous contacter à
          wisechainnet@gmail.com.
        </p>
        <h2 className={classNameTitle}>6. Sécurité des Données</h2>
        <p>
          Nous mettons en œuvre des mesures techniques et organisationnelles
          appropriées pour protéger vos données personnelles contre la perte,
          l'utilisation abusive, l'accès non autorisé, la divulgation,
          l'altération ou la destruction.
        </p>
        <h2 className={classNameTitle}>7. Partage des Données</h2>
        <p>
          Nous ne partageons pas vos données personnelles avec des tiers, sauf
          si cela est nécessaire pour fournir nos services, respecter une
          obligation légale, ou protéger nos droits.
        </p>
        <h2 className={classNameTitle}>8. Utilisation des Cookies</h2>
        <p>
          Nous utilisons des cookies pour améliorer votre expérience sur notre
          site. Vous pouvez gérer vos préférences en matière de cookies via les
          paramètres de votre navigateur. Les cookies et autres traceurs
          commerciaux peuvent être déposés sur le terminal de l’utilisateur pour
          une durée maximale de treize (13) mois. Au-delà de ce délai, les
          données de fréquentation brutes associées à un identifiant sont soit
          supprimées soit anonymisées.
        </p>
        <h2 className={classNameTitle}>9. Durée de Conservation des Données</h2>
        <p>
          Les données personnelles sont conservées pour la durée nécessaire à la
          réalisation des finalités pour lesquelles elles ont été collectées,
          sauf si une durée de conservation plus longue est requise ou permise
          par la loi. Les informations collectées par l'intermédiaire de cookies
          et traceurs sont conservées pour une durée de vingt-cinq (25) mois.
          Au-delà de ce délai, ces données sont supprimées ou anonymisées.
        </p>
        <h2 className={classNameTitle}>
          10. Modifications de la Politique de Confidentialité
        </h2>
        <p>
          Nous nous réservons le droit de modifier cette politique de
          confidentialité à tout moment. Les modifications seront publiées sur
          cette page et entreront en vigueur immédiatement. Lorsque cela est
          nécessaire, nous vous informerons et/ou solliciterons votre accord.
          Nous vous conseillons de consulter régulièrement cette politique pour
          prendre connaissance des éventuelles modifications ou mises à jour y
          apportées.
        </p>
        <h2 className={classNameTitle}>11. Droit Applicable et Juridiction</h2>
        <p>
          La présente politique est soumise au droit français. En cas de litige
          et dans le cas où un accord amiable ne pourrait intervenir, les
          tribunaux compétents seront ceux du ressort de la Cour d’appel de
          Paris, nonobstant pluralité de défendeurs ou appel en garantie.
        </p>
        <h2 className={classNameTitle}>12. Contact</h2>
        <p>
          Pour toute question concernant cette politique de confidentialité,
          veuillez nous contacter à wisechainnet@gmail.com.
        </p>
      </div>
    </div>
  );
};

export default Privacy;
