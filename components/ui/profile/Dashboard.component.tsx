// Components
import { Button } from '@/components/shared/Button.components';

// Libs Next
import Image from 'next/image';

const WIDTH_IMAGE = 200;
const HEIGHT_IMAGE = 150;

export const DashboardUser = () => {
  return (
    <div className="w-full overflow-x-hidden">
      <div className="mb-14 mt-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Questionnaire completé</h3>
          <Button
            className="bg-button xs:text-xs text-md px-2 py-1 rounded-lg border-2"
            onClick={() => console.log('Click NFT button')}
          >
            Réclamer vos NFT
          </Button>
        </div>
        <div className="relative">
          <div className="carousel carousel-center bg-neutral rounded-box w-full space-x-4 p-4">
            <div className="carousel-item">
              <Image
                src="/img/noDB/gve9im25kh2t40muo7dy.png"
                className="rounded-box"
                alt={''}
                width={WIDTH_IMAGE}
                height={HEIGHT_IMAGE}
              />
            </div>
            <div className="carousel-item">
              <Image
                src="/img/noDB/gve9im25kh2t40muo7dy.png"
                className="rounded-box"
                alt={''}
                width={WIDTH_IMAGE}
                height={HEIGHT_IMAGE}
              />
            </div>
            <div className="carousel-item">
              <Image
                src="/img/noDB/gve9im25kh2t40muo7dy.png"
                className="rounded-box"
                alt={''}
                width={WIDTH_IMAGE}
                height={HEIGHT_IMAGE}
              />
            </div>
            <div className="carousel-item">
              <Image
                src="/img/noDB/gve9im25kh2t40muo7dy.png"
                className="rounded-box"
                alt={''}
                width={WIDTH_IMAGE}
                height={HEIGHT_IMAGE}
              />
            </div>
            <div className="carousel-item">
              <Image
                src="/img/noDB/gve9im25kh2t40muo7dy.png"
                className="rounded-box"
                alt={''}
                width={WIDTH_IMAGE}
                height={HEIGHT_IMAGE}
              />
            </div>
            <div className="carousel-item">
              <Image
                src="/img/noDB/gve9im25kh2t40muo7dy.png"
                className="rounded-box"
                alt={''}
                width={WIDTH_IMAGE}
                height={HEIGHT_IMAGE}
              />
            </div>
            <div className="carousel-item">
              <Image
                src="/img/noDB/gve9im25kh2t40muo7dy.png"
                className="rounded-box"
                alt={''}
                width={WIDTH_IMAGE}
                height={HEIGHT_IMAGE}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-around items-center space-x-4">
        <div className="bg-tertiary p-2 rounded-lg text-center">
          <h3 className="sm:text-md font-semibold text-lg">
            Moyenne des questionnaires
          </h3>
          <p className="text-2xl font-bold text-white">16.25</p>
        </div>
        <div className="bg-tertiary p-2 rounded-lg text-center">
          <h3 className="sm:text-md font-semibold text-lg">
            Questionnaires réalisé
          </h3>
          <p className="text-2xl font-bold text-white">7</p>
        </div>
      </div>
    </div>
  );
};
