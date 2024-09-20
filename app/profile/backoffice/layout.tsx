
export default function BackOfficeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="-mx-8 sm:-mx-20 md:-mx-24 lg:-mx-32 relative min-h-screen ">
      {children}
    </div>
  );
}