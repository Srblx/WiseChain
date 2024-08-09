// components/ui/backoffice/TabContent.component.jsx

import { TabType } from '@/app/profile/(admin)/backoffices/page';
import CourseTableHeader from '@/components/ui/backoffice/table/courses/CourseTableHeader.component';
import CourseTableRow from '@/components/ui/backoffice/table/courses/CourseTableRow.component';
import UserTableHeader from '@/components/ui/backoffice/table/users/UserTableHeader.component';
import UserTableRow from '@/components/ui/backoffice/table/users/UserTableRow.component';
import TypeTab from '@/enums/typesTab.enum';
import { User } from '@/interfaces/auth/auth.interface';
import { Course } from '@/interfaces/course.interface';

interface TabContentProps {
  activeTab: TabType;
  users: User[];
  courses: Course[];
  onDeleteUser: (user: User) => void;
  onEditUser: (user: User) => void;
  onDeleteCourse: (course: Course) => void;
  onEditCourse: (course: Course) => void;
}

const TabContent = ({
  activeTab,
  users,
  courses,
  onDeleteUser,
  onEditUser,
  onDeleteCourse,
  onEditCourse,
}: TabContentProps) => {
  switch (activeTab) {
    case TypeTab.USER:
      return (
        <div className="tab-content bg-base-100 border-base-300 rounded-box p-6 overflow-x-auto">
          <div className="min-w-[1200px]">
            <table className="table table-zebra w-full">
              <UserTableHeader />
              <tbody>
                {users.map((user, index) => (
                  <UserTableRow
                    key={user.id}
                    user={user}
                    index={index}
                    onDelete={() => onDeleteUser(user)}
                    onEdit={() => onEditUser(user)}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    case TypeTab.COURS:
      return (
        <div className="tab-content bg-base-100 border-base-300 rounded-box p-6 overflow-x-auto">
          <div className="min-w-[1200px]">
            <table className="table table-zebra w-full">
              <CourseTableHeader />
              <tbody>
                {courses.map((course, index) => (
                  <CourseTableRow
                    key={course.id}
                    course={course}
                    index={index}
                    onDelete={() => onDeleteCourse(course)}
                    onEdit={() => onEditCourse(course)}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    default:
      return null;
  }
};

export default TabContent;
