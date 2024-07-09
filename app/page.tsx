// Components
import RecentArticles from "@/components/ui/home/articles.component";
import ButtonGroup from "@/components/ui/home/buttonGroup.component";
import CourseList from "@/components/ui/home/courses.component";


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
