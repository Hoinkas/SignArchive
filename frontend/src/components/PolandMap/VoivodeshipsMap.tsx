import * as d3 from "d3";
import { FeatureCollection, Geometry } from "geojson";
import polandVoivodeshipsGeoData from './poland.voivodeships.json';
import { memo, useMemo, useState } from "react";
import "./VoivodeshipsMap.css";

export type MapData = {
  name: string,
  terc: number | string,
  signsCount: number
}

type Props = {
  numData: MapData[];
  selected: string | null;
  onSelect: (id: string | null) => void;
};

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

const VoivodeshipsMap = ({ numData, selected, onSelect }: Props) => {
  const [hovered, setHovered] = useState<string | null>(null);

  const regions = useMemo(() => {
    const projection = d3
      .geoTransverseMercator()
      .rotate([-19, -52])
      .fitSize([WIDTH, HEIGHT], geoData);
    const path = d3.geoPath(projection);

    return geoData.features.map((f) => ({
      id: String(f.properties?.terc),
      name: String(f.properties?.nazwa ?? f.properties?.name ?? ""),
      d: path(f) ?? "",
      centroid: path.centroid(f),
    }));
  }, []);

  const valueById = useMemo(
    () => new Map(numData.map((d) => [d.terc, d.signsCount])),
    [numData]
  );

  const focusId = selected ?? hovered;
  const toggle = (id: string) => onSelect(selected === id ? null : id);

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      className="poland-map"
      role="group"
      aria-label="Map of Poland by voivodeship"
    >
      {regions.map((r) => {
        const value = valueById.get(r.id);
        const fill = "#232327";
        const cls = [
          "region",
          selected === r.id && "active",
          focusId && focusId !== r.id && "dimmed",
        ]
          .filter(Boolean)
          .join(" ");

        return (
          <g
            key={r.id}
            className={cls}
            role="button"
            tabIndex={0}
            aria-pressed={selected === r.id}
            aria-label={`${r.name}${value !== undefined ? `, ${value}` : ""}`}
            onClick={() => toggle(r.id)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggle(r.id);
              }
            }}
            onMouseEnter={() => setHovered(r.id)}
            onMouseLeave={() => setHovered(null)}
            onFocus={() => setHovered(r.id)}
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

export default memo(VoivodeshipsMap);