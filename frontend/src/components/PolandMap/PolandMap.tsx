import * as d3 from "d3";
import geoData from './poland.voivodeships.json';
import { memo, useMemo } from "react";
import "./PolandMap.css";
import { useSearch } from "@src/hooks/SearchContext/useSearch";
import { useSignList } from "@src/hooks/SignListContext/useSignList";
import { calculateMapStatistics } from "@src/utils/calculateMapStatistics";

const WIDTH = 600;
const HEIGHT = 560;

const PolandMap = () => {
  const {region, handleOptionChange} = useSearch()
  const { filteredSigns } = useSignList()

  const regions = useMemo(() => {
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
    const mapStats = calculateMapStatistics(filteredSigns);
    return new Map(mapStats.map((d) => [d.name, d.signsCount]))
  }, [filteredSigns]);

  const toggle = (name: string) => handleOptionChange('region', region === name ? '' : name);

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      className="polandMap"
      role="group"
    >
      {regions.map((r) => {
        const value = valueById.get(r.name);
        const className = [
          "region",
          region === r.name ? " active" : "",
          value === undefined ? " dimmed" : ""
        ].join("")

        return (
          <g
            key={r.name}
            className={className}
            role="button"
            tabIndex={0}
            onClick={() => toggle(r.name)}
            onKeyDown={(e) => {
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