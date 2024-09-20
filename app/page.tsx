// Components
import RecentArticles from '@/components/ui/home/Articles.component';
import ButtonGroup from '@/components/ui/home/ButtonGroup.component';
import CourseList from '@/components/ui/home/Courses.component';

export default function Home() {
  return (
    <>
      <div className="w-1/2 mx-auto flex flex-col items-center mb-6">
        <h1 className="text-7xl text-center font-oswald">WiseChain.</h1>
        <p className="text-end w-96 text-tertiary font-extrabold text-xl font-oswald mr-6">
          L'investissement pour tous !
        </p>
      </div>
      {/* <TestUser /> */}
      <RecentArticles />
      <ButtonGroup />
      <CourseList />
    </>
  );
}
