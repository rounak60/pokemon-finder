"use client";

import React, { useState, useEffect, useMemo, useRef } from 'react';

const ELITE_IDS = new Set([
  6, 9, 59, 65, 68, 94, 130, 131, 142, 143, 144, 145, 146, 149, 150, 212, 214, 229, 230, 243, 244, 245, 248, 249, 250, 251, 254, 257, 260, 282, 289, 302, 303, 306, 308, 310, 319, 323, 334, 354, 359, 373, 376, 377, 378, 379, 380, 381, 382, 383, 384, 385, 386, 428, 445, 448, 460, 464, 466, 467, 468, 473, 475, 477, 480, 481, 482, 483, 484, 485, 486, 487, 488, 489, 490, 491, 492, 493, 494, 555, 635, 638, 639, 640, 641, 642, 643, 644, 645, 646, 647, 648, 649, 706, 716, 717, 718, 719, 720, 721, 773, 782, 783, 784, 785, 786, 787, 788, 789, 790, 791, 792, 793, 794, 795, 796, 797, 798, 799, 800, 801, 802, 803, 804, 805, 806, 807, 808, 809, 887, 888, 889, 890, 891, 892, 893, 894, 895, 896, 897, 898, 905, 999, 1000, 1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009, 1010, 1011, 1012, 1013, 1014, 1015, 1016, 1017, 1018, 1019, 1020, 1021, 1022, 1023, 1024, 1025
]);

const TYPES = ["all", "fire", "water", "grass", "electric", "ice", "fighting", "poison", "ground", "flying", "psychic", "bug", "rock", "ghost", "dragon", "dark", "steel", "fairy", "normal"];

export default function PokedexHome() {
  const [allPokemon, setAllPokemon] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentType, setCurrentType] = useState("all");
  const [isElite, setIsElite] = useState(false);
  const [dropdownActive, setDropdownActive] = useState(false);
  const [displayLimit, setDisplayLimit] = useState(40);
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isFlashing, setIsFlashing] = useState(false);

  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function init() {
      try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1025");
        const data = await res.json();
        const base = data.results.map((p: any, i: number) => ({
          name: p.name,
          id: i + 1,
          types: [],
          img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${i + 1}.png`
        }));

        const typePromises = TYPES.filter(t => t !== "all").map(async (type) => {
          const typeRes = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
          const typeData = await typeRes.json();
          return { type, pokemon: typeData.pokemon };
        });

        const allTypeData = await Promise.all(typePromises);
        allTypeData.forEach(({ type, pokemon }) => {
          pokemon.forEach((p: any) => {
            const id = parseInt(p.pokemon.url.split("/").filter(Boolean).pop());
            if (id <= 1025 && base[id - 1]) base[id - 1].types.push(type);
          });
        });

        setAllPokemon(base);
        setTimeout(() => setLoading(false), 2000);
      } catch (e) { console.error(e); }
    }
    init();
  }, []);

  const filteredPool = useMemo(() => {
    return allPokemon.filter(p => {
      const q = searchTerm.toLowerCase();
      const matchesSearch = p.name.includes(q) || p.id.toString() === q;
      const matchesType = currentType === "all" || p.types.includes(currentType);
      const matchesElite = !isElite || ELITE_IDS.has(p.id);
      return matchesSearch && matchesType && matchesElite;
    });
  }, [allPokemon, searchTerm, currentType, isElite]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !loading) setDisplayLimit(prev => prev + 40);
    }, { rootMargin: "400px" });
    const currentSentinel = sentinelRef.current;
    if (currentSentinel) observer.observe(currentSentinel);
    return () => { if (currentSentinel) observer.unobserve(currentSentinel); };
  }, [loading]);

  useEffect(() => {
    const handleScroll = () => setShowScrollBtn(window.scrollY > 500);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSelectPokemon = (id: number) => {
    setShowModal(false); 
    setIsFlashing(true);
    setSelectedId(id);

    setTimeout(() => {
      setShowModal(true);
    }, 2400);

    setTimeout(() => {
      setIsFlashing(false);
    }, 3500);
  };

  return (
    <>
      {loading && (
        <div id="loader-wrapper">
          <div className="loader-container">
            <div className="pokeball-loader"></div>
            <div className="loader-shadow"></div>
          </div>
          <div className="loader-text">Welcome to the PokeWorld!</div>
        </div>
      )}

      <div 
        id="entrance-flash" 
        className={isFlashing ? "flash-active" : ""} 
        style={{ display: isFlashing ? 'flex' : 'none' }}
      >
        <div className={`pop-ball ${isFlashing ? "pop-ball-active" : ""}`}></div>
      </div>

      <header className="header">
        <div className="header-container">
          <div className="search-wrapper">
            <input
              type="text"
              className="search-input"
              placeholder="Search by name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="controls-group">
            <button className={`elite-btn ${isElite ? 'active' : ''}`} onClick={() => setIsElite(!isElite)}>
              <span>⭐</span> Elite
            </button>
            <div className="dropdown" onClick={() => setDropdownActive(!dropdownActive)}>
              <div className="dropdown-selected">{currentType.toUpperCase()} <span>▼</span></div>
              <ul className={`dropdown-list ${dropdownActive ? 'active' : ''}`}>
                {TYPES.map(t => <li key={t} onClick={() => {setCurrentType(t); setDropdownActive(false);}}>{t}</li>)}
              </ul>
            </div>
            <button className="clear-btn" onClick={() => {setSearchTerm(""); setIsElite(false); setCurrentType("all");}}>Reset</button>
          </div>
        </div>
      </header>

      <div className="container">
        <div className="pokemon-grid">
          {filteredPool.slice(0, displayLimit).map((p) => (
            <div 
              key={p.id} 
              className={`card reveal ${p.types[0] || 'normal'}`} 
              onClick={() => handleSelectPokemon(p.id)}
            >
              <img src={p.img} alt={p.name} loading="lazy" />
              <div className="card-info">
                <h3>{p.name}</h3>
                <span className="id-subtitle">#{p.id.toString().padStart(3, "0")}</span>
              </div>
            </div>
          ))}
        </div>
        <div ref={sentinelRef} id="sentinel" style={{ height: "60px" }}></div>
      </div>

      {showScrollBtn && (
        <button id="scrollTopBtn" className="reveal-btn" style={{ display: 'block' }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>↑</button>
      )}

      {showModal && selectedId && (
        <PokemonDetail 
          id={selectedId} 
          onClose={() => {setShowModal(false); setSelectedId(null);}} 
          onNavigate={handleSelectPokemon} 
        />
      )}
    </>
  );
}

function PokemonDetail({ id, onClose, onNavigate }: { id: number, onClose: () => void, onNavigate: (id: number) => void }) {
  const [data, setData] = useState<any>(null);
  const [evoChain, setEvoChain] = useState<any[]>([]);

  useEffect(() => {
    document.body.classList.add("stop-scrolling");
    return () => {
      document.body.classList.remove("stop-scrolling");
    };
  }, []);

  useEffect(() => {
    async function fetchFullDetails() {
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const pokemon = await res.json();
        setData(pokemon);

        const speciesRes = await fetch(pokemon.species.url);
        const species = await speciesRes.json();

        const evoRes = await fetch(species.evolution_chain.url);
        const evoData = await evoRes.json();

        const chain: any[] = [];
        let current = evoData.chain;
        do {
          const pokeId = current.species.url.split("/").filter(Boolean).pop();
          chain.push({
            name: current.species.name,
            id: pokeId,
            img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeId}.png`
          });
          current = current.evolves_to[0];
        } while (current && current.hasOwnProperty("evolves_to"));
        
        setEvoChain(chain);
      } catch (e) { console.error(e); }
    }
    fetchFullDetails();
  }, [id]);

  if (!data) return null;

  return (
    <div id="detail-view" style={{ display: 'flex' }} onClick={onClose}>
      <div id="detail-content" className="show" onClick={e => e.stopPropagation()}>
        <button className="back-btn" onClick={onClose}>←</button>
        <div className={`detail-header ${data.types[0].type.name}`}>
          <img src={data.sprites.other["official-artwork"].front_default} className="detail-img" alt={data.name} />
          <h1 className="detail-title">{data.name}</h1>
          <div className="type-badge-container">
            {data.types.map((t: any) => <span key={t.type.name} className="type-badge">{t.type.name}</span>)}
          </div>
        </div>
        <div className="stats-container">
          {data.stats.map((s: any) => (
            <div className="stat-row" key={s.stat.name}>
              <div className="stat-label-group">
                <span>{s.stat.name.replace("-", " ")}</span><strong>{s.base_stat}</strong>
              </div>
              <div className="stat-bar-bg">
                <div 
                  className={`stat-bar-fill ${data.types[0].type.name}`} 
                  style={{ "--w": `${Math.min(100, s.base_stat)}%` } as React.CSSProperties}
                ></div>
              </div>
            </div>
          ))}
        </div>
        <div className="evo-section">
          <div className="evo-title">Evolution Path</div>
          <div className="evo-chain">
            {evoChain.map((evo, i) => (
              <React.Fragment key={evo.id}>
                <div 
                  className={`evo-item ${parseInt(evo.id) === id ? "current-evo" : ""}`} 
                  onClick={() => onNavigate(parseInt(evo.id))}
                >
                  <div className="evo-img-wrap"><img className="evo-img" src={evo.img} alt={evo.name} /></div>
                  <div className="evo-name">{evo.name}</div>
                </div>
                {i < evoChain.length - 1 && <div className="evo-arrow">→</div>}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}