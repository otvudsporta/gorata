export interface Playground {
  id: string;

  title: string;
  text: string;
  imageUrls: string[];
  geo: google.maps.LatLngLiteral;
  created: number;
  createdBy: string;
  status: string;
}
