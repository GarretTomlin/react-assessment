import React, { useState, useEffect, useCallback, useMemo } from "react";
import debounce from "lodash/debounce";
import CardListControls from "./CardListControls";
import DeckCardControls from "./DeckCardControls";
import PaginationButton from "./PaginationButton";

interface Person {
  species: string;
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  birth_year: string;
  gender: string;
  speciesName: string;
  homeworldName: string;
  homeworld: string;
  vehicles: string[];
  starships: string[];
  url: string
}


function Card() {
  const [people, setPeople] = useState<Person[]>([]);
  const [speciesMap, setSpeciesMap] = useState<Record<string, string>>({});
  const [homeworld, setHomeworld] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  const fetchPeople = async (page: number) => {
    const response = await fetch(`https://swapi.dev/api/people/?page=${page}`);
    const data = await response.json();
    setPeople(data.results);
    setPageCount(Math.ceil(data.count / 10));
  };

  const handlePageChange = (newPage: number) => {
  setCurrentPage(newPage);
};


  const fetchSpecies = useCallback(
    async (speciesUrls: string[]) => {
      const speciesResponses = await Promise.all(
        speciesUrls.map((url) => fetch(url))
      );
      const speciesData = await Promise.all(
        speciesResponses.map((response) => response.json())
      );
      const speciesMap = speciesData.reduce((acc, data) => {
        acc[data.url] = data.name;
        return acc;
      }, {} as Record<string, string>);
      setSpeciesMap(speciesMap);
    },
    []
  );

  const debouncedFetchSpecies = useCallback(debounce(fetchSpecies, 500), []);

  const debouncedFetchHomeworlds = useCallback(
    debounce(async (homeworldUrls: string[]) => {
      const homeworldResponses = await Promise.all(
        homeworldUrls.map((url) => fetch(url))
      );
      const homeworldData = await Promise.all(
        homeworldResponses.map((response) => response.json())
      );
      const homeworldNames = homeworldData.map((data) => data.name);
      setHomeworld(homeworldNames);
    }, 500),
    []
  );

  useEffect(() => {
    fetchPeople(currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (people.length > 0) {
      const speciesUrls = people.flatMap((person) => person.species);
      debouncedFetchSpecies(speciesUrls);
    }
  }, [people, debouncedFetchSpecies]);

  useEffect(() => {
    if (people.length > 0) {
      const homeworldUrls = people.map((person) => person.homeworld);
      debouncedFetchHomeworlds(homeworldUrls);
    }
  }, [people, debouncedFetchHomeworlds]);

  const derivedData = useMemo(() => {
    return people.map((person) => ({
      ...person,
      speciesName: speciesMap[person.species[0]] || "Unknown",
      homeworldName: homeworld[people.indexOf(person)] || "Unknown",
    }));
  }, [people, speciesMap, homeworld]);



  return (
    <><CardListControls /><div className="flex  flex-wrap gap-4">
      {derivedData.map((person, index) => (
        <div
          key={person.url}
          className="card  justify-center w-72 h-96 bg-white shadow-xl mt-10  "
        >

          <div className="bg-[#969696] p-6 rounded-t-lg">
            <div className="absolute left-0 right-0 top-0 z-50 mr-3 mt-4">
            <DeckCardControls showAddButton={true} personData={person}/>

            </div>
            <img src="../../icons/allcard.svg" className="w-6 h-6" />
            <div className="">
            </div>
            <h2 className="card-title mt-4 text-white">{person.name}</h2>
          </div>
          <div className="card-body">
            <div className="flex justify-between">
              <span className="text-black">{person.gender}</span>
              <span className="text-black">{person.speciesName}</span>
            </div>
            <hr />
            <div className="card-actions justify-end w-full">
              <button className="btn bg-[#EDEDED] w-60 flex items-center justify-between  hover:bg-transparent">
                <img src="../../icons/homeworld.svg" className="w-6 h-6" />
                <span className="text-black ml-8 absolute text-xs">Homeworld</span>
                <span className="text-black text-sm">{person.homeworldName}</span>
              </button>
              <button className="btn bg-[#EDEDED] w-60 flex items-center justify-between  hover:bg-transparent">
                <img src="../../icons/vehicle.svg" className="w-6 h-6" />
                <span className="text-black bg-[#EDEDED] ml-8 absolute text-xs">Vehicles</span>
                <span className="text-black">{person.vehicles.length}</span>
              </button>
              <button className="btn bg-[#EDEDED] w-60 flex items-center justify-between  hover:bg-transparent">
                <img src="../../icons/starship.svg" className="w-6 h-6" />
                <span className="text-black ml-8 absolute text-xs">Starships</span>
                <span className="text-black ">{person.starships.length}</span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
    <PaginationButton  currentPage={currentPage}
     pageCount={pageCount}
     onPageChange={handlePageChange}/>
    </>
    
  );
}

export default Card;

