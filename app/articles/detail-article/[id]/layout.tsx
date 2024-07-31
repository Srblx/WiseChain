

type Props = {
    children: React.ReactNode;
}

export default function DetailArticleLayout({ children }: Props) { 
    return (
        <section>
        {children}
        </section>
    )
}