import * as d3 from "d3";
import { FeatureCollection, Geometry } from "geojson";
import polandVoivodeshipsGeoData from './poland.voivodeships.json';
import { memo, useMemo, useState } from "react";
import "./PolandMap.css";
import { useSearch } from "@src/hooks/SearchContext/useSearch";
import { useSignList } from "@src/hooks/SignListContext/useSignList";
import { calculateMapStatistics } from "@src/utils/calculateMapStatistics";

const WIDTH = 600;
const HEIGHT = 560;

const rewindGeometry = (g: Geometry): Geometry => {
  if (g.type === "Polygon") {
    return { ...g, coordinates: g.coordinates.map((ring) => [...ring].reverse()) };
  }
  if (g.type === "MultiPolygon") {
    return {
      ...g,
      coordinates: g.coordinates.map((poly) => poly.map((ring) => [...ring].reverse())),
    };
  }
  return g;
};

const geoData: FeatureCollection = (() => {
  const raw = polandVoivodeshipsGeoData as FeatureCollection;
  return { ...raw, features: raw.features.map((f) => ({ ...f, geometry: rewindGeometry(f.geometry) })) };
})();

const PolandMap = () => {
  const {region, handleOptionChange} = useSearch()
  const { filteredSigns } = useSignList()
  const [hovered, setHovered] = useState<string | null>(null);

  const mapStats = calculateMapStatistics(filteredSigns);

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

  const valueById = useMemo(
    () => new Map(mapStats.map((d) => [d.name, d.signsCount])),
    [mapStats]
  );

  const focusId = region ?? hovered;
  const toggle = (name: string) => handleOptionChange('region', region === name ? '' : name);

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      className="polandMap"
      role="group"
      aria-label="Map of Poland by voivodeship"
    >
      {regions.map((r) => {
        const value = valueById.get(r.name);
        const fill = "#232327";
        const cls = [
          "region",
          region === r.name && "active",
          focusId && focusId !== r.name && "dimmed",
        ]
          .filter(Boolean)
          .join(" ");

        return (
          <g
            key={r.name}
            className={cls}
            role="button"
            tabIndex={0}
            aria-pressed={region === r.name}
            aria-label={`${r.name}${value !== undefined ? `, ${value}` : ""}`}
            onClick={() => toggle(r.name)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggle(r.name);
              }
            }}
            onMouseEnter={() => setHovered(r.name)}
            onMouseLeave={() => setHovered(null)}
            onFocus={() => setHovered(r.name)}
            onBlur={() => setHovered(null)}
          >
            <path d={r.d} fill={fill} />
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