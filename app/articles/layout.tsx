
type Props = {
    children: React.ReactNode;
}

export default function ArtcilesLayout({ children }: Props) { 
    return (
        <section>
        {children}
        </section>
    )
}