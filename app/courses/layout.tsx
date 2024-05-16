

type Props = {
    children: React.ReactNode;
}

export default function CoursesLayout({ children }: Props) { 
    return (
        <section>
        {children}
        </section>
    )
}