export default function BackOfficeLayout({ children }: { children: React.ReactNode }) { 
    return (
        <section>
        {children}
        </section>
    )
}

// import RootLayout from "@/app/layout";
// import BackofficePage from "./page";

// export default function Page() {
//   return (
//     <RootLayout /* showFooter={false} */>
//       <BackofficePage />
//     </RootLayout>
//   );
// }
