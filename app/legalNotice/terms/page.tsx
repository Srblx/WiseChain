// CSS
const classNameTitle = 'text-xl underline';

const Terms = () => {
  return (
    <div>
      <h1 className="text-3xl text-center text-tertiary mb-6 underline">
        Conditions d'utilisation
      </h1>
      <div className="space-y-4">
        <h2 className={classNameTitle}>1. Introduction</h2>
        <p>
          Bienvenue sur WiseChain. En accédant à notre site web, vous acceptez
          de vous conformer aux présentes conditions d'utilisation. Si vous
          n'acceptez pas ces conditions, veuillez ne pas utiliser notre site.
        </p>
        <h2 className={classNameTitle}>2. Services Offerts</h2>
        <p>
          WiseChain propose des cours en ligne, des webinaires, des articles et
          d'autres ressources éducatives sur la crypto, la blockchain et
          l'investissement financier.
        </p>
        <h2 className={classNameTitle}>3. Utilisation du Site</h2>
        <p>
          <strong>Accès :</strong> L'accès à certains contenus peut nécessiter
          la création d'un compte utilisateur.
        </p>
        <p>
          <strong>Comportement :</strong> Les utilisateurs doivent se comporter
          de manière respectueuse et ne pas utiliser le site pour des activités
          illégales ou nuisibles.
        </p>
        <p>
          <strong>Contenu :</strong> Le contenu du site est protégé par des
          droits d'auteur. Toute reproduction ou distribution non autorisée est
          interdite.
        </p>
        <h2 className={classNameTitle}>4. Inscription et Compte Utilisateur</h2>
        <p>
          <strong>Informations :</strong> Vous devez fournir des informations
          exactes et complètes lors de votre inscription.
        </p>
        <p>
          <strong>Sécurité :</strong> Vous êtes responsable de la sécurité de
          votre compte et de la confidentialité de votre mot de passe.
        </p>
        <h2 className={classNameTitle}>5. Paiements et Abonnements</h2>
        <p>
          Aucun paiement ou abonnement n'est requis pour accéder au contenu de
          base du site. Cependant, certains contenus premium pourront être
          payants par la suite.
        </p>
        <h2 className={classNameTitle}>6. Limitation de Responsabilité</h2>
        <p>
          WiseChain ne peut être tenu responsable des pertes ou dommages
          résultant de l'utilisation de ses services, y compris les pertes
          financières liées aux investissements.
        </p>
        <h2 className={classNameTitle}>
          7. Protection des Données Personnelles
        </h2>
        <p>
          <strong>Collecte et Traitement des Données :</strong> Nous collectons
          et traitons vos données personnelles conformément au Règlement Général
          sur la Protection des Données (RGPD). Les données collectées incluent,
          mais ne sont pas limitées à, votre nom, adresse e-mail, et
          informations de paiement.
        </p>
        <p>
          <strong>Droits des Utilisateurs :</strong> Vous avez le droit
          d'accéder, de rectifier, de supprimer vos données personnelles, ainsi
          que le droit à la portabilité de vos données. Pour exercer ces droits,
          veuillez nous contacter à wisechainnet@gmail.com.
        </p>
        <h2 className={classNameTitle}>8. Utilisation des Cookies</h2>
        <p>
          Nous utilisons des cookies pour améliorer votre expérience sur notre
          site. Vous pouvez gérer vos préférences en matière de cookies via les
          paramètres de votre navigateur.
        </p>
        <h2 className={classNameTitle}>9. Modifications des Conditions</h2>
        <p>
          Nous nous réservons le droit de modifier ces conditions à tout moment.
          Les modifications seront publiées sur cette page et entreront en
          vigueur immédiatement.
        </p>
        <h2 className={classNameTitle}>10. Loi Applicable et Juridiction</h2>
        <p>
          Les présentes conditions sont régies par la loi française. En cas de
          litige, les tribunaux français seront seuls compétents.
        </p>
        <h2 className={classNameTitle}>11. Contact</h2>
        <p>
          Pour toute question concernant ces conditions, veuillez nous contacter
          à wisechainnet@gmail.com.
        </p>
      </div>
    </div>
  );
};

export default Terms;
