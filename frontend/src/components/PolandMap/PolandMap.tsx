import * as d3 from "d3";
import geoData from './poland.voivodeships.json';
import { memo, useMemo } from "react";
import "./PolandMap.css";
import { useSearch } from "@src/hooks/SearchContext/useSearch";
import { calculateMapStatistics } from "@src/utils/calculateMapStatistics";
import type { IRegionToFE } from "@src/models/region.model";

const WIDTH = 600;
const HEIGHT = 560;

interface PolandMapProps {
  regions: IRegionToFE[]
  interactive?: boolean
  small?: boolean
}

const PolandMap = ({regions, interactive = false, small = false}: PolandMapProps) => {
  const {region, handleOptionChange} = useSearch()

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
  }, []);

  const valueById = useMemo(() => {
    const mapStats = calculateMapStatistics(regions);
    return new Map(mapStats.map((d) => [d.name, d.signsCount]))
  }, [regions]);

  const toggle = (name: string) => {
    if (interactive) handleOptionChange('region', region === name ? '' : name);
  }
    
  const className = [
    "polandMap",
    small ? " small" : ""
  ].join("")

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      className={className}
      role="group"
    >
      {mapRegions.map((r) => {
        const value = valueById.get(r.name);
        const regionClassName = [
          "region",
          region === r.name ? " active" : "",
          value === undefined ? " dimmed" : "",
          interactive ? " interactive" : ""
        ].join("")

        return (
          <g
            key={r.name}
            className={regionClassName}
            role="button"
            tabIndex={0}
            onClick={() => toggle(r.name)}
            onKeyDown={(e) => {
              if (interactive) return
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggle(r.name);
              }
            }}
          >
            <path d={r.d} fill={"#232327"} />
            {value !== undefined && (
              <text
                x={r.centroid[0]}
                y={r.centroid[1]}
                textAnchor="middle"
                dominantBaseline="central"
                fill={'#93909E'}
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