'use client'
import Cabecalho from "@/app/components/header/Header";
import { useEffect, useState } from "react";

export interface Ability {
    slot: string;
    displayName: string;
    description: string;
    displayIcon?: string;
}

interface Agent {
    uuid: string;
    displayName: string;
    displayIconSmall: string;
    description: string;
    isPlayableCharacter: true;
    role?: {
        uuid: string;
        displayName?: string;
    };
    abilities: Ability[];
}

interface ApiResponse {
    data: Agent[];
    
}

export default function CharacterList() {
    const [data, setData] = useState<Agent[] | null>(null);

    useEffect(() => {
        fetch('https://valorant-api.com/v1/agents')
            .then((response) => response.json())
            .then((data: ApiResponse) => {
                // Filtro para remover a duplicata do sova
                const filteredData = data.data.filter(
                    (agent, index, self) =>
                        self.findIndex((a) => a.displayName === agent.displayName) === index
                );
                console.log('Data fetched and filtered:', filteredData);
                setData(filteredData);
            })
            .catch((error) => {
                console.error('Fetch error:', error);
            });
    }, []);

    if (data === null) {
        return <div>Loading...</div>;
    }

    
    return (
        <div className="flex flex-wrap justify-center gap-4">
            {data.map((character) => (
                <div
                    key={character.uuid}
                    className="flex flex-col justify-between items-center p-4 m-4 border rounded-lg shadow-lg hover:shadow-red-500 w-80 min-h-[400px]"
                >
                    <div className="flex flex-col items-center">
                        <img
                            src={character.displayIconSmall}
                            alt={character.displayName}
                            className="w-24 h-24 rounded-full"
                            />
                        <h2 className="text-red-600 mt-2 text-center">
                            <div className="font-bold text-lg">
                                {character.displayName}
                            </div>
                            {character.role?.displayName || character.displayName === "Sova" ? (
                                <p className="text-sm">
                                    {character.role?.displayName || "Iniciador"}
                                </p>
                            ) : (
                                <p className="text-sm text-gray-500">Role não disponível</p>
                            )}
                        </h2>
                        <p className="text-center mt-2 text-sm flex-grow">
                            {character.description}
                        </p>
                    </div>

                    <div className="w-full mt-4">
                        <h4 className="font-bold mb-2">Habilidades</h4>
                        <ul className="space-y-2">
                            {character.abilities.map((ability) => (
                                <li key={ability.slot} className="bg-gray-100 p-2 rounded">
                                    <div className="font-semibold text-sm">
                                        {ability.slot}: {ability.displayName}
                                    </div>
                                    <p className="text-xs">{ability.description}</p>
                                    {ability.displayIcon && (
                                        <img
                                            src={ability.displayIcon}
                                            alt={ability.displayName}
                                            className="w-8 h-8 mt-2"
                                        />
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            ))}
        </div>
    );
}
