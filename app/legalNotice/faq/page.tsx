const Faq = () => {
  return (
    <>
      <h1 className="text-3xl text-tertiary font-bold mb-6 text-center">FAQ</h1>
      <div className="join join-vertical w-full z-0">
        <div className="collapse collapse-arrow join-item border border-base-300 bg-blueDark mb-4">
          <input type="radio" name="my-accordion-4" defaultChecked />
          <div className="collapse-title text-2xl font-medium">
            Qu'est-ce que WiseChain ?
          </div>
          <div className="collapse-content">
            <p className="text-gray-400 text-lg">
              WiseChain est une plateforme d'apprentissage dédiée aux
              différentes possibilités d'investissement dans le monde économique
              actuel.
            </p>
          </div>
        </div>
        <div className="collapse collapse-arrow join-item border border-base-300 bg-blueDark mb-4">
          <input type="radio" name="my-accordion-4" />
          <div className="collapse-title text-2xl font-medium">
            Comment utiliser WiseChain pour améliorer ses connaissances en
            investissement ?
          </div>
          <div className="collapse-content">
            <p className="text-gray-400 text-lg">
              Parcourez les différents articles mis à jour pour rester informé
              des derniers événements, suivez les cours proposés par thématique
              et complétez les questionnaires pour tester votre compréhension.
            </p>
          </div>
        </div>
        <div className="collapse collapse-arrow join-item border border-base-300 bg-blueDark mb-4">
          <input type="radio" name="my-accordion-4" />
          <div className="collapse-title text-2xl font-medium">
            Quels types de cours sont disponibles sur WiseChain ?
          </div>
          <div className="collapse-content">
            <p className="text-gray-400 text-lg">
              WiseChain propose des cours sur divers sujets tels que les bases
              de l'investissement, les stratégies avancées, la gestion des
              risques, et les tendances actuelles du marché. Les cours couvrent
              les principaux moyens d'investissement, y compris les indices, les
              actions et les crypto-monnaies.
            </p>
          </div>
        </div>
        <div className="collapse collapse-arrow join-item border border-base-300 bg-blueDark mb-4">
          <input type="radio" name="my-accordion-4" />
          <div className="collapse-title text-2xl font-medium">
            Comment puis-je m'inscrire à un cours sur WiseChain ?
          </div>
          <div className="collapse-content">
            <p className="text-gray-400 text-lg">
              Pour vous inscrire à un cours, créez un compte sur WiseChain,
              parcourez le catalogue de cours, et sélectionnez celui qui vous
              intéresse. Suivez ensuite les instructions pour vous inscrire.
            </p>
          </div>
        </div>
        <div className="collapse collapse-arrow join-item border border-base-300 bg-blueDark mb-4">
          <input type="radio" name="my-accordion-4" />
          <div className="collapse-title text-2xl font-medium">
            Y a-t-il des frais pour utiliser WiseChain ?
          </div>
          <div className="collapse-content">
            <p className="text-gray-400 text-lg">
              WiseChain propose à la fois des contenus gratuits et payants.
              Certains cours et articles sont accessibles gratuitement, tandis
              que d'autres nécessitent un abonnement ou un paiement unique.
            </p>
          </div>
        </div>
        <div className="collapse collapse-arrow join-item border border-base-300 bg-blueDark mb-4">
          <input type="radio" name="my-accordion-4" />
          <div className="collapse-title text-2xl font-medium">
            Comment puis-je suivre mes progrès sur WiseChain ?
          </div>
          <div className="collapse-content">
            <p className="text-gray-400 text-lg">
              Vous pouvez suivre vos progrès en accédant à votre tableau de bord
              personnel, où vous trouverez des informations sur les cours
              suivis, les questionnaires complétés, et les certificats obtenus.
            </p>
          </div>
        </div>
        <div className="collapse collapse-arrow join-item border border-base-300 bg-blueDark mb-4">
          <input type="radio" name="my-accordion-4" />
          <div className="collapse-title text-2xl font-medium">
            Comment puis-je contacter le support client de WiseChain ?
          </div>
          <div className="collapse-content">
            <p className="text-gray-400 text-lg">
              Pour contacter le support client, vous pouvez envoyer un email à
              support@wisechain.com ou en cliquant{' '}
              <a
                className="text-blue-500 underline"
                href="mailto:wisechainnet@gmail.com?subject=Demande d'information&body=Bonjour,%0D%0AJe souhaite obtenir des informations sur..."
              >
                ici
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Faq;
