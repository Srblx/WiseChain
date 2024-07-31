// Components
import RecentArticles from '@/components/ui/home/articles.component';
import ButtonGroup from '@/components/ui/home/buttonGroup.component';
import CourseList from '@/components/ui/home/courses.component';

export default function Home() {
  return (
    <>
      <div className="w-1/2 mx-auto flex flex-col items-center mb-12">
        <h1 className="text-7xl text-center font-oswald">WiseChain.</h1>
        <p className="text-end w-72 text-tertiary font-extrabold text-xl font-oswald">L'invstissement pour tous !</p>
      </div>

      {/* <TestUser /> */}
      <RecentArticles />
      <ButtonGroup />
      <CourseList />
    </>
  );
}
