'use client';

// Icons
import { TiWarningOutline } from 'react-icons/ti';

// Components
import { Button } from '../shared/Button.components';
import ConfirmDialog from '../shared/ConfirmDialog.component';

export default function InvestmentSensitivity() {
  return (
    <div className="bg-backgroundTransparent flex justify-center items-center p-6 border-y-2 border-white mt-20">
      <div className="text-center text-sm space-y-6">
        <div className="flex items-center space-x-4 ">
          <TiWarningOutline size={'2.4rem'} className='text-blueDark font-extrabold'/>
          <p className="text-lg xs:text-sm sm:text-base font-extrabold ">
            {' '}
            Attention aux risques : L'investissement comporte des risques
            importants, y compris la perte totale du capital.{' '}
            <Button
              className="text-blueDark underline cursor-pointer"
              onClick={() =>
                (
                  document.getElementById(
                    'Investment-sensitivity'
                  ) as HTMLDialogElement
                )?.showModal()
              }
            >
              Lire plus...
            </Button>
          </p>
        </div>

        <ConfirmDialog
          id="Investment-sensitivity"
          title="Investir comporte des risques"
          text={
            <>
              <p>
                Investir dans les marchés financiers, y compris les crypto-actifs,
                comporte des risques importants. Il est crucial de comprendre que vous
                pouvez perdre une partie, voire la totalité, de votre capital investi.
                La nature extrêmement volatile des crypto-monnaies les rend
                particulièrement sensibles aux fluctuations du marché ainsi qu'aux
                événements géopolitiques, économiques et réglementaires.
              </p>
              <br/>
              <p>
                Les produits à effet de levier, tels que les CFD (contrats sur la
                différence), amplifient considérablement les risques financiers. Les
                statistiques montrent qu'une grande majorité des investisseurs
                particuliers subissent des pertes en négociant des CFD. Avant de vous
                engager, assurez-vous de maîtriser le fonctionnement de ces instruments
                complexes et d'en accepter les risques inhérents.
              </p>
              <br/>
              <p>
                Avant de décider de négocier des instruments financiers ou des
                crypto-monnaies, il est essentiel d'être pleinement informé des risques
                et des frais associés aux transactions sur les marchés financiers.
                Examinez attentivement vos objectifs de placement, votre niveau
                d’expérience, votre tolérance pour le risque et consultez des
                professionnels si nécessaire.
              </p>
              <br/>
              <p>
                En outre, il est obligatoire de déclarer les gains provenant des
                investissements, y compris ceux réalisés avec des crypto-actifs, aux
                autorités fiscales compétentes. Le non-respect de ces obligations peut
                entraîner des pénalités importantes.
              </p>
              <br/>
              <p>
                WiseChain peut fournir des commentaires d’ordre général qui ne
                constituent pas des conseils en investissement et ne doivent pas être
                interprétés comme tels. WiseChain décline toute responsabilité pour les
                erreurs, investissements inopportuns, inexactitudes ou omissions, et ne
                garantit pas l’exactitude ou la complétude des informations, textes,
                graphiques, liens ou autres éléments contenus dans l'application.
              </p>
            </>
          }
          choice='Retour'
          onCancel={() => {}}
        />
      </div>
    </div>
  );
}
