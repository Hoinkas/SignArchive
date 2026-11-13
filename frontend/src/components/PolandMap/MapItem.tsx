import * as d3 from "d3";
import type { FeatureCollection, Geometry } from "geojson";
import rawGeoData from './poland.voivodeships.json';
import { memo, useMemo } from "react";
import "./PolandMap.css";
import { useSearch } from "@src/hooks/SearchContext/useSearch";
import type { IMapStats } from "@src/utils/calculateMapStatistics";

const WIDTH = 600;
const HEIGHT = 560;

interface PolandMapProps {
  mapStats: IMapStats[]
  interactive?: boolean
}

const PolandMap = ({mapStats, interactive = false}: PolandMapProps) => {
  const {region, handleOptionChange} = useSearch()
  const geoData = rawGeoData as FeatureCollection<Geometry, { terc: string; name: string }>;

  const mapRegions = useMemo(() => {
    const projection = d3
      .geoTransverseMercator()
      .rotate([-19, -52])
      .fitSize([WIDTH, HEIGHT], geoData);
    const path = d3.geoPath(projection);

    return geoData.features.map((f) => ({
      name: String(f.properties?.name ?? ""),
      d: path(f) ?? "",
      centroid: path.centroid(f),
    }));
  }, [geoData]);

  const valueById = useMemo(() => {
    return new Map(mapStats.map((d) => [d.regionName, d.count]))
  }, [mapStats]);

  const toggle = (name: string) => {
    if (interactive) handleOptionChange('region', region === name ? '' : name);
  }

  // const shortenedVoivodeshipNames = [
  //   ['Dolnośląskie', 'Dolnośl.'],
  //   ['Kujawsko-Pomorskie', 'Kuj.-Pom.'],
  //   ['Lubelskie', 'Lubel.'],
  //   ['Lubuskie', 'Lubus.'],
  //   ['Łódzkie', 'Łódz.'],
  //   ['Małopolskie', 'Małopol.'],
  //   ['Mazowieckie', 'Mazow.'],
  //   ['Opolskie', 'Opol.'],
  //   ['Podkarpackie', 'Podkarp.'],
  //   ['Podlaskie', 'Podlas.'],
  //   ['Pomorskie', 'Pom.'],
  //   ['Śląsk', 'Śl.'],
  //   ['Świętokrzyskie', 'Świętokrz.'],
  //   ['Warmińsko-Mazurskie', 'War.-Maz.'],
  //   ['Wielkopolskie', 'Wlkp.'],
  //   ['Zachodniopomorskie', 'Zach.Pom.'],    
  // ]

  // function returnShortenedName(name: string) {
  //   const nameIndex = shortenedVoivodeshipNames.findIndex((n) => n[0] === name)
  //   return shortenedVoivodeshipNames[nameIndex][1]
  // }

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      role="group"
    >
      {mapRegions.map((r) => {
        const value = valueById.get(r.name);
        const regionClassName = [
          "region",
          region === r.name ? " active" : "",
          value ? "" : " dimmed",
          interactive ? " interactive" : ""
        ].join("")

        return (
          <g
            key={r.name}
            className={regionClassName}
            role={interactive ? "button" : undefined}
            tabIndex={interactive ? 0 : undefined}
            onClick={() => toggle(r.name)}
            onKeyDown={(e) => {
              if (!interactive) return;
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggle(r.name);
              }
            }}
          >
            <path d={r.d}/>
            {value !== undefined && (
              <text
                x={r.centroid[0]}
                y={r.centroid[1]}
                textAnchor="middle"
                dominantBaseline="central"
              > 
                {value}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
};

export default memo(PolandMap);