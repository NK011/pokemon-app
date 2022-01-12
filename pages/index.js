import Head from "next/head";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
    const [search, setSearch] = useState("");
    const [pokemon, setPokemon] = useState({});

    const searhPokemon = async (e) => {
        const getPokemon = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`
        )
            .then((res) => res.json())
            .catch((err) => console.log(err))
            .then((data) => {
                console.log(data);
                setPokemon({
                    name: data?.species?.name,
                    imageURL: data?.sprites?.other?.dream_world?.front_default,
                    stats: data?.stats,
                });
            });
    };

    return (
        <div className="h-screen">
            <Head>
                <title>Pokemon App</title>
                <meta name="description" content="Created by Nitish Kumar" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Image
                src={pokemon?.imageURL || "/logo.png"}
                layout="fill"
                className="blur-lg"
                alt="pokemon"
            />
            <div className="flex flex-col items-center justify-center relative top-0 right-0 left-0">
                <img
                    className="w-40 h-40 md:w-64 md:h-64"
                    src="https://www.freepnglogos.com/uploads/pokemon-logo-png-0.png"
                    alt="logo"
                />
                <div className="flex flex-col justify-evenly md:h-auto md:flex-row md:w-96 ">
                    <input
                        type="text"
                        value={search}
                        placeholder="Search Pokemon..."
                        onChange={(e) => setSearch(e.target.value)}
                        className="bg-white p-2 rounded-full font-bold"
                    />
                    <button
                        onClick={searhPokemon}
                        className="bg-blue-800 p-2 rounded-2xl w-36 text-white shadow-black shadow-lg self-center"
                    >
                        Go
                    </button>
                </div>
                <div className="text-black border-2 border-solid border-slate rounded-lg p-2 bg-gradient-to-b to-transparent from-white shadow-lg shadow-slate-900/50 mt-5">
                    {pokemon?.name ? (
                        <div className="w-48 flex flex-col md:flex-row md:w-96 ">
                            <img
                                src={pokemon.imageURL}
                                alt={pokemon.name}
                                className="h-32 w-32 self-center p-2 md:w-40 md:h-40 md:p-5"
                            />
                            <div className="w-full">
                                <h1 className="font-bold text-2xl md:text-3xl">
                                    {pokemon.name.toUpperCase()}
                                </h1>
                                {pokemon?.stats?.map((stat) => (
                                    <div
                                        key={stat.stat.name}
                                        className="flex justify-between"
                                    >
                                        <p className="text-fuchsia-900 font-semibold text-lg">
                                            {stat.stat.name.toUpperCase()}
                                        </p>
                                        <p className="font-medium">
                                            {stat.base_stat}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="w-36 h-36 md:w-48 md:h-48 flex justify-center items-center">
                            <img
                                src="/download.png"
                                className="h-32"
                                className="animate-bounce p-5"
                                alt="pokemon_ball"
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
