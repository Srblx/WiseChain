import Routes from '@/enums/routes.enum';
import Link from 'next/link';


const Articles = () => {
  return (
    <div >
      <h3>Articles Page</h3>
      <Link href={Routes.HOME}>HOME</Link>
    </div>
  );
};

export default Articles;
