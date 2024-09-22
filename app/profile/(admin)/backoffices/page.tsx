// 'use client';

// import { useRouter } from 'next/navigation';
// import { Fragment, useEffect, useState } from 'react';
// import { ToastContainer } from 'react-toastify';

// // Components
// import LoadingSpinner from '@/components/shared/LoadingSpinner.component';

// // Enums
// import Roles from '@/enums/roles.enum';
// import Routes from '@/enums/routes.enum';
// import TypeTab from '@/enums/typesTab.enum';

// // Hooks
// import CourseTable from '@/components/ui/backoffice/table/CourseTable.component';
// import UserTable from '@/components/ui/backoffice/table/UserTable.component';
// import useAuth from '@/hooks/useAuth.hook';

// // Types
// export type TabType =
//   | TypeTab.USER
//   | TypeTab.COURS
//   | TypeTab.SEQUENCE
//   | TypeTab.OUTILS
//   | TypeTab.QUESTIONNAIRE
//   | TypeTab.ARTICLES
//   | TypeTab.GLOSSAIRE;

// const BackofficePage = () => {
//   const router = useRouter();
//   const { user, token } = useAuth();
//   const [isLoading, setIsLoading] = useState(false);
//   const [isAuthorized, setIsAuthorized] = useState(false);
//   const [activeTab, setActiveTab] = useState<TabType>(TypeTab.USER);

//   useEffect(() => {
//     if (user) {
//       if (user.roles === Roles.ADMIN && user.is_verified) {
//         setIsAuthorized(true);
//       } else {
//         router.push(Routes.HOME);
//       }
//     } else {
//       router.push(Routes.HOME);
//     }
//   }, [user, router]);

//   const handleTabChange = (tab: TabType) => setActiveTab(tab);

//   if (isLoading) return <LoadingSpinner />;
//   if (!isAuthorized) return null;

//   return (
//     <>
//       <div className="text-3xl mt-6 mb-6">
//         <h1>BackOffice</h1>
//       </div>
//       <div role="tablist" className="tabs tabs-lifted">
//         {Object.values(TypeTab).map((tab) => (
//           <Fragment key={tab}>
//             <input
//               type="radio"
//               name="my_tabs"
//               role="tab"
//               className="tab text-tab-label"
//               aria-label={tab}
//               checked={activeTab === tab}
//               onChange={() => handleTabChange(tab)}
//             />
//             <div className="tab-content bg-base-100 border-base-300 rounded-box p-6">
//               {activeTab === TypeTab.USER && <UserTable token={token!} />}
//               {activeTab === TypeTab.COURS && <CourseTable token={token!} />}
//               {/* Ajoutez d'autres conditions pour les autres types d'onglets si nécessaire */}
//             </div>
//           </Fragment>
//         ))}
//       </div>

//       <ToastContainer
//         position="top-center"
//         autoClose={4000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="dark"
//       />
//     </>
//   );
// };

// export default BackofficePage;
