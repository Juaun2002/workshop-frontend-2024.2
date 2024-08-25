import Link from 'next/link';

const Cabecalho = () => {
    return (
        <header className="bg-slate-900 p-4 text-white">
            <div className="container mx-auto flex justify-between items-center ">
                <div className="flex items-center">
                    <h1 className="ml-2 text-2xl">Valorant</h1>
                </div>
                <nav>
                    <ul className="flex space-x-4">
                        <li>
                            <Link href="/" className="hover:underline">Inicio</Link>
                        </li>
                        <li>
                            <Link href="/page/card" className="hover:underline">Agentes</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Cabecalho;
