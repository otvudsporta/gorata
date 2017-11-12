export interface Playground {
  title: string;
  text: string;
  imageUrls: string[];
  geo: google.maps.LatLngLiteral;
  created: number;
  createdBy: string;
  status: string;
}
