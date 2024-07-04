// Components
import RecentArticles from "@/components/article.component";
import ButtonGroup from "@/components/buttonGroup.component";
import CourseList from "@/components/coursesHome.component";


export default function Home() {
  return (
    <>
      {/* <TestUser /> */}
      <RecentArticles />
      <ButtonGroup />
      <CourseList />
    </>
  );
}
