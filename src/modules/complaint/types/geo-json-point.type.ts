export type GeoJsonPointType = {
  type: string;
  coordinates: number[];
};

export const GeoJsonPoint = () => ({
  type: String,
  coordinates: [Number],
});
